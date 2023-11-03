// import React from 'react';
// import swr, { useSWR, useMutation } from 'swr';
// import { useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// export default function CheckoutButton() {
//     const router = useRouter();

//     // useSWR hook to fetch the Checkout Session from Stripe
//     const { data, error } = useSWR(
//         '/api/checkout_sessions',
//         async () => {
//             const session = await stripePromise.then(stripe => stripe.checkout.sessions.create({
//                 line_items: [
//                     {
//                         price: '{{PRICE_ID}}',
//                         quantity: 1,
//                     },
//                 ],
//                 mode: 'payment',
//                 successUrl: router.pathname,
//                 cancelUrl: router.pathname,
//             }));

//             return session;
//         }
//     );

//     // useMutation hook to create a Checkout Session and redirect the user to the Stripe Checkout page
//     const [mutate, mutating] = useMutation(async () => {
//         const session = await stripePromise.then(stripe => stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: '{{PRICE_ID}}',
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             successUrl: router.pathname,
//             cancelUrl: router.pathname,
//         }));

//         router.push(session.url);
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

// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );
// export default function PreviewPage() {
//     React.useEffect(() => {
//         // Check to see if this is a redirect back from Checkout
//         const query = new URLSearchParams(window.location.search);
//         if (query.get('success')) {
//             console.log('Order placed! You will receive an email confirmation.');
//         }

//         if (query.get('canceled')) {
//             console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
//         }
//     }, []);

//     return (
//         <form action="/api/checkout_sessions" method="POST">
//             <section>
//                 <button type="submit" role="link">
//                     Checkout
//                 </button>
//             </section>
//             <style jsx>
//                 {`
//           section {
//             background: #ffffff;
//             display: flex;
//             flex-direction: column;
//             width: 400px;
//             height: 112px;
//             border-radius: 6px;
//             justify-content: space-between;
//           }
//           button {
//             height: 36px;
//             background: #556cd6;
//             border-radius: 4px;
//             color: white;
//             border: 0;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//           }
//           button:hover {
//             opacity: 0.8;
//           }
//         `}
//             </style>
//         </form>
//     );
// }

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <form action="/api/checkout_sessions" method="POST">
            <section>
                <button type="submit" role="link">
                    Checkout
                </button>
            </section>
            <style jsx>
                {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
            </style>
        </form>
    );
}
