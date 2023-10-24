// import FormData from 'form-data'
// import Mailgun from 'mailgun.js'
import { NextResponse } from "next/server";

export async function POST(request, res) {
    //     const API_KEY = process.env.MAILGUN_API_KEY || ''
    //     const DOMAIN = process.env.MAILGUN_DOMAIN || ''
    //     console.log('Data', req.body)

    //     const mailgun = new Mailgun(FormData)
    //     const client = mailgun.client({ username: 'api', key: API_KEY })
    //     const {
    //         firstName,
    //         lastName,
    //         phone,
    //         email,
    //         location,
    //         desiredService,
    //         squareFootage
    //     } = await request.json();

    //     const messageData = {
    //         from: 'Request a Quote  <>',
    //         to: 'locopaco77@hotmail.com',
    //         subject: 'New Contact Form!',
    //         text: `Hello,

    //         You have a new request for a quote  from: ${firstName} ${lastName}
    //         Contact information ${email} ${phone}
    //         Request Service: ${desiredService} Size :${squareFootage}
    //         Location: ${location}`
    //         ,
    //     }

    //     try {
    //         const emailRes = await client.messages.create(DOMAIN, messageData)
    //         console.log(emailRes)
    //     } catch (err) {
    //         console.error('Error sending email', err)
    //     }

    //     res.status(200).json({ submitted: true })
    console.log(firstName,
        lastName,
        phone,
        email,
        location,
        desiredService,
        squareFootage)
    return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 });
};
// }
