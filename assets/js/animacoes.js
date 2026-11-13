// wee. — animações de scroll (design.md §12). Única parte que depende de GSAP e Lenis.
// Se o CDN falhar ou o visitante pedir menos movimento, o site continua inteiro e legível.

const CDN = {
  gsap: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
  scrollTrigger: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
  lenis: 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js'
};

const raiz = document.documentElement;
const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
// Depois deste tempo o CSS já mostrou o hero por segurança: não repetir a entrada.
const LIMITE_ENTRADA_MS = 1500;

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

/* ---------- Divisão de um título em linhas com máscara ---------- */
function dividirLinhas(titulo) {
  const original = titulo.innerHTML;
  const palavras = [];

  [...titulo.childNodes].forEach((no) => {
    if (no.nodeType === Node.TEXT_NODE) {
      no.textContent.split(/\s+/).filter(Boolean).forEach((p) => {
        const span = document.createElement('span');
        span.className = 'palavra';
        span.textContent = p;
        palavras.push(span);
      });
    } else if (no.nodeType === Node.ELEMENT_NODE) {
      const span = document.createElement('span');
      span.className = 'palavra';
      span.append(no.cloneNode(true));
      palavras.push(span);
    }
  });

  titulo.replaceChildren();
  palavras.forEach((p, i) => { if (i) titulo.append(' '); titulo.append(p); });

  // Agrupa as palavras pela linha em que caíram.
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
    const dentro = document.createElement('span');
    dentro.className = 'linha__dentro';
    grupo.forEach((p, i) => { if (i) dentro.append(' '); dentro.append(...p.childNodes); });
    linha.append(dentro);
    titulo.append(linha);
    return dentro;
  });

  return { linhas, reverter: () => { titulo.innerHTML = original; } };
}

/* ---------- Rolagem suave ---------- */
function iniciarLenis(gsap, ScrollTrigger) {
  const lenis = new window.Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);

  // Links internos (#secao) rolam pelo Lenis, descontando o header fixo.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const alvo = document.querySelector(id);
    if (!alvo) return;
    e.preventDefault();
    lenis.scrollTo(alvo, { offset: -72 });
    history.replaceState(null, '', id);
  });

  // Menu e lightbox travam a rolagem da página.
  document.addEventListener('wee:trava', (e) => { if (e.detail) lenis.stop(); else lenis.start(); });
  return lenis;
}

/* ---------- #2 Título do hero ---------- */
function entradaHero(gsap) {
  const titulo = document.querySelector('.hero__titulo');
  if (!titulo) return;
  const resto = [...titulo.parentElement.children].filter((no) => no !== titulo);

  // Com a intro do obturador ativa, a entrada espera ela terminar (sem limite de tempo).
  const esperaIntro = document.documentElement.classList.contains('intro-ativa');
  if (!esperaIntro && performance.now() > LIMITE_ENTRADA_MS) return; // já está visível

  const comecar = () => {
    const { linhas, reverter } = dividirLinhas(titulo);
    const acento = titulo.querySelector('.acento');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: reverter });
    tl.from(linhas, { yPercent: 115, duration: 0.9, stagger: 0.08 });
    if (acento) {
      tl.from(acento, { rotate: 7, yPercent: 40, transformOrigin: '0% 100%', duration: 0.9 }, '<0.25');
    }
    tl.from(resto, { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.07, clearProps: 'all' }, '-=0.6');
  };
  if (esperaIntro) document.addEventListener('wee:intro-fim', comecar, { once: true });
  else comecar();
}

/* ---------- Títulos de seção: linhas sobem ao entrar na tela ---------- */
function entradaTitulos(gsap) {
  // Títulos grandes: divididos em linhas já na carga, escondidos, e revelados ao entrar.
  document.querySelectorAll('.secao__cabeca .t-l, .cta-final .t-xl').forEach((titulo) => {
    if (titulo.getBoundingClientRect().top < window.innerHeight * 0.85) return; // já está na tela
    const { linhas, reverter } = dividirLinhas(titulo);
    gsap.from(linhas, {
      yPercent: 115,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      onComplete: reverter,
      scrollTrigger: { trigger: titulo, start: 'top 88%', once: true }
    });
  });

  // Blocos de apoio (rótulos e contatos): sobem e aparecem.
  document.querySelectorAll('.secao__cabeca .rotulo, .contatos').forEach((bloco) => {
    if (bloco.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    gsap.from(bloco, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: bloco, start: 'top 90%', once: true }
    });
  });
}

/* ---------- Botões magnéticos (desktop) ---------- */
function magneticos(gsap) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('main .btn--primario, .quadro__play-icone').forEach((botao) => {
    const x = gsap.quickTo(botao, 'x', { duration: 0.4, ease: 'power3' });
    const y = gsap.quickTo(botao, 'y', { duration: 0.4, ease: 'power3' });
    const alvo = botao.closest('.quadro__play') || botao;
    alvo.addEventListener('pointermove', (e) => {
      const r = botao.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.22);
      y((e.clientY - r.top - r.height / 2) * 0.3);
    });
    alvo.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

/* ---------- #4 Corte diagonal ---------- */
function cortes(gsap) {
  document.querySelectorAll('.corte').forEach((secao) => {
    gsap.fromTo(secao, { '--corte': 1 }, {
      '--corte': 0,
      ease: 'none',
      scrollTrigger: { trigger: secao, start: 'top bottom', end: 'top 30%', scrub: 0.6 }
    });
  });
}

/* ---------- #3 Palavra "PLAY" que cresce com a rolagem, atrás de tudo ---------- */
/* O quadro do vídeo fica normal. A palavra gigante (atrás do conteúdo) é que cresce. */
function palavraQueCresce(gsap, mm) {
  const secao = document.querySelector('.showreel');
  const palavra = secao?.querySelector('.showreel__palavra');
  if (!palavra) return;

  // Desktop: a seção fica fixa enquanto a palavra cresce e sai de trás da tela.
  mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: '+=90%',
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
    tl.to(palavra, { scale: 3.4, ease: 'power2.inOut' })
      .to({}, { duration: 0.2 }); // segura um instante no tamanho máximo
    return () => gsap.set(palavra, { clearProps: 'all' });
  });

  // Celular e tablet: sem pin, a palavra cresce junto com a rolagem.
  mm.add('(max-width: 1023px)', () => {
    gsap.fromTo(palavra, { scale: 1 }, {
      scale: 1.9,
      ease: 'none',
      scrollTrigger: { trigger: secao, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
    return () => gsap.set(palavra, { clearProps: 'all' });
  });
}

/* ---------- Palavras gigantes de Projetos e Meu Olhar: crescem com a rolagem, atrás de tudo ---------- */
function palavrasFundoCrescem(gsap) {
  // Sem pin (as seções são longas): a palavra cresce conforme a seção passa pela tela.
  document.querySelectorAll('.palavra-fundo').forEach((palavra) => {
    gsap.fromTo(palavra, { scale: 1 }, {
      scale: 2.1,
      ease: 'none',
      scrollTrigger: { trigger: palavra.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });
}

/* ---------- Fotogramas caindo e empilhando (design.md §12.2 #7) ---------- */
function fotogramasCaindo(gsap) {
  // A galeria de Meu Olhar entra descendo de leve (as fotos são trocadas por setas, não empilhadas).
  const grupo = document.querySelector('.meu-olhar [data-galeria]');
  if (!grupo) return;
  gsap.fromTo(grupo,
    { y: -60, autoAlpha: 0 },
    {
      y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: grupo, start: 'top 85%', once: true }
    });
}

/* ---------- Moldura da foto 3×4: ganha a classe "on" ao entrar na tela (anima só uma vez) ---------- */
function molduraEntrada(ScrollTrigger) {
  const moldura = document.querySelector('.documento__foto');
  if (!moldura) return;
  ScrollTrigger.create({
    trigger: moldura,
    start: 'top 85%',
    once: true,
    onEnter: () => moldura.classList.add('on')
  });
}

/* ---------- Mudança de vibe ----------
   Valores da vibe verde. Devem bater com .vibe-verde em secoes.css.
   Para outra seção, copie o bloco, troque as cores e marque a seção com data-vibe-global. */
const VIBE_VERDE = {
  '--c-pelicula': '#0F3B26',
  '--c-grafite': '#15492F',
  '--c-fumaca': '#2D6B4B',
  '--c-luz': '#F0ECE0',
  '--c-mudo-escuro': '#B8D2C0',
  '--c-rec': '#8FE39C',
  '--c-tungstenio': '#C9F2A8'
};

/** Ao entrar na seção marcada, o site inteiro muda para a vibe; ao sair, volta. Fluido, preso à rolagem. */
function mudancaDeVibe(gsap) {
  const secao = document.querySelector('[data-vibe-global]');
  if (!secao) return;
  const estilo = getComputedStyle(raiz);
  const original = {};
  Object.keys(VIBE_VERDE).forEach((v) => { original[v] = estilo.getPropertyValue(v).trim(); });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: secao, start: 'top 80%', end: 'bottom 20%', scrub: 0.6 }
  });
  // Entra na vibe em ~25% da seção, mantém o verde cheio por ~50% e volta nos últimos ~25%.
  tl.to(raiz, { ...VIBE_VERDE, duration: 0.25 })
    .to({}, { duration: 0.55 })
    .to(raiz, { ...original, duration: 0.25 });
}

/* ---------- Fundo degradê: as luzes se deslocam com a rolagem até "Vamos trabalhar" ---------- */
function fundoRolagem(gsap) {
  const fim = document.getElementById('contato');
  const a = document.querySelector('[data-fundo="a"]');
  const b = document.querySelector('[data-fundo="b"]');
  const c = document.querySelector('[data-fundo="c"]');
  if (!fim || !a || !b || !c) return;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: document.body, start: 'top top', endTrigger: fim, end: 'top bottom', scrub: 1 }
  });
  tl.to(a, { x: '34vw', y: '70vh', scale: 1.25 }, 0)
    .to(b, { x: '-42vw', y: '-40vh', scale: 0.85 }, 0)
    .to(c, { x: '26vw', y: '-30vh', scale: 1.15 }, 0)
    .to('.fundo', { opacity: 0 }, 0.82); // some quando entra o contato (papel)
}

/* ---------- Régua de timecode que anda com a rolagem (design.md §12.2 #5) ---------- */
function reguaRolagem(gsap) {
  const marcas = document.querySelectorAll('.regua .timecode');
  if (!marcas.length) return;
  gsap.fromTo(marcas, { x: 140 }, {
    x: -200, ease: 'none',
    scrollTrigger: { trigger: '#projetos', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
  });
}

export async function iniciarAnimacoes() {
  if (menosMovimento.matches) return;

  try {
    await carregar(CDN.gsap);
    await Promise.all([carregar(CDN.scrollTrigger), carregar(CDN.lenis)]);
  } catch (erro) {
    console.warn('[wee.] Animações desligadas:', erro.message);
    raiz.classList.add('anim'); // libera o que o CSS escondeu
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  await document.fonts.ready; // as linhas dos títulos dependem da fonte final

  raiz.classList.add('anim');
  iniciarLenis(gsap, ScrollTrigger);

  const mm = gsap.matchMedia();
  entradaHero(gsap);
  palavraQueCresce(gsap, mm);
  palavrasFundoCrescem(gsap);
  cortes(gsap);
  entradaTitulos(gsap);
  magneticos(gsap);
  fotogramasCaindo(gsap);
  molduraEntrada(ScrollTrigger);
  reguaRolagem(gsap);
  mudancaDeVibe(gsap);
  fundoRolagem(gsap);

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
