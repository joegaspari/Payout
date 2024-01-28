import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { User } from "@prisma/client";

const prisma = new PrismaClient();



export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users) 
    } catch (error) {
        console.log("Test:", error)
    }       

}


// export async function POST() {
//     //This post method is for creating a user
//     try {

//         const userObject = currentUser()

//         if (!userObject) {
//             return new NextResponse('Not Logged in', { status: 401 })    
//         }
 

//         // const user = await prisma.user.create({
//         //     data: {
//         //         name: name,
//         //     },
//         // })
//         return NextResponse.json()
//     } catch (error) {
//         console.log("Test:", error)
//     }


// }
