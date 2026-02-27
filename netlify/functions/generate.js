exports.handler = async function(event) {
  try {
    const { idea, style, duration } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert AI video prompt engineer. Generate a prompt for: "${idea}". Style: ${style}. Duration: ${duration}. Return ONLY a raw JSON object with these exact keys: mainPrompt, cameraWork, lighting, mood, negativePrompt. No markdown, no backticks, no explanation, just the JSON object.`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: [{ text: JSON.stringify(parsed) }] })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};