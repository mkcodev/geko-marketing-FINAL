import { chromium } from "playwright"

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

// Load page once to get the origin, then set sessionStorage to skip loading screen
await page.goto("http://localhost:3000")
await page.evaluate(() => sessionStorage.setItem("geko-loaded", "1"))
await page.reload({ waitUntil: "networkidle" })
await page.waitForTimeout(2000) // let animations settle

await page.screenshot({ path: "ss-hero-final.png", fullPage: false })
console.log("Desktop screenshot saved")

// Mobile
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
const mpage = await mobile.newPage()
await mpage.goto("http://localhost:3000")
await mpage.evaluate(() => sessionStorage.setItem("geko-loaded", "1"))
await mpage.reload({ waitUntil: "networkidle" })
await mpage.waitForTimeout(2000)
await mpage.screenshot({ path: "ss-hero-mobile.png", fullPage: false })
console.log("Mobile screenshot saved")

await browser.close()
