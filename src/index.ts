import express from "express";
import dotenv from "dotenv";

const app = express();
const port = 3001;
dotenv.config();

const API_KEY = process.env.NEWSDATA_IO_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
const API_URL = process.env.NEWSDATA_IO_API_URL;
if (!API_URL) {
  throw new Error(
    "NEWSDATA_IO_API_URL is not defined in the environment variables."
  );
}

const params = new URLSearchParams({
  apikey: API_KEY,
  language: "en",
  country: "jp",
  timeframe: "24",
  full_content: "0",
  size: "10",
  category: "world",
});

app.get("/latest-news", async (req, res) => {
  const url = new URL(API_URL);
  url.search = params.toString();

  try {
    const response = await fetch(url.toString());
    const newsData = await response.json();
    console.log(newsData);
    res.send(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).send("Error fetching news");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
