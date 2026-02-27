exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);
    const { idea, style, duration } = body;

    if (!idea) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No idea provided" })
      };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No API key found" })
      };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are an expert AI video prompt engineer. Generate a prompt for: "${idea}". Style: ${style}. Duration: ${duration}. Return ONLY a JSON object with keys: mainPrompt, cameraWork, lighting, mood, negativePrompt. No markdown, no explanation.`
        }]
      })
    });

    const data = await response.json();
    console.log("Anthropic response:", JSON.stringify(data));
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log("Error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};