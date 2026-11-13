// wee. — inicialização da landing. Sem animações de scroll (ficam em animacoes.js).
import { iniciarWhats } from './whatsapp.js';
import { iniciarMenu } from './menu.js';
import { iniciarLightbox, abrirVideo } from './lightbox.js';
import { iniciarAnimacoes } from './animacoes.js';
import { iniciarGaleria } from './galeria.js';
import { timecodesLoucos, cursorVideo, pausarForaDaTela } from './efeitos.js';
import { iniciarIntro, iniciarTransicoes } from './transicao.js';

const contato = window.WEE_CONTATO || {};
const dados = window.WEE_PROJETOS || { showreel: {}, projetos: [] };

const CATEGORIAS = { festas: 'Festas', eventos: 'Eventos', motions: 'Motions' };
const hoverFino = window.matchMedia('(hover: hover) and (pointer: fine)');
const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
// Os caminhos de data/projetos.js partem da raiz do site.
const RAIZ = new URL('../../', import.meta.url);
const caminho = (rel) => new URL(rel, RAIZ).href;

function el(tag, classe, texto) {
  const no = document.createElement(tag);
  if (classe) no.className = classe;
  if (texto != null) no.textContent = texto;
  return no;
}

/* ---------- Contatos ---------- */
function preencherContatos() {
  const insta = String(contato.instagram || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '');
  // Link oficial do perfil (pedido do dono): https://www.instagram.com/rec.wee/
  const digitos = String(contato.whatsapp || '').replace(/\D/g, '');
  const valores = {
    whatsapp: digitos ? { texto: contato.whatsappTexto || `+${digitos}`, href: `https://wa.me/${digitos}`, externo: true } : null,
    email: contato.email ? { texto: contato.email, href: `mailto:${contato.email}` } : null,
    instagram: insta ? { texto: `@${insta}`, href: `https://www.instagram.com/${insta}/`, externo: true } : null,
    cidade: contato.cidade ? { texto: contato.cidade } : null
  };

  document.querySelectorAll('[data-contato]').forEach((no) => {
    const v = valores[no.dataset.contato];
    if (!v) { no.classList.add('preencher'); return; }
    no.textContent = v.texto;
    if (no.tagName === 'A' && v.href) {
      no.href = v.href;
      if (v.externo) { no.target = '_blank'; no.rel = 'noopener'; }
    }
  });

  document.querySelectorAll('[data-ano]').forEach((no) => { no.textContent = new Date().getFullYear(); });
}

/* ---------- Projetos ---------- */
function criarCard(p) {
  const li = el('li', 'card');

  const botao = el('button', 'card__botao');
  botao.type = 'button';
  const midia = el('span', 'card__midia');

  if (p.capa) {
    const img = el('img');
    img.src = caminho(p.capa);
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    midia.append(img);
  } else {
    midia.append(el('span', 'midia-vazia', `[PREENCHER: capa ${p.formato === '9:16' ? '9:16' : '16:9'}]`));
  }

  let video = null;
  if (p.loop) {
    video = el('video');
    video.src = caminho(p.loop);
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    midia.append(video);
  }

  midia.append(el('span', 'etiqueta', CATEGORIAS[p.categoria] || p.categoria));
  if (p.duracao) midia.append(el('span', 'timecode card__duracao', p.duracao));
  const cantos = el('span', 'enquadramento');
  cantos.setAttribute('aria-hidden', 'true');
  midia.append(cantos);

  const titulo = el('span', p.titulo ? 't-m card__titulo' : 'card__titulo preencher', p.titulo || '[PREENCHER: título do projeto]');
  botao.append(midia, titulo);

  const apoio = [p.cliente, p.ano].filter(Boolean).join(' · ');
  if (apoio) botao.append(el('span', 'card__apoio', apoio));

  botao.setAttribute('aria-label', `Assistir: ${p.titulo || 'projeto sem título'} (${CATEGORIAS[p.categoria] || p.categoria})`);
  botao.addEventListener('click', () => {
    // No carrossel, só o card do centro abre o vídeo; os laterais apenas trocam de projeto.
    if (li.classList.contains('galeria__item') && !li.classList.contains('is-centro')) return;
    abrirVideo({ titulo: p.titulo, link: p.link, formato: p.formato });
  });

  if (video) {
    botao.addEventListener('mouseenter', () => {
      if (!hoverFino.matches || menosMovimento.matches) return;
      video.classList.add('tocando');
      video.play().catch(() => {});
    });
    botao.addEventListener('mouseleave', () => {
      video.classList.remove('tocando');
      video.pause();
      video.currentTime = 0;
    });
  }

  li.append(botao);
  return li;
}

/* Palavra gigante de fundo de Projetos: troca conforme o projeto do centro do carrossel. */
const PALAVRA_CATEGORIA = { festas: 'FESTAS', eventos: 'EVENTO', motions: 'MOTION' };

function trocarPalavra(palavra, texto) {
  if (!palavra || palavra.textContent === texto) return;
  if (menosMovimento.matches) { palavra.textContent = texto; return; }
  palavra.classList.add('troca'); // some em 180 ms, troca o texto e volta
  setTimeout(() => {
    palavra.textContent = texto;
    palavra.classList.remove('troca');
  }, 180);
}

function iniciarProjetos() {
  const carrossel = document.querySelector('[data-projetos]');
  if (!carrossel) return;
  const trilho = carrossel.querySelector('[data-galeria-trilho]');
  const palavra = document.querySelector('[data-palavra-projetos]');
  const projetos = Array.isArray(dados.projetos) ? dados.projetos : [];
  // Só os destaques vão para o carrossel (com setas, em volta). Sem "Ver todos".
  const destaques = projetos.filter((p) => p.destaque);

  trilho.replaceChildren(...destaques.map((p) => {
    const card = criarCard(p);
    card.classList.add('galeria__item');
    return card;
  }));

  carrossel.addEventListener('wee:galeria-troca', (e) => {
    const p = destaques[e.detail.atual];
    if (p) trocarPalavra(palavra, PALAVRA_CATEGORIA[p.categoria] || 'PROJETOS');
  });
}

/* ---------- Showreel ---------- */
function iniciarShowreel() {
  const quadro = document.querySelector('[data-showreel]');
  if (!quadro) return;
  const reel = dados.showreel || {};
  const midia = quadro.querySelector('[data-showreel-midia]');
  const pausa = quadro.querySelector('[data-showreel-pausa]');

  const economia = navigator.connection?.saveData === true;

  if (reel.loop && !economia) {
    const video = el('video');
    video.src = caminho(reel.loop);
    if (reel.capa) video.poster = caminho(reel.capa);
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    midia.replaceChildren(video);

    const tocar = (sim) => {
      if (sim) video.play().catch(() => {}); else video.pause();
      pausa.setAttribute('aria-pressed', String(!sim));
      pausa.setAttribute('aria-label', sim ? 'Pausar o vídeo em loop' : 'Retomar o vídeo em loop');
    };
    pausa.hidden = false;
    let pausadoPeloUsuario = menosMovimento.matches;
    pausa.addEventListener('click', () => { pausadoPeloUsuario = !video.paused; tocar(video.paused); });

    // Só toca enquanto está na tela.
    new IntersectionObserver(([entrada]) => {
      tocar(entrada.isIntersecting && !pausadoPeloUsuario);
    }, { threshold: 0.25 }).observe(quadro);
  } else if (reel.capa) {
    const img = el('img');
    img.src = caminho(reel.capa);
    img.alt = '';
    midia.replaceChildren(img);
  }

  const formato = reel.formato === '16:9' ? '16:9' : '9:16';
  quadro.dataset.formato = formato;
  quadro.querySelector('[data-showreel-play]')?.addEventListener('click', () => {
    abrirVideo({ titulo: reel.titulo || 'Showreel', link: reel.link, formato });
  });
}

/* ---------- Header e botão flutuante ---------- */
function iniciarTopo() {
  const topo = document.querySelector('[data-topo]');
  if (!topo || topo.classList.contains('topo--solido')) return;
  const atualizar = () => topo.classList.toggle('topo--solido', window.scrollY > 24);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

function iniciarFlutuante() {
  const botao = document.querySelector('[data-flutuante]');
  const inicio = document.querySelector('.hero');
  const fim = document.getElementById('contato');
  if (!botao || !inicio || !fim) return;
  const visto = new Map();
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => visto.set(e.target, e.isIntersecting));
    botao.classList.toggle('visivel', !visto.get(inicio) && !visto.get(fim));
  }, { threshold: 0.1 });
  observador.observe(inicio);
  observador.observe(fim);
}

iniciarIntro();          // antes de tudo: a entrada do hero espera a intro
preencherContatos();
iniciarWhats();
iniciarMenu();
iniciarLightbox();
iniciarProjetos();
iniciarShowreel();
iniciarTopo();
iniciarFlutuante();
iniciarTransicoes();
timecodesLoucos();
pausarForaDaTela();
cursorVideo();
iniciarGaleria();
iniciarAnimacoes();
