// Slides 11-20 data
function footer(n) {
  return `<div class="slide-footer"><span>VOUCH &nbsp;•&nbsp; PRINCIPLES OF MARKETING</span><span>${String(n).padStart(2,'0')}</span></div>`;
}

function s11(n, h) {
  const stp = [['layers','Segmentation','var(--purple)',['Demographic: students, young professionals, families, travellers, businesses','Geographic: Pakistan first, scalable to South Asia','Psychographic: privacy-conscious & budget-conscious buyers','Behavioural: frequent losers of keys/wallets/bags']],['target','Targeting','var(--purple-deep)',['Primary: students & young professionals — highest loss frequency, price-sensitive','Secondary: families & travellers — willing to pay more for GPS peace-of-mind','Tertiary: businesses — B2B volume orders for staff & asset tags','Differentiated targeting strategy across the 4-tier product line']],['compass','Positioning','var(--gold)',['"The privacy-first, affordable smart keychain for everyday people"','Positioned below AirTag/Tile on price, above them on finder-privacy','Positioned above traditional handwritten tags on trust & technology','Owns the local, culturally-relevant, no-app-needed experience']]];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">MARKETING STRATEGY</p>
  <h2 class="stitle an" style="--d:100ms">Segmentation, Targeting &amp; Positioning</h2>
  <div class="grid grid-3 an" style="--d:200ms;margin-top:16px;flex:1">
    ${stp.map((c,i)=>`<div class="card an" style="--d:${250+i*120}ms">
      <div class="flex items-center gap-12">${h.iconChip(c[0],c[2],'#fff','md')}<span style="font-family:var(--fh);font-size:24px;font-weight:700">${c[1]}</span></div>
      <div class="divider"></div>
      <ul class="bullet-list">${c[3].map(it=>`<li style="font-size:14px">${it}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s12(n, h) {
  const props = [['shield','Privacy nobody else offers','No number or name ever shown to the finder — a true category first locally.'],['dollar','A tier for every budget','Rs. 199 sticker to Rs. 2,999 GPS keychain — one brand, four entry points.'],['phone','Zero-friction for finders','No app download needed to return a lost item — just scan and message.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">VALUE PROPOSITION & POSITIONING</p>
  <h2 class="stitle an" style="--d:100ms">Where Vouch Stands in the Market</h2>
  <div class="two-col" style="margin-top:12px;flex:1">
    <div class="flex-col gap-20">
      <div class="card an" style="--d:200ms;background:var(--navy);border:none">
        <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--lavender)">VALUE PROPOSITION</p>
        <p style="font-family:var(--fh);font-size:19px;color:#fff;font-style:italic;font-weight:700;line-height:1.45;margin-top:8px">"Protect everything you carry, without exposing who you are — at a price everyone can afford."</p>
      </div>
      ${props.map((p,i)=>`<div class="flex items-center gap-16 an" style="--d:${300+i*100}ms">
        ${h.iconChip(p[0],'var(--purple)','#fff','sm')}
        <div><p style="font-size:16px;font-weight:700">${p[1]}</p><p style="font-size:13px;color:var(--muted);margin-top:2px">${p[2]}</p></div>
      </div>`).join('')}
    </div>
    <div class="card an" style="--d:450ms">
      <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--purple)">POSITIONING MAP</p>
      <p style="font-size:13px;font-style:italic;color:var(--muted);margin-top:4px">Price vs. Privacy &amp; Smart-Tech Features</p>
      <div class="pos-map" style="margin-top:16px">
        <div class="pos-dot" style="width:24px;height:24px;background:var(--purple);bottom:68%;right:22%;box-shadow:0 0 16px rgba(139,92,246,.5)"></div>
        <div class="pos-label" style="bottom:calc(68% + 28px);right:2%">Vouch</div>
        <div class="pos-dot" style="width:16px;height:16px;background:#9CA3AF;top:10%;right:10%"></div>
        <div class="pos-label" style="top:calc(10% + 20px);right:-10%">AirTag</div>
        <div class="pos-dot" style="width:16px;height:16px;background:#9CA3AF;top:18%;right:18%"></div>
        <div class="pos-label" style="top:calc(18% + 20px);right:0%">Tile</div>
        <div class="pos-dot" style="width:16px;height:16px;background:#9CA3AF;bottom:8%;left:8%"></div>
        <div class="pos-label" style="bottom:calc(8% - 24px);left:-10%">Handwritten Tag</div>
        <span style="position:absolute;top:-22px;left:-8px;font-size:11px;color:var(--muted)">HIGH PRICE</span>
        <span style="position:absolute;bottom:-22px;left:-8px;font-size:11px;color:var(--muted)">LOW PRICE</span>
        <span style="position:absolute;bottom:-22px;left:8px;font-size:11px;color:var(--muted)">LOW TECH</span>
        <span style="position:absolute;bottom:-22px;right:0;font-size:11px;color:var(--muted)">HIGH TECH</span>
      </div>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s13(n, h) {
  const bits = [['award','Name & Symbol','"Vouch" signals trust and personal guarantee — the brand vouches for your belongings\' safe return.'],['compass','Brand Personality','Trustworthy, modern, approachable and quietly clever — a tech brand that feels human, not corporate.'],['star','Color Story','Deep navy conveys security; purple/lavender signal modern tech and privacy; gold accents mark premium moments.']];
  return `<div class="slide dark">
  <div class="orb" style="width:600px;height:600px;background:var(--purple-deep);left:-200px;top:-200px"></div>
  <p class="eyebrow an" style="--d:0ms">BRAND ELEMENTS</p>
  <h2 class="stitle an" style="--d:100ms;color:#fff">Logo, Slogan &amp; Brand Identity</h2>
  <div class="two-col" style="margin-top:12px;flex:1">
    <div class="card dark-card an text-center" style="--d:200ms;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px">
      <img src="${h.LOGO}" alt="Logo" style="width:200px;height:200px;margin-bottom:20px;filter:drop-shadow(0 0 30px rgba(139,92,246,.4))">
      <p style="font-family:var(--fh);font-size:24px;color:var(--gold);font-style:italic;font-weight:700">"Lost, But Never Gone."</p>
      <p style="font-size:12px;color:var(--on-navy-m);letter-spacing:1.5px;margin-top:4px">PRIMARY SLOGAN</p>
      <div class="divider" style="background:#3B3164;margin:16px 0;width:60%"></div>
      <p style="font-size:18px;color:var(--lavender);font-style:italic">"Connect. Protect. Locate."</p>
      <p style="font-size:12px;color:var(--on-navy-m);letter-spacing:1.5px;margin-top:4px">SECONDARY TAGLINE</p>
    </div>
    <div class="flex-col gap-16">
      ${bits.map((b,i)=>`<div class="flex items-center gap-16 an" style="--d:${300+i*120}ms">
        ${h.iconChip(b[0],'var(--lavender)','var(--navy)','md')}
        <div><p style="font-size:18px;font-weight:700;color:#fff">${b[1]}</p><p style="font-size:14px;color:var(--on-navy-m);line-height:1.5;margin-top:4px">${b[2]}</p></div>
      </div>`).join('')}
      <div class="card dark-card an" style="--d:660ms;margin-top:auto">
        <p style="font-size:13px;color:var(--on-navy-m)">Brand promise in one line:</p>
        <p style="font-family:var(--fh);font-size:18px;color:var(--lavender);font-style:italic;margin-top:6px">Whatever you lose, Vouch keeps the door open to getting it back — safely and privately.</p>
      </div>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s14(n, h) {
  const tiers = [['tag','QR Sticker','Rs. 199','Entry-level value pricing',false],['key','Classic Keychain','Rs. 299','Mid-tier, everyday branded product',false],['volume','Whistle Keychain','Rs. 1,299','Premium for a unique feature',false],['satellite','GPS Ring Keychain','Rs. 2,999','Flagship, tech-driven premium',true]];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">PRICING STRATEGY</p>
  <h2 class="stitle an" style="--d:100ms">Value-Based, Tiered &amp; Freemium Pricing</h2>
  <p class="subtitle an" style="--d:180ms">Hardware is priced by tier to match the value delivered; the platform layers a freemium subscription on top for recurring revenue.</p>
  <div class="grid grid-4 an" style="--d:250ms;margin-top:20px">
    ${tiers.map((t,i)=>`<div class="card an ${t[4]?'dark-card':''}" style="--d:${300+i*100}ms">
      ${h.iconChip(t[0],t[4]?'var(--navy3)':'var(--lavender-pale)',t[4]?'var(--gold)':'var(--purple)','md')}
      <p style="font-size:16px;font-weight:700;margin-top:10px;${t[4]?'color:#fff':''}">${t[1]}</p>
      <p style="font-family:var(--fh);font-size:22px;font-weight:700;color:${t[4]?'var(--gold)':'var(--purple-deep)'};margin-top:4px">${t[2]}</p>
      <p style="font-size:13px;font-style:italic;color:${t[4]?'var(--on-navy-m)':'var(--muted)'};margin-top:4px">${t[3]}</p>
    </div>`).join('')}
  </div>
  <div class="grid grid-2 an" style="--d:700ms;margin-top:20px">
    <div class="card" style="background:var(--lavender-pale);border-color:var(--lavender-pale)">
      <div class="flex items-center gap-12">${h.iconChip('phone','var(--purple)','#fff','sm')}<p style="font-size:18px;font-weight:700">Platform: Freemium Subscription</p></div>
      <p style="font-size:14px;line-height:1.55;margin-top:10px">Free tier covers core scan-and-notify; premium subscription unlocks GPS live tracking history, multi-item family plans, and priority alerts.</p>
    </div>
    <div class="card" style="background:var(--navy);border:none">
      <p style="font-size:13px;font-weight:700;letter-spacing:2px;color:var(--lavender)">WHY THIS PRICING WORKS</p>
      <ul class="bullet-list" style="margin-top:10px"><li style="color:var(--on-navy);font-size:14px">Tiered pricing captures budget buyers and premium spenders in one brand</li><li style="color:var(--on-navy);font-size:14px">Freemium removes the barrier to first purchase</li><li style="color:var(--on-navy);font-size:14px">Price bands stay well below AirTag/Tile even at the flagship tier</li></ul>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s15(n, h) {
  const promos = [['megaphone','Targeted Social Ads','Launch video campaigns on Instagram Reels and TikTok. Focus on relatable, high-panic scenarios vs. the quick, secure Vouch return process.'],['grad','Campus Ambassadors','Recruit students at FAST, NUST, LUMS. Free merchandise, exclusive discount codes, and hostel-level giveaways.'],['gift','Referral & Return Loops','Finders who return an item get a 10% coupon. Owners get free replacement tags for referring two friends.'],['briefcase','Co-Branding Deals','Partner with bike dealerships, car showrooms, and security firms to bundle custom-branded Vouch keychains with purchases.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">MARKETING COMMUNICATION</p>
  <h2 class="stitle an" style="--d:100ms">Integrated Promotional Plan (IMC)</h2>
  <p class="subtitle an" style="--d:180ms">Our promotional mix targets digital-native students and professionals through social proof, on-campus networks, and referral loops.</p>
  <div class="grid grid-4 an" style="--d:250ms;margin-top:20px;flex:1">
    ${promos.map((p,i)=>`<div class="card an" style="--d:${300+i*100}ms">
      ${h.iconChip(p[0],'var(--purple)','#fff','md')}
      <div class="card-title" style="font-size:19px">${p[1]}</div>
      <div class="card-desc" style="font-size:14px">${p[2]}</div>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s16(n, h) {
  const channels = [['globe','D2C E-Commerce Store','Our primary active channel. Customers buy directly from our web platform (vouch-six-ebon.vercel.app). Supports ordering, COD, card payments, and multi-pack configurations.',false],['home','On-Campus Stalls','Student-run physical stalls at universities (FAST, NUST, LUMS) during events, sports weeks, and exams. Direct hand-to-hand sales, face-to-face feedback, and instant brand activation.',false],['store','Tech Outlets & Marketplaces','Stocking keychains in local electronics, smartphone accessories, and lifestyle stores. Establishing an official Vouch store on Daraz for wider logistics.',true]];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">DISTRIBUTION CHANNELS</p>
  <h2 class="stitle an" style="--d:100ms">Distribution Strategy: Multi-Channel Accessibility</h2>
  <p class="subtitle an" style="--d:180ms">Vouch uses a hybrid distribution strategy combining frictionless D2C online shopping with localized physical touchpoints.</p>
  <div class="grid grid-3 an" style="--d:250ms;margin-top:20px;flex:1">
    ${channels.map((c,i)=>`<div class="card an" style="--d:${300+i*120}ms;position:relative">
      ${c[3]?'<div class="pill" style="background:var(--muted);color:#fff;position:absolute;top:-14px;left:50%;transform:translateX(-50%);white-space:nowrap">FUTURE COLLABORATIONS</div>':''}
      ${h.iconChip(c[0],'var(--purple)','#fff','lg')}
      <div class="card-title" style="font-size:22px">${c[1]}</div>
      <div class="card-desc" style="font-size:15px">${c[2]}</div>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s17(n, h) {
  const comp = [
    {name:'Vouch (Our Product)',dark:true,badge:'BEST CHOICE',items:[['qrcode','Price: Rs. 199 - 2,999','Affordable local entry points'],['shield','Privacy: Encrypted','Masked secure web contact page'],['phone','Finder App: None','Simple camera QR scan'],['globe','Local Focus: High','Tailored support & pricing']]},
    {name:'Apple AirTag',dark:false,items:[['dollar','Price: Rs. 9K - 12K+','Expensive single-item tracking'],['shield','Privacy: Medium','Linked to Apple ID system'],['phone','Finder App: None (NFC)','iOS/Android NFC reader'],['globe','Local Focus: Low','No local support']]},
    {name:'Tile Tracker',dark:false,items:[['dollar','Price: Rs. 6K - 8K+','Premium Bluetooth tag'],['shield','Privacy: Low','Exposes phone/email'],['phone','Finder App: Required','Must install Tile app'],['globe','Local Focus: Low','No local service']]},
    {name:'Traditional Keyring',dark:false,items:[['dollar','Price: Rs. 50 - 100','Negligible cost'],['shield','Privacy: Zero','Exposes phone number'],['phone','App: None (Call)','Manual GSM call'],['globe','Local: High (Manual)','Depends on honesty']]},
  ];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">COMPETITIVE POSITION</p>
  <h2 class="stitle an" style="--d:100ms">Competitive Landscape</h2>
  <p class="subtitle an" style="--d:180ms">Vouch targets the intersection of local affordability, user privacy, and frictionless finder adoption.</p>
  <div class="grid grid-4 an" style="--d:250ms;margin-top:16px;flex:1">
    ${comp.map((c,i)=>`<div class="card an ${c.dark?'dark-card':''}" style="--d:${300+i*100}ms;position:relative">
      ${c.badge?`<div class="pill" style="background:var(--purple);color:#fff;position:absolute;top:-14px;left:50%;transform:translateX(-50%)">${c.badge}</div>`:''}
      <p style="font-family:var(--fh);font-size:17px;font-weight:700;text-align:center;${c.dark?'color:var(--gold)':''}">${c.name}</p>
      <div class="divider" style="${c.dark?'background:#3B3164':''}"></div>
      ${c.items.map(it=>`<div class="flex items-center gap-10" style="margin-top:10px">
        ${h.iconChip(it[0],c.dark?'var(--navy3)':'var(--lavender-pale)',c.dark?'var(--gold)':'var(--purple)','sm')}
        <div><p style="font-size:13px;font-weight:700;${c.dark?'color:#fff':''}">${it[1]}</p><p style="font-size:12px;color:${c.dark?'var(--on-navy-m)':'var(--muted)'}">${it[2]}</p></div>
      </div>`).join('')}
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s18(n, h) {
  const chal = [['1. Finder Engagement','Why would a stranger scan the tag? No strict obligation to return.'],['2. Battery Constraints','Bluetooth & GPS drain coin cells, needing regular recharging.'],['3. Hardware Manufacturing','Sourcing chips, molds, and QR surfaces locally is difficult.']];
  const miti = [['1. Reward & Karma Prompts','Secure pages display instant finder reward vouchers + civic karma appeal.'],['2. Hybrid Battery Design','GPS uses magnetic USB-C rechargeable; Whistle uses replaceable CR2032.'],['3. Partnered Sourcing','Outsource sticker manufacturing to local high-precision printers.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">RISK MANAGEMENT</p>
  <h2 class="stitle an" style="--d:100ms">Operational Challenges &amp; Solutions</h2>
  <p class="subtitle an" style="--d:180ms">Launching a hardware-software hybrid brand faces three distinct hurdles, each countered by a robust operational strategy.</p>
  <div class="grid grid-2 an" style="--d:250ms;margin-top:20px;flex:1">
    <div class="card an" style="--d:300ms;background:#FDFCEF;border-color:#F5ECE1">
      <div class="flex items-center gap-12 mb-12">${h.iconChip('alert','#FEE8EB','var(--red)','md')}<span style="font-family:var(--fh);font-size:22px;font-weight:700">Core Launch Challenges</span></div>
      <div class="divider" style="background:#F2E2D5"></div>
      ${chal.map(c=>`<div style="margin-top:12px"><p style="font-size:16px;font-weight:700;color:#C74D5A">${c[0]}</p><p style="font-size:14px;color:var(--muted);margin-top:2px">${c[1]}</p></div>`).join('')}
    </div>
    <div class="card an" style="--d:450ms;background:#EBFBF4;border-color:#DBF7EA">
      <div class="flex items-center gap-12 mb-12">${h.iconChip('check','#DDF7EB','var(--green)','md')}<span style="font-family:var(--fh);font-size:22px;font-weight:700">Strategic Mitigations</span></div>
      <div class="divider" style="background:#CBEFE0"></div>
      ${miti.map(m=>`<div style="margin-top:12px"><p style="font-size:16px;font-weight:700;color:#15803D">${m[0]}</p><p style="font-size:14px;color:var(--muted);margin-top:2px">${m[1]}</p></div>`).join('')}
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s19(n, h) {
  const phases = [['rocket','Phase 1: Launch & Scale','Months 1–6','High-density university campus launches. Build 5,000+ local keychain sales; publish free companion apps; establish D2C distribution channels.'],['layers','Phase 2: Product Extensions','Months 6–12','Introduce Vouch Pet Collars, Luggage Tags, and Passport Smart Sleeves. Roll out premium app subscription tiers.'],['building','Phase 3: B2B Enterprise','Year 2+','Launch Enterprise Asset Portal. Volume sales to corporate clients for tracking laptops, badges, and delivery gear.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">STRATEGIC PLAN</p>
  <h2 class="stitle an" style="--d:100ms">Future Growth Roadmap</h2>
  <p class="subtitle an" style="--d:180ms">A structured three-phase plan to scale Vouch from campus-level keychains to a broad enterprise asset-tracking platform.</p>
  <div class="grid grid-3 an" style="--d:250ms;margin-top:24px;flex:1">
    ${phases.map((p,i)=>`<div class="card an" style="--d:${300+i*120}ms">
      ${h.iconChip(p[0],'var(--purple)','#fff','lg')}
      <div class="card-title" style="font-size:22px">${p[1]}</div>
      <p style="font-size:16px;font-weight:700;color:var(--purple-deep);margin-top:6px">${p[2]}</p>
      <div class="divider"></div>
      <div class="card-desc" style="font-size:15px">${p[3]}</div>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s20(n, h) {
  const pts = [['bulb','Customer-Centric Innovation','Vouch solves an everyday pain point by blending hardware accessibility with robust web-based finder flows, removing all download barriers.'],['trendup','Attractive Business Model','Combining one-time hardware tags with high-margin recurring app subscriptions creates a resilient revenue model.'],['rocket','Scalable Future Horizon','Starting with local students, the technology scales into travel accessories, B2B logistics tracking, pet tagging, and medical IDs.']];
  return `<div class="slide dark" style="text-align:center">
  <div class="orb" style="width:500px;height:500px;background:var(--purple-deep);right:-100px;bottom:-100px"></div>
  <div class="orb" style="width:600px;height:600px;background:var(--purple);left:-200px;top:-150px"></div>
  <p class="eyebrow an" style="--d:0ms">WRAP-UP & TAKEAWAYS</p>
  <h2 class="stitle an" style="--d:100ms;color:#fff;font-size:44px">Conclusion: Why Vouch Wins</h2>
  <div class="grid grid-3 an" style="--d:200ms;margin-top:24px;flex:1;max-height:500px">
    ${pts.map((p,i)=>`<div class="card dark-card an" style="--d:${250+i*120}ms;text-align:center;display:flex;flex-direction:column;align-items:center">
      ${h.iconChip(p[0],'var(--navy3)','var(--gold)','lg')}
      <div class="card-title" style="color:#fff;font-size:22px">${p[1]}</div>
      <div class="divider" style="background:#3B3164"></div>
      <div class="card-desc" style="font-size:14px">${p[2]}</div>
    </div>`).join('')}
  </div>
  <p class="an" style="--d:700ms;font-family:var(--fh);font-size:28px;color:var(--gold);font-style:italic;font-weight:700;margin-top:24px">"Lost, But Never Gone."</p>
  <p class="an" style="--d:850ms;font-size:16px;color:var(--on-navy-m);letter-spacing:1.5px;margin-top:8px">Join us in building a smarter, privacy-first return network.</p>
  ${footer(n)}
</div>`;
}

module.exports = [s11,s12,s13,s14,s15,s16,s17,s18,s19,s20];
