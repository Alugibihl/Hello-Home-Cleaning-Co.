// import { useSWR, useMutation } from 'swr';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default function handler() {
//     // useSWR hook to fetch the Checkout Session from Stripe
//     const { data, error } = useSWR(
//         '/api/checkout_sessions',
//         async () => {
//             const session = await stripe.checkout.sessions.create({
//                 line_items: [
//                     {
//                         price: '{{PRICE_ID}}',
//                         quantity: 1,
//                     },
//                 ],
//                 mode: 'payment',
//                 successUrl: window.location.origin,
//                 cancelUrl: window.location.origin,
//             });

//             return session;
//         }
//     );

//     // useMutation hook to create a Checkout Session and redirect the user to the Stripe Checkout page
//     const [mutate, mutating] = useMutation(async () => {
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: '{{PRICE_ID}}',
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             successUrl: window.location.origin,
//             cancelUrl: window.location.origin,
//         });

//         window.location.href = session.url;
//     });

//     // Show an error message if there is an error
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     // Show a loading spinner if the Checkout Session is being fetched
//     if (!data && !mutating) {
//         return <div>Loading...</div>;
//     }

//     // Show the Checkout button if the Checkout Session is ready
//     if (data && !mutating) {
//         return (
//             <button type="submit" role="link" onClick={mutate}>
//                 Checkout
//             </button>
//         );
//     }

//     // Hide the Checkout button if the Checkout Session is being created
//     if (mutating) {
//         return <div>Creating Checkout Session...</div>;
//     }
// }

// import { useRouter } from 'next/navigation';
// import Stripe from 'stripe';

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // sucess url and cancel url is where they will be redirected to upon successful payment or unsuccessful payment
// export default async function handler(req, res) {
//     const router = useRouter()
//     if (req.method === 'POST') {
//         try {
//             // Create Checkout Sessions from body params.
//             const session = await stripe.checkout.sessions.create({
//                 line_items: [
//                     {
//                         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                         price: '{{PRICE_ID}}',
//                         quantity: 1,
//                     },
//                 ],
//                 mode: 'payment',
//                 successUrl: router.pathname,
//                 cancelUrl: router.pathname,
//                 // success_url: `${req.headers.origin}/?success=true`,
//                 // cancel_url: `${req.headers.origin}/?canceled=true`,
//             });
//             res.redirect(303, session.url);
//         } catch (err) {
//             res.status(err.statusCode || 500).json(err.message);
//         }
//     } else {
//         res.setHeader('Allow', 'POST');
//         res.status(405).end('Method Not Allowed');
//     }
// }

import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1O85RcQrAbe7T8q62gVGsCTb',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
