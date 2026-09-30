/* Naty Fitness — metamorfosis: la crisálida se abre, cuatro alas de método y un buscador que te une con un caso real */
gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const NS = 'http://www.w3.org/2000/svg';
const WA = 'https://wa.me/34611884923?text=';
const fine = matchMedia('(pointer:fine)').matches;

/* ---------- banda ---------- */
const BF = '<svg viewBox="0 0 400 400" aria-hidden="true"><use href="#bfly"/></svg>';
$('#band').innerHTML = Array(3).fill(['Sin dietas', 'Sin culpa', 'Sin restricción', 'Con cariño', 'Con constancia', 'Con ciencia']).flat().map(t => `<span>${t}</span>${BF}`).join('');
gsap.to('#band', { xPercent: -33.333, ease: 'none', duration: 30, repeat: -1 });

/* ---------- hero: la crisálida se abre ---------- */
const wings = $$('.bfly .wing');
gsap.set(wings, { scaleX: 0, svgOrigin: '200 200' });
gsap.set('.bfly .wing__in', { opacity: 0 });
const intro = gsap.timeline({ delay: .25 })
  .from('.thread', { scaleY: 0, duration: .8, ease: 'power2.out' })
  .from('.cocoon', { y: -260, rotation: 8, duration: 1.1, ease: 'elastic.out(1,.5)' }, '<.1')
  .from('.hero__title .ln', { yPercent: 110, opacity: 0, duration: 1, stagger: .12, ease: 'expo.out' }, '<')
  .from(['.hero .kicker', '.hero__lead', '.hero__txt .hero__row', '.stats'], { y: 24, opacity: 0, duration: .8, stagger: .08 }, '<.3')
  .to('.cocoon', { rotation: 4, duration: .06, repeat: 9, yoyo: true, ease: 'none', transformOrigin: '50% 0%' }, '-=.4')
  .to('.cocoon__l', { x: -60, rotation: -28, opacity: 0, duration: .9, ease: 'power3.out', svgOrigin: '100 300' })
  .to('.cocoon__r', { x: 60, rotation: 28, opacity: 0, duration: .9, ease: 'power3.out', svgOrigin: '100 300' }, '<')
  .to('.thread', { opacity: 0, duration: .6 }, '<')
  .to(wings, { scaleX: 1, duration: 1.3, ease: 'elastic.out(1,.55)' }, '<.15')
  .to('.bfly .wing__in', { opacity: 1, duration: .6, stagger: .08 }, '<')
  .from('.hero__sign', { opacity: 0, scale: .6, duration: .8, ease: 'back.out(2)' }, '<.4')
  .add(startFlap);

let flap;
function startFlap() {
  flap = gsap.to(wings, { scaleX: .84, duration: .9, ease: 'sine.inOut', yoyo: true, repeat: -1, svgOrigin: '200 200' });
  gsap.to('.bfly', { y: -14, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}
$('.hero__art').addEventListener('pointerenter', () => flap && flap.timeScale(3));
$('.hero__art').addEventListener('pointerleave', () => flap && flap.timeScale(1));
gsap.to('.hero__art', { yPercent: 18, rotation: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

// cifras
$$('.stats b[data-n]').forEach(b => {
  const n = +b.dataset.n, d = +(b.dataset.d || 0), p = b.dataset.p || '';
  const o = { v: 0 };
  gsap.to(o, { v: n, duration: 2, delay: 1.2, ease: 'power2.out', onUpdate: () => { b.textContent = p + o.v.toFixed(d).replace('.', ','); } });
});

/* ---------- historia ---------- */
const pics = $$('.story__pics img');
$$('.chap').forEach(c => ScrollTrigger.create({
  trigger: c, start: 'top 60%', end: 'bottom 40%',
  onToggle: s => { if (!s.isActive) return; $$('.chap').forEach(x => x.classList.toggle('is-on', x === c)); pics.forEach((p, i) => p.classList.toggle('is-on', i === +c.dataset.i)); }
}));

/* ---------- método: cuatro alas ---------- */
const mws = $$('.mw'), mps = $$('.mp');
function pickWing(k) {
  mws.forEach(w => w.classList.toggle('is-on', +w.dataset.k === k));
  mps.forEach(p => p.classList.toggle('is-on', +p.dataset.k === k));
  gsap.fromTo('.mfly__flap', { scaleX: .7 }, { scaleX: 1, duration: .9, ease: 'elastic.out(1,.4)', svgOrigin: '200 200' });
  const v = $('.mp[data-k="1"] video');
  if (k === 1) { v.play().catch(() => {}); } else v.pause();
}
mws.forEach(w => {
  w.addEventListener('click', () => pickWing(+w.dataset.k));
  w.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickWing(+w.dataset.k); } });
});
mws[0].classList.add('is-on');
gsap.to('.mfly__flap', { scaleX: .9, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1, svgOrigin: '200 200' });

/* ---------- casos reales ---------- */
const CASES = [
  { id: 'maria', n: 'María', img: 'cases/141311.png', s: 'Anual', d: '12 meses', obj: 'Sanar la relación con la comida y aumentar masa muscular', tags: ['relacion', 'musculo', 'segura'],
    t: 'Llegó frustrada: comía poquito, con miedo a los carbohidratos y las grasas, y venía de dietas estrictas que le generaban obsesión. Tras más de 3 años intentándolo, hoy se siente orgullosa y en paz con su cuerpo, la comida y la ropa, y disfruta de entrenar y comer sano y rico.' },
  { id: 'gisela', n: 'Gisela', img: 'cases/143124.png', s: 'Semestral', d: '6 meses', obj: 'Perder grasa y tripa, tonificar y sentirse segura', tags: ['grasa', 'tripa', 'tonificar', 'segura'],
    t: 'Odiaba su imagen en el espejo y se sentía incapaz de conseguir un cambio físico. En su punto más bajo decidió confiar en ella y en el programa. Hoy ha perdido grasa, se siente orgullosa de su cuerpo y ha vuelto a sentirse ella misma (acompañada también de ayuda psicológica).' },
  { id: 'laura', n: 'Laura', img: 'cases/145315.png', s: 'Anual', d: '12 meses', obj: 'Perder grasa y tripa, reducir celulitis, tonificar y dejar atrás los atracones', tags: ['grasa', 'tripa', 'celulitis', 'tonificar', 'ansiedad', 'segura'],
    t: 'Se deshizo de la ansiedad por la comida, perdió la tripa que la acomplejaba y tonificó. De no ser constante en el gym ni comer sano, a convertirlo en su estilo de vida. Hoy vuelve a ponerse la ropa que más le gusta con tranquilidad.' },
  { id: 'andrea', n: 'Andrea', img: 'cases/145355.png', s: 'Anual', d: '12 meses', obj: 'Perder tripa, sanar la relación con la comida y tonificar', tags: ['tripa', 'relacion', 'tonificar', 'segura'],
    t: 'Se sentía insegura, flácida y cansada, con miedo a comer y culpa cada vez que comía algo no sano. Juntas perdieron tripa, tonificaron y, sobre todo, aprendió a vivir sin obsesiones ni restricciones. Hoy disfruta de su cuerpo, la comida y el deporte.' },
  { id: 'paula', n: 'Paula', img: 'cases/145425-1.png', s: 'Anual', d: '12 meses', obj: 'Tonificar, ganar masa muscular, perder tripa y llevarse bien con la comida', tags: ['tonificar', 'musculo', 'tripa', 'segura', 'relacion'],
    t: 'Llegó superando una depresión, insegura con su cuerpo y con muy malas experiencias con dietas estrictas. Junto a su psicóloga y su cambio físico, hoy se siente segura frente al espejo y disfruta de la comida y el entreno sin obsesiones ni culpa.' },
  { id: 'alicia', n: 'Alicia', img: 'cases/144527.png', s: 'Semestral', d: '6 meses', obj: 'Perder tripa y grasa, tonificar y eliminar la ansiedad por la comida', tags: ['tripa', 'ansiedad', 'grasa', 'tonificar', 'segura'],
    t: 'Superó la ansiedad por la comida, los atracones y la culpa de después. Perdió tripa, bajó grasa y hoy disfruta de la comida sin compensar. En sus palabras: «Antes para mí ir así en top era un reto».' }
];
const TAGS = {
  grasa: 'Perder grasa', tripa: 'Perder tripa', tonificar: 'Tonificar', musculo: 'Ganar masa muscular', celulitis: 'Reducir celulitis',
  ansiedad: 'Ansiedad por la comida / atracones', relacion: 'Sanar mi relación con la comida', segura: 'Sentirme segura con mi cuerpo y la ropa',
  hormonal: 'Salud hormonal', mama: 'Soy mamá'
};
$('#cases').innerHTML = CASES.map(c => `
  <article class="case" id="caso-${c.id}">
    <div class="case__img"><span class="case__bg" style="background-image:url('assets/${c.img}')"></span><img src="assets/${c.img}" alt="Antes y después de ${c.n}" loading="lazy"></div>
    <div class="case__body">
      <h3>El cambio de ${c.n}</h3>
      <p>${c.t}</p>
      <div class="case__tags"><span class="t">${c.s} · ${c.d}</span>${c.tags.filter(t => t !== 'segura').map(t => `<span>${TAGS[t]}</span>`).join('')}</div>
    </div>
  </article>`).join('');

/* ---------- buscador: tu metamorfosis ---------- */
const chipsEl = $('#chips'), dotsG = $('#dots');
const DOTC = ['#5bb8f5', '#1f6fff', '#8b6cff', '#27d3c3', '#ff8fb1', '#ffd166', '#ffffff', '#6ee7b7', '#c4b5fd', '#93c5fd'];
// posición de cada "escama" dentro de las alas
const DOTP = [[110, 110], [290, 110], [150, 150], [250, 150], [120, 270], [280, 270], [80, 90], [320, 90], [150, 300], [250, 300]];
const sel = new Set();
let mode = null;
Object.entries(TAGS).forEach(([k, t], i) => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = t; b.dataset.k = k;
  b.addEventListener('click', () => { sel.has(k) ? sel.delete(k) : sel.add(k); b.classList.toggle('is-on', sel.has(k)); paint(k, i); });
  chipsEl.appendChild(b);
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('cx', DOTP[i][0]); c.setAttribute('cy', DOTP[i][1]); c.setAttribute('r', 16); c.setAttribute('fill', DOTC[i]);
  c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', 4); c.id = 'd-' + k;
  dotsG.appendChild(c); gsap.set(c, { scale: 0, svgOrigin: `${DOTP[i][0]} ${DOTP[i][1]}` });
});
function paint(k, i) {
  const n = sel.size;
  for (let w = 0; w < 4; w++) {
    const on = n > w;
    const el = $('#my' + w);
    el.style.fill = on ? 'url(#iri)' : '#fff';
    el.style.stroke = on ? '#fff' : 'rgba(15,27,45,.2)';
    el.style.strokeDasharray = on ? 'none' : '6 6';
  }
  const d = $('#d-' + k);
  gsap.to(d, { scale: sel.has(k) ? 1 : 0, duration: .6, ease: sel.has(k) ? 'elastic.out(1,.4)' : 'power2.in', svgOrigin: `${DOTP[i][0]} ${DOTP[i][1]}` });
  gsap.fromTo('.myfly__flap', { scaleX: .75 }, { scaleX: 1, duration: .8, ease: 'elastic.out(1,.4)', svgOrigin: '200 200' });
  $('#count').textContent = n ? `${n} ${n === 1 ? 'objetivo' : 'objetivos'} · tu mariposa está tomando forma` : 'Elige al menos un objetivo';
  check();
}
$$('.mode').forEach(m => m.addEventListener('click', () => { mode = m.dataset.plan; $$('.mode').forEach(x => x.classList.toggle('is-on', x === m)); check(); }));
function check() { $('#go').disabled = !(sel.size && mode); }

const PLAN = { premium: 'Naty Premium', gold: 'Naty Gold', silver: 'Naty Silver' };
$('#go').addEventListener('click', () => {
  let best = null, score = -1;
  CASES.forEach(c => { const s = c.tags.filter(t => sel.has(t)).length; if (s > score) { score = s; best = c; } });
  const r = $('#result');
  $('#rImg').src = 'assets/' + best.img; $('#rImg').alt = 'Antes y después de ' + best.n;
  $('#rKick').textContent = score > 0 ? 'Tu caso se parece al de…' : 'Para inspirarte, conoce a…';
  $('#rName').textContent = best.n;
  $('#rStory').textContent = best.t;
  $('#rMeta').textContent = `Servicio: ${best.s} · ${best.d} · Objetivos: ${best.obj}`;
  const deep = sel.has('ansiedad') || sel.has('relacion');
  let plan = `Te recomiendo <b>${PLAN[mode]}</b>.`;
  if (deep && mode !== 'premium') plan += ' Por lo que me cuentas de tu relación con la comida, mira también <b>Naty Premium</b>: incluye apoyo mental y emocional.';
  $('#rPlan').innerHTML = plan;
  const goals = [...sel].map(k => TAGS[k].toLowerCase()).join(', ');
  $('#rWa').href = WA + encodeURIComponent(`¡Hola Naty! He hecho el test de tu web. Mis objetivos: ${goals}. Me interesa ${PLAN[mode]}. Mi caso se parece al de ${best.n}. ¿Hablamos?`);
  $$('.plan').forEach(p => p.classList.toggle('is-rec', p.dataset.plan === mode));
  r.hidden = false;
  gsap.fromTo(r, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' });
  gsap.fromTo('.myfly__flap', { scaleX: .5 }, { scaleX: 1, duration: .25, yoyo: true, repeat: 6, ease: 'sine.inOut', svgOrigin: '200 200' });
  setTimeout(() => r.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
});

/* ---------- mensajes ---------- */
const THREADS = [
  ['Clienta · WhatsApp', ['Contenta y agradecida yo Naty!!', 'He empezado mil veces y nunca acababa en ningún sitio', 'Y ha sido empezar contigo y wowww', 'Es verdad que hay que tener disciplina, pero ayudas a que la tenga sabes']],
  ['Clienta · WhatsApp', ['Y fíjate, cuando me cuesta entrenar Naty, me miro al espejo y veo lo que ya he empezado a conseguir, y me siento tan bien, que no quiero parar y eso me impulsa a entrenar', 'Y con el pantalón del trabajo me lo noto súper bien ahora, incluso hasta el cinturón lo voy a tener que ajustar porque ahora me queda grande']],
  ['Clienta · WhatsApp', ['Pero bueno estoy contenta con el proceso, la verdad que ahora estoy disfrutando del camino 🥰', 'No pasó nada de hambre y no he tenido atracones de dulce por las noches', 'Me gusta ver que puedo tomarme unas olivas con unas patatillas el sábado antes de comer y eso no significa que rompa todo el trabajo de la semana']],
  ['Clienta · WhatsApp', ['Jajaj total yo he alucinado con el cambio físico […]', 'De verdad has superado mis expectativas con todo esto y estoy muy contenta, gracias por todo naty ❤️❤️']]
];
$('#wall').innerHTML = [0, 1].map(col => `<div class="chat__col">${THREADS.filter((_, i) => i % 2 === col).map(([who, ms]) => `
  <div class="thread-b"><p class="thread-b__who"><i></i>${who}</p>${ms.map(m => `<p class="bub">${m}<small>✓✓</small></p>`).join('')}</div>`).join('')}
  <figure class="chat__shot"><img src="assets/web/${col ? 'o42.jpeg' : 'o10.jpg'}" alt="Captura real de un mensaje de clienta" loading="lazy"></figure></div>`).join('');

/* ---------- vídeos: solo se reproducen a la vista ---------- */
$$('.phone video').forEach(v => ScrollTrigger.create({
  trigger: v, start: 'top 90%', end: 'bottom 10%',
  onToggle: s => { if (s.isActive && v.closest('.mp') === null) v.play().catch(() => {}); else if (!s.isActive) v.pause(); }
}));
$('.phone__snd').addEventListener('click', e => { const v = e.currentTarget.previousElementSibling; v.muted = !v.muted; e.currentTarget.textContent = v.muted ? '🔈' : '🔊'; v.play().catch(() => {}); });

/* ---------- planes → WhatsApp ---------- */
$$('[data-wa]').forEach(a => { a.href = WA + encodeURIComponent(`¡Hola Naty! Vengo de tu web y me interesa el plan ${a.dataset.wa}. ¿Me cuentas cómo empezar?`); a.target = '_blank'; a.rel = 'noopener'; });

/* ---------- mariposas que siguen al cursor ---------- */
if (fine && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  let last = 0, alive = 0;
  addEventListener('pointermove', e => {
    const now = performance.now();
    if (now - last < 140 || alive > 10) return; last = now; alive++;
    const m = document.createElementNS(NS, 'svg'); m.setAttribute('viewBox', '0 0 400 400'); m.setAttribute('class', 'mini');
    m.innerHTML = '<use href="#bfly"/>'; document.body.appendChild(m);
    gsap.set(m, { x: e.clientX - 11, y: e.clientY - 11, scale: .3, rotation: gsap.utils.random(-30, 30) });
    gsap.timeline({ onComplete: () => { m.remove(); alive--; } })
      .to(m, { scale: gsap.utils.random(.6, 1.1), duration: .3 })
      .to(m, { x: `+=${gsap.utils.random(-80, 80)}`, y: `-=${gsap.utils.random(60, 160)}`, opacity: 0, duration: gsap.utils.random(1.2, 2), ease: 'power1.out' }, '<')
      .to(m, { scaleX: .2, duration: .12, yoyo: true, repeat: 9, ease: 'sine.inOut' }, '<');
  });
}

/* ---------- apariciones ---------- */
$$('.head, .chap h3, .case, .thread-b, .chat__shot, .plan, .creds__txt > *, .creds__pics img, .final > :not(.final__fly)').forEach(n => gsap.from(n, {
  y: 50, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: n, start: 'top 90%', once: true }
}));
gsap.from('.method__fly svg', { scale: .6, rotation: -12, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.method', start: 'top 70%', once: true } });
gsap.from('.final__fly', { y: 120, rotation: 30, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.final', start: 'top 80%', once: true } });
