import MercadoPagoConfig, { PreApproval } from 'mercadopago';
import { redirect } from 'next/navigation';

export const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});

export const handleCreateMercadoPagoSuscription = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const userId = formData.get('userId') as string;
    const suscription = await createMercadoPagoSuscription(email, userId);
    redirect(suscription);
};

export const createMercadoPagoSuscription = async (email: string, userId: string): Promise<string> => {
    'use server';
    const suscription = await new PreApproval(mercadopago).create({
        body: {
            back_url: 'https://authtestmp.loca.lt/success',
            reason: 'Suscripción mensual',
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: 1000,
                currency_id: 'ARS',
            },
            payer_email: email,
            external_reference: userId,
            status: 'pending',
        },
    });
    return suscription.init_point as string;
};
