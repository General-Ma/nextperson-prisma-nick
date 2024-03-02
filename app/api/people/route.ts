import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const people = await prisma.person.findMany();
    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const {firstname, lastname, phone, dateOfBirth, address } = body;
        const { street, city, state, zipCode, country } = address;

        if (!firstname || !lastname || !phone || !dateOfBirth || !address || !street || !city || !state || !zipCode || !country) {
            return new Response('Missing required fields', {
                status: 400,
            })
        }

        const newAddress = await prisma.address.create({
            data: {
                street,
                city,
                state,
                zipCode,
                country,
            },
        });

        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
                dateOfBirth,
                address:  {
                    create: {
                        ...address,
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