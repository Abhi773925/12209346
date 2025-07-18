import express from "express"
import { createShortUrl, getStats } from "../controllers/urlController.js"

const router = express.Router()

router.post("/", createShortUrl)
router.get("/:shortcode", getStats)

export default router
