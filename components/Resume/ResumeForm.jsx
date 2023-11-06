import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
export default function ResumeForm({ close, modalFunctions }) {
    const [state, handleSubmit] = useForm("xyyqoqjv");
    if (state.succeeded) {

        setTimeout(() => {
            close(false);
        }, "2000");
        return (
            <div className='flex justify-center items-center'>
                <p className='font-serif text-lg text-center'>
                    Thank you for your interest in working with us.
                    <br></br> We will get back to you shortly!
                </p>
            </div>
        );

    }
    return (
        <div className='flex flex-col'>
            <form
                className='session-form'
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xyyqoqjv"
                method="POST"
            // enctype="multipart/form-data"
            >
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-s font-bold"
                        >
                            Full Name
                            <input
                                id="name"
                                type="name"
                                name="name"
                                required={true}
                                className="appearance-none w-72 block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                            />
                        </label>
                        {/* <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors} /> */}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
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
                                required={true}
                                className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                            />
                        </label>
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 text-s font-bold mb-2"
                        >
                            Phone Number

                            <input
                                required={true}
                                id="phone"
                                type="phone"
                                name="phone"
                                className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                            />
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                        <label
                            className="block text-gray-700 text-s font-bold mb-2">
                            Resume
                            <textarea
                                required={true}
                                id="message"
                                name="message"
                                wrap='soft'
                                placeholder='Paste Resume'
                                className="resize-none h-28 appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </label>
                    </div>
                </div>
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
                <button className=" mb-6 bg-blue-500 w-72 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={state.submitting}>
                    Submit
                </button>

            </form >
        </div>
    );
}
{/* OTHER QUESTIONS / WORK RELATED Q  */ }
// Please fill out the form below and our agency will reach out to you within 2 business days to discuss the next steps.Feel free to contact us to follow up.
