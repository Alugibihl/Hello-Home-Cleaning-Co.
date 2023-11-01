import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
export default function ResumeForm() {
    const [state, handleSubmit] = useForm("xyyqoqjv");
    if (state.succeeded) {
        return <p>Thank you for your interest in working with us. We will get back to you shortly!</p>;
    }
    return (
        <form
            className='w-full max-w-lg ml-6'
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xyyqoqjv"
            method="POST"
            enctype="multipart/form-data">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-s font-bold mb-2"
                    >
                        Full Name

                        <input
                            id="name"
                            type="name"
                            name="name"
                            required="true"
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                        />
                    </label>
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-s font-bold mb-2"
                    >
                        Email Address

                        <input
                            id="email"
                            type="email"
                            name="email"
                            required="true"
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                        />
                    </label>
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        htmlFor="phone"
                        className="block text-gray-700 text-s font-bold mb-2"
                    >
                        Phone Number

                        <input
                            required="true"
                            id="phone"
                            type="phone"
                            name="phone"
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                        />
                    </label>
                    <ValidationError
                        prefix="phone"
                        field="phone"
                        errors={state.errors} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2">
                        Resume
                        <textarea
                            required="true"
                            id="message"
                            name="message"
                            placeholder='Paste Resume'
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors} />
                    </label>
                </div>
            </div>
            {/* OTHER QUESTIONS / WORK RELATED Q  */}
            {/* <label for="resume">Resume
                <input
                    id="resume"
                    type="file"
                    name="resume"
                    />
                <ValidationError
                    prefix="Resume"
                    field="resume"
                    errors={state.errors}
                    />
                </label> */}
            <button className="mb-6 bg-blue-500 w-72 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={state.submitting}>
                Submit
            </button>

        </form>
    );
}
// Please fill out the form below and our agency will reach out to you within 2 business days to discuss the next steps.Feel free to contact us to follow up.
