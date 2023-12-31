import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { title } = await req.json()
        if (!userId) {
            return new NextResponse("UnAuthorised", { status: 401 })
        }

        const course = await db.course.create({ data: { userId, title } })
        return NextResponse.json(course)
    } catch (error) {
        console.log("[Courses post]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
    
}