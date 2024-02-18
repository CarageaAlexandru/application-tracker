import puppeteer from "puppeteer";

export default async function handler(req, res) {
	// Ensure the request is a POST request
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const { url } = req.body;
	if (!url) {
		return res.status(400).json({ error: "URL is required" });
	}

	let browser;
	try {
		browser = await puppeteer.launch({
			headless: false,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();

		await page.goto(url, { waitUntil: "domcontentloaded" });
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
		);

		// Scrape the page based on the URL
		const { jobTitle, jobDescriptionText } = await scrapePage(url, page);

		await browser.close();
		return res.status(200).json({ jobTitle, jobDescriptionText });
	} catch (error) {
		console.error("Error in /api/scrape:", error);
		if (browser) await browser.close();
		return res
			.status(500)
			.json({ error: "An error occurred while accessing the page." });
	}
}

async function scrapePage(url, page) {
	console.log("URL being checked:", url); // Add this to diagnose
	if (url.includes("indeed.com")) {
		return await scrapeIndeed(page);
	} else {
		throw new Error("Unsupported URL");
	}
}

async function scrapeIndeed(page) {
	// Logic to scrape Indeed
	const jobTitle = await page.evaluate(() => {
		const titleElement = document.querySelector(
			".jobsearch-JobInfoHeader-title"
		);
		if (!titleElement) return null;

		// Replace the "- job post" part with an empty string
		const titleText = titleElement.innerText.replace("- job post", "").trim();
		return titleText;
	});

	const jobDescriptionText = await page.evaluate(() => {
		const jobDescriptionDiv = document.querySelector("#jobDescriptionText");
		if (!jobDescriptionDiv) return null;

		// Select all <p> and <ul> tags within the jobDescriptionDiv
		const paragraphsAndLists = jobDescriptionDiv.querySelectorAll("p, ul");

		let descriptionText = "";

		// Iterate over each element and handle <p> and <ul> separately
		paragraphsAndLists.forEach((element) => {
			// If it's a <p> tag, add its text content
			if (element.tagName.toLowerCase() === "p") {
				descriptionText += element.innerText.trim() + "\n";
			}
			// If it's a <ul> tag, add its list items' text content
			else if (element.tagName.toLowerCase() === "ul") {
				const listItems = element.querySelectorAll("li");
				listItems.forEach((li) => {
					descriptionText += `- ${li.innerText.trim()}\n`; // Add list item text with a bullet point
				});
			}
		});

		return descriptionText.trim(); // Trim leading and trailing whitespace
	});

	return { jobTitle, jobDescriptionText };
}
