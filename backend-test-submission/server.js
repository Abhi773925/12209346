import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import urlRoutes from "./routes/urlRoutes.js"
import logMiddleware from "./middlewares/logMiddleware.js"
import errorHandler from "./middlewares/errorHandler.js"
import Url from "./models/urlModel.js" 

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(logMiddleware)

app.use("/shorturls", urlRoutes)

app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params
  try {
    const url = await Url.findOne({ shortCode: shortcode })
    if (!url) return res.status(404).json({ error: "Shortcode not found" })

    if (new Date() > url.expiry) {
      return res.status(410).json({ error: "Shortlink expired" })
    }

    url.clicks++
    url.clickDetails.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "Direct",
      location: "India" 
    })

    await url.save()
    return res.redirect(url.originalUrl)
  } catch (err) {
    return res.status(500).json({ error: "Server Error" })
  }
})

app.use(errorHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.error("DB connection error:", err))
