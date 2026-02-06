const { onRequest } = require("firebase-functions/v2/https");

exports.quoteOfTheDay = onRequest(
  {
    secrets: ["API_NINJAS_KEY"],
    cors: true,
  },
  async (req, res) => {
    try {
      const apiKey = process.env.API_NINJAS_KEY?.trim(); // 🔥 trims newline

      const response = await fetch(
        "https://api.api-ninjas.com/v2/quoteoftheday",
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      res.status(500).json({ error: "Failed to fetch quote" });
    }
  }
);
