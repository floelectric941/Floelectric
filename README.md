# Flo Electric LLC

Next.js website for Flo Electric LLC, serving Bradenton, Sarasota, and surrounding areas.

## Development

Use Node.js 22 or 24 and npm.

```sh
npm ci
npm run dev
```

Production validation:

```sh
npm run build
npm start
```

Pages are in `pages/`, styles are in `styles.css`, and local images are in `public/images/`.
The logo asset is an AI-prepared web rendition of the supplied brand image.

## Deploy to Vercel

Import `floelectric941/Floelectric` from GitHub. Select the Next.js framework and leave the root directory at the repository root. Default build and output settings work. No environment variables are required for the homepage.

The contact form uses the existing Formspree endpoint. Its recipient configuration and delivery must be verified by the owner before launch. Live form submissions are not part of automated checks.

## Optional Google Reviews API

`/api/reviews` requires `GOOGLE_PLACES_API_KEY` and `PLACE_ID`. These variables are optional; the homepage links directly to Google Reviews. Configure them securely in Vercel if using the API. Never commit credentials.

## Google review cards

The Reviews section always includes links to read Google reviews and leave a review. The API route uses Places API (New) to display the rating, review count, and Google's selected review excerpts, including author attribution. It does not post reviews; that button opens Google's own review page.

To enable live cards, enable Places API (New) in a Google Cloud project with the required billing setup. Configure `GOOGLE_PLACES_API_KEY` securely and set `PLACE_ID` to the business's Google Place ID. Keep the key server-side and restrict it to the required API. Do not paste credentials into chat or commit them. Cloud environment requirements are saved in environment settings; production variables must also be configured securely in the hosting provider. The server calls `places.googleapis.com`.

Without the connection, the section keeps the Google links visible and does not show an invented rating or reviews. API errors return safe responses without logging credentials. Run `node --test tests/reviews.test.cjs` to check the API's normalization and error handling with fixtures. These checks do not validate live Google access.
