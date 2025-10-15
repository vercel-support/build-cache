import { NextRequest, NextResponse } from 'next/server';
 
export default async function middleware(request: NextRequest) {
    try{
     console.log(request.nextUrl)
     console.log(request.url)
     if (request.nextUrl.pathname.startsWith('/auth')) {
      console.log("test")
     }
        const response = await fetch(request.nextUrl);
        console.log(response.url);
        return NextResponse.next();
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
