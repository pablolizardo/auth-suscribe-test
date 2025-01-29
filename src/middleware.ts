import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "Unknown";

  // Crear la respuesta y setear el header
  const response = NextResponse.next();
  response.headers.set("X-Country", country);

  console.log(country);

  return response;
}

export const config = {
  matcher: "/:path*", // Aplica a todas las rutas
};
