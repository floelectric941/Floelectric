import Link from 'next/link';
import { useState } from 'react';

const FORMSPREE = 'https://formspree.io/f/mkgqvokb';

export default function Home() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <header style={{padding:24, borderBottom:'1px solid #111', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <img src="https://files.oaiusercontent.com/file_00000000246861f7ab2cca2e185b173c" alt="Flo Electric" style={{height:56}} />
          <h1 style={{fontSize:20, margin:0}}>Flo Electric LLC</h1>
        </div>
        <a href="tel:9416661177" style={{background:'#fbbf24', color:'#000', padding:'10px 14px', borderRadius:8}}>Call Now: 941-666-1177</a>
      </header>

      <main style={{padding:24}}>
        <section style={{textAlign:'center', padding:'48px 12px'}}>
          <img src="https://files.oaiusercontent.com/file_00000000246861f7ab2cca2e185b173c" alt="logo" style={{height:120}} />
          <h2 style={{fontSize:36, margin:'16px 0'}}>Powering Bradenton, Sarasota, and Surrounding Areas</h2>
          <p style={{color:'#9ca3af', fontSize:18}}>Commercial, Residential & Industrial Electrical Services — Generators, EV Chargers, Pool Hookups, Maintenance</p>
          <a href="#contact" style={{display:'inline-block', marginTop:16, background:'#fbbf24', color:'#000', padding:'12px 18px', borderRadius:8}}>Request a Quote</a>
        </section>

        <section id="services" style={{marginTop:40}}>
          <h3 style={{color:'#fbbf24'}}>Our Services</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16, marginTop:12}}>
            {[
              {title:'Residential Wiring & Remodels', img:'https://images.unsplash.com/photo-1581093448790-7e45b4b7b6a2?auto=format&fit=crop&w=1200&q=60'},
              {title:'Commercial Projects', img:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=60'},
              {title:'Generator Installation', img:'https://images.unsplash.com/photo-1600291751749-6c0b1cd7a8d1?auto=format&fit=crop&w=1200&q=60'},
              {title:'EV Charger Setup', img:'https://images.unsplash.com/photo-1592928305604-3b6a7f3b2d6d?auto=format&fit=crop&w=1200&q=60'},
              {title:'Pool Hookups', img:'https://images.unsplash.com/photo-1613954703076-3c9b9c1c2e48?auto=format&fit=crop&w=1200&q=60'},
              {title:'Maintenance & Service Contracts', img:'https://images.unsplash.com/photo-1542223616-5c8d2f6d5f6b?auto=format&fit=crop&w=1200&q=60'}
            ].map((s,i)=>(
              <div key={i} style={{background:'#111', borderRadius:10, overflow:'hidden'}}>
                <img src={s.img} alt={s.title} style={{width:'100%', height:160, objectFit:'cover'}} />
                <div style={{padding:12}}>
                  <h4 style={{margin:'6px 0'}}>{s.title}</h4>
                  <p style={{color:'#9ca3af', margin:0}}>No job is too small — quality electrical work done right.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" style={{marginTop:40}}>
          <h3 style={{color:'#fbbf24'}}>Gallery (Placeholder)</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:8, marginTop:12}}>
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} style={{height:140, background:'#222', borderRadius:8, overflow:'hidden'}}>
                <img src={`https://source.unsplash.com/collection/888146/800x600?sig=${i}`} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" style={{marginTop:40}}>
          <h3 style={{color:'#fbbf24'}}>What our customers say</h3>
          <div id="reviews-container" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
            <div style={{background:'#111', padding:16, borderRadius:8}}>
              <strong>Chris P.</strong>
              <div style={{color:'#fbbf24'}}>★★★★★</div>
              <p style={{color:'#9ca3af'}}>Flo Electric replaced our panel and was professional and clean.</p>
            </div>
            <div style={{background:'#111', padding:16, borderRadius:8}}>
              <strong>Maria L.</strong>
              <div style={{color:'#fbbf24'}}>★★★★★</div>
              <p style={{color:'#9ca3af'}}>Quick, reliable, and great communication. Highly recommended.</p>
            </div>
            <div style={{background:'#111', padding:16, borderRadius:8}}>
              <strong>Dave S.</strong>
              <div style={{color:'#fbbf24'}}>★★★★★</div>
              <p style={{color:'#9ca3af'}}>Installed our EV charger perfectly. Will use again.</p>
            </div>
          </div>
          <p style={{marginTop:8, color:'#9ca3af'}}>See more on <a href="https://g.page/r/CWMnhtXL-idsEAE/review" style={{color:'#fbbf24'}}>Google Reviews</a></p>
        </section>

        <section id="contact" style={{marginTop:40}}>
          <h3 style={{color:'#fbbf24'}}>Request a Free Quote</h3>
          <div style={{background:'#111', padding:18, borderRadius:12, maxWidth:700, marginTop:12}}>
            <form action={FORMSPREE} method="POST">
              <input name="name" placeholder="Your Name" required style={{padding:10, marginBottom:8, background:'#0b0b0b', border:'1px solid #222', color:'#fff'}} />
              <input name="email" type="email" placeholder="Your Email" required style={{padding:10, marginBottom:8, background:'#0b0b0b', border:'1px solid #222', color:'#fff'}} />
              <input name="phone" placeholder="Your Phone" required style={{padding:10, marginBottom:8, background:'#0b0b0b', border:'1px solid #222', color:'#fff'}} />
              <textarea name="message" placeholder="Tell us about your project..." required style={{padding:10, height:120, marginBottom:8, background:'#0b0b0b', border:'1px solid #222', color:'#fff'}} />
              <input type="hidden" name="_redirect" value="https://floelectric.com/thank-you" />
              <button type="submit" style={{background:'#fbbf24', color:'#000', padding:'12px 18px', borderRadius:8}}>Submit Request</button>
            </form>
          </div>
        </section>
      </main>

      <footer style={{padding:24, borderTop:'1px solid #111', textAlign:'center', color:'#9ca3af'}}>
        © {new Date().getFullYear()} Flo Electric LLC • 941-666-1177 • Floelectric941@gmail.com
      </footer>
    </div>
  )
}
