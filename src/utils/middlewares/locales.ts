import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextFetchEvent, } from 'next/server';
import { MiddlewareFactory } from './middlewareFactoryType';
 
const localesMiddleware = createMiddleware(routing);

export const localesMiddlewareFactory: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (new RegExp('^(?!(\/(?:api|trpc|_next|_vercel|images|favicon.ico))\/?).*').test(pathname)) {
      return localesMiddleware(request)
    }
    return next(request, _next);
  };
}