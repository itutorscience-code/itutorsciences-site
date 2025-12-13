
// Smooth-scroll offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const nav = document.querySelector('.header .nav');
    const offset = (nav ? nav.offsetHeight : 70);
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top: y, behavior: 'smooth'});
  });
});

// Wire product links from config.json
(async function wireLinks() {
  try{
    const res = await fetch('config.json?_=' + Date.now());
    const cfg = await res.json();
    const pairs = [
      ['stereo-card',  cfg.STRIPE_LINK_STEREO],
      ['sub-card',     cfg.STRIPE_LINK_SUB],
      ['stereo-crypto',cfg.BTC_LINK_STEREO],
      ['sub-crypto',   cfg.BTC_LINK_SUB],
    ];
    pairs.forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (url && /^https?:\/\//.test(url)) {
        el.href = url;
        if (!/stripe|commerce\.coinbase/.test(url)) el.rel = 'noopener';
      } else {
        // Hide crypto buttons if empty; disable card buttons if empty
        if (id.includes('crypto')) {
          el.style.display = 'none';
        } else {
          el.classList.add('disabled');
          el.addEventListener('click', e => e.preventDefault());
        }
      }
    });
  }catch(e){
    console.warn('config.json missing; payment buttons disabled.', e);
  }
})();

// Simple testimonial rotator
const quotes = [
  '“As a student athlete, being able to stay ahead of my studies is incredibly important. Sara helped me not only manage, but also excel in organic chemistry.” — Heiley, University of Wisconsin–Madison',
  '“I really struggled with Organic Chemistry my first semester ... I wholeheartedly recommend her as a tutor.” — Becca, Boston University',
];
let qi = 0;
setInterval(() => {
  qi = (qi + 1) % quotes.length;
  const el = document.getElementById('quote');
  if (!el) return;
  el.style.opacity = 0;
  setTimeout(()=>{ el.textContent = quotes[qi]; el.style.opacity = 1; }, 250);
}, 8500);
