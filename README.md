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
