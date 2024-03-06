import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
   const people = await prisma.person.findMany({
  include: {
    address: true, // Include address data in the response
  },
});
return new Response(JSON.stringify(people), {
    status: 200, // HTTP status code 200 OK
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {firstname, lastname, phone, dateOfBirth, address } = body;
        const { street, city, state, zipCode, country } = address;

        if (!firstname || !lastname || !phone || !dateOfBirth || !street || !city || !state || !zipCode || !country) {
            return new Response('Missing required fields', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }


        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
                dateOfBirth,
                address:  {
                    create: {
                        street,
                        city,
                        state,
                        zipCode,
                        country,
                    },
                },
            },
            include: {
                address: true, // Include the address in the response
            },
        });

        //return the data record
        return new Response(JSON.stringify(person), {
            status: 202,
            headers: {
                'Content-Type': 'application/json',
            },

        
        }    )

    } catch (error) {
        console.error('Error creating person', error);
        return new Response('Error updating person', {
          status: 500,
        });
      }
    }