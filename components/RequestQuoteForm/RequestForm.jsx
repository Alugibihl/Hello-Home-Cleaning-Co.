"use client"
import { useState } from "react"

export default function RequestQuoteForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [desiredService, setDesiredService] = useState('')
    const [squareFootage, setSquareFootage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/requestQuote', {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone,
                    email,
                    location,
                    desiredService,
                    squareFootage
                }),
                headers: {
                    'Content-type': "application/json"
                }
            })

        } catch (error) {
            console.log('error', error)

        }

    }

    return (
        <form onSubmit={onSubmit}>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
            />
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
            />
            <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Location"
            />
            <select className="text-color-black" id="desiredService" name="desiredService"
                value={desiredService}
                onChange={(e) => setDesiredService(e.target.value)}>
                <option disabled value="Cleaning1">Desired Service</option>
                <option value="Cleaning1">Cleaning 1</option>
                <option value="Cleaning2">Cleaning 2</option>
                <option value="Cleaning3">Cleaning 3</option>
            </select>
            <input
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                type="text"
                placeholder="Square Footage"
            />
            <button type="submit">Request a Quote Now</button>



        </form>

    )

}
