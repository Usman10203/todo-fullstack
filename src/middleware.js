// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log("middleware executed");
    const { pathname } = request.nextUrl;


    if (pathname === '/api/auth/signin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

}

export const config = {
    matcher: ['/api/auth/signin'],
};
