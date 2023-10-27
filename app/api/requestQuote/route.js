import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { NextResponse } from "next/server";

export async function POST(req, res) {

    const API_KEY = process.env.MAILGUN_API_KEY || ''
    const DOMAIN = process.env.MAILGUN_DOMAIN || ''
    console.log('Data...', req.body)

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
    // console.log(messageData, 'MessageData')
    try {
        const emailRes = await client.messages.create(DOMAIN, messageData)
        // console.log('emailRes:', emailRes)
    } catch (err) {
        console.error('Error sending email', err)
    }

    return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 });
};

// console.log(firstName,
//     lastName,
//     phone,
//     email,
//     location,
//     desiredService,
//     squareFootage)
// return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 });
// // }
// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });

// mg.messages.create('sandbox-123.mailgun.org', {
//     from: "Excited User <mailgun@sandbox-123.mailgun.org>",
//     to: ["test@example.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
//     .then(msg => console.log(msg)) // logs response data
//     .catch(err => console.log(err)); // logs any error
