// Slides 1-10 data
function footer(n) {
  return `<div class="slide-footer"><span>VOUCH &nbsp;•&nbsp; PRINCIPLES OF MARKETING</span><span>${String(n).padStart(2,'0')}</span></div>`;
}

function s1(n, h) {
  return `<div class="slide dark" style="align-items:center;justify-content:center;text-align:center">
  <div class="orb" style="width:600px;height:600px;background:var(--purple-deep);right:-100px;top:-150px"></div>
  <div class="orb" style="width:500px;height:500px;background:var(--purple);left:-150px;bottom:-100px"></div>
  <img src="${h.LOGO}" class="title-logo an" style="--d:0ms" alt="Vouch Logo">
  <p class="an" style="--d:200ms;font-size:15px;letter-spacing:3px;color:var(--lavender);font-weight:600;margin-top:28px">PRINCIPLES OF MARKETING — PROJECT PRESENTATION</p>
  <h1 class="an" style="--d:350ms;font-family:var(--fh);font-size:80px;font-weight:700;color:#fff;letter-spacing:4px;margin-top:8px">VOUCH</h1>
  <p class="an" style="--d:500ms;font-size:22px;color:var(--on-navy);margin-top:4px">Smart Lost &amp; Found Ecosystem</p>
  <p class="an" style="--d:650ms;font-family:var(--fh);font-size:20px;color:var(--gold);font-style:italic;margin-top:8px">"Lost, But Never Gone."</p>
  <div class="flex gap-24 an" style="--d:800ms;margin-top:36px">
    ${[['Umair Ul Hassan','221370060'],['M Waqas','221370068'],['Zunair','221400101'],['Huma Waris','251350074']].map(x=>`<div class="name-chip"><div class="nm">${x[0]}</div><div class="roll">Roll No. ${x[1]}</div></div>`).join('')}
  </div>
</div>`;
}

function s2(n, h) {
  const items = [
    ['search','Idea & Problem','Vouch overview, problem statement & survey insights'],
    ['bulb','Solution & Validation','The Vouch ecosystem flow & research methodology'],
    ['users','Market & Products','Global opportunity, target segments & 4-tier product line'],
    ['compass','STP & Branding','Segmentation, positioning map & brand visual identity'],
    ['dollar','Marketing Mix (4Ps)','Pricing strategy, promotion plan & distribution channels'],
    ['flag','Strategic Outlook','Competitive view, operational risks & growth roadmap'],
  ];
  return `<div class="slide dark">
  <div class="orb" style="width:700px;height:700px;background:var(--purple-deep);right:-200px;top:-250px"></div>
  <p class="eyebrow an" style="--d:0ms">WHAT WE'LL COVER</p>
  <h2 class="stitle an" style="--d:100ms;color:#fff">Presentation Agenda</h2>
  <div class="grid grid-3 an" style="--d:200ms;margin-top:24px;flex:1">
    ${items.map((it,i)=>`<div class="card dark-card an" style="--d:${250+i*100}ms">
      <div class="flex items-center gap-16">
        ${h.iconChip(it[0],'var(--navy3)','var(--lavender)','md')}
        <span style="font-family:var(--fh);font-size:22px;color:#48407A;font-weight:700">${String(i+1).padStart(2,'0')}</span>
      </div>
      <div class="card-title" style="color:#fff;margin-top:16px;font-size:20px">${it[1]}</div>
      <div class="card-desc" style="font-size:14px">${it[2]}</div>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s3(n, h) {
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">EXECUTIVE SUMMARY</p>
  <h2 class="stitle an" style="--d:100ms">What is Vouch?</h2>
  <div class="two-col" style="margin-top:12px">
    <div class="flex-col gap-24">
      <p class="an" style="--d:200ms;font-size:17px;line-height:1.65;color:var(--text)">Vouch is a <strong style="color:var(--purple-deep)">privacy-first Smart Lost &amp; Found ecosystem</strong> built around QR and GPS-enabled keychains. When someone loses a belonging, a finder simply scans the QR code — no app required — and the owner is notified instantly with time, location, and a secure message option, without ever revealing personal information.</p>
      <p class="an" style="--d:300ms;font-size:17px;line-height:1.65;color:var(--text)">Vouch sells <strong style="color:var(--purple-deep)">four products</strong> across price points — from an adhesive QR sticker to a premium GPS keychain — backed by a freemium app and website, serving students, professionals, families and travellers.</p>
      <div class="card an" style="--d:400ms;background:var(--navy);border:none;padding:28px 32px">
        <p style="font-family:var(--fh);font-size:26px;color:var(--gold);font-style:italic;font-weight:700">"Lost, But Never Gone."</p>
        <p style="font-size:15px;color:var(--on-navy);margin-top:6px">The core brand promise driving every product decision, message and interaction.</p>
      </div>
    </div>
    <div class="flex-col gap-20">
      ${[['4','Product tiers','tag'],['PKR 199–3,499','Price range','dollar'],['Freemium','Platform model','phone']].map((s,i)=>`<div class="card flex items-center gap-24 an" style="--d:${250+i*120}ms">
        ${h.iconChip(s[2],'var(--lavender-pale)','var(--purple)','lg')}
        <div><div class="stat-num">${s[0]}</div><div style="font-size:15px;color:var(--muted);margin-top:2px">${s[1]}</div></div>
      </div>`).join('')}
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s4(n, h) {
  const pains = [
    ['alert','Existing trackers (AirTag, Tile) require a smartphone, cost more, and raise privacy concerns for the finder.'],
    ['eye','Writing a phone number on a keychain exposes personal data to any stranger who finds it.'],
    ['globe','No affordable, privacy-focused, locally accessible solution exists in markets like Pakistan.'],
  ];
  const stats = [['Lose keys/wallet at least monthly','78%'],['Misplaced items inside own home/hostel','85%'],['Currently use no protection method','64%'],['Would try an affordable QR tag','71%']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">PROBLEM IDENTIFICATION</p>
  <h2 class="stitle an" style="--d:100ms">The Everyday Problem We're Solving</h2>
  <div class="two-col" style="margin-top:8px">
    <div class="flex-col gap-16">
      <p class="an" style="--d:200ms;font-size:17px;line-height:1.65">Losing keys, wallets, bags, or other everyday items is one of the most common and frustrating experiences — ranging from a minor inconvenience to a serious loss of IDs, passports, or medical items.</p>
      <div class="flex-col gap-12" style="margin-top:8px">
        ${pains.map((p,i)=>`<div class="flex items-center gap-16 an" style="--d:${300+i*100}ms">
          ${h.iconChip(p[0],'var(--lavender-pale)','var(--purple)','sm')}
          <p style="font-size:15px;line-height:1.5">${p[1]}</p>
        </div>`).join('')}
      </div>
    </div>
    <div class="card an" style="--d:400ms;background:var(--navy);border:none;flex:1">
      <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--lavender)">PRIMARY RESEARCH SNAPSHOT</p>
      <p style="font-size:13px;font-style:italic;color:var(--on-navy-m);margin-top:4px">Informal survey of ~40 students &amp; hostel residents</p>
      <div class="flex-col gap-12" style="margin-top:20px">
        ${stats.map((r,i)=>`<div class="flex items-center gap-16"><span style="font-family:var(--fh);font-size:34px;font-weight:700;color:var(--gold);min-width:80px">${r[1]}</span><span style="font-size:14px;color:#fff;line-height:1.4">${r[0]}</span></div>`).join('')}
      </div>
      <div class="divider" style="background:#3B3164;margin-top:16px"></div>
      <p style="font-size:12px;font-style:italic;color:var(--on-navy-m);margin-top:8px">Directional insight from our own research process — not a published statistic.</p>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s5(n, h) {
  const flow = [['tag','Attach','Stick a QR sticker or clip a keychain onto anything you value — keys, wallet, bag, laptop.'],['qrcode','Scan','A finder scans the QR with any phone camera. No app needed. They land on a private contact page.'],['bell','Reconnect','Owner gets an instant notification with time, location & a secure message — identity fully protected.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">PROPOSED SOLUTION</p>
  <h2 class="stitle an" style="--d:100ms">The Vouch Ecosystem</h2>
  <p class="subtitle an" style="--d:180ms">Not just a keychain — a complete privacy-first ecosystem. All products connect to one platform, share the same secure contact system, and deliver the same instant notification experience.</p>
  <div class="flex gap-24 items-center an" style="--d:300ms;margin-top:28px">
    ${flow.map((f,i)=>`<div class="card flex-1 text-center" style="padding:32px 24px">
      ${h.iconChip(f[0],'var(--purple)','#fff','lg')}
      <div class="card-title" style="font-size:22px">${f[1]}</div>
      <div class="card-desc" style="font-size:14px">${f[2]}</div>
    </div>${i<2?'<span style="font-size:32px;color:var(--lavender)">→</span>':''}`).join('')}
  </div>
  <div class="card an" style="--d:500ms;background:var(--navy);border:none;margin-top:28px;padding:28px 36px">
    <div class="flex items-center gap-24">
      ${h.iconChip('lock','var(--purple-deep)','#fff','lg')}
      <div><p style="font-family:var(--fh);font-size:22px;font-weight:700;color:#fff">Privacy-First Design — Vouch's Strongest Differentiator</p>
      <p style="font-size:15px;color:var(--on-navy);line-height:1.55;margin-top:6px">When a finder scans a Vouch QR, they see a secure contact page — never a real name, phone number, or address. The owner controls exactly what's shared.</p></div>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s6(n, h) {
  const steps = [['home','Personal Observation','In our own hostel rooms and homes, we repeatedly struggled to find car keys, bike keys, and house keys — this first-hand frustration was the spark for Vouch.'],['users','Peer Interviews','We discussed the problem informally with friends and classmates. Nearly everyone had a story of losing keys, wallets, or ID cards, often more than once.'],['clipboard','Informal Survey','We gathered quick feedback from ~40 students and hostel residents on frequency of loss, current coping habits, and willingness to pay for a solution.'],['search','Competitor Scan','We reviewed existing options — Apple AirTag, Tile, and handwritten phone-number tags — to understand pricing, privacy gaps, and accessibility issues.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">RESEARCH METHODOLOGY</p>
  <h2 class="stitle an" style="--d:100ms">How We Conducted Our Research</h2>
  <p class="subtitle an" style="--d:180ms;font-style:italic">Our research began with lived, everyday experience rather than a desk study — then we validated it with peers before designing the product.</p>
  <div class="grid grid-4 an" style="--d:250ms;margin-top:24px;flex:1">
    ${steps.map((s,i)=>`<div class="card an" style="--d:${300+i*100}ms">
      <div class="flex items-center justify-content: space-between">
        ${h.iconChip(s[0],'var(--purple)','#fff','md')}
        <span style="font-family:var(--fh);font-size:20px;color:var(--lavender);font-weight:700;margin-left:auto">${i+1}</span>
      </div>
      <div class="card-title" style="font-size:18px">${s[1]}</div>
      <div class="card-desc" style="font-size:14px">${s[2]}</div>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

function s7(n, h) {
  const facts = [['compass','Pakistan first','Initial geographic focus with clear scalability into other South Asian markets.'],['users','Universal need','Any person who carries keys, a wallet, a bag, or valuables is an addressable customer.'],['dollar','Price gap','Premium trackers price out students & everyday consumers — Vouch starts far lower.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">MARKET OPPORTUNITY</p>
  <h2 class="stitle an" style="--d:100ms">A Growing Market, an Underserved Segment</h2>
  <p class="subtitle an" style="--d:180ms">The global smart tracker category is valued in the hundreds of millions to low billions, with sustained double-digit CAGR through the early 2030s — but affordable, privacy-first solutions for developing markets remain thin.</p>
  <div class="two-col" style="margin-top:24px;flex:1">
    <div class="card an" style="--d:250ms;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <p style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:16px">Global Smart-Tracker Category — Directional Growth Curve</p>
      <div class="flex items-center gap-16" style="height:200px;align-items:flex-end">
        ${['Today','+2 yrs','+4 yrs','+6 yrs','+8 yrs'].map((l,i)=>{const h2=[100,140,190,250,320][i];return`<div class="text-center"><div style="width:80px;height:${h2}px;background:var(--purple);border-radius:8px 8px 0 0;transition:height .6s ease;"></div><p style="font-size:12px;color:var(--muted);margin-top:6px">${l}</p></div>`;}).join('')}
      </div>
    </div>
    <div class="flex-col gap-20">
      ${facts.map((f,i)=>`<div class="card flex items-center gap-20 an" style="--d:${350+i*120}ms">
        ${h.iconChip(f[0],'var(--purple)','#fff','md')}
        <div><p style="font-size:18px;font-weight:700">${f[1]}</p><p style="font-size:14px;color:var(--muted);line-height:1.5;margin-top:4px">${f[2]}</p></div>
      </div>`).join('')}
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s8(n, h) {
  const prods = [['tag','QR Sticker','Rs. 199','Weatherproof adhesive label. No battery. Best for minimalists & gifting.',false],['key','Classic Keychain','Rs. 299','Flagship branded keychain, premium build. Ideal for house, car & office keys.',false],['volume','Whistle Keychain','Rs. 1,299','Rings when it detects a whistle — no app needed. Great for items lost at home.',false],['satellite','GPS Ring Keychain','Rs. 2,999','Bluetooth + real GPS tracking. Remote ring & live map. For travellers & pros.',true]];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">PRODUCT LINE</p>
  <h2 class="stitle an" style="--d:100ms">Four Products, One Platform</h2>
  <div class="grid grid-4 an" style="--d:200ms;margin-top:16px;flex:1">
    ${prods.map((p,i)=>`<div class="card an text-center ${p[4]?'dark-card':''}" style="--d:${250+i*120}ms;padding:32px 20px;position:relative">
      ${p[4]?'<div class="pill an" style="--d:200ms;background:var(--gold);color:var(--navy);position:absolute;top:12px;left:50%;transform:translateX(-50%)">FLAGSHIP</div>':''}
      <div style="margin-top:${p[4]?'16px':'0'}">${h.iconChip(p[0],p[4]?'var(--navy3)':'var(--lavender-pale)',p[4]?'var(--gold)':'var(--purple)','lg')}</div>
      <div class="card-title" style="font-size:22px;${p[4]?'color:#fff':''}">${p[1]}</div>
      <p style="font-family:var(--fh);font-size:22px;font-weight:700;color:${p[4]?'var(--gold)':'var(--purple-deep)'};margin-top:6px">${p[2]}</p>
      <div class="divider" style="${p[4]?'background:#3B3164':''}"></div>
      <div class="card-desc" style="font-size:14px">${p[3]}</div>
    </div>`).join('')}
  </div>
  <p class="an" style="--d:700ms;font-size:14px;font-style:italic;color:var(--muted);margin-top:12px">All four connect to the same app & website: multi-item dashboard, Lost/Safe toggle, instant alerts, scan log, and secure finder messaging.</p>
  ${footer(n)}
</div>`;
}

function s9(n, h) {
  const segs = [['grad','Students','High risk of losing keys & bags. Price-sensitive, heavy smartphone users.'],['briefcase','Young Pros','Busy schedules, multiple keys. Value convenience & privacy.'],['home','Families','Parents tracking children school bags; elderly misplacing items.'],['plane','Travellers','High-value luggage & passports. Urgent GPS need.'],['building','Businesses','Employee keychains, office asset tags. Volume B2B.']];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">TARGET MARKET ANALYSIS</p>
  <h2 class="stitle an" style="--d:100ms">Who We're Building Vouch For</h2>
  <div class="grid grid-5 an" style="--d:200ms;margin-top:16px">
    ${segs.map((s,i)=>`<div class="card text-center an" style="--d:${250+i*80}ms">
      ${h.iconChip(s[0],'var(--purple)','#fff','md')}
      <div class="card-title" style="font-size:16px">${s[1]}</div>
      <div class="card-desc" style="font-size:13px">${s[2]}</div>
    </div>`).join('')}
  </div>
  <div class="card dark-card an" style="--d:650ms;margin-top:24px;padding:28px 36px">
    <div class="flex items-center gap-28">
      ${h.iconChip('grad','var(--lavender)','var(--navy)','xl')}
      <div>
        <p style="font-size:13px;font-weight:700;letter-spacing:2px;color:var(--lavender)">PERSONA SPOTLIGHT</p>
        <p style="font-family:var(--fh);font-size:24px;font-weight:700;color:#fff;margin-top:4px">"Ayesha, 20 — University Student"</p>
        <p style="font-size:15px;color:var(--on-navy);line-height:1.55;margin-top:8px">Lives in a university hostel; loses her room keys and student ID at least once a month. Owns a mid-range smartphone, is budget-conscious, and is highly active on Instagram/TikTok.</p>
        <p style="font-size:14px;font-style:italic;color:var(--gold);margin-top:8px">Goal: Never worry about a lost hostel key again — for under the price of a canteen meal.</p>
      </div>
    </div>
  </div>
  ${footer(n)}
</div>`;
}

function s10(n, h) {
  const quad = [
    {l:'Strengths',ic:'trendup',cls:'swot-s',color:'var(--green)',items:['Privacy-first design — unique differentiator vs. AirTag/Tile','Four-tier pricing fits nearly every budget (Rs. 199–2,999)','No-app-needed finder experience removes adoption friction','Whistle keychain is a genuinely unique, hard-to-copy feature']},
    {l:'Weaknesses',ic:'trenddown',cls:'swot-w',color:'var(--red)',items:['New, unfunded brand with zero market awareness','GPS edition depends on battery life & recharging habits','Manufacturing & QR-hardware costs at low volume','No physical retail presence yet at launch']},
    {l:'Opportunities',ic:'star',cls:'swot-o',color:'var(--gold)',items:['Underserved, price-sensitive market in Pakistan & South Asia','Expansion into pet tags, luggage tags, medical ID tags','University campus channel — low-cost, high-trust distribution','Freemium app can evolve into a B2B asset-tracking platform']},
    {l:'Threats',ic:'alerttri',cls:'swot-t',color:'var(--purple-deep)',items:['Global players (Apple, Samsung, Tile) could enter or cut prices','Low-cost local counterfeits / copycat QR tags','Consumer trust barrier around a new privacy-tech brand','Currency & import-cost volatility affecting hardware margins']},
  ];
  return `<div class="slide light">
  <p class="eyebrow an" style="--d:0ms">STRATEGIC ANALYSIS</p>
  <h2 class="stitle an" style="--d:100ms">SWOT Analysis</h2>
  <div class="grid grid-2 an" style="--d:200ms;margin-top:12px;flex:1">
    ${quad.map((q,i)=>`<div class="card an ${q.cls}" style="--d:${250+i*120}ms;border-width:2px">
      <div class="flex items-center gap-12 mb-12">${h.iconChip(q.ic,q.color,'#fff','sm')}<span style="font-family:var(--fh);font-size:22px;font-weight:700">${q.l}</span></div>
      <ul class="bullet-list">${q.items.map(it=>`<li style="font-size:14px">${it}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>
  ${footer(n)}
</div>`;
}

module.exports = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10];
