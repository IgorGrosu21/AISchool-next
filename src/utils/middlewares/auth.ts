import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { createToken } from "@/app/actions/token";
import { MiddlewareFactory } from './middlewareFactoryType';

export const authMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const response = (await next(request, _next)) as NextResponse | undefined | null | void

    if (pathname.includes('/core')) {
      const access = request.cookies.get('access_token')?.value;
      const refresh = request.cookies.get('refresh_token')?.value;

      if (!refresh) {
        return NextResponse.redirect(new URL(`${pathname.split('/')[0]}/auth`, request.url))
      }
      if (!access) {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_HOST_PROD}/auth/refresh/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'refresh': refresh
          })
        })
        const data = await refreshResponse.json()
        
        if (data.access) {
          const token = await createToken('access', data.access)
          if (response) {
            response.cookies.set(token);
          }
        }
      }
    }
    return response;
  };
};