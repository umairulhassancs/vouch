// Premium Slides 11-20 (STP, Value Prop, Brand Elements, Pricing, Promo, Place, Competitors, Risks, Roadmap, Conclusion)
module.exports = [
  // Slide 11: STP Strategy
  (n, h) => {
    const stp = [
      ['layers','Segmentation','var(--purple)',[
        'Demographic: students, young professionals, families, travellers, businesses',
        'Geographic: Pakistan first, scalable to South Asia',
        'Psychographic: privacy-conscious & budget-conscious buyers',
        'Behavioural: frequent losers of keys/wallets/bags'
      ]],
      ['target','Targeting','var(--pd)',[
        'Primary: students & young professionals — highest loss frequency, price-sensitive, always online',
        'Secondary: families & travellers — willing to pay more for GPS peace-of-mind',
        'Tertiary: businesses — B2B volume orders for staff & asset tags',
        'Differentiated targeting strategy across the 4-tier product line'
      ]],
      ['compass','Positioning','var(--gold)',[
        '"The privacy-first, affordable smart keychain for everyday people"',
        'Positioned below AirTag/Tile on price, above them on finder-privacy',
        'Positioned above traditional handwritten tags on trust & technology',
        'Owns the local, culturally-relevant, no-app-needed experience'
      ]]
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">MARKETING STRATEGY</p>
      <h2 class="st an" style="--d:100ms">Segmentation, Targeting &amp; Positioning</h2>
      <div class="g g3 an" style="--d:200ms;margin-top:28px;flex:1">
        ${stp.map((c,i)=>`<div class="gc an" style="--d:${250+i*120}ms;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="fl ac gap-16">
              ${h.chip(c[0],c[2],'#fff','56px')}
              <span style="font-family:var(--fh);font-size:24px;font-weight:700;color:var(--text)">${c[1]}</span>
            </div>
            <div class="hr"></div>
            <ul class="bul">${c[3].map(it=>`<li style="font-size:14px;color:var(--text)">${it}</li>`).join('')}</ul>
          </div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 12: Value Proposition & Positioning Map
  (n, h) => {
    const props = [
      ['shield','Privacy nobody else offers','No number or name ever shown to the finder — a true category first locally.'],
      ['dollar','A tier for every budget','Rs. 199 sticker to Rs. 2,999 GPS keychain — one brand, four entry points.'],
      ['phone','Zero-friction for finders','No app download needed to return a lost item — just scan and message.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">VALUE PROPOSITION & POSITIONING</p>
      <h2 class="st an" style="--d:100ms">Where Vouch Stands in the Market</h2>
      <div class="two" style="margin-top:28px;flex:1">
        <div class="fl fc fg" style="justify-content:center">
          <div class="gc an" style="--d:200ms;background:var(--navy);border:none;padding:32px;box-shadow:0 12px 40px rgba(15,10,31,0.15)">
            <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--lav)">VALUE PROPOSITION</p>
            <p style="font-family:var(--fh);font-size:20px;color:#fff;font-style:italic;font-weight:700;line-height:1.5;margin-top:8px">"Protect everything you carry, without exposing who you are — at a price everyone can afford."</p>
          </div>
          <div class="fl fc fg2" style="margin-top:12px">
            ${props.map((p,i)=>`<div class="fl ac gap-20 an" style="--d:${300+i*100}ms">
              ${h.chip(p[0],'var(--purple)','#fff','48px')}
              <div>
                <p style="font-size:16px;font-weight:700;color:var(--text)">${p[1]}</p>
                <p style="font-size:13.5px;color:var(--muted);margin-top:2px">${p[2]}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
        <div class="gc an" style="--d:450ms;padding:32px">
          <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--purple)">POSITIONING MAP</p>
          <p style="font-size:13px;font-style:italic;color:var(--muted);margin-top:4px">Price vs. Privacy &amp; Smart-Tech Features</p>
          <div class="pm" style="margin-top:28px">
            <div class="dot" style="width:28px;height:28px;background:var(--purple);bottom:68%;right:22%;box-shadow:0 0 20px rgba(139,92,246,0.6)"></div>
            <div class="lbl" style="bottom:calc(68% + 32px);right:2%;font-weight:700;color:var(--purple-deep)">Vouch</div>
            <div class="dot" style="width:18px;height:18px;background:#9CA3AF;top:10%;right:10%"></div>
            <div class="lbl" style="top:calc(10% + 22px);right:4%">AirTag</div>
            <div class="dot" style="width:18px;height:18px;background:#9CA3AF;top:18%;right:18%"></div>
            <div class="lbl" style="top:calc(18% + 22px);right:12%">Tile</div>
            <div class="dot" style="width:18px;height:18px;background:#9CA3AF;bottom:8%;left:8%"></div>
            <div class="lbl" style="bottom:calc(8% - 24px);left:0%">Handwritten Tag</div>
            <span style="position:absolute;top:-24px;left:-8px;font-size:11px;color:var(--muted);font-weight:600">HIGH PRICE</span>
            <span style="position:absolute;bottom:-24px;left:-8px;font-size:11px;color:var(--muted);font-weight:600">LOW PRICE</span>
            <span style="position:absolute;bottom:-24px;left:8px;font-size:11px;color:var(--muted);font-weight:600">LOW PRIVACY / TECH</span>
            <span style="position:absolute;bottom:-24px;right:0;font-size:11px;color:var(--muted);font-weight:600">HIGH PRIVACY / TECH</span>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 13: Brand Elements
  (n, h) => {
    const bits = [
      ['award','Name & Symbol','"Vouch" signals trust and personal guarantee — the brand vouches for your belongings\' safe return. The V-mark logo reflects a checkmark of assurance.'],
      ['compass','Brand Personality','Trustworthy, modern, approachable and quietly clever — a tech brand that feels human, not corporate.'],
      ['star','Color Story','Deep navy conveys security & reliability; purple/lavender signal modern tech and privacy; gold accents mark premium moments.']
    ];
    return `<div class="sl dark">
      <div class="orb orb2" style="width:600px;height:600px;background:rgba(139,92,246,0.18);left:-200px;top:-200px"></div>
      <p class="ey an" style="--d:0ms">BRAND ELEMENTS</p>
      <h2 class="st an" style="--d:100ms;color:#fff">Logo, Slogan &amp; Brand Identity</h2>
      <div class="two" style="margin-top:28px;flex:1">
        <div class="gc dk an text-center" style="--d:200ms;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px">
          <img src="${h.LOGO}" alt="Logo" style="width:200px;height:200px;margin-bottom:24px;filter:drop-shadow(0 0 40px rgba(139,92,246,0.5))">
          <p style="font-family:var(--fh);font-size:26px;color:var(--gold);font-style:italic;font-weight:700">"Lost, But Never Gone."</p>
          <p style="font-size:12px;color:var(--onNm);letter-spacing:2px;margin-top:6px;font-weight:700">PRIMARY SLOGAN</p>
          <div class="divider" style="background:#3B3164;margin:20px 0;width:60%"></div>
          <p style="font-size:19px;color:var(--lav);font-style:italic">"Connect. Protect. Locate."</p>
          <p style="font-size:12px;color:var(--onNm);letter-spacing:2px;margin-top:6px;font-weight:700">SECONDARY TAGLINE</p>
        </div>
        <div class="fl fc fg">
          ${bits.map((b,i)=>`<div class="fl ac gap-20 an" style="--d:${300+i*120}ms">
            ${h.chip(b[0],'var(--lav)','var(--navy)','56px')}
            <div style="flex:1">
              <p style="font-size:18px;font-weight:700;color:#fff">${b[1]}</p>
              <p style="font-size:14px;color:var(--onNm);line-height:1.5;margin-top:6px">${b[2]}</p>
            </div>
          </div>`).join('')}
          <div class="gc dk an" style="--d:660ms;margin-top:auto">
            <p style="font-size:13px;color:var(--onNm)">Brand promise in one line:</p>
            <p style="font-family:var(--fh);font-size:18px;color:var(--lav);font-style:italic;margin-top:8px">Whatever you lose, Vouch keeps the door open to getting it back — safely and privately.</p>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 14: Pricing Strategy
  (n, h) => {
    const tiers = [
      ['tag','QR Sticker','Rs. 199','Entry-level value pricing',false],
      ['key','Classic Keychain','Rs. 299','Mid-tier branded product',false],
      ['volume','Whistle Keychain','Rs. 1,299','Premium unique feature',false],
      ['satellite','GPS Ring Keychain','Rs. 2,999','Flagship tech premium',true]
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">PRICING STRATEGY</p>
      <h2 class="st an" style="--d:100ms">Value-Based, Tiered &amp; Freemium Pricing</h2>
      <p class="sub an" style="--d:180ms">Hardware is priced by tier to match the value delivered and local purchasing power; the platform layers a freemium subscription on top for recurring revenue.</p>
      <div class="g g4 an" style="--d:250ms;margin-top:28px">
        ${tiers.map((t,i)=>`<div class="gc an ${t[4]?'dk':''}" style="--d:${300+i*100}ms;padding:24px 20px">
          ${h.chip(t[0],t[4]?'var(--navy3)':'var(--lp)',t[4]?'var(--gold)':'var(--purple)','48px')}
          <p style="font-size:16px;font-weight:700;margin-top:14px;${t[4]?'color:#fff':''}">${t[1]}</p>
          <p style="font-family:var(--fh);font-size:24px;font-weight:800;color:${t[4]?'var(--gold)':'var(--pd)'};margin-top:6px">${t[2]}</p>
          <p style="font-size:13px;font-style:italic;color:${t[4]?'var(--onNm)':'var(--muted)'};margin-top:4px">${t[3]}</p>
        </div>`).join('')}
      </div>
      <div class="g g2 an" style="--d:700ms;margin-top:28px;flex:1">
        <div class="gc" style="background:var(--lp);border-color:var(--lav);display:flex;flex-direction:column;justify-content:center">
          <div class="fl ac gap-16">
            ${h.chip('phone','var(--purple)','#fff','52px')}
            <p style="font-size:19px;font-weight:700;color:var(--text)">Platform: Freemium Subscription</p>
          </div>
          <p style="font-size:14.5px;line-height:1.6;margin-top:12px;color:var(--text)">Hardware is a one-time purchase. The free tier covers core scan-and-notify; premium subscription unlocks GPS live tracking history, multi-item family plans, and priority alerts.</p>
        </div>
        <div class="gc" style="background:var(--navy);border:none;display:flex;flex-direction:column;justify-content:center;box-shadow:0 12px 40px rgba(15,10,31,0.15)">
          <p style="font-size:13px;font-weight:700;letter-spacing:2px;color:var(--lav)">WHY THIS PRICING WORKS</p>
          <ul class="bul" style="margin-top:12px">
            <li style="color:var(--onN);font-size:14px">Tiered pricing captures budget buyers and premium spenders in one brand</li>
            <li style="color:var(--onN);font-size:14px">Freemium removes the barrier to first purchase and drives platform adoption</li>
            <li style="color:var(--onN);font-size:14px">Price bands stay well below AirTag/Tile even at the GPS flagship tier</li>
          </ul>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 15: Promotional Plan
  (n, h) => {
    const promos = [
      ['megaphone','Targeted Social Ads','Launch video campaigns on Instagram Reels and TikTok. Focus on relatable, high-panic scenarios (losing keys right before an exam) vs. the quick, secure Vouch return process.'],
      ['grad','Campus Ambassadors','Recruit students at major partner universities (FAST, NUST, LUMS). Empower them with free merchandise, exclusive discount codes, and local hostel-level giveaways.'],
      ['gift','Referral & Return Loops','Finders who successfully return an item receive a 10% coupon for their next Vouch purchase. Owners get free replacement tags for successfully referring two friends.'],
      ['briefcase','Co-Branding Deals','Partner with local bike dealerships, car showrooms, and high-end security firms to bundle custom-branded Vouch keychains directly with vehicle purchases.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">MARKETING COMMUNICATION</p>
      <h2 class="st an" style="--d:100ms">Integrated Promotional Plan (IMC)</h2>
      <p class="sub an" style="--d:180ms">Our promotional mix targets digital-native students and professionals through social proof, on-campus networks, and referral loops.</p>
      <div class="g g4 an" style="--d:250ms;margin-top:36px;flex:1">
        ${promos.map((p,i)=>`<div class="gc an" style="--d:${300+i*100}ms;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            ${h.chip(p[0],'var(--purple)','#fff','52px')}
            <div class="ct" style="font-size:19px;margin-top:20px">${p[1]}</div>
          </div>
          <div class="cd" style="font-size:13.5px;line-height:1.55;margin-top:12px">${p[2]}</div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 16: Distribution / Place
  (n, h) => {
    const channels = [
      ['globe','D2C E-Commerce Store','Our primary active sales channel. Customers buy directly from our fully optimized web platform (vouch-six-ebon.vercel.app). Supports instant ordering, Cash on Delivery (COD), card payments, and custom multi-pack configurations.',false],
      ['home','On-Campus Stalls','Setting up physical, student-run stalls at major universities (FAST, NUST, LUMS) during events, sports weeks, and exams. This allows direct hand-to-hand sales, face-to-face feedback, and instant brand activation.',false],
      ['store','Tech Outlets & Marketplaces','Stocking keychains in local electronics, smartphone accessories, and lifestyle stores. Establishing an official Vouch store on Daraz for wider country-wide logistics support.',true]
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">DISTRIBUTION CHANNELS</p>
      <h2 class="st an" style="--d:100ms">Distribution Strategy: Multi-Channel Accessibility</h2>
      <p class="sub an" style="--d:180ms">To drive quick adoption, Vouch uses a hybrid distribution strategy that combines frictionless D2C online shopping with localized physical touchpoints.</p>
      <div class="g g3 an" style="--d:250ms;margin-top:36px;flex:1">
        ${channels.map((c,i)=>`<div class="gc an" style="--d:${300+i*120}ms;display:flex;flex-direction:column;justify-content:space-between;position:relative">
          ${c[3]?'<div class="pill" style="background:var(--muted);color:#fff;position:absolute;top:-14px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:10px;box-shadow:0 4px 12px rgba(0,0,0,.15)">FUTURE COLLABORATIONS</div>':''}
          <div>
            ${h.chip(c[0],'var(--purple)','#fff','60px')}
            <div class="ct" style="font-size:22px;margin-top:20px">${c[1]}</div>
          </div>
          <div class="cd" style="font-size:14.5px;line-height:1.55;margin-top:16px">${c[2]}</div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 17: Competitive Analysis
  (n, h) => {
    const comp = [
      {name:'Vouch (Our Product)',dark:true,badge:'BEST CHOICE',items:[['qrcode','Price: Rs. 199 - 2,999','Extremely affordable local entry points'],['shield','Privacy: Encrypted','Masked secure web contact page'],['phone','Finder App: None Required','Simple camera QR scan to report'],['globe','Local Focus: High','Tailored shipping, support & pricing']]},
      {name:'Apple AirTag',dark:false,items:[['dollar','Price: Rs. 9,000 - 12,000+','Expensive single-item tracking'],['shield','Privacy: Medium (Apple ID)','Finder details linked to Apple system'],['phone','Finder App: None (NFC)','Uses native iOS/Android NFC reader'],['globe','Local Focus: Low','No localized support, high import markup']]},
      {name:'Tile Tracker',dark:false,items:[['dollar','Price: Rs. 6,000 - 8,000+','Premium Bluetooth tag pricing'],['shield','Privacy: Low (Direct Contact)','Exposes owner phone/email on scan'],['phone','Finder App: Required','Must install Tile app to report loss'],['globe','Local Focus: Low','No local service or customization']]},
      {name:'Traditional Keyring',dark:false,items:[['dollar','Price: Rs. 50 - 100','Negligible hardware cost'],['shield','Privacy: Zero (Raw Info)','Exposes phone number to strangers'],['phone','Finder App: None (Call)','Requires manual GSM phone call'],['globe','Local Focus: High (Manual)','Dependent entirely on local honesty']]}
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">COMPETITIVE POSITION</p>
      <h2 class="st an" style="--d:100ms">Competitive Landscape</h2>
      <p class="sub an" style="--d:180ms">While premium trackers exist, Vouch specifically targets the intersection of local affordability, user privacy, and frictionless finder adoption.</p>
      <div class="g g4 an" style="--d:250ms;margin-top:28px;flex:1">
        ${comp.map((c,i)=>`<div class="gc an ${c.dark?'dk':''}" style="--d:${300+i*100}ms;position:relative;display:flex;flex-direction:column;justify-content:space-between">
          ${c.badge?`<div class="pill" style="background:var(--purple);color:#fff;position:absolute;top:-14px;left:50%;transform:translateX(-50%);box-shadow:0 4px 12px rgba(139,92,246,0.3)">${c.badge}</div>`:''}
          <div>
            <p style="font-family:var(--fh);font-size:18px;font-weight:700;text-align:center;${c.dark?'color:var(--gold)':''}">${c.name}</p>
            <div class="hr" style="${c.dark?'background:#3B3164':''}"></div>
            <div class="fl fc fg3">
              ${c.items.map(it=>`<div class="fl ac gap-12">
                ${h.chip(it[0],c.dark?'var(--navy3)':'var(--lp)',c.dark?'var(--gold)':'var(--purple)','36px')}
                <div style="flex:1">
                  <p style="font-size:12.5px;font-weight:700;${c.dark?'color:#fff':''}">${it[1]}</p>
                  <p style="font-size:11px;color:${c.dark?'var(--onNm)':'var(--muted)'};line-height:1.2;margin-top:2px">${it[2]}</p>
                </div>
              </div>`).join('')}
            </div>
          </div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 18: Operational Challenges & Solutions
  (n, h) => {
    const chal = [
      ['1. Finder Engagement','Why would a stranger scan the tag? They have no strict obligation to return it.'],
      ['2. Battery Constraints (GPS)','Bluetooth and GPS modules drain coin cell battery power quickly, necessitating regular recharging/swaps.'],
      ['3. Hardware Sourcing','Sourcing microchips, high-quality plastic molds, and scratch-resistant QR surfaces locally is operationally difficult.']
    ];
    const miti = [
      ['1. Reward & Karma Prompts','Secure landing pages display instant finder reward vouchers, alongside a warm appeal to civic karma.'],
      ['2. Hybrid Battery Design','GPS keychain uses a magnetic USB-C rechargeable cell; Whistle uses simple, replaceable CR2032 coin batteries.'],
      ['3. Partnered Sourcing','Outsource initial sticker manufacturing and custom QR engraving to high-precision local printers; scale B2B chips gradually.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">RISK MANAGEMENT</p>
      <h2 class="st an" style="--d:100ms">Operational Challenges &amp; Solutions</h2>
      <p class="sub an" style="--d:180ms">Launching a hardware-software hybrid brand faces three distinct hurdles, each countered by a robust operational strategy.</p>
      <div class="two" style="margin-top:28px;flex:1">
        <div class="gc an" style="--d:300ms;background:#FDFCEF;border-color:#F5ECE1;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="fl ac gap-12 mb-12">
              ${h.chip('alert','#FEE8EB','var(--red)','48px')}
              <span style="font-family:var(--fh);font-size:22px;font-weight:700">Core Launch Challenges</span>
            </div>
            <div class="hr" style="background:#F2E2D5"></div>
            <div class="fl fc fg2" style="margin-top:16px">
              ${chal.map(c=>`<div>
                <p style="font-size:15px;font-weight:700;color:#C74D5A">${c[0]}</p>
                <p style="font-size:13.5px;color:var(--muted);margin-top:4px;line-height:1.45">${c[1]}</p>
              </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="gc an" style="--d:450ms;background:#EBFBF4;border-color:#DBF7EA;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="fl ac gap-12 mb-12">
              ${h.chip('check','#DDF7EB','var(--green)','48px')}
              <span style="font-family:var(--fh);font-size:22px;font-weight:700">Strategic Mitigations</span>
            </div>
            <div class="hr" style="background:#CBEFE0"></div>
            <div class="fl fc fg2" style="margin-top:16px">
              ${miti.map(m=>`<div>
                <p style="font-size:15px;font-weight:700;color:#15803D">${m[0]}</p>
                <p style="font-size:13.5px;color:var(--muted);margin-top:4px;line-height:1.45">${m[1]}</p>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 19: Future Roadmap
  (n, h) => {
    const phases = [
      ['rocket','Phase 1: Launch & Scale','Months 1–6','High-density university campus launches. Build 5,000+ local Classic & Whistle keychain sales; publish free Android/iOS companion apps; establish basic D2C distribution channels.'],
      ['layers','Phase 2: Product Extensions','Months 6–12','Introduce Vouch Pet Collars, Luggage Tags, and Passport Smart Sleeves. Roll out premium app subscription tiers (family group tracking, priority SMS scan alerts).'],
      ['building','Phase 3: B2B Enterprise','Year 2+','Launch Enterprise Asset Portal. Volume sales to corporate clients for tracking laptops, employee identity badges, and delivery logistics gear (bags, tablets).']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">STRATEGIC PLAN</p>
      <h2 class="st an" style="--d:100ms">Future Growth Roadmap</h2>
      <p class="sub an" style="--d:180ms">A structured three-phase plan to scale Vouch from campus-level keychains to a broad enterprise asset-tracking platform.</p>
      <div class="g g3 an" style="--d:250ms;margin-top:36px;flex:1">
        ${phases.map((p,i)=>`<div class="gc an" style="--d:${300+i*120}ms;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            ${h.chip(p[0],'var(--purple)','#fff','60px')}
            <div class="ct" style="font-size:22px;margin-top:20px">${p[1]}</div>
            <p style="font-size:16px;font-weight:700;color:var(--purple-deep);margin-top:8px">${p[2]}</p>
          </div>
          <div>
            <div class="hr"></div>
            <div class="cd" style="font-size:14px;line-height:1.55">${p[3]}</div>
          </div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 20: Conclusion & Takeaways
  (n, h) => {
    const pts = [
      ['bulb','Customer-Centric Innovation','Vouch solves an everyday pain point by blending hardware accessibility with robust web-based finder flows, removing all download barriers.'],
      ['trendup','Attractive Business Model','Combining one-time hardware tags with high-margin recurring app subscriptions creates a resilient, high-margin revenue model.'],
      ['rocket','Scalable Future Horizon','Starting with local students, the technology scales directly into travel accessories, B2B logistics tracking, pet tagging, and medical IDs.']
    ];
    return `<div class="sl dark text-center">
      <div class="orb orb2" style="width:500px;height:500px;background:rgba(109,40,217,0.2);right:-100px;bottom:-100px"></div>
      <div class="orb orb3" style="width:600px;height:600px;background:rgba(139,92,246,0.15);left:-200px;top:-150px"></div>
      <p class="ey an" style="--d:0ms">WRAP-UP &amp; TAKEAWAYS</p>
      <h2 class="st an" style="--d:100ms;color:#fff;font-size:48px">Conclusion: Why Vouch Wins</h2>
      <div class="g g3 an" style="--d:200ms;margin-top:36px;flex:1;max-height:480px">
        ${pts.map((p,i)=>`<div class="gc dk an" style="--d:${250+i*120}ms;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px">
          ${h.chip(p[0],'var(--navy3)','var(--gold)','64px')}
          <div class="ct" style="color:#fff;font-size:22px;margin-top:16px">${p[1]}</div>
          <div class="hr" style="background:#3B3164"></div>
          <div class="cd" style="font-size:14px;line-height:1.5">${p[2]}</div>
        </div>`).join('')}
      </div>
      <p class="an" style="--d:700ms;font-family:var(--fh);font-size:32px;color:var(--gold);font-style:italic;font-weight:700;margin-top:36px">"Lost, But Never Gone."</p>
      <p class="an" style="--d:850ms;font-size:16px;color:var(--onNm);letter-spacing:2px;margin-top:8px">Join us in building a smarter, privacy-first return network.</p>
      ${h.ftr(n)}
    </div>`;
  }
];
