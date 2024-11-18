import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect ,request}, next) => {
    //const isLoggedIn = false;
    const session = await getSession(request);
    const isLoggedIn = !!session;

    // TODO:
    locals.isLoggedIn = isLoggedIn;
    locals.user = null;
    locals.isAdmin = false;

  
    if (isLoggedIn) {
      // TODO:
      locals.user = {                
        email: session.user?.email!,
        name: session.user?.name!,        
      };
    }
    locals.isAdmin = session?.user?.role === 'admin';
  
  
    if (!locals.isAdmin && url.pathname.startsWith('/dashboard')) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);
