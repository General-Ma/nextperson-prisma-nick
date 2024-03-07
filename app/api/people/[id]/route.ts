//create a get method that will take id from the context , search for the id from prisma
//if found return the data record

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(context: any) {
  const { id } = context.params;


  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(id),
    }, 
    include: {
      address: true,
    },
  })
  if (!person) {
    return new Response('Not found', {
      status: 404,
    })
  }
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })


}
export async function PUT(request: Request, context: any) {
  const { id } = context.params;
  const numericId = parseInt(id);

  try {
    const body = await request.json();
    const { firstname, lastname, phone, dateOfBirth, address } = body;
    if (!firstname || !lastname || !phone || !dateOfBirth || !address) {
      return new Response('Missing required fields', {
        status: 400,
      });
    }

    // Ensuring address details are provided
    const { street, city, state, zipCode, country } = address;
    if (!street || !city || !state || !zipCode || !country) {
      return new Response('Missing required address fields', {
        status: 400,
      });
    }

    const updatedPerson = await prisma.$transaction(async (prisma) => {
      let addressData = { street, city, state, zipCode, country };
    
      // Check if address exists and should be updated, or if a new one should be created
      let existingAddress = await prisma.address.findFirst({
        where: addressData,
      });
    
      let addressId;
      if (existingAddress) {
        addressId = existingAddress.id;
      } else {
        const newAddress = await prisma.address.create({
          data: addressData,
        });
        addressId = newAddress.id;
      }
    
      // Update person with the new or updated addressId
      return await prisma.person.update({
        where: { id: numericId },
        data: {
          firstname,
          lastname,
          phone,
          dateOfBirth: new Date(dateOfBirth), // Ensure correct date format
          addressId  // Correctly linking addressId to the person
        },
        include: {
          address: true, // Include address data in the response
        }, // Add a comma here
      });
    });
    return new Response(JSON.stringify(updatedPerson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating person:', error);
    return new Response('Error updating person', {
      status: 500,
    });
  }
}