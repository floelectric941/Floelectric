import axios from 'axios';

export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    return res.status(500).json({ error: 'GOOGLE_PLACES_API_KEY and PLACE_ID not set in environment.' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,name,rating&key=${API_KEY}`;
    const { data } = await axios.get(url);
    const reviews = (data.result && data.result.reviews) ? data.result.reviews.map(r => ({ author_name: r.author_name, rating: r.rating, text: r.text })) : [];
    res.status(200).json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
