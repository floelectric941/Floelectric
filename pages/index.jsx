import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WRITE_REVIEW_URL = "https://g.page/r/CWMnhtXL-idsEAE/review";
const READ_REVIEWS_URL = "https://g.page/r/CWMnhtXL-idsEAE";

function GoogleReviews() {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) setListing(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <section
      className="reviews-section"
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR CUSTOMERS. THEIR WORDS.</p>
            <h2 id="reviews-heading">
              Good connections.
              <br />
              <span>Real experiences.</span>
            </h2>
          </div>
          <p>
            See what customers are saying on Google. Worked with Flo Electric?
            We’d love to hear about your experience, too.
          </p>
        </div>
        <div className="google-review-banner">
          <div className="google-review-summary">
            <span className="google-source">Google reviews</span>
            {listing && Number.isFinite(listing.rating) && (
              <p className="google-rating">
                <strong>{listing.rating.toFixed(1)}</strong>
                <span>
                  <span
                    className="review-stars"
                    aria-label={`${listing.rating} out of 5 stars`}
                  >
                    {"★".repeat(Math.round(listing.rating))}
                    <span aria-hidden="true">
                      {"☆".repeat(5 - Math.round(listing.rating))}
                    </span>
                  </span>
                  <small>
                    {listing.reviewCount} Google{" "}
                    {listing.reviewCount === 1 ? "review" : "reviews"}
                  </small>
                </span>
              </p>
            )}
            {!listing && <p>Get to know us through the people we work with.</p>}
          </div>
          <div className="review-actions">
            <a
              className="text-link"
              href={listing?.mapsUrl || READ_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read reviews on Google <Icon name="arrow" />
            </a>
            <a
              className="button"
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Google review <Icon name="arrow" />
            </a>
          </div>
        </div>
        {listing?.reviews?.length > 0 && (
          <>
            <div className="review-grid">
              {listing.reviews.map((review, index) => (
                <article className="review-card" key={review.id || index}>
                  <div className="review-card-heading">
                    <a
                      href={
                        review.authorUrl || listing.mapsUrl || READ_REVIEWS_URL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {review.author}
                    </a>
                    <span
                      className="review-stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {"★".repeat(review.rating)}
                      <span aria-hidden="true">
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </span>
                  </div>
                  {review.text && <blockquote>{review.text}</blockquote>}
                  <div className="review-card-footer">
                    <span>{review.relativeTime}</span>
                    <a
                      href={review.url || listing.mapsUrl || READ_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="review-attribution">
              Reviews from{" "}
              <a
                href={listing.mapsUrl || READ_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
              . A selection of reviews provided by Google.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

const services = [
  [
    "01",
    "Residential electrical",
    "Wiring, panel upgrades, and remodels that make your home work better for you.",
    "home",
  ],
  [
    "02",
    "Commercial & industrial",
    "Electrical installations and improvements for the places you do business.",
    "building",
  ],
  [
    "03",
    "Generator installation",
    "Plan ahead with backup power for the moments that matter.",
    "power",
  ],
  [
    "04",
    "EV charging",
    "The convenience of charging at home, with a dedicated charger installation.",
    "bolt",
  ],
  [
    "05",
    "Pool hookups",
    "Electrical connections for your pool equipment and outdoor space.",
    "water",
  ],
  [
    "06",
    "Maintenance & repairs",
    "Troubleshooting, repairs, and ongoing service for your electrical systems.",
    "tools",
  ],
];
function Icon({ name }) {
  const paths = {
    home: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8",
    building: "M4 21V3h12v18M16 10h4v11M2 21h20M8 7h4M8 11h4M8 15h4",
    power: "M12 2v9M6 5a9 9 0 1 0 12 0",
    bolt: "m13 2-9 12h7l-1 8 10-13h-8l1-7Z",
    water:
      "M3 7c3-4 6 4 9 0s6 4 9 0M3 13c3-4 6 4 9 0s6 4 9 0M3 19c3-4 6 4 9 0s6 4 9 0",
    tools:
      "m14 7 3 3M3 21l8-8M14 3a6 6 0 0 0-3 10 6 6 0 0 0 10-3l-4 1-4-4 1-4Z",
    arrow: "M4 12h16m-6-6 6 6-6 6",
    phone: "M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4c-10 3-21-8-16-16Z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.bolt} />
    </svg>
  );
}
export default function Home() {
  const router = useRouter();
  const [projectType, setProjectType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function submitQuote(event) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    setSubmitting(true);
    setFormError("");
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
    } catch {
      setFormError(
        "Your request couldn’t be sent. Please try again or call 941-666-1177.",
      );
      setSubmitting(false);
      return;
    }
    await router.push("/thank-you");
  }
  return (
    <>
      <Head>
        <title>
          Flo Electric LLC | Dock & Shore Power · Bradenton & Sarasota
        </title>
        <meta
          name="description"
          content="Specializing in boat lift electrical, dock lighting, and shore power in Bradenton, Sarasota, and surrounding areas. Request a free quote from Flo Electric."
        />
      </Head>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Flo Electric LLC home">
            <span className="brand-mark">
              <Icon name="bolt" />
            </span>
            <span>
              FLO ELECTRIC<small>COMMERCIAL · INDUSTRIAL · RESIDENTIAL</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#dock-power">Dock & shore power</a>
            <a href="#services">Services</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-phone" href="tel:9416661177">
            <Icon name="phone" />
            <span>941-666-1177</span>
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> BRADENTON · SARASOTA · SURROUNDING
              AREAS
            </p>
            <h1>
              Power for today.
              <br />
              <span>
                Ready for
                <br />
                what’s next.
              </span>
            </h1>
            <p className="hero-description">
              From your home to your waterfront, let’s get it powered.
              Specializing in boat lift electrical, dock lighting, and shore
              power, with solutions for the places you live, work, and recharge.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Get a free quote <Icon name="arrow" />
              </a>
              <a className="text-link" href="#services">
                Explore our services <Icon name="arrow" />
              </a>
            </div>
            <div className="hero-note">
              <span>Residential</span>
              <span>Commercial</span>
              <span>Industrial</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="energy-ring ring-one" />
            <div className="energy-ring ring-two" />
            <img
              src="/images/flo-electric-logo.png"
              width="850"
              height="680"
              alt="Flo Electric LLC — commercial, industrial and residential"
            />
            <div className="visual-caption">
              <Icon name="arrow" />
              <div>
                Local power. Lasting connections.
                <small>SERVING FLORIDA’S GULF COAST</small>
              </div>
            </div>
            <span className="visual-label">FLO ELECTRIC LLC</span>
          </div>
        </section>
        <div className="service-strip">
          <div className="container">
            <span>YOUR NEXT PROJECT, CONNECTED.</span>
            <p>Thoughtful solutions. Careful work. A local connection.</p>
            <a href="tel:9416661177">
              Let’s talk <Icon name="arrow" />
            </a>
          </div>
        </div>
        <section
          className="dock-section"
          id="dock-power"
          aria-labelledby="dock-heading"
        >
          <div className="container">
            <div className="dock-heading-row">
              <p className="eyebrow">OUR SPECIALTY · DOCK & SHORE POWER</p>
              <span className="dock-location">
                BUILT AROUND LIFE ON THE WATER
              </span>
            </div>
            <div className="dock-feature">
              <div className="dock-copy">
                <h2 id="dock-heading">
                  Power that goes
                  <br />
                  <span>beyond the shoreline.</span>
                </h2>
                <p>
                  Your dock is part of your everyday. Its electrical system
                  should be, too. Flo Electric specializes in boat lift
                  electrical, dock lighting, and shore power for waterfront
                  properties around Bradenton, Sarasota, and the surrounding
                  areas.
                </p>
                <p>
                  Power for your boat lift. Lighting for evenings on the dock.
                  Shore power for your boat. From new installations to upgrades
                  and repairs, let’s talk through what your waterfront needs.
                </p>
                <a
                  className="button"
                  href="#contact"
                  onClick={() => setProjectType("Dock & shore power")}
                >
                  Let’s power your dock <Icon name="arrow" />
                </a>
              </div>
              <div className="dock-art">
                <svg
                  className="dock-illustration"
                  viewBox="0 0 640 440"
                  role="img"
                  aria-labelledby="dock-art-title"
                >
                  <title id="dock-art-title">
                    Illustration of a waterfront dock with a shore power
                    pedestal and warmly lit walkway
                  </title>
                  <defs>
                    <linearGradient id="dock-sky" x2="0" y2="1">
                      <stop stopColor="#161b20" />
                      <stop offset="1" stopColor="#3b3429" />
                    </linearGradient>
                    <linearGradient id="dock-water" x2="0" y2="1">
                      <stop stopColor="#253a40" />
                      <stop offset="1" stopColor="#101b21" />
                    </linearGradient>
                    <linearGradient id="dock-metal">
                      <stop stopColor="#565a5c" />
                      <stop offset=".45" stopColor="#b6b9b6" />
                      <stop offset="1" stopColor="#6a7070" />
                    </linearGradient>
                    <radialGradient id="dock-glow">
                      <stop stopColor="#ffca28" stopOpacity=".3" />
                      <stop offset="1" stopColor="#ffca28" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path fill="url(#dock-sky)" d="M0 0h640v215H0z" />
                  <circle
                    cx="475"
                    cy="92"
                    r="35"
                    fill="#ffca28"
                    opacity=".12"
                  />
                  <path
                    d="M0 195 90 183l64 9 80-13 94 17 97-11 75 7 140-15v45H0Z"
                    fill="#131e20"
                  />
                  <path fill="url(#dock-water)" d="M0 211h640v229H0z" />
                  <g stroke="#839a99" opacity=".16" strokeWidth="2">
                    <path d="M25 248h97m60-9h68m272 8h75M6 286h88m38 20h60m311-29h115M46 358h105m318-6h128M19 405h178m282-10h136" />
                  </g>
                  <path d="m246 244 100-6 192 202H91Z" fill="#6b6050" />
                  <path
                    d="m246 244 100-6 2 8-100 7Zm-155 196 157-187 6 1-145 186Z"
                    fill="#a39376"
                  />
                  <g stroke="#302f2b" strokeWidth="3">
                    <path d="m229 274 146-6m-167 32 193-5m-221 39h254m-287 44h331m-373 50h420" />
                  </g>
                  <g fill="#514d43">
                    <path d="M217 255h10v77h-10zM361 252h10v82h-10zM156 327h13v102h-13zM427 322h13v107h-13z" />
                  </g>
                  <g fill="url(#dock-glow)">
                    <ellipse cx="228" cy="286" rx="60" ry="35" />
                    <ellipse cx="395" cy="323" rx="76" ry="42" />
                  </g>
                  <g fill="#ffcf5b">
                    <path d="M216 253h13v5h-13zM360 250h13v5h-13zM154 324h17v6h-17zM425 319h17v6h-17z" />
                  </g>
                  <path d="m409 266 152-5-21 28H428Z" fill="#a1a6a4" />
                  <path d="m413 263 138-2-24-15h-93Z" fill="#e2e1d7" />
                  <path
                    d="M447 244v-24h52l21 24"
                    fill="none"
                    stroke="#919a9a"
                    strokeWidth="4"
                  />
                  <path d="M465 220v25" stroke="#919a9a" strokeWidth="3" />
                  <path d="M282 195h37v103h-37z" fill="url(#dock-metal)" />
                  <path
                    d="M279 189h43v10h-43zM279 296h43v9h-43z"
                    fill="#c2c5bd"
                  />
                  <path d="M288 205h25v48h-25z" fill="#1a2325" />
                  <circle
                    cx="301"
                    cy="222"
                    r="8"
                    stroke="#ffca28"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path d="M294 240h13" stroke="#ffca28" strokeWidth="3" />
                  <path
                    d="M308 261c38 3 37 55 67 48s17-35 44-36"
                    fill="none"
                    stroke="#111617"
                    strokeWidth="7"
                  />
                  <path
                    d="M308 261c38 3 37 55 67 48s17-35 44-36"
                    fill="none"
                    stroke="#ffbf32"
                    strokeWidth="3"
                  />
                </svg>
                <div className="dock-art-caption">
                  <Icon name="water" />
                  <span>
                    From land to water.
                    <small>DOCK ELECTRICAL · SHORE POWER</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="dock-services">
              {[
                [
                  "Boat lift electrical",
                  "Electrical wiring, connections, and troubleshooting to keep your boat lift powered and ready.",
                ],
                [
                  "Dock lighting",
                  "Dock, walkway, and accent lighting for evenings by the water and the way back home.",
                ],
                [
                  "Shore power connections",
                  "Power at the dock for your boat, with connections planned around your setup.",
                ],
                [
                  "Troubleshooting & repairs",
                  "Help with lost power, worn connections, and electrical issues at your dock.",
                ],
              ].map(([title, description]) => (
                <div className="dock-service" key={title}>
                  <span className="dock-service-marker" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>
                The right connection.
                <br />
                For every kind of project.
              </h2>
            </div>
            <p>
              Beyond the waterfront: upgrades, installations, and everyday
              repairs. Find the electrical support your space needs.
            </p>
          </div>
          <div className="services-grid">
            {services.map(([number, title, description, icon]) => (
              <a className="service-card" href="#contact" key={number}>
                <div className="card-top">
                  <Icon name={icon} />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="card-link">
                  Let’s make it happen <Icon name="arrow" />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="approach-section" id="approach">
          <div className="container approach-grid">
            <div>
              <p className="eyebrow">A LITTLE MORE PERSONAL</p>
              <h2>
                Your neighborhood.
                <br />
                Your project.
                <br />
                <span>Your electrician.</span>
              </h2>
              <p className="section-description">
                We’re Flo Electric LLC, serving Bradenton, Sarasota, and the
                surrounding communities. Tell us what you’re planning, what
                needs fixing, or what you’re not quite sure about. We’ll start
                with a conversation.
              </p>
              <a
                className="text-link"
                href="https://g.page/r/CWMnhtXL-idsEAE/review"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find us on Google Reviews <Icon name="arrow" />
              </a>
            </div>
            <div className="steps">
              {[
                [
                  "01",
                  "Tell us what you need",
                  "A quick call or a few details below gets the conversation started.",
                ],
                [
                  "02",
                  "Make a plan together",
                  "We’ll discuss your space, your goals, and the next steps for your project.",
                ],
                [
                  "03",
                  "Get connected",
                  "From installation to maintenance, we’re here to help bring your project to life.",
                ],
              ].map(([n, t, d]) => (
                <div className="step" key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <GoogleReviews />
        <section className="section container contact-grid" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">LET’S GET STARTED</p>
            <h2>
              What can we
              <br />
              <span>power for you?</span>
            </h2>
            <p>
              Have a project in mind? Tell us a little about it and we’ll be in
              touch to talk through the details.
            </p>
            <a className="contact-phone" href="tel:9416661177">
              941-666-1177 <Icon name="arrow" />
            </a>
            <a className="email-link" href="mailto:Floelectric941@gmail.com">
              Floelectric941@gmail.com
            </a>
            <p className="service-area">
              SERVING FLORIDA’S GULF COAST
              <br />
              <span>Bradenton, Sarasota & surrounding areas</span>
            </p>
          </div>
          <form
            className="quote-form"
            action="https://formspree.io/f/mkgqvokb"
            method="POST"
            onSubmit={submitQuote}
            aria-busy={submitting}
          >
            <h3>Request a free quote</h3>
            <p>A few details. One step closer.</p>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  required
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(941) 555-0123"
                  required
                />
              </label>
            </div>
            <label>
              What can we help with?
              <select
                name="service"
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
              >
                <option value="">Select a service (optional)</option>
                <option>Dock & shore power</option>
                <option>Boat lift electrical</option>
                <option>Dock lighting</option>
                {services.map(([, title]) => (
                  <option key={title}>{title}</option>
                ))}
              </select>
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Tell us about your project
              <textarea
                name="message"
                rows="4"
                placeholder="What do you have in mind? Include your location and any timing details."
                required
              />
            </label>
            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Sending your request…" : "Send my request"}{" "}
              <Icon name="arrow" />
            </button>
            <small>Your details are used to respond to your request.</small>
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="/">
            <span className="brand-mark">
              <Icon name="bolt" />
            </span>
            <span>
              FLO ELECTRIC<small>BRADENTON · SARASOTA · BEYOND</small>
            </span>
          </a>
          <p>© {new Date().getFullYear()} Flo Electric LLC</p>
          <a href="tel:9416661177">
            Let’s stay connected. <Icon name="arrow" />
          </a>
        </div>
      </footer>
    </>
  );
}
