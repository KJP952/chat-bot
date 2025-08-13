"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const [textInput, updateTextInput] = useState("");
  const [textHistory, updateTextHistory] = useState([]);

  async function handleSend() {
    updateTextHistory(prev => [...prev, { role: "user", content: textInput}]);

    const res = await fetch ("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: textInput })
    });

    const data = await res.json();

    updateTextHistory(prev => [...prev, { role: "assistant", content: data.reply }]);

    updateTextInput("");
  }

  return (
    <div>
      {textHistory.map((msg, i) => (
        <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}

      <input
        value={textInput}
        onChange={(e) => updateTextInput(e.target.value)}
        placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
    </div>
  );
}
