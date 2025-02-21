import 'server-only';
import { User } from "@prisma/client";
import { PreApproval } from "mercadopago";
// import { MercadoPagoResponse } from "mercadopago/utils/mercadopago-respose";
import { NextResponse } from "next/server";
import { mercadopago } from "src/services/mercadopago";
import { updateSession } from "src/services/session";
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
    const suscription = await req.json(); // Obtener datos del cuerpo de la petición
    // console.dir('0️⃣ suscription.action');
    // console.dir(suscription.action);

    if (suscription.action === 'updated') {
      console.log('1️⃣ suscription beign created 📝')
      return NextResponse.json({ message: "1️⃣ suscription beign created" }, { status: 200 },);
    }
    if (!suscription.action) {
      if (suscription.status === "authorized" && suscription.status === 'approved') {
        console.log('2️⃣ suscription beign authorized 💳')
        return NextResponse.json({ message: "2️⃣ suscription beign authorized" }, { status: 200 },);
      }
    }
    if (suscription.action === 'created') {
      if (suscription.entity === 'authorized_payment' &&
        suscription.type === 'subscription_authorized_payment') {
        console.log('3️⃣ payed 🎉!')
        return NextResponse.json({ message: "3️⃣ payed!" }, { status: 200 },);
      }
    }
    return NextResponse.json({ message: "4️⃣ suscription not found" }, { status: 200 },);


    // if (body.type === 'subscription_preapproval') {
    //   const preapproval = await new PreApproval(mercadopago).get({ id: body.data.id });
    //   console.dir('2️⃣ preapproval');
    //   console.dir(preapproval);
    //   if (preapproval.status === 'approved' || preapproval.status === 'authorized') {
    //     const userId = preapproval.external_reference as string;
    //     const updatedUser = await suscribeUser(userId);
    //     console.dir('3️⃣ updatedUser');
    //     console.dir(updatedUser);
    //     updateSession(updatedUser as User);
    //   }
    // }


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
