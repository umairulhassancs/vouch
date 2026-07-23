// Premium Slides 1-10 (Idea Intro, Problem, Solution, Research, Market, Products, SWOT)
module.exports = [
  // Slide 1: Title Slide
  (n, h) => `<div class="sl dark flex ac jc tc">
    <div class="orb" style="width:600px;height:600px;background:rgba(139,92,246,0.25);right:-100px;top:-150px"></div>
    <div class="orb orb2" style="width:500px;height:500px;background:rgba(109,40,217,0.2);left:-150px;bottom:-100px"></div>
    <div class="hero-ring" style="width:400px;height:400px;top:calc(50% - 200px);left:calc(50% - 200px)"></div>
    <div class="an" style="--d:0ms">
      <img src="${h.LOGO}" class="hero-logo" alt="Vouch Logo" style="width:160px;height:160px;margin-bottom:24px">
    </div>
    <p class="an" style="--d:200ms;font-size:14px;letter-spacing:4px;color:var(--lav);font-weight:700;margin-top:12px">PRINCIPLES OF MARKETING — PROJECT PRESENTATION</p>
    <h1 class="an grad-text" style="--d:350ms;font-family:var(--fh);font-size:84px;font-weight:800;letter-spacing:4px;margin-top:12px">VOUCH</h1>
    <p class="an" style="--d:500ms;font-size:24px;color:var(--onN);margin-top:8px;font-weight:300">Smart Lost &amp; Found Ecosystem</p>
    <p class="an" style="--d:650ms;font-family:var(--fh);font-size:21px;color:var(--gold);font-style:italic;margin-top:12px">"Lost, But Never Gone."</p>
    <div class="flex gap-24 an ac jc" style="--d:800ms;margin-top:44px">
      ${[['Umair Ul Hassan','221370060'],['M Waqas','221370068'],['Zunair','221400101'],['Huma Waris','251350074']].map(x=>`<div class="nm-chip"><div class="nm">${x[0]}</div><div class="roll">Roll No. ${x[1]}</div></div>`).join('')}
    </div>
  </div>`,

  // Slide 2: Presentation Agenda
  (n, h) => {
    const items = [
      ['search','Idea & Problem','Vouch overview, problem statement & survey insights'],
      ['bulb','Solution & Validation','The Vouch ecosystem flow & research methodology'],
      ['users','Market & Products','Global opportunity, target segments & 4-tier product line'],
      ['compass','STP & Branding','Segmentation, positioning map & brand visual identity'],
      ['dollar','Marketing Mix (4Ps)','Pricing strategy, promotion plan & distribution channels'],
      ['flag','Strategic Outlook','Competitive view, operational risks & growth roadmap'],
    ];
    return `<div class="sl dark">
      <div class="orb orb3" style="width:700px;height:700px;background:rgba(109,40,217,0.15);right:-200px;top:-250px"></div>
      <p class="ey an" style="--d:0ms">WHAT WE'LL COVER</p>
      <h2 class="st an" style="--d:100ms;color:#fff">Presentation Agenda</h2>
      <div class="g g3 an" style="--d:200ms;margin-top:36px;flex:1">
        ${items.map((it,i)=>`<div class="gc dk an" style="--d:${250+i*100}ms;display:flex;flex-direction:column;justify-content:space-between">
          <div class="fl sb ac">
            ${h.chip(it[0],'var(--navy3)','var(--lav)','56px')}
            <span style="font-family:var(--fh);font-size:24px;color:#48407A;font-weight:800">${String(i+1).padStart(2,'0')}</span>
          </div>
          <div style="margin-top:20px">
            <div class="ct" style="color:#fff;font-size:21px;font-weight:700;margin-top:0">${it[1]}</div>
            <div class="cd" style="font-size:14px;margin-top:8px;line-height:1.5">${it[2]}</div>
          </div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 3: Executive Summary
  (n, h) => `<div class="sl light">
    <p class="ey an" style="--d:0ms">EXECUTIVE SUMMARY</p>
    <h2 class="st an" style="--d:100ms">What is Vouch?</h2>
    <div class="two" style="margin-top:24px;flex:1">
      <div class="fl fc fg" style="justify-content:center">
        <p class="an" style="--d:200ms;font-size:18px;line-height:1.7;color:var(--text)">Vouch is a <strong style="color:var(--pd);font-weight:700">privacy-first Smart Lost &amp; Found ecosystem</strong> built around QR and GPS-enabled keychains. When someone loses a belonging, a finder simply scans the QR code — no app required — and the owner is notified instantly with time, location, and a secure message option, without ever revealing personal information to the finder.</p>
        <p class="an" style="--d:300ms;font-size:18px;line-height:1.7;color:var(--text)">Vouch sells <strong style="color:var(--pd);font-weight:700">four products</strong> across price points — from an adhesive QR sticker to a premium GPS keychain — backed by a freemium app and website, serving students, professionals, families and travellers.</p>
        <div class="gc an" style="--d:400ms;background:var(--navy);border:none;padding:28px 36px;margin-top:12px;box-shadow:0 12px 40px rgba(15,10,31,0.15)">
          <p style="font-family:var(--fh);font-size:28px;color:var(--gold);font-style:italic;font-weight:700">"Lost, But Never Gone."</p>
          <p style="font-size:14px;color:var(--onN);margin-top:8px;line-height:1.5">The core brand promise driving every product decision, message and interaction.</p>
        </div>
      </div>
      <div class="fl fc fg" style="justify-content:center">
        ${[['4','Product tiers','tag'],['PKR 199–3,499','Price range','dollar'],['Freemium','Platform model','phone']].map((s,i)=>`<div class="gc glow flex ac gap-24 an" style="--d:${250+i*120}ms;padding:24px 32px">
          ${h.chip(s[2],'var(--lp)','var(--purple)','64px')}
          <div>
            <div class="sn" style="font-size:36px;color:var(--text)">${s[0]}</div>
            <div style="font-size:15px;color:var(--muted);margin-top:4px;font-weight:500">${s[1]}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    ${h.ftr(n)}
  </div>`,

  // Slide 4: Problem Identification
  (n, h) => {
    const pains = [
      ['alert','Existing trackers (AirTag, Tile) require a smartphone, cost more, and raise privacy concerns for the finder.'],
      ['eye','Writing a phone number on a keychain exposes personal data to any stranger who finds it.'],
      ['globe','No affordable, privacy-focused, locally accessible solution exists in markets like Pakistan.'],
    ];
    const stats = [
      ['Lose keys/wallet at least monthly','78%'],
      ['Misplaced items inside own home/hostel','85%'],
      ['Currently use no protection method','64%'],
      ['Would try an affordable QR tag','71%']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">PROBLEM IDENTIFICATION</p>
      <h2 class="st an" style="--d:100ms">The Everyday Problem We're Solving</h2>
      <div class="two" style="margin-top:24px;flex:1">
        <div class="fl fc fg" style="justify-content:center">
          <p class="an" style="--d:200ms;font-size:18px;line-height:1.7;color:var(--text)">Losing keys, wallets, bags, or other everyday items is one of the most common and frustrating experiences people face — ranging from a minor inconvenience to a serious loss of IDs, passports, or medical items.</p>
          <div class="fl fc fg2" style="margin-top:16px">
            ${pains.map((p,i)=>`<div class="fl ac gap-24 an" style="--d:${300+i*100}ms">
              ${h.chip(p[0],'var(--lp)','var(--purple)','48px')}
              <p style="font-size:16px;line-height:1.5;color:var(--text);flex:1">${p[1]}</p>
            </div>`).join('')}
          </div>
        </div>
        <div class="gc dk an" style="--d:400ms;display:flex;flex-direction:column;justify-content:space-between;padding:32px">
          <div>
            <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:var(--lav)">PRIMARY RESEARCH SNAPSHOT</p>
            <p style="font-size:13px;font-style:italic;color:var(--onNm);margin-top:4px">Informal survey of ~40 students &amp; hostel residents</p>
            <div class="fl fc fg2" style="margin-top:28px">
              ${stats.map((r,i)=>`<div class="fl ac gap-24">
                <span style="font-family:var(--fh);font-size:38px;font-weight:800;color:var(--gold);min-width:90px">${r[1]}</span>
                <span style="font-size:15px;color:#fff;line-height:1.4">${r[0]}</span>
              </div>`).join('')}
            </div>
          </div>
          <div>
            <div class="hr"></div>
            <p style="font-size:12px;font-style:italic;color:var(--onNm);margin-top:8px">Directional insight from our own research process — not a published statistic.</p>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 5: Proposed Solution
  (n, h) => {
    const flow = [
      ['tag','Attach','Stick a QR sticker or clip a keychain onto anything you value — keys, wallet, bag, laptop.'],
      ['qrcode','Scan','A finder scans the QR with any phone camera. No app needed. They land on a private contact page.'],
      ['bell','Reconnect','Owner gets an instant notification with time, location & a secure message — identity fully protected.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">PROPOSED SOLUTION</p>
      <h2 class="st an" style="--d:100ms">The Vouch Ecosystem</h2>
      <p class="sub an" style="--d:180ms">Not just a keychain — a complete privacy-first ecosystem. All products connect to one platform, share the same secure contact system, and deliver the same instant notification experience.</p>
      <div class="fl gap-24 ac an" style="--d:300ms;margin-top:36px;justify-content:space-between">
        ${flow.map((f,i)=>`<div class="gc glow flex-1 text-center" style="padding:36px 28px;height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center">
          ${h.chip(f[0],'var(--purple)','#fff','64px')}
          <div class="ct" style="font-size:22px;margin-top:16px">${f[1]}</div>
          <div class="cd" style="font-size:14px;margin-top:8px;line-height:1.5">${f[2]}</div>
        </div>${i<2?'<span style="font-size:36px;color:var(--lav);font-weight:700;user-select:none">→</span>':''}`).join('')}
      </div>
      <div class="gc an" style="--d:500ms;background:var(--navy);border:none;margin-top:36px;padding:28px 36px;box-shadow:0 12px 40px rgba(15,10,31,0.15)">
        <div class="fl ac gap-28">
          ${h.chip('lock','var(--pd)','#fff','64px')}
          <div style="flex:1">
            <p style="font-family:var(--fh);font-size:22px;font-weight:700;color:#fff">Privacy-First Design — Vouch's Strongest Differentiator</p>
            <p style="font-size:15px;color:var(--onN);line-height:1.6;margin-top:6px">When a finder scans a Vouch QR, they see a secure contact page — never a real name, phone number, or address. The owner controls exactly what's shared: first name only, masked-number calling, or emergency contact info for critical items.</p>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 6: Research Methodology
  (n, h) => {
    const steps = [
      ['home','Personal Observation','In our own hostel rooms and homes, we repeatedly struggled to find car keys, bike keys, and house keys — misplaced within the room or dropped just outside. This first-hand frustration was the spark for Vouch.'],
      ['users','Peer Interviews','We discussed the problem informally with friends and classmates. The pattern repeated: nearly everyone had a story of losing keys, wallets, or ID cards, often more than once.'],
      ['clipboard','Informal Survey','We gathered quick feedback from ~40 students and hostel residents on frequency of loss, current coping habits, and willingness to pay for a solution — used directionally, not as formal statistics.'],
      ['search','Competitor Scan','We reviewed existing options — Apple AirTag, Tile, and handwritten phone-number tags — to understand pricing, privacy gaps, and accessibility issues in the local market.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">RESEARCH METHODOLOGY</p>
      <h2 class="st an" style="--d:100ms">How We Conducted Our Research</h2>
      <p class="sub an" style="--d:180ms;font-style:italic">Our research began with lived, everyday experience rather than a desk study — then we validated it with peers before designing the product.</p>
      <div class="g g4 an" style="--d:250ms;margin-top:36px;flex:1">
        ${steps.map((s,i)=>`<div class="gc an" style="--d:${300+i*100}ms;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="fl sb ac">
              ${h.chip(s[0],'var(--purple)','#fff','52px')}
              <span style="font-family:var(--fh);font-size:24px;color:var(--lav);font-weight:800">${i+1}</span>
            </div>
            <div class="ct" style="font-size:19px;margin-top:20px">${s[1]}</div>
          </div>
          <div class="cd" style="font-size:13.5px;line-height:1.55;margin-top:12px">${s[2]}</div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 7: Market Opportunity
  (n, h) => {
    const facts = [
      ['globe','Pakistan first','Initial geographic focus with clear scalability into other South Asian markets.'],
      ['users','Universal need','Any person who carries keys, a wallet, a bag, or valuables is an addressable customer.'],
      ['dollar','Price gap','Premium trackers price out students & everyday consumers in developing markets — Vouch starts far lower.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">MARKET OPPORTUNITY</p>
      <h2 class="st an" style="--d:100ms">A Growing Market, an Underserved Segment</h2>
      <p class="sub an" style="--d:180ms">Industry market-research reports place the global smart tracker category in the hundreds of millions to low billions of dollars today, with most forecasts pointing to sustained double-digit annual growth (CAGR) through the early 2030s.</p>
      <div class="two" style="margin-top:36px;flex:1">
        <div class="gc an" style="--d:250ms;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px">
          <p style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:24px">Global Smart-Tracker Category — Directional Growth Curve</p>
          <div class="fl ac gap-24" style="height:240px;align-items:flex-end">
            ${['Today','+2 yrs','+4 yrs','+6 yrs','+8 yrs'].map((l,i)=>{
              const h2=[70,105,140,185,230][i];
              return `<div class="tc"><div class="bar" style="height:${h2}px;width:70px"></div><p style="font-size:13px;color:var(--muted);margin-top:10px;font-weight:600">${l}</p></div>`;
            }).join('')}
          </div>
        </div>
        <div class="fl fc fg" style="justify-content:center">
          ${facts.map((f,i)=>`<div class="gc flex ac gap-24 an" style="--d:${350+i*120}ms">
            ${h.chip(f[0],'var(--purple)','#fff','56px')}
            <div style="flex:1">
              <p style="font-size:18px;font-weight:700;color:var(--text)">${f[1]}</p>
              <p style="font-size:14px;color:var(--muted);line-height:1.5;margin-top:6px">${f[2]}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 8: Product Line
  (n, h) => {
    const prods = [
      ['tag','QR Sticker','Rs. 199','Weatherproof adhesive label. No battery. Best for minimalists & gifting.',false],
      ['key','Classic Keychain','Rs. 299','Flagship branded keychain, premium build. Ideal for house, car & office keys.',false],
      ['volume','Whistle Keychain','Rs. 1,299','Rings when it detects a whistle — no app needed to trigger. Great for items lost at home.',false],
      ['satellite','GPS Ring Keychain','Rs. 2,999','Bluetooth + real GPS tracking. Remote ring & live map location. For travellers & pros.',true]
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">PRODUCT LINE</p>
      <h2 class="st an" style="--d:100ms">Four Products, One Platform</h2>
      <div class="g g4 an" style="--d:200ms;margin-top:28px;flex:1">
        ${prods.map((p,i)=>`<div class="gc an text-center ${p[4]?'dk':''}" style="--d:${250+i*120}ms;padding:36px 24px;display:flex;flex-direction:column;justify-content:space-between">
          <div style="position:relative">
            ${p[4]?'<div class="pill an" style="--d:200ms;background:var(--gold);color:var(--navy);margin-bottom:16px">FLAGSHIP</div>':''}
            <div style="display:flex;justify-content:center">
              ${h.chip(p[0],p[4]?'var(--navy3)':'var(--lp)',p[4]?'var(--gold)':'var(--purple)','64px')}
            </div>
            <div class="ct" style="font-size:22px;margin-top:16px;${p[4]?'color:#fff':''}">${p[1]}</div>
            <p style="font-family:var(--fh);font-size:24px;font-weight:800;color:${p[4]?'var(--gold)':'var(--pd)'};margin-top:8px">${p[2]}</p>
          </div>
          <div>
            <div class="hr" style="${p[4]?'background:#3B3164':''}"></div>
            <div class="cd" style="font-size:14px;line-height:1.5">${p[3]}</div>
          </div>
        </div>`).join('')}
      </div>
      <p class="an" style="--d:700ms;font-size:14px;font-style:italic;color:var(--muted);margin-top:16px">All four connect to the same app & website: multi-item dashboard, Lost/Safe toggle, instant alerts, scan log, and secure finder messaging.</p>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 9: Target Market & Personas
  (n, h) => {
    const segs = [
      ['grad','Students','High risk of losing keys & bags. Price-sensitive, heavy smartphone users.'],
      ['briefcase','Young Pros','Busy schedules, multiple keys (home/car/office). Value convenience & privacy.'],
      ['home','Families','Parents tracking kids\' school bags; elderly members who misplace items often.'],
      ['plane','Travellers','High-value luggage & passports. Urgent need for GPS tracking abroad.'],
      ['building','Businesses','Employee keychains, office asset tags. Volume / B2B purchasing.']
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">TARGET MARKET ANALYSIS</p>
      <h2 class="st an" style="--d:100ms">Who We're Building Vouch For</h2>
      <div class="g g5 an" style="--d:200ms;margin-top:28px">
        ${segs.map((s,i)=>`<div class="gc text-center an" style="--d:${250+i*80}ms;padding:24px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;height:180px">
          ${h.chip(s[0],'var(--purple)','#fff','44px')}
          <div class="ct" style="font-size:16px;margin-top:12px;font-weight:700">${s[1]}</div>
          <div class="cd" style="font-size:12px;margin-top:6px;line-height:1.45">${s[2]}</div>
        </div>`).join('')}
      </div>
      <div class="gc dk an" style="--d:650ms;margin-top:28px;padding:32px 40px">
        <div class="fl ac gap-28">
          ${h.chip('grad','var(--lav)','var(--navy)','80px')}
          <div style="flex:1">
            <p style="font-size:12px;font-weight:700;letter-spacing:2px;color:var(--lav)">PERSONA SPOTLIGHT</p>
            <p style="font-family:var(--fh);font-size:24px;font-weight:700;color:#fff;margin-top:4px">"Ayesha, 20 — University Student"</p>
            <p style="font-size:15px;color:var(--onN);line-height:1.6;margin-top:8px">Lives in a university hostel; loses her room keys and student ID at least once a month, and once lost her wallet on campus for two days. Owns a mid-range smartphone, is budget-conscious, and is highly active on Instagram/TikTok.</p>
            <p style="font-size:14px;font-style:italic;color:var(--gold);margin-top:8px">Goal: Never worry about a lost hostel key again — for under the price of a canteen meal.</p>
          </div>
        </div>
      </div>
      ${h.ftr(n)}
    </div>`;
  },

  // Slide 10: SWOT Analysis
  (n, h) => {
    const quad = [
      {l:'Strengths',ic:'trendup',cls:'sw-s',color:'var(--green)',items:['Privacy-first design — unique differentiator vs. AirTag/Tile','Four-tier pricing fits nearly every budget (Rs. 199–2,999)','No-app-needed finder experience removes adoption friction','Whistle keychain is a genuinely unique, hard-to-copy feature']},
      {l:'Weaknesses',ic:'trenddown',cls:'sw-w',color:'var(--red)',items:['New, unfunded brand with zero market awareness','GPS edition depends on battery life & recharging habits','Manufacturing & QR-hardware costs at low volume','No physical retail presence yet at launch']},
      {l:'Opportunities',ic:'star',cls:'sw-o',color:'var(--gold)',items:['Underserved, price-sensitive market in Pakistan & South Asia','Expansion into pet tags, luggage tags, medical ID tags','University campus channel — low-cost, high-trust distribution','Freemium app can evolve into a B2B asset-tracking platform']},
      {l:'Threats',ic:'alerttri',cls:'sw-t',color:'var(--purple-deep)',items:['Global players (Apple, Samsung, Tile) could enter or cut prices','Low-cost local counterfeits / copycat QR tags','Consumer trust barrier around a new privacy-tech brand','Currency & import-cost volatility affecting hardware margins']},
    ];
    return `<div class="sl light">
      <p class="ey an" style="--d:0ms">STRATEGIC ANALYSIS</p>
      <h2 class="st an" style="--d:100ms">SWOT Analysis</h2>
      <div class="g g2 an" style="--d:200ms;margin-top:24px;flex:1">
        ${quad.map((q,i)=>`<div class="gc an ${q.cls}" style="--d:${250+i*120}ms;padding:24px 28px;border-width:2px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="fl ac gap-12 mb-12">
              ${h.chip(q.ic,q.color,'#fff','44px')}
              <span style="font-family:var(--fh);font-size:22px;font-weight:700;color:var(--text)">${q.l}</span>
            </div>
            <div class="hr" style="background:rgba(139,92,246,0.15)"></div>
            <ul class="bul">${q.items.map(it=>`<li style="font-size:14.5px;color:var(--text)">${it}</li>`).join('')}</ul>
          </div>
        </div>`).join('')}
      </div>
      ${h.ftr(n)}
    </div>`;
  }
];
