import fs from "fs"
import path from "path"

const logMiddleware = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url} BODY: ${JSON.stringify(req.body)}\n`
  fs.appendFileSync(path.resolve("logs.txt"), log)
  next()
}

export default logMiddleware
