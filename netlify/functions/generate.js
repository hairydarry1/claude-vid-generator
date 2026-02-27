exports.handler = async function(event) {
  try {
    const { idea, style, duration } = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
       model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [{
          role: "user",
          content: `You are an expert AI video prompt engineer. Generate a prompt for: "${idea}". Style: ${style}. Duration: ${duration}. Return ONLY a raw JSON object with these exact keys: mainPrompt, cameraWork, lighting, mood, negativePrompt. No markdown, no backticks, no explanation.`
        }]
      })
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data));
    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
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