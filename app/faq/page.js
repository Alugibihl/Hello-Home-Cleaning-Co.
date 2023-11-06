import React from 'react';
import Head from 'next/head';

const FaqPage = () => {
    return (
        <>
            <Head>
                <title>Hello Home Cleaning | Frequently Asked Questions</title>
            </Head>

            <main className="max-w-screen-xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mt-4 mb-8">Hello Home Cleaning FAQs</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: What are your cleaning rates?</h2>

                    <p>
                        A: Our cleaning rates vary depending on the size of your home and the scope of services you need.
                        However, we offer competitive rates and a variety of discounts for regular customers and military personnel.
                        To get a free quote, please contact us by phone or email.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: What cleaning products do you use?</h2>

                    <p>
                        A: We use eco-friendly cleaning products that are safe for your family and pets. We also avoid using harsh chemicals that could damage your furniture or surfaces.
                        If you have any specific concerns about the cleaning products we use, please let us know, and we{"'"}ll be happy to accommodate you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: Are you insured and bonded?</h2>

                    <p>
                        A: Yes, we are fully insured and bonded. You can rest assured that your home and belongings are protected while we{"'"}re cleaning.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: Do you offer a satisfaction guarantee?</h2>

                    <p>
                        A: Yes, we offer a 100% satisfaction guarantee. We{"'"}re not happy until you{"'"}re happy. If you{"'"}re not satisfied with our cleaning services for any reason, please let us know, and we{"'"}ll come back and reclean your home at no additional charge.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: How do I book a cleaning appointment?</h2>

                    <p>
                        A: To book a cleaning appointment, please contact us by phone or email. We{"'"}ll be happy to schedule a time that works for you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: Do you offer any special discounts?</h2>

                    <p>
                        A: Yes, we offer a variety of discounts for regular customers, military personnel, and seniors. Please contact us for more information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: Do you clean commercial properties?</h2>

                    <p>
                        A: Yes, we do clean commercial properties. Please contact us for a free quote.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: Do you offer any additional services?</h2>

                    <p>
                        A: Yes, we offer a variety of additional services, such as window cleaning, carpet cleaning, and upholstery cleaning. Please contact us for more information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold">Q: How can I contact you?</h2>

                    <p>
                        A: You can contact us by phone at <a href="tel:4192086265">(419) 208-6265</a> or by email at <a href="mailto: hellohomecleaningco@gmail.com">hellohomecleaningco@gmail.com</a>.
                    </p>
                </section>
            </main>
        </>
    );
};

export default FaqPage;
