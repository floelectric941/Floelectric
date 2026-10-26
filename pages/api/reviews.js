import axios from "axios";

const httpsUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  res.setHeader("Cache-Control", "no-store");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.PLACE_ID;
  if (!apiKey || !placeId) {
    return res
      .status(503)
      .json({ error: "Reviews are temporarily unavailable." });
  }
  try {
    const { data } = await axios.get(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
        timeout: 8000,
      },
    );
    const reviews = (Array.isArray(data.reviews) ? data.reviews : [])
      .filter(
        (review) =>
          Number.isInteger(review.rating) &&
          review.rating >= 1 &&
          review.rating <= 5,
      )
      .map((review) => ({
        id: review.name,
        author: review.authorAttribution?.displayName || "Google reviewer",
        authorUrl: httpsUrl(review.authorAttribution?.uri),
        rating: review.rating,
        text: review.text?.text || "",
        relativeTime: review.relativePublishTimeDescription || "",
        url: httpsUrl(review.googleMapsUri),
      }));
    return res.status(200).json({
      rating:
        Number.isFinite(data.rating) && data.rating >= 1 && data.rating <= 5
          ? data.rating
          : null,
      reviewCount:
        Number.isInteger(data.userRatingCount) && data.userRatingCount >= 0
          ? data.userRatingCount
          : 0,
      mapsUrl: httpsUrl(data.googleMapsUri),
      reviews,
    });
  } catch {
    // Do not log the Axios error: its configuration contains the API key.
    return res
      .status(502)
      .json({ error: "Reviews are temporarily unavailable." });
  }
}
