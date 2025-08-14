"use client";
import styles from "./page.module.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {

  const [textInput, updateTextInput] = useState("");
  const [textHistory, updateTextHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    updateTextHistory(prev => [...prev, { role: "user", content: textInput}]);

    updateTextInput("");

    setLoading(true);

    const res = await fetch ("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: textInput })
    });

    const data = await res.json();

    updateTextHistory(prev => [...prev, { role: "bot", content: data.reply }]);

    setLoading(false);
  }

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatBox}>
        <div className={styles.chatHistory}>
          {textHistory.map((msg, i) => (
            <div
              key={i}
              className={`${styles.messageRow} ${
                msg.role === "user" ? styles.userRow : styles.botRow
              }`}
            >
              {msg.role !== "user" && (
                <div className={styles.botIcon}>🤖</div>
              )}
              <div
                className={
                  msg.role === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.role === "user"
                  ? msg.content
                  : <ReactMarkdown>{msg.content}</ReactMarkdown>
                }
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.messageRow} ${styles.botRow}`}>
              <div className={styles.botIcon}>🤖</div>
              <div className={styles.botMessage}>
                <em>Thinking...</em>
              </div>
            </div>
          )}
        </div>

        <div className={styles.inputArea}>
          <input
            value={textInput}
            onChange={(e) => updateTextInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
    </div>
  </div>
</div>


  );
}
