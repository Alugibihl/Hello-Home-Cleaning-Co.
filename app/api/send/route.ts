import { EmailTemplate } from '../../../components/EmailForwarding/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json()

        const { userEmail: email, name } = body
        const data = await resend.emails.send({
            from: 'Hello Home Cleaning Co. <francisco@franciscojpalacios.com>',
            to: email,
            subject: 'Hello world',
            react: EmailTemplate({ firstName: name }),
        });

        // if (data.status === 'success') {

        return NextResponse.json(data);
        // }
    } catch (error) {
        return NextResponse.json({ error });
    }
}
