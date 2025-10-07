Flo Electric LLC - Next.js Starter (Preview)
--------------------------------------------
This project is a ready-to-deploy Next.js site for Flo Electric LLC.
It includes:
- Home page with stock images and integrated Formspree form
- Thank-you page
- Serverless API endpoint example to fetch Google Reviews (requires API key)
- Instructions to deploy to Vercel

Local development:
  1. Install dependencies: npm install
  2. Run dev server: npm run dev
  3. Open http://localhost:3000

Environment variables (optional for Google Reviews):
  - GOOGLE_PLACES_API_KEY=your_google_api_key
  - PLACE_ID=your_google_place_id

Deploy to Vercel:
  1. Create a GitHub repo and push this project.
  2. Import the repo into Vercel and set the env vars in Vercel dashboard.
  3. Deploy.

Formspree:
  This project uses the Formspree endpoint you provided. Form submissions will be sent to your email.

Files included:
  - pages/index.jsx
  - pages/thank-you.jsx
  - pages/api/reviews.js
  - public/logo.png (not included; the site references the hosted logo)
