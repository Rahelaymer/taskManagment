import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const role = request.nextauth.token?.role;
    const pathname = request.nextUrl.pathname;

    // Mapping roles to paths
    const rolePaths: { [key: string]: string } = {
      Admin: '/dashboard/admin',
      Imaging: '/dashboard/laboratory',
      Lab: '/dashboard/laboratory',
      Doctor: '/dashboard/doctor',
      'Allied HP': '/dashboard/doctor',
      company: '/dashboard/company',
      Pharmacy: '/dashboard/pharmacy',
      Patient: '/dashboard/patient',
    };

    // Check if the user is trying to access a path that matches their role
    const isAuthorized = Object.entries(rolePaths).some(
      ([roleKey, path]) => role === roleKey && pathname.startsWith(path)
    );

    // If not authorized, redirect to a denied page or another appropriate page
    if (!isAuthorized) {
      return NextResponse.rewrite(new URL('/dashboard/denied', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
