import React, { useState } from "react";
import { BASE_URL } from "./config.js";

export default function UpdateContact() {
    const [originalName, setOriginalName] = useState(""); // the name to update
    const [contactName, setContactName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [responseMsg, setResponseMsg] = useState("");

    const handleUpdateContact = async (e) => {
        e.preventDefault();
        setResponseMsg("");

        if (!originalName.trim()) {
            setResponseMsg("You must enter the existing contact name to update.");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/contacts/${originalName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contact_name: contactName || undefined,
                    phone_number: phoneNumber || undefined,
                    message: message || undefined,
                    image_url: imageUrl || undefined,
                }),
            });

            const data = await res.json().catch(() => null);

            if (res.status === 200) {
                setResponseMsg(`Contact '${originalName}' updated successfully!`);
                setContactName("");
                setPhoneNumber("");
                setMessage("");
                setImageUrl("");
                setOriginalName("");
            } else {
                setResponseMsg(data?.message || "Failed to update contact.");
            }

        } catch (error) {
            console.log("PUT error:", error);
            setResponseMsg("Network error: Could not connect to server.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Update Contact</h2>

            <form onSubmit={handleUpdateContact}>
                <input
                    type="text"
                    placeholder="Existing Contact Name"
                    value={originalName}
                    onChange={(e) => setOriginalName(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Contact Name (optional)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Phone Number (optional)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New Image URL (optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <br /><br />

                <button type="submit">Update Contact</button>
            </form>

            {responseMsg && (
                <p style={{ marginTop: "15px", color: "blue" }}>{responseMsg}</p>
            )}
        </div>
    );
}