import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const evaluateAndRedirect = (req: NextRequest) => {
    const login = `/auth/login?p=${req.nextUrl.pathname}`
    return NextResponse.redirect(new URL(login, req.url));
}

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const path = req.nextUrl.pathname

    if (!session && path.startsWith('/membership/select')) return evaluateAndRedirect(req);

    return NextResponse.next();
}

export const config = {
    matcher: ['/membership/select']
};
