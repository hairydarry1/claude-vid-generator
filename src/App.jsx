import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:ital,wght@0,400;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0f;
    color: #e8e4d9;
    font-family: 'Syne', sans-serif;
  }

  .container {
    min-height: 100vh;
    background: #0a0a0f;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .container::before {
    content: '';
    position: fixed;
    top: -30%;
    left: -20%;
    width: 70%;
    height: 70%;
    background: radial-gradient(ellipse, rgba(255,100,50,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .container::after {
    content: '';
    position: fixed;
    bottom: -20%;
    right: -20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(ellipse, rgba(80,120,255,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
    position: relative;
    z-index: 1;
  }

  .eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #ff6432;
    margin-bottom: 16px;
    opacity: 0.9;
  }

  h1 {
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #e8e4d9 30%, #888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h1 span {
    background: linear-gradient(135deg, #ff6432, #ffb347);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #555;
    font-size: 14px;
    margin-top: 16px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.05em;
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 32px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 4px;
    width: 100%;
    max-width: 720px;
    position: relative;
    z-index: 1;
  }

  .tab {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 9px;
    background: transparent;
    color: #555;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab.active {
    background: rgba(255,100,50,0.15);
    color: #ff6432;
    border: 1px solid rgba(255,100,50,0.2);
  }

  .card {
    width: 100%;
    max-width: 720px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 36px;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #ff6432;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  .input-group { margin-bottom: 20px; }

  textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 16px;
    color: #e8e4d9;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    resize: vertical;
    min-height: 100px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.6;
  }

  textarea:focus { border-color: rgba(255,100,50,0.4); }
  textarea::placeholder { color: #333; }

  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  @media (max-width: 600px) {
    .controls { grid-template-columns: 1fr 1fr; }
  }

  select {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px 14px;
    color: #e8e4d9;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  select:focus { border-color: rgba(255,100,50,0.4); }
  select option { background: #111; }

  .btn-row { display: flex; gap: 10px; }

  .generate-btn {
    flex: 1;
    padding: 18px;
    background: linear-gradient(135deg, #ff6432, #ff4020);
    border: none;
    border-radius: 12px;
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s;
  }

  .generate-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(255,100,50,0.3);
  }

  .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .regen-btn {
    padding: 18px 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #e8e4d9;
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .regen-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.1);
    transform: rotate(180deg);
  }

  .regen-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .loading-dots { display: inline-flex; gap: 4px; align-items: center; }

  .dot {
    width: 6px; height: 6px;
    background: white;
    border-radius: 50%;
    animation: bounce 1.2s infinite;
  }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-6px); opacity: 1; }
  }

  .result-card {
    margin-top: 24px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: rgba(255,100,50,0.05);
  }

  .result-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #ff6432;
  }

  .result-actions { display: flex; gap: 8px; align-items: center; }

  .icon-btn {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 6px 10px;
    color: #888;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .icon-btn:hover { background: rgba(255,255,255,0.12); color: #e8e4d9; }
  .icon-btn.active { background: rgba(255,200,50,0.15); border-color: rgba(255,200,50,0.3); color: #ffc832; }

  .copy-btn {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 6px 14px;
    color: #e8e4d9;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.05em;
  }

  .copy-btn:hover { background: rgba(255,255,255,0.12); }
  .copy-btn.copied { background: rgba(100,220,100,0.1); border-color: rgba(100,220,100,0.3); color: #6dc; }

  .sections { display: flex; flex-direction: column; }

  .prompt-section {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .prompt-section:last-child { border-bottom: none; }
  .prompt-section-left { flex: 1; }

  .prompt-section-title {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #666;
    font-family: 'DM Mono', monospace;
    margin-bottom: 6px;
  }

  .prompt-section-content {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    line-height: 1.7;
  }

  .section-copy {
    background: none;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 4px 8px;
    color: #444;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    margin-top: 2px;
    font-family: 'DM Mono', monospace;
  }

  .section-copy:hover { color: #e8e4d9; border-color: rgba(255,255,255,0.2); }
  .section-copy.copied { color: #6dc; border-color: rgba(100,220,100,0.3); }

  .error-msg {
    color: #ff6464;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    padding: 14px;
    background: rgba(255,50,50,0.06);
    border: 1px solid rgba(255,50,50,0.15);
    border-radius: 10px;
    margin-top: 16px;
  }

  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }

  .chip {
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03);
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: #888;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }

  .chip:hover { border-color: rgba(255,100,50,0.4); color: #ff6432; background: rgba(255,100,50,0.05); }

  .history-empty {
    text-align: center;
    padding: 60px 20px;
    color: #333;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    line-height: 2;
    white-space: pre-line;
  }

  .history-list { display: flex; flex-direction: column; gap: 12px; }

  .history-item {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .history-item:hover { border-color: rgba(255,100,50,0.2); background: rgba(255,100,50,0.03); }
  .history-item.favorited { border-color: rgba(255,200,50,0.15); }

  .history-item-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .history-idea { font-size: 14px; font-weight: 700; color: #e8e4d9; flex: 1; margin-right: 12px; }

  .history-preview {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #555;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .history-tags { display: flex; gap: 6px; margin-top: 10px; align-items: center; flex-wrap: wrap; }

  .history-tag {
    padding: 2px 8px;
    border-radius: 100px;
    background: rgba(255,100,50,0.08);
    border: 1px solid rgba(255,100,50,0.15);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #ff6432;
    letter-spacing: 0.05em;
  }

  .history-meta {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #333;
    margin-left: auto;
  }

  .history-actions { display: flex; gap: 6px; }

  .history-action-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 4px 8px;
    color: #444;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .history-action-btn:hover { color: #e8e4d9; border-color: rgba(255,255,255,0.2); }
  .history-action-btn.fav { color: #ffc832; border-color: rgba(255,200,50,0.3); }

  .clear-btn {
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    background: rgba(255,50,50,0.05);
    border: 1px solid rgba(255,50,50,0.1);
    border-radius: 10px;
    color: #664444;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .clear-btn:hover { background: rgba(255,50,50,0.1); color: #ff6464; }

  .history-count {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #444;
    margin-bottom: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const EXAMPLES = [
  "A lone astronaut discovering an ancient alien city on Europa",
  "A timelapse of a city transforming from ancient Rome to the future",
  "Bioluminescent jellyfish dancing in deep ocean darkness",
  "A samurai meditating as cherry blossoms fall around them",
  "A whale swimming through clouds above a city",
  "Two robots sharing an umbrella in the rain",
];

const STYLES = [
  { value: "cinematic", label: "Cinematic Film" },
  { value: "anime", label: "Anime / Manga" },
  { value: "documentary", label: "Documentary" },
  { value: "surrealist", label: "Surrealist / Artistic" },
  { value: "scifi", label: "Sci-Fi Epic" },
  { value: "fantasy", label: "Dark Fantasy" },
  { value: "commercial", label: "Commercial / Ad" },
  { value: "horror", label: "Horror / Thriller" },
  { value: "western", label: "Western" },
  { value: "noir", label: "Neo-Noir" },
  { value: "nature", label: "Nature / Wildlife" },
  { value: "musical", label: "Musical / Dance" },
];

const DURATIONS = [
  { value: "short", label: "Short (5-10s)" },
  { value: "medium", label: "Medium (15-30s)" },
  { value: "long", label: "Long (60s+)" },
];

const ASPECTS = [
  { value: "16:9", label: "16:9 Landscape" },
  { value: "9:16", label: "9:16 Portrait" },
  { value: "1:1", label: "1:1 Square" },
  { value: "2.39:1", label: "2.39:1 Cinematic" },
];

const styleMap = {
  cinematic: "cinematic Hollywood blockbuster, photorealistic, dramatic lighting, anamorphic lens flares",
  anime: "anime style, hand-drawn, vibrant colors, Studio Ghibli or Makoto Shinkai aesthetic",
  documentary: "documentary style, naturalistic lighting, handheld camera feel, authentic and raw",
  surrealist: "surrealist art, Salvador Dalí inspired, dreamlike impossible physics, painterly textures",
  scifi: "hard sci-fi, IMAX quality, practical effects aesthetic, Blade Runner 2049 color palette",
  fantasy: "dark fantasy, epic scale, LOTR aesthetic, atmospheric fog, otherworldly lighting",
  commercial: "polished commercial, clean backgrounds, dynamic motion, bold product colors, aspirational mood",
  horror: "psychological horror, desaturated colors, claustrophobic framing, unsettling atmosphere",
  western: "classic western, dusty golden hour, wide open landscapes, Sergio Leone aesthetic",
  noir: "neo-noir, rain-slicked streets, neon reflections, deep shadows, moody atmosphere",
  nature: "nature documentary, BBC Earth quality, golden hour, macro photography aesthetic",
  musical: "vibrant musical, dynamic choreography, colorful stage lighting, energetic movement",
};

const durationMap = {
  short: "5-10 second clip, single shot or quick cut",
  medium: "15-30 second sequence with 2-3 cuts",
  long: "60+ second narrative sequence with multiple scenes",
};

export default function App() {
  const [tab, setTab] = useState("generate");
  const [idea, setIdea] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState("medium");
  const [aspect, setAspect] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prompt_history") || "[]"); } catch { return []; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prompt_favorites") || "[]"); } catch { return []; }
  });
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    localStorage.setItem("prompt_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("prompt_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          style: styleMap[style],
          duration: durationMap[duration],
          aspect
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);

      const id = Date.now();
      setLastId(id);
      const entry = { id, idea, style, duration, aspect, result: parsed, date: new Date().toLocaleDateString() };
      setHistory(prev => [entry, ...prev.slice(0, 49)]);
    } catch (e) {
      setError("Failed to generate prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copySection = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyAll = () => {
    if (!result) return;
    const full = `${result.mainPrompt}\n\nCamera: ${result.cameraWork}\nLighting: ${result.lighting}\nMood: ${result.mood}\n\nNegative Prompt: ${result.negativePrompt}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const loadFromHistory = (entry) => {
    setIdea(entry.idea);
    setStyle(entry.style);
    setDuration(entry.duration);
    setAspect(entry.aspect || "16:9");
    setResult(entry.result);
    setLastId(entry.id);
    setTab("generate");
  };

  const sections = result ? [
    { key: "mainPrompt", title: "Main Prompt", content: result.mainPrompt, color: "#c8c4b9" },
    { key: "cameraWork", title: "Camera Work", content: result.cameraWork, color: "#c8c4b9" },
    { key: "lighting", title: "Lighting", content: result.lighting, color: "#c8c4b9" },
    { key: "mood", title: "Mood & Atmosphere", content: result.mood, color: "#c8c4b9" },
    { key: "negativePrompt", title: "Negative Prompt", content: result.negativePrompt, color: "#664444" },
  ] : [];

  const historyItems = tab === "favorites"
    ? history.filter(h => favorites.includes(h.id))
    : history;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <div className="eyebrow">✦ NA MICHAEL RUN AM</div>
          <h1>AI Video<br /><span>Prompt</span> Studio</h1>
          <p className="subtitle">describe any idea → get a production-ready video prompt</p>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === "generate" ? "active" : ""}`} onClick={() => setTab("generate")}>
            ✦ Generate
          </button>
          <button className={`tab ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>
            ⏱ History {history.length > 0 ? `(${history.length})` : ""}
          </button>
          <button className={`tab ${tab === "favorites" ? "active" : ""}`} onClick={() => setTab("favorites")}>
            ★ Favorites {favorites.length > 0 ? `(${favorites.length})` : ""}
          </button>
        </div>

        {tab === "generate" && (
          <div className="card">
            <div className="input-group">
              <div className="section-label">Your Idea</div>
              <textarea
                value={idea}
                onChange={e => setIdea(e.target.value)}
                placeholder="Describe your video concept... (e.g. 'a dragon flying over neon Tokyo at midnight')"
              />
            </div>

            <div className="section-label" style={{marginBottom: 10}}>Quick Examples</div>
            <div className="chips">
              {EXAMPLES.map(ex => (
                <div key={ex} className="chip" onClick={() => setIdea(ex)}>{ex}</div>
              ))}
            </div>

            <div className="controls">
              <div>
                <div className="section-label">Visual Style</div>
                <select value={style} onChange={e => setStyle(e.target.value)}>
                  {STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <div className="section-label">Duration</div>
                <select value={duration} onChange={e => setDuration(e.target.value)}>
                  {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <div className="section-label">Aspect Ratio</div>
                <select value={aspect} onChange={e => setAspect(e.target.value)}>
                  {ASPECTS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
            </div>

            <div className="btn-row">
              <button className="generate-btn" onClick={generate} disabled={loading || !idea.trim()}>
                {loading ? (
                  <span className="loading-dots">
                    Generating<div className="dot"/><div className="dot"/><div className="dot"/>
                  </span>
                ) : "✦ Generate Video Prompt"}
              </button>
              <button className="regen-btn" onClick={generate} disabled={loading || !idea.trim()} title="Regenerate">
                ↻
              </button>
            </div>

            {error && <div className="error-msg">{error}</div>}

            {result && (
              <div className="result-card">
                <div className="result-header">
                  <span className="result-label">✦ Generated Prompt</span>
                  <div className="result-actions">
                    <button
                      className={`icon-btn ${lastId && favorites.includes(lastId) ? "active" : ""}`}
                      onClick={() => lastId && toggleFavorite(lastId)}
                      title="Favorite"
                    >★</button>
                    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyAll}>
                      {copied ? "✓ Copied!" : "Copy All"}
                    </button>
                  </div>
                </div>
                <div className="sections">
                  {sections.map(s => (
                    <div key={s.key} className="prompt-section">
                      <div className="prompt-section-left">
                        <div className="prompt-section-title">{s.title}</div>
                        <div className="prompt-section-content" style={{color: s.color}}>{s.content}</div>
                      </div>
                      <button
                        className={`section-copy ${copiedSection === s.key ? "copied" : ""}`}
                        onClick={() => copySection(s.content, s.key)}
                      >
                        {copiedSection === s.key ? "✓" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(tab === "history" || tab === "favorites") && (
          <div className="card">
            {historyItems.length === 0 ? (
              <div className="history-empty">
                {tab === "favorites"
                  ? "★ No favorites yet\nStar a prompt after generating to save it here"
                  : "⏱ No history yet\nGenerate a prompt to get started"}
              </div>
            ) : (
              <>
                <div className="history-count">{historyItems.length} prompt{historyItems.length !== 1 ? "s" : ""}</div>
                <div className="history-list">
                  {historyItems.map(entry => (
                    <div
                      key={entry.id}
                      className={`history-item ${favorites.includes(entry.id) ? "favorited" : ""}`}
                      onClick={() => loadFromHistory(entry)}
                    >
                      <div className="history-item-top">
                        <div className="history-idea">{entry.idea}</div>
                        <div className="history-actions" onClick={e => e.stopPropagation()}>
                          <button
                            className={`history-action-btn ${favorites.includes(entry.id) ? "fav" : ""}`}
                            onClick={() => toggleFavorite(entry.id)}
                          >★</button>
                          <button
                            className="history-action-btn"
                            onClick={() => setHistory(prev => prev.filter(h => h.id !== entry.id))}
                          >✕</button>
                        </div>
                      </div>
                      <div className="history-preview">{entry.result?.mainPrompt}</div>
                      <div className="history-tags">
                        <span className="history-tag">{entry.style}</span>
                        <span className="history-tag">{entry.duration}</span>
                        <span className="history-tag">{entry.aspect || "16:9"}</span>
                        <span className="history-meta">{entry.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {tab === "history" && (
                  <button className="clear-btn" onClick={() => { setHistory([]); setFavorites([]); }}>
                    Clear All History
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
