import Head from "next/head";
import Link from "next/link";
export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank you | Flo Electric LLC</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="thank-you-page">
        <div className="thank-you-card">
          <img
            src="/images/flo-electric-logo.png"
            width="280"
            height="224"
            alt="Flo Electric LLC"
          />
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            ONE STEP CLOSER
          </p>
          <h1>Thank you!</h1>
          <p>We look forward to learning more about your project.</p>
          <p>
            Prefer to talk? Call <a href="tel:9416661177">941-666-1177</a>.
          </p>
          <Link className="button" href="/">
            Return to home{" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
