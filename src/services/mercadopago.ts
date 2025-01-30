import MercadoPagoConfig, { PreApproval } from 'mercadopago';

export const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});
export const createMercadoPagoSuscription = async (email: string, userId: string): Promise<string> => {
    const suscription = await new PreApproval(mercadopago).create({
        body: {
            back_url: 'https://authtestmp.loca.lt/profile',
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
    return suscription.init_point || '';
};
