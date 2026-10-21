import Head from "next/head";

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
  return (
    <>
      <Head>
        <title>
          Flo Electric LLC | Bradenton & Sarasota Electrical Services
        </title>
        <meta
          name="description"
          content="Residential, commercial, and industrial electrical services in Bradenton, Sarasota, and surrounding areas. Contact Flo Electric for a free quote."
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
            <a href="#services">Services</a>
            <a href="#approach">Our approach</a>
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
              Electrical solutions for the places you live, work, and recharge.
              From small repairs to your next big project, let’s get it powered.
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
              Upgrades, installations, and everyday repairs. Find the electrical
              support your space needs.
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
            <input
              type="hidden"
              name="_redirect"
              value="https://floelectric.com/thank-you"
            />
            <button className="button" type="submit">
              Send my request <Icon name="arrow" />
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
