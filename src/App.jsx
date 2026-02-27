import { useState } from "react";

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

  .input-group {
    margin-bottom: 20px;
  }

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

  textarea:focus {
    border-color: rgba(255,100,50,0.4);
  }

  textarea::placeholder { color: #333; }

  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
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

  .generate-btn {
    width: 100%;
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
    position: relative;
    overflow: hidden;
  }

  .generate-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(255,100,50,0.3);
  }

  .generate-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .dot {
    width: 6px;
    height: 6px;
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

  .copy-btn:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
  }

  .copy-btn.copied {
    background: rgba(100,220,100,0.1);
    border-color: rgba(100,220,100,0.3);
    color: #6dc;
  }

  .result-text {
    padding: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    line-height: 1.8;
    color: #c8c4b9;
    white-space: pre-wrap;
    font-style: italic;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .prompt-section {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  .prompt-section:last-child { border-bottom: none; }

  .prompt-section-title {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #666;
    font-family: 'DM Mono', monospace;
    margin-bottom: 8px;
  }

  .prompt-section-content {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #c8c4b9;
  }

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

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

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

  .chip:hover {
    border-color: rgba(255,100,50,0.4);
    color: #ff6432;
    background: rgba(255,100,50,0.05);
  }
`;

const EXAMPLES = [
  "A lone astronaut discovering an ancient alien city on Europa",
  "A timelapse of a city transforming from ancient Rome to the future",
  "Bioluminescent jellyfish dancing in deep ocean darkness",
  "A samurai meditating as cherry blossoms fall around them",
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
];

const DURATIONS = [
  { value: "short", label: "Short (5-10s)" },
  { value: "medium", label: "Medium (15-30s)" },
  { value: "long", label: "Long (60s+)" },
];

export default function App() {
  const [idea, setIdea] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const styleMap = {
      cinematic: "cinematic Hollywood blockbuster, photorealistic, dramatic lighting, anamorphic lens flares",
      anime: "anime style, hand-drawn, vibrant colors, Studio Ghibli or Makoto Shinkai aesthetic",
      documentary: "documentary style, naturalistic lighting, handheld camera feel, authentic and raw",
      surrealist: "surrealist art, Salvador Dalí inspired, dreamlike impossible physics, painterly textures",
      scifi: "hard sci-fi, IMAX quality, practical effects aesthetic, Blade Runner 2049 color palette",
      fantasy: "dark fantasy, epic scale, LOTR aesthetic, atmospheric fog, otherworldly lighting",
      commercial: "polished commercial, clean backgrounds, dynamic motion, bold product colors, aspirational mood",
      horror: "psychological horror, desaturated colors, claustrophobic framing, unsettling atmosphere",
    };

    const durationMap = {
      short: "5-10 second clip, single shot or quick cut",
      medium: "15-30 second sequence with 2-3 cuts",
      long: "60+ second narrative sequence with multiple scenes",
    };

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an expert AI video prompt engineer for platforms like Sora, Runway, Kling, and Pika. Generate a highly detailed, professional video generation prompt based on this idea: "${idea}"

Style: ${styleMap[style]}
Duration: ${durationMap[duration]}

Return ONLY a JSON object with these exact keys (no markdown, no explanation):
{
  "mainPrompt": "The complete, detailed prompt optimized for AI video generation (2-4 sentences, rich with visual details, camera movement, lighting, mood)",
  "cameraWork": "Specific camera movement and shot type (e.g. slow dolly-in, overhead drone shot, handheld tracking)",
  "lighting": "Detailed lighting description (e.g. golden hour backlighting, neon-drenched cyberpunk night, soft diffused overcast)",
  "mood": "Atmospheric mood and emotional tone",
  "negativePrompt": "What to avoid (blurry, watermark, text, distorted faces, etc.)"
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError("Failed to generate prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fullPrompt = result
    ? `${result.mainPrompt}\n\nCamera: ${result.cameraWork}\nLighting: ${result.lighting}\nMood: ${result.mood}\n\nNegative Prompt: ${result.negativePrompt}`
    : "";

  const copyAll = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <div className="eyebrow">✦ Powered by Claude AI</div>
          <h1>AI Video<br /><span>Prompt</span> Studio</h1>
          <p className="subtitle">describe any idea → get a production-ready video prompt</p>
        </div>

        <div className="card">
          <div className="input-group">
            <div className="section-label">Your Idea</div>
            <textarea
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="Describe your video concept... (e.g. 'a dragon flying over a neon Tokyo at midnight')"
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
              <div className="section-label">Clip Duration</div>
              <select value={duration} onChange={e => setDuration(e.target.value)}>
                {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
          </div>

          <button
            className="generate-btn"
            onClick={generate}
            disabled={loading || !idea.trim()}
          >
            {loading ? (
              <span className="loading-dots">
                Generating<div className="dot"/><div className="dot"/><div className="dot"/>
              </span>
            ) : "✦ Generate Video Prompt"}
          </button>

          {error && <div className="error-msg">{error}</div>}

          {result && (
            <div className="result-card">
              <div className="result-header">
                <span className="result-label">✦ Generated Prompt</span>
                <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyAll}>
                  {copied ? "✓ Copied!" : "Copy All"}
                </button>
              </div>
              <div className="sections">
                <div className="prompt-section">
                  <div className="prompt-section-title">Main Prompt</div>
                  <div className="prompt-section-content">{result.mainPrompt}</div>
                </div>
                <div className="prompt-section">
                  <div className="prompt-section-title">Camera Work</div>
                  <div className="prompt-section-content">{result.cameraWork}</div>
                </div>
                <div className="prompt-section">
                  <div className="prompt-section-title">Lighting</div>
                  <div className="prompt-section-content">{result.lighting}</div>
                </div>
                <div className="prompt-section">
                  <div className="prompt-section-title">Mood & Atmosphere</div>
                  <div className="prompt-section-content">{result.mood}</div>
                </div>
                <div className="prompt-section">
                  <div className="prompt-section-title">Negative Prompt</div>
                  <div className="prompt-section-content" style={{color: "#664444"}}>{result.negativePrompt}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}