import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

// JOE: Request type followed here
// JOE: ERR status codes must be followed strictly
export async function POST(req: Request) {
  try {
    // JOE: Order: Auth -> Params -> Pre-logic -> Core-logic -> Transaction Success/Failed
    const { userId } = auth()
    const body = await req.json()

    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    // JOE: Core request logic here. Should be appropriately named (Creating user, result should be named 'user')
    // const user = ...
    const result = null

    return NextResponse.json(result)
  } catch (error) {
    // JOE: Add [REQUEST_REQUESTTYPE] to ALL API errors
    console.log('[EXAMPLES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

/// put get / delete / update below