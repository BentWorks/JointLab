/* JointLab visual layer — illustrative, not dimensioned manufacturing drawings. */
(() => {
  const css = document.createElement('style');
  css.textContent = `
    .joint-sketch{border-radius:12px;background:radial-gradient(circle at 50% 35%,#1d3d43,#0b1a22 78%);border:1px solid #31535a;overflow:hidden}
    .joint-sketch svg{display:block;width:100%;height:auto}
    .joint-sketch .piece-a{fill:#8dddb9;stroke:#c9ffdf;stroke-width:2.5;stroke-linejoin:round}
    .joint-sketch .piece-b{fill:#e2b57f;stroke:#ffe0b3;stroke-width:2.5;stroke-linejoin:round}
    .joint-sketch .recess{fill:#102831;stroke:#d9b887;stroke-width:1.8;stroke-linejoin:round}
    .joint-sketch .moving{transition:transform .55s cubic-bezier(.2,.85,.2,1)}
    .joint-sketch .guide{stroke:#8ceccc;stroke-width:2;stroke-dasharray:7 6;fill:none;opacity:.9}
    .joint-sketch .guide-arrow{fill:#8ceccc}
    .joint-sketch text{font:12px system-ui,sans-serif;fill:#a8c8cd}
    .joint-sketch.assembled .guide{opacity:.2}
    .joint-sketch.assembled .guide-arrow{opacity:.2}
    .joint-card-sketch{height:82px;flex-shrink:0;margin:-3px -3px 2px;display:flex;align-items:center}
    .joint-card-sketch svg{max-height:82px}
    .joint-card-sketch text,.joint-card-sketch .guide,.joint-card-sketch .guide-arrow{display:none}
    .joint-card-sketch .piece-a,.joint-card-sketch .piece-b{stroke-width:4}
    .joint-card-sketch.assembled .moving{transform:none!important}
    .joint-detail-visual{margin:18px 0 10px}
    .joint-detail-visual svg{max-height:300px}
    .visual-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0 18px}
    .visual-controls button{border:1px solid #446b68;border-radius:9px;background:#22443f;color:#d9fff0;padding:9px 13px;font-weight:700;cursor:pointer}
    .visual-controls button.active{background:#78e4ba;color:#06261b}
    .visual-controls span{font-size:12px;color:#9cb6be}
    .tabs .generator-link{display:inline-flex;align-items:center;padding:18px 12px;color:#8ff0c7;text-decoration:none;font-weight:800;white-space:nowrap;border-bottom:3px solid #498c72;font-size:14px}
  `;
  document.head.appendChild(css);
  const nav = document.querySelector('.tabs');
  if (nav && !nav.querySelector('.generator-link')) {
    const entry = document.createElement('a');
    entry.className = 'generator-link';
    entry.href = 'generator.html';
    entry.textContent = '05 — 3D Generator ↗';
    nav.appendChild(entry);
  }
  if (nav && !nav.querySelector('.fit-link')) {
    const entry = document.createElement('a');
    entry.className = 'generator-link fit-link';
    entry.href = 'fit-lab.html';
    entry.textContent = '06 — Fit Lab ↗';
    nav.appendChild(entry);
  }

  function kind(x) {
    const n = x.name.toLowerCase();
    if (/sliding|dovetail|ari-otoshi|housing/.test(n)) return 'dovetail';
    if (/scarf|tsugi|splice/.test(n) || x.family === 'Scarf & splice') return 'scarf';
    if (/key|peg|wedge|bayonet|snap|puzzle|dougong|castle|nuki/.test(n) || x.family === 'Keys & locks') return 'key';
    if (/lap|bridle|dado|tongue|rabbet|shiplap|notch|birdsmouth|saddle|cogg|miter|finger|comb/.test(n) || x.family === 'Lap & housing') return 'lap';
    return 'tenon';
  }

  const pictures = {
    dovetail: {
      name:'Sliding dovetail: tongue enters a matching undercut track',
      motion:'translate(0px, 72px)',
      arrow:'M240 85 L240 137', marker:'240,147 232,133 248,133',
      paths:`<g class="piece-b"><path d="M85 152H395V206H85Z"/><path class="recess" d="M198 151L183 183H297L282 151Z"/></g><g class="moving"><path class="piece-a" d="M198 48H282L298 79H182Z"/><path class="piece-a" d="M220 15H260V48H220Z"/></g>`
    },
    tenon: {
      name:'Mortise and tenon: projection enters a matching socket',
      motion:'translate(78px, 0px)',
      arrow:'M198 116 L285 116', marker:'294,116 281,108 281,124',
      paths:`<g class="piece-b"><path d="M296 50H432V181H296V145H345V86H296Z"/><path class="recess" d="M296 86H345V145H296Z"/></g><g class="moving"><path class="piece-a" d="M55 49H185V88H235V142H185V181H55Z"/></g>`
    },
    lap: {
      name:'Half-lap: relieved sections overlap to make a crossing',
      motion:'translate(0px, 69px)',
      arrow:'M250 83L250 139', marker:'250,148 242,134 258,134',
      paths:`<path class="piece-b" d="M70 150H410V203H70Z"/><path class="recess" d="M204 149H279V176H204Z"/><g class="moving"><path class="piece-a" d="M203 11H278V112H242V83H203Z"/></g>`
    },
    scarf: {
      name:'Hooked scarf: complementary end profiles engage',
      motion:'translate(54px, 0px)',
      arrow:'M215 120 L290 120', marker:'299,120 285,112 285,128',
      paths:`<path class="piece-b" d="M310 69H438V164H310V142H272V108H310Z"/><g class="moving"><path class="piece-a" d="M47 69H179V90H228V129H179V164H47Z"/></g>`
    },
    key: {
      name:'Removable key: inserted piece blocks withdrawal',
      motion:'translate(0px, 70px)',
      arrow:'M240 69L240 127', marker:'240,137 232,123 248,123',
      paths:`<path class="piece-b" d="M67 142H413V181H67Z"/><path class="piece-a" d="M67 104H413V141H67Z"/><path class="recess" d="M221 103H259V181H221Z"/><g class="moving"><path class="piece-a" d="M224 14H256L267 46H213Z"/></g>`
    }
  };

  function svg(x, compact=false) {
    const p = pictures[kind(x)];
    const label = compact ? 'Representative joint schematic' : p.name;
    return `<div class="joint-sketch ${compact?'joint-card-sketch':''}" data-kind="${kind(x)}" aria-label="${label}" role="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 230" preserveAspectRatio="xMidYMid meet"><defs><pattern id="grid-${x.id}-${compact?'s':'l'}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#31555b" stroke-width=".5" opacity=".5"/></pattern></defs><rect width="480" height="230" fill="url(#grid-${x.id}-${compact?'s':'l'})"/><path class="guide" d="${p.arrow}"/><polygon class="guide-arrow" points="${p.marker}"/>${p.paths}<text x="21" y="218">SCHEMATIC · NOT TO SCALE</text></svg></div>`;
  }

  function decorateCards() {
    document.querySelectorAll('#cards .card[data-id]').forEach(card => {
      if (card.querySelector('.joint-card-sketch')) return;
      const x = joints[Number(card.dataset.id)];
      if (!x) return;
      const icon = card.querySelector('.icon');
      if (icon) icon.remove();
      card.insertAdjacentHTML('afterbegin', svg(x,true));
    });
  }

  function decorateDetails() {
    const details = document.querySelector('#details');
    if (!details || details.querySelector('.joint-detail-visual')) return;
    const heading = details.querySelector('h2');
    const x = joints.find(j => j.name === heading?.textContent);
    if (!x) return;
    const host = document.createElement('section');
    host.className = 'joint-detail-visual';
    host.innerHTML = svg(x,false) + `<div class="visual-controls"><button type="button" class="active" data-stage="apart">Exploded view</button><button type="button" data-stage="assembled">Assembled view</button><span>Illustrates the connection family; actual historical variants differ.</span></div>`;
    heading.insertAdjacentElement('afterend',host);
    const drawing = host.querySelector('.joint-sketch');
    host.querySelectorAll('[data-stage]').forEach(btn => btn.addEventListener('click',() => {
      const joined = btn.dataset.stage === 'assembled';
      drawing.classList.toggle('assembled', joined);
      // Use the per-family displacement to animate the fitted piece.
      const mover = drawing.querySelector('.moving');
      mover.style.transform = joined ? pictures[kind(x)].motion : '';
      host.querySelectorAll('[data-stage]').forEach(b=>b.classList.toggle('active',b===btn));
    }));
  }
  const cards = document.querySelector('#cards');
  const details = document.querySelector('#details');
  if (cards) { const o = new MutationObserver(decorateCards);o.observe(cards,{childList:true});decorateCards(); }
  if (details) { const o = new MutationObserver(decorateDetails);o.observe(details,{childList:true});decorateDetails(); }
})();
