"use client"
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const container = "mx-auto w-4/5 text-center bg-#f2f6fc text-#333 mb-3"
const Title = "font-2rem font-bold text-333"
const paragraph = "font-1rem text-666"
const list = "list-none p-0"
const listItem = "mb-0.5rem"
const Button = "bg-blue-300 text-white py-0.5rem px-1rem rounded cursor-pointer mb-2"
const AboutPage = () => {
    const router = useRouter()


    const quote = () => {
        return router.push("/appointments/create")
    }
    return (
        <div className={container}>
            <Head>
                <title className={Title}>Hello Home Cleaning | About Us</title>
            </Head>

            <div className={paragraph}>
                <h1>About Hello Home Cleaning</h1>

                <p>At Hello Home Cleaning, we believe that everyone deserves to live in a clean and tidy home. That's why we offer a wide range of cleaning services to fit your needs and budget. Whether you're looking for a one-time deep clean or regular weekly or biweekly service, we'll help you keep your home sparkling clean.</p>

                <p>Our team of experienced and professional cleaners is dedicated to providing you with the best possible service. We use eco-friendly cleaning products and equipment to ensure that your home is clean and safe for your family and pets. We also offer a satisfaction guarantee, so you can rest assured that you'll be happy with our work.</p>

                <h2>Why Choose Hello Home Cleaning?</h2>

                <ul className={list}>
                    <li className={listItem}>We're reliable and trustworthy. We show up on time and complete the job to your satisfaction.</li>
                    <li className={listItem}>We're insured and bonded. You can rest assured that your home and belongings are protected.</li>
                    <li className={listItem}>We use eco-friendly cleaning products and equipment. We care about your health and the environment.</li>
                    <li className={listItem}>We offer a satisfaction guarantee. We're not happy until you're happy.</li>
                </ul>

                <h2>Our Services</h2>

                <ul className={list}>
                    <li className={listItem}>One-time deep clean</li>
                    <li className={listItem}>Weekly or biweekly service</li>
                    <li className={listItem}>Move-in/move-out cleaning</li>
                    <li className={listItem}>Spring cleaning</li>
                    <li className={listItem}>Holiday cleaning</li>
                    <li className={listItem}>Window cleaning</li>
                    <li className={listItem}>Carpet cleaning</li>
                    <li className={listItem}>Upholstery cleaning</li>
                </ul>

                <button className={Button} onClick={quote}>Get a Free Quote Today!</button>
            </div>
        </div >
    );
};

export default AboutPage;
