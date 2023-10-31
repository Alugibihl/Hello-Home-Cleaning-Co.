import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
export default function ResumeForm() {
    const [state, handleSubmit] = useForm("xyyqoqjv");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
        <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xyyqoqjv"
            method="POST"
            enctype="multipart/form-data"

        >
            <label htmlFor="email">
                Email Address
            </label>
            <input
                id="email"
                type="email"
                name="email"
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
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
            <textarea
                id="message"
                name="message"
            />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
                Submit
            </button>

        </form>
    );
}
