import React, { useState } from "react";
import { BASE_URL } from "./config.js";

export default function ViewContact() {
    const [searchName, setSearchName] = useState("");
    const [contact, setContact] = useState(null);
    const [responseMsg, setResponseMsg] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        setContact(null);

        if (!searchName.trim()) {
            setResponseMsg("Please enter a contact name.");
            return;
        }

        try {
            const urlName = encodeURIComponent(searchName);

            const res = await fetch(`${BASE_URL}/contacts/${urlName}`);

            const data = await res.json().catch(() => null);

            if (res.status === 200) {
                setContact(data);
            } else {
                setResponseMsg(data?.message || "Contact not found.");
            }

        } catch (error) {
            console.log("GET one contact error:", error);
            setResponseMsg("Network error: Could not connect to the server.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>View Contact Details</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter Contact Name (e.g., Tony Stark)"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button type="submit" style={{ marginLeft: "10px" }}>
                    Search
                </button>
            </form>

            {responseMsg && (
                <p style={{ marginTop: "15px", color: "red" }}>{responseMsg}</p>
            )}

            {contact && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray" }}>
                    <h3>{contact.contact_name}</h3>
                    <p><strong>Phone:</strong> {contact.phone_number}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <p><strong>Image URL:</strong> {contact.image_url}</p>

                    {contact.image_url && (
                        <img 
                            src={contact.image_url}
                            alt={contact.contact_name}
                            style={{ width: "200px", marginTop: "10px" }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}