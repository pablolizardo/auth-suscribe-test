import { PreApproval } from "mercadopago";
// import { MercadoPagoResponse } from "mercadopago/utils/mercadopago-respose";
import { NextResponse } from "next/server";
import { mercadopago } from "src/services/mercadopago";
import { suscribeUser } from "src/services/suscription";

// type MercadoPagoWebHookResponse = {
//   action: string | 'updated',
//   application_id: string,
//   data: { id: string },
//   date: string,
//   entity: string | 'preapproval',
//   id: string,
//   type: string | 'subscription_preapproval' | 'payment',
//   version: number
// };

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Obtener datos del cuerpo de la petición
    console.log(body, { depth: null });
    if (body.type === 'subscription_preapproval') {
      const preapproval = await new PreApproval(mercadopago).get({ id: body.data.id });
      if (preapproval.status === 'approved' || preapproval.status === 'authorized') {
        const userId = preapproval.external_reference as string;
        await suscribeUser(userId);
      }
    }

    return NextResponse.json(
      { message: "Solicitud recibida" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Error procesando la solicitud", e },
      { status: 400 },
    );
  }
}

// export function GET() {
//   return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
// }

export function PUT() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}
