import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { NextResponse } from "next/server";

export async function POST(req, res) {

    const API_KEY = process.env.MAILGUN_API_KEY || ''
    const DOMAIN = process.env.MAILGUN_DOMAIN || ''

    const mailgun = new Mailgun(FormData)
    const client = mailgun.client({ username: 'api', key: API_KEY })
    const {
        firstName,
        lastName,
        phone,
        email,
        location,
        desiredService,
        squareFootage
    } = await req.json();

    const messageData = {
        from: 'Request a Quote  <mailgun@sandbox-123.mailgun.org>',
        to: 'locopaco777@hotmail.com',
        subject: 'New Request a Appointment Form!',
        text: `Hello,

            You have a new request for a quote  from: ${firstName} ${lastName}
            Contact information ${email} ${phone}
            Request Service: ${desiredService} Size :${squareFootage}
            Location: ${location}`
        ,
    }
    try {
        const emailRes = await client.messages.create(DOMAIN, messageData)
    } catch (err) {
        console.error('Error sending email', err)
    }

    return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 });
};
