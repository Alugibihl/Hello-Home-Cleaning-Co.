import { EmailConfirmation } from '../../../components/EmailForwarding/email-template';
import { NextResponse } from 'next/server';
import { OwnerConfirmation } from "../../../components/EmailForwarding/OwnerConfir/OwnerConfirmation"
import { ApprovedRequest } from "../../../components/EmailForwarding/ApprovedRequest/ApprovedReqest"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json()

        const { name, userEmail: email, confirmBooking } = body

        if (confirmBooking) {

            const data = await resend.emails.send({
                from: 'Hello Home Cleaning Co. <francisco@franciscojpalacios.com>',
                to: email,
                subject: 'Booking Approved',
                react: <ApprovedRequest firstName={name} />,
            });
            return NextResponse.json(data);
        } else {

            const data = await resend.emails.send({
                from: 'Hello Home Cleaning Co. <francisco@franciscojpalacios.com>',
                to: email,
                subject: 'Booking Reqeust Received ',
                react: <EmailConfirmation firstName={name} />,
            });
            const owner = await resend.emails.send({
                from: 'Hello Home Cleaning Co. <francisco@franciscojpalacios.com>',
                to: "locopaco777@hotmail.com",
                subject: 'New Booking Request',
                react: <OwnerConfirmation firstName={name} />,
            });
            return NextResponse.json(data);
        }

        // if (data.status === 'success') {

        // }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error });
    }
}
