import { NextResponse } from "next/server";
import { suscribeUser } from "src/services/suscription";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Obtener datos del cuerpo de la petición
    const userId = body.userId;

    await suscribeUser(userId);

    return NextResponse.json(
      { message: "Solicitud recibida", userId },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Error procesando la solicitud", e },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}
