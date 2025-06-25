import React, { useState, useEffect } from "react";
import axios from "axios";


const API_BASE = process.env.REACT_APP_API_BASE;
const RASA_BASE = process.env.RASA_API_BASE;

export default function Dashboard() {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [data, setData] = useState({ moods: [], goals: [], journals: [] });
    const [newMood, setNewMood] = useState("happy");
    const [newGoal, setNewGoal] = useState("");
    const [newJournal, setNewJournal] = useState("");
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [typing, setTyping] = useState(false);
    const [avatarMood, setAvatarMood] = useState("neutral");

    const [journalSearch, setJournalSearch] = useState("");
    const [filterMood, setFilterMood] = useState("all");

    const quickReplies = ["I feel good", "I'm tired", "Feeling anxious", "All is well"];
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const avatarEmoji = {
        happy: "😊",
        sad: "😢",
        tired: "😴",
        strong: "💪",
        glowing: "✨",
        neutral: "🙂"
    }[avatarMood];

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_BASE}/api/login/`, loginData);
            setToken(res.data.token);
            setIsAuthenticated(true);
        } catch {
            alert("Login failed. Please check your credentials.");
        }
    };

    const handleClearAll = async () => {
        if (window.confirm("Are you sure you want to delete all data?")) {
            try {
                await axios.post(`${API_BASE}/api/clear/`, {}, { headers });
                fetchData();
            } catch {
                alert("Failed to clear data.");
            }
        }
    };


    const fetchData = async () => {
        try {
            const [moodsRes, goalsRes, journalsRes] = await Promise.all([
                axios.get(`${API_BASE}/api/moods/`, { headers }),
                axios.get(`${API_BASE}/api/goals/`, { headers }),
                axios.get(`${API_BASE}/api/journals/`, { headers })
            ]);
            setData({
                moods: moodsRes.data,
                goals: goalsRes.data,
                journals: journalsRes.data
            });
            const latestMood = moodsRes.data.length
                ? moodsRes.data[moodsRes.data.length - 1].mood
                : "neutral";
            setAvatarMood(latestMood);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleAddMood = async () => {
        try {
            await axios.post(`${API_BASE}/api/moods/`, { mood: newMood }, { headers });
            setNewMood("happy");
            fetchData();
        } catch {
            alert("Failed to add mood entry.");
        }
    };

    const handleAddGoal = async () => {
        try {
            await axios.post(`${API_BASE}/api/goals/`, { goal_name: newGoal }, { headers });
            setNewGoal("");
            fetchData();
        } catch {
            alert("Failed to add goal.");
        }
    };

    const handleAddJournal = async () => {
        try {
            await axios.post(`${API_BASE}/api/journals/`, {
                content: newJournal,
                mood_tag: newMood
            }, { headers });
            setNewJournal("");
            fetchData();
        } catch {
            alert("Failed to add journal entry.");
        }
    };

    const handleChat = async (msg = chatInput) => {
        if (!msg.trim()) return;
        setChatHistory((prev) => [...prev, { sender: "user", message: msg }]);
        setChatInput("");
        setTyping(true);
        try {
            const res = await axios.post(`${RASA_BASE}/webhooks/rest/webhook`, {
                sender: "user",
                message: msg
            });

            const botReplies = res.data.map((r) => {
                if (r.image) {
                    return { sender: "bot", message: <img src={r.image} alt="cheer up" style={{ maxWidth: "100%", borderRadius: 8 }} /> };
                }
                return { sender: "bot", message: r.text };
            });

            setChatHistory((prev) => [...prev, ...botReplies]);
            if (msg.toLowerCase().includes("happy")) setAvatarMood("happy");
            if (msg.toLowerCase().includes("sad")) setAvatarMood("sad");
            if (msg.toLowerCase().includes("tired")) setAvatarMood("tired");
        } catch {
            setChatHistory((prev) => [...prev, { sender: "bot", message: "Bot is offline." }]);
        } finally {
            setTyping(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchData();
    }, [isAuthenticated]);

    const filteredJournals = [...data.journals]
        .reverse()
        .filter(j => filterMood === "all" || j.mood_tag === filterMood)
        .filter(j => j.content.toLowerCase().includes(journalSearch.toLowerCase()));

    if (!isAuthenticated) {
        return (
            <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                height: "100vh", background: "linear-gradient(to right, #4facfe, #00f2fe)",
                fontFamily: "Poppins, sans-serif", color: "#fff"
            }}>
                <h2>Login to Your Mental Health Dashboard</h2>
                <input placeholder="Username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} style={inputStyle} />
                <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} style={inputStyle} />
                <button onClick={handleLogin} style={{ ...inputStyle, backgroundColor: "#0288d1", color: "white", fontWeight: "bold", cursor: "pointer" }}>Login</button>
            </div>
        );
    }

    return (
        <div style={{
            padding: 30,
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(to bottom right, #e0f7fa, #cfd8dc)",
            minHeight: "100vh"
        }}>
            <div style={{ textAlign: "right", marginBottom: 10 }}>
                <strong>User: You</strong> | <button onClick={() => window.location.reload()} style={{ marginLeft: 10 }}>Logout</button>
            </div>

            <h1 style={{ textAlign: "center", color: "#0277bd" }}>🌿 Mental Health Dashboard</h1>
            <div style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 20 }}>
                Your Avatar: <span style={{ transition: "transform 0.3s ease", transform: typing ? "scale(1.2)" : "scale(1)" }}>{avatarEmoji}</span>
            </div>

            <section style={cardStyle}>
                <h2>📊 Mood Tracker</h2>
                <select value={newMood} onChange={(e) => setNewMood(e.target.value)} style={inputStyle}>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="tired">Tired</option>
                    <option value="strong">Strong</option>
                    <option value="glowing">Glowing</option>
                </select>
                <button
                    onClick={handleAddMood}
                    style={{
                        padding: "10px 20px",
                        background: "linear-gradient(to right, #ff9a9e, #fad0c4)", // soft pink to peach gradient
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontFamily: "Poppins, sans-serif",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                    😊 Add Mood
                </button>
                <ul>
                    {data.moods.map((m, idx) => (
                        <li key={idx}>{m.mood} – {m.date}</li>
                    ))}
                </ul>
            </section>

            <section style={cardStyle}>
                <h2>🎯 Goals</h2>
                <input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Your Goal..." style={inputStyle} />
                <button
                    onClick={handleAddGoal}
                    style={{
                        padding: "10px 20px",
                        background: "linear-gradient(to right, #43e97b, #38f9d7)", // green to aqua gradient
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontFamily: "Poppins, sans-serif",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                    🎯 Add Goal
                </button>
                <ul>
                    {data.goals.map((g, idx) => (
                        <li key={idx}>{g.goal_name} – {g.date}</li>
                    ))}
                </ul>
            </section>

            <section style={cardStyle}>
                <h2>📘 Journals</h2>
                <textarea value={newJournal} onChange={(e) => setNewJournal(e.target.value)} placeholder="Write your thoughts..." style={{ ...inputStyle, width: "100%", height: 60 }} />
                <button
                    onClick={handleAddJournal}
                    style={{
                        padding: "10px 20px",
                        background: "linear-gradient(to right, #4facfe, #00f2fe)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontFamily: "Poppins, sans-serif",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                    ✍️ Add Journal
                </button>

                <div style={{ margin: "20px 0" }}>
                    <input value={journalSearch} onChange={(e) => setJournalSearch(e.target.value)} placeholder="Search journals..." style={{ ...inputStyle, width: "70%" }} />
                    <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)} style={inputStyle}>
                        <option value="all">All Moods</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="tired">Tired</option>
                        <option value="strong">Strong</option>
                        <option value="glowing">Glowing</option>
                    </select>
                </div>

                {filteredJournals.length === 0 && <p>No matching journal entries.</p>}
                {filteredJournals.map((j, idx) => {
                    const formattedDate = new Date(j.date).toLocaleString("en-US", {
                        dateStyle: "long",
                        timeStyle: "short"
                    });
                    return (
                        <div key={idx} style={{
                            background: "#fff", padding: "15px", marginBottom: "15px",
                            borderRadius: "10px", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)"
                        }}>
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", marginBottom: "8px"
                            }}>
                                <span style={{ fontWeight: "bold", fontSize: "16px" }}>{formattedDate}</span>
                                <span style={{
                                    backgroundColor: "#e0f7fa", color: "#00796b",
                                    padding: "3px 8px", borderRadius: "6px", fontSize: "12px"
                                }}>{j.mood_tag}</span>
                            </div>
                            <p style={{ fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                                {j.content}
                            </p>
                        </div>
                    );
                })}
            </section>

            <section style={cardStyle}>
                <h2>💬 Chat with MindBuddy</h2>
                <div style={{ height: 200, overflowY: "auto", background: "#f9f9f9", padding: 10, marginBottom: 10, border: "1px solid #ccc", borderRadius: 6 }}>
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: 8 }}>
                            <div style={{
                                background: msg.sender === "user" ? "#d1e7ff" : "#e6ffe6",
                                padding: 8, borderRadius: 6, display: "inline-block", maxWidth: "80%"
                            }}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                    {typing && <div style={{ color: "gray" }}><em>Bot is typing...</em></div>}
                </div>
                <div>
                    {quickReplies.map((text, idx) => (
                        <button key={idx} onClick={() => handleChat(text)} style={{ margin: 4, padding: "5px 10px", background: "#eee", border: "none", borderRadius: 5 }}>{text}</button>
                    ))}
                </div>
                <div style={{ marginTop: 10 }}>
                    <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleChat()}
                        placeholder="Type a message..."
                        style={{ padding: 10, width: "80%", marginRight: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                    <button onClick={handleChat} style={{ padding: 10, borderRadius: 6 }}>Send</button>
                </div>
            </section>
                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <button
                        onClick={handleClearAll}
                        style={{
                            padding: "10px 20px",
                            background: "#ef5350",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "6px",
                            fontFamily: "Poppins, sans-serif",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            cursor: "pointer"
                        }}
                    >
                        🧹 Clear All Entries
                    </button>
                </div>
        </div>
    );
}

const cardStyle = {
    background: "linear-gradient(to bottom right, #ffffffcc, #e0f7fac0)", // translucent soft gradient
    backdropFilter: "blur(10px)", // frosted glass effect
    padding: 20,
    marginBottom: 30,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0"
};


const inputStyle = {
    padding: 10,
    margin: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontFamily: "Poppins, sans-serif"
};
