// wee. — animações de rolagem da v4 (2026-11-21). Única parte que depende de GSAP e Lenis.
// Se o CDN falhar ou o visitante pedir menos movimento, o site continua inteiro e legível.

const CDN = {
  gsap: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
  scrollTrigger: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
  lenis: 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js'
};

const raiz = document.documentElement;
const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
const DESKTOP = '(min-width: 1024px)';
const CELULAR = '(max-width: 1023px)';

function carregar(src) {
  return new Promise((ok, erro) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = ok;
    s.onerror = () => erro(new Error(`Não carregou: ${src}`));
    document.head.append(s);
  });
}

/* ---------- Divide um título em linhas com máscara (devolve as linhas e como desfazer) ---------- */
function dividirLinhas(titulo) {
  const original = titulo.innerHTML;
  const palavras = [];
  const juntar = (no) => {
    if (no.nodeType === Node.TEXT_NODE) {
      no.textContent.split(/\s+/).filter(Boolean).forEach((p) => {
        const span = document.createElement('span');
        span.className = 'palavra';
        span.textContent = p;
        palavras.push(span);
      });
    } else if (no.nodeType === Node.ELEMENT_NODE) {
      // Elementos (frases do hero, acento, blocos) ficam inteiros: no desktop cada frase é uma linha.
      const span = document.createElement('span');
      span.className = 'palavra';
      span.append(no.cloneNode(true));
      palavras.push(span);
    }
  };
  [...titulo.childNodes].forEach(juntar);

  titulo.replaceChildren();
  palavras.forEach((p, i) => { if (i) titulo.append(' '); titulo.append(p); });

  // No desktop, o hero quebra por frase: mede onde cada palavra caiu com as frases montadas.
  const grupos = [];
  let topoAtual = null;
  palavras.forEach((p) => {
    const topo = p.offsetTop;
    if (topoAtual === null || Math.abs(topo - topoAtual) > 4) { grupos.push([]); topoAtual = topo; }
    grupos[grupos.length - 1].push(p);
  });

  titulo.replaceChildren();
  const linhas = grupos.map((grupo) => {
    const linha = document.createElement('span');
    linha.className = 'linha';
    linha.style.cssText = 'display:block;overflow:clip;overflow-clip-margin:.12em;padding-block:.04em;';
    const dentro = document.createElement('span');
    dentro.className = 'linha__dentro';
    dentro.style.display = 'block';
    grupo.forEach((p, i) => { if (i) dentro.append(' '); dentro.append(...p.childNodes); });
    linha.append(dentro);
    titulo.append(linha);
    return dentro;
  });
  return { linhas, reverter: () => { titulo.innerHTML = original; } };
}

/* ---------- Rolagem suave ---------- */
function iniciarLenis(gsap, ScrollTrigger) {
  const lenis = new window.Lenis({ lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);

  // Links internos rolam pelo Lenis. Para seções fixadas, vai ao início do pin.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const alvo = document.querySelector(id);
    if (!alvo) return;
    e.preventDefault();
    lenis.scrollTo(alvo, { offset: 0, duration: 1.4 });
    history.replaceState(null, '', id);
  });

  document.addEventListener('wee:trava', (e) => { if (e.detail) lenis.stop(); else lenis.start(); });
  return lenis;
}

/* ---------- Hero: entrada (linhas sobem, "criança" cai em blocos, faixa desliza) ---------- */
function entradaHero(gsap) {
  const titulo = document.querySelector('.hero__titulo');
  if (!titulo) return;

  const comecar = () => {
    const { linhas, reverter } = dividirLinhas(titulo);
    raiz.classList.add('hero-pronto');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: reverter });
    tl.from('.hero__meta > *', { y: 16, autoAlpha: 0, duration: .8, stagger: .08 })
      .from(linhas, { yPercent: 115, rotate: 3, transformOrigin: '0% 100%', duration: 1.1, stagger: .09 }, '<.05')
      .from(titulo.querySelectorAll('.acento'), { yPercent: 40, rotate: 8, duration: 1.1 }, '<.3')
      .from(titulo.querySelectorAll('.bloco'), { y: '-2.2em', rotateZ: () => gsap.utils.random(-30, 30), duration: 1.2, ease: 'bounce.out', stagger: .06 }, '<.1')
      .from('.hero__ctas > *', { y: 24, autoAlpha: 0, duration: .8, stagger: .08, clearProps: 'all' }, '-=1')
      .from('.faixa', { xPercent: 18, autoAlpha: 0, duration: 1.4 }, '<');
  };
  if (raiz.classList.contains('intro-ativa')) document.addEventListener('wee:intro-fim', comecar, { once: true });
  else comecar();
}

/* ---------- Hero: o título recua e a faixa acelera conforme a rolagem ---------- */
function heroRolagem(gsap, ScrollTrigger) {
  const hero = document.querySelector('.hero');
  const trilho = document.querySelector('[data-faixa-trilho]');
  if (!hero) return;

  gsap.to('.hero__conteudo', {
    yPercent: -18, autoAlpha: .15, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 }
  });

  if (!trilho) return;
  // Laço infinito: o trilho tem 4 cópias; andar -50% cai exatamente na cópia 3 (igual à 1).
  const laco = gsap.to(trilho, { xPercent: -50, ease: 'none', duration: 60, repeat: -1 });
  const inclina = gsap.quickTo(trilho, 'skewX', { duration: .5, ease: 'power3' });
  let volta = null;
  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (st) => {
      const v = st.getVelocity();
      laco.timeScale(1 + Math.min(Math.abs(v) / 120, 14) * (v < 0 ? -1 : 1));
      inclina(gsap.utils.clamp(-8, 8, v / -300));
      clearTimeout(volta);
      volta = setTimeout(() => { gsap.to(laco, { timeScale: 1, duration: .8 }); inclina(0); }, 120);
    }
  });
}

/* ---------- Showreel: SHOW e REEL se abrem para os lados e o quadro cresce ---------- */
function showreel(gsap, mm) {
  const palco = document.querySelector('[data-showreel-palco]');
  if (!palco) return;
  const esq = palco.querySelector('.showreel__palavra--esq');
  const dir = palco.querySelector('.showreel__palavra--dir');
  const quadro = palco.querySelector('.quadro');
  const laterais = palco.querySelectorAll('.lateral');

  mm.add(DESKTOP, () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: { trigger: palco, start: 'top top', end: '+=140%', pin: true, scrub: .8, invalidateOnRefresh: true }
    });
    tl.fromTo(quadro, { scale: .5, rotate: -7, yPercent: 8 }, { scale: 1, rotate: 0, yPercent: 0, duration: 1 }, 0)
      .fromTo(esq, { xPercent: 4 }, { xPercent: -80, duration: 1 }, 0)
      .fromTo(dir, { xPercent: -4 }, { xPercent: 80, duration: 1 }, 0)
      .fromTo(laterais, { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .1 }, .45)
      .to({}, { duration: .25 });
    return () => gsap.set([quadro, esq, dir, laterais], { clearProps: 'all' });
  });

  mm.add(CELULAR, () => {
    const st = { trigger: palco, start: 'top bottom', end: 'center center', scrub: .6 };
    gsap.fromTo(quadro, { scale: .78, rotate: -5 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: st });
    gsap.fromTo(esq, { xPercent: 4 }, { xPercent: -30, ease: 'none', scrollTrigger: { ...st, end: 'bottom top' } });
    gsap.fromTo(dir, { xPercent: -4 }, { xPercent: 30, ease: 'none', scrollTrigger: { ...st, end: 'bottom top' } });
    return () => gsap.set([quadro, esq, dir], { clearProps: 'all' });
  });
}

/* ---------- Sobre mim: rolagem lateral (desktop) e revelação simples (celular) ---------- */
function sobreLateral(gsap, mm) {
  const pin = document.querySelector('[data-lateral]');
  const trilho = pin?.querySelector('[data-lateral-trilho]');
  const barra = pin?.querySelector('[data-lateral-progresso]');
  if (!pin || !trilho) return;

  mm.add(DESKTOP, () => {
    const distancia = () => Math.max(0, trilho.scrollWidth - window.innerWidth);
    const anda = gsap.to(trilho, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distancia()}`,
        pin: true,
        scrub: .8,
        invalidateOnRefresh: true,
        onUpdate: (st) => gsap.set(barra, { scaleX: st.progress })
      }
    });

    // Dentro da rolagem lateral: cada painel tem seu próprio movimento.
    const foto = pin.querySelector('.painel__foto img');
    gsap.fromTo(foto, { scale: 1.25, xPercent: -6 }, { scale: 1, xPercent: 6, ease: 'none',
      scrollTrigger: { trigger: '.painel--id', containerAnimation: anda, start: 'left right', end: 'right left', scrub: true } });
    gsap.from('.nome-grande', { xPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '.painel--id', containerAnimation: anda, start: 'left right', end: 'right center', scrub: true } });
    pin.querySelectorAll('.ficha__linha').forEach((linha, i) => {
      gsap.from(linha, { x: 160 + i * 60, autoAlpha: 0, ease: 'none',
        scrollTrigger: { trigger: linha, containerAnimation: anda, start: 'left 105%', end: 'left 70%', scrub: true } });
    });
    gsap.from('.bio', { x: 220, autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: '.painel--bio', containerAnimation: anda, start: 'left right', end: 'left 45%', scrub: true } });

    return () => gsap.set([trilho, barra, foto, '.nome-grande', '.ficha__linha', '.bio'], { clearProps: 'all' });
  });

  mm.add(CELULAR, () => {
    // Deslize nativo (scroll-snap): os painéis entram de lado na primeira vez e a barra segue o dedo.
    gsap.from(pin.querySelectorAll('.painel'), { x: 120, autoAlpha: 0, duration: 1.1, stagger: .1, ease: 'expo.out',
      scrollTrigger: { trigger: trilho, start: 'top 80%', once: true } });
    const medir = () => {
      const max = trilho.scrollWidth - trilho.clientWidth;
      gsap.set(barra, { scaleX: max > 0 ? Math.max(.08, trilho.scrollLeft / max) : 1 });
    };
    medir();
    trilho.addEventListener('scroll', medir, { passive: true });
    return () => trilho.removeEventListener('scroll', medir);
  });
}

/* ---------- Letreiros: texto gigante que anda de lado com a rolagem ---------- */
function letreiros(gsap) {
  document.querySelectorAll('[data-letreiro]').forEach((texto) => {
    const inverso = texto.closest('.letreiro--inverso');
    gsap.fromTo(texto, { xPercent: inverso ? -35 : 0 }, {
      xPercent: inverso ? 0 : -35, ease: 'none',
      scrollTrigger: { trigger: texto.parentElement, start: 'top bottom', end: 'bottom top', scrub: .5 }
    });
  });
  const contato = document.querySelector('[data-letreiro-contato]');
  if (contato) {
    gsap.fromTo(contato, { xPercent: 0 }, { xPercent: -45, ease: 'none',
      scrollTrigger: { trigger: '.contato', start: 'top bottom', end: 'bottom bottom', scrub: .5 } });
  }
}

/* ---------- Seções: painel que abre (clip-path) e títulos por linha ---------- */
function entradaSecoes(gsap) {
  gsap.utils.toArray('.projetos, .contato').forEach((secao) => {
    gsap.fromTo(secao,
      { clipPath: 'inset(8% 5% 0% 5% round 40px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none',
        scrollTrigger: { trigger: secao, start: 'top bottom', end: 'top 25%', scrub: .6 } });
  });

  document.querySelectorAll('.secao__titulo, .contato__titulo').forEach((titulo) => {
    const { linhas, reverter } = dividirLinhas(titulo);
    gsap.from(linhas, {
      yPercent: 115, rotate: 3, transformOrigin: '0% 100%', duration: 1, stagger: .08, ease: 'expo.out', onComplete: reverter,
      scrollTrigger: { trigger: titulo, start: 'top 88%', once: true }
    });
  });

  gsap.utils.toArray('.galeria').forEach((galeria) => {
    gsap.from(galeria.querySelector('.galeria__trilho'), {
      y: 90, rotateX: 12, autoAlpha: 0, transformPerspective: 1200, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: galeria, start: 'top 82%', once: true }
    });
  });

  gsap.from('.contatos__item', {
    y: 30, autoAlpha: 0, duration: .9, stagger: .08, ease: 'expo.out',
    scrollTrigger: { trigger: '.contatos', start: 'top 85%', once: true }
  });

  // Palavra de categoria atrás do carrossel: cresce devagar enquanto a seção passa.
  const palavra = document.querySelector('.palavra-fundo');
  if (palavra) {
    gsap.fromTo(palavra, { scale: .85 }, { scale: 1.25, ease: 'none',
      scrollTrigger: { trigger: palavra.parentElement, start: 'top bottom', end: 'bottom top', scrub: .6 } });
  }
}

/* ---------- Botões magnéticos (desktop) ---------- */
function magneticos(gsap) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('main .btn--primario, .quadro__play-icone, .galeria__seta').forEach((botao) => {
    const x = gsap.quickTo(botao, 'x', { duration: .5, ease: 'power3' });
    const y = gsap.quickTo(botao, 'y', { duration: .5, ease: 'power3' });
    const alvo = botao.closest('.quadro__play') || botao;
    alvo.addEventListener('pointermove', (e) => {
      const r = botao.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * .25);
      y((e.clientY - r.top - r.height / 2) * .3);
    });
    alvo.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

/* ---------- Mudança de vibe ----------
   Ao entrar em Meu Olhar, o site inteiro muda para a vibe verde; ao sair, volta. Preso à rolagem. */
const VIBE_VERDE = {
  '--c-pelicula': '#0C2A1C',
  '--c-grafite': '#123826',
  '--c-fumaca': '#245A3F',
  '--c-luz': '#EEF0E4',
  '--c-mudo-escuro': '#A9C4B2',
  '--c-rec': '#8FE39C',
  '--c-tungstenio': '#C9F2A8'
};

function mudancaDeVibe(gsap) {
  const secao = document.querySelector('[data-vibe-global]');
  if (!secao) return;
  const estilo = getComputedStyle(raiz);
  const original = {};
  Object.keys(VIBE_VERDE).forEach((v) => { original[v] = estilo.getPropertyValue(v).trim(); });
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: secao, start: 'top 75%', end: 'bottom 25%', scrub: .6 }
  });
  tl.to(raiz, { ...VIBE_VERDE, duration: .2 })
    .to({}, { duration: .6 })
    .to(raiz, { ...original, duration: .2 });
}

export async function iniciarAnimacoes() {
  if (menosMovimento.matches) return;

  try {
    await carregar(CDN.gsap);
    await Promise.all([carregar(CDN.scrollTrigger), carregar(CDN.lenis)]);
  } catch (erro) {
    console.warn('[wee.] Animações desligadas:', erro.message);
    raiz.classList.add('hero-pronto');
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  await document.fonts.ready; // as linhas dos títulos dependem da fonte final

  raiz.classList.add('anim'); // liga os layouts que dependem do JS (rolagem lateral do Sobre)
  iniciarLenis(gsap, ScrollTrigger);

  const mm = gsap.matchMedia();
  entradaHero(gsap);
  heroRolagem(gsap, ScrollTrigger);
  showreel(gsap, mm);
  sobreLateral(gsap, mm);
  letreiros(gsap);
  entradaSecoes(gsap);
  magneticos(gsap);
  mudancaDeVibe(gsap);

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
