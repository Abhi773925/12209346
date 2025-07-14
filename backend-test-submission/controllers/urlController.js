import Url from "../models/urlModel.js"
import generateShortcode from "../utils/generateShortcode.js"

export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body
  if (!url) return res.status(400).json({ error: "URL is required" })

  const isValidUrl = /^https?:\/\/.+/.test(url)
  if (!isValidUrl) return res.status(400).json({ error: "Invalid URL format" })

  const code = shortcode || generateShortcode()
  const existing = await Url.findOne({ shortCode: code })
  if (existing) return res.status(409).json({ error: "Shortcode already exists" })

  const expiry = new Date(Date.now() + validity * 60 * 1000)
  const newUrl = new Url({
    originalUrl: url,
    shortCode: code,
    expiry
  })

  await newUrl.save()
  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiry.toISOString()
  })
}

export const getStats = async (req, res) => {
  const { shortcode } = req.params
  const url = await Url.findOne({ shortCode: shortcode })
  if (!url) return res.status(404).json({ error: "Shortcode not found" })

  res.json({
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
    expiry: url.expiry,
    totalClicks: url.clicks,
    clickDetails: url.clickDetails
  })
}
