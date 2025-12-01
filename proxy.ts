import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

    // Verificar si la ruta es pública
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Si es una ruta pública, permitir el acceso
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Para rutas protegidas, verificar la sesión
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // Si no hay sesión, redirigir a login
    if(!session) {
        const url = new URL("/login", request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Hacer match de todas las rutas excepto:
     * - /api (API routes)
     * - /_next/static (archivos estáticos)
     * - /_next/image (optimización de imágenes)
     * - /favicon.ico (favicon)
     * - /public (archivos públicos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};