import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { exampleId: string } }, // JOE: Taken directly from folder name [exampleId]
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!params.exampleId) {
      return new NextResponse('Example Id is required', { status: 400 })
    }

    // JOE: Core request logic here. Should be appropriately named (Creating user, result should be named 'user')
    // const user = ...
    const result = null

    return NextResponse.json(result)
  } catch (error) {
    // JOE: Note the singular 'EXAMPLE'
    console.log('[EXAMPLE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
