import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.API_KEY;
const url = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Twitter Scraper API.");
});

//GET Product Detail
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const { data } = await axios.get(
      `${url}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

//GET Product Review
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  try {
    const { data } = await axios.get(
      `${url}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

//Search Product
app.get("/search/:productName", async (req, res) => {
  const { productName } = req.params;
  try {
    const { data } = await axios.get(
      `${url}$url=https://amazon.com/s?k=${productName}`
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
