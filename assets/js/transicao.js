// wee. — intro do obturador (1ª visita da sessão, só na landing) e transição entre páginas (cortinas).
// Só usa Web Animations API: funciona mesmo se o CDN do GSAP falhar.

const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
const CHAVE_INTRO = 'wee-intro-visto';
const CHAVE_ENTRADA = 'wee-entrada';
const EASE_CORTE = 'cubic-bezier(.65, 0, .35, 1)';
const EASE_SAIDA = 'cubic-bezier(.16, 1, .3, 1)';
const pad = (n) => String(n).padStart(2, '0');

function lerSessao(chave) { try { return sessionStorage.getItem(chave); } catch { return null; } }
function gravarSessao(chave, valor) { try { sessionStorage.setItem(chave, valor); } catch { /* navegação privada */ } }
function apagarSessao(chave) { try { sessionStorage.removeItem(chave); } catch { /* ignorar */ } }

function criarCortina() {
  const c = document.createElement('div');
  c.className = 'cortina';
  c.setAttribute('aria-hidden', 'true');
  c.innerHTML = '<span class="cortina__topo"></span><span class="cortina__base"></span>';
  document.body.append(c);
  return { el: c, topo: c.querySelector('.cortina__topo'), base: c.querySelector('.cortina__base') };
}

/** Fecha as barras sobre a tela (saída de página). */
function fecharCortina(c) {
  const opcoes = { duration: 460, easing: EASE_CORTE, fill: 'forwards' };
  return Promise.all([
    c.topo.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], opcoes).finished,
    c.base.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], opcoes).finished
  ]);
}

/** Abre as barras (entrada de página). */
function abrirCortina(c) {
  const opcoes = { duration: 560, easing: EASE_CORTE, fill: 'forwards', delay: 60 };
  return Promise.all([
    c.topo.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], opcoes).finished,
    c.base.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], opcoes).finished
  ]).then(() => c.el.remove());
}

/* ---------- Intro do obturador ---------- */
export function iniciarIntro() {
  if (!document.querySelector('.hero')) return;           // só na landing
  if (menosMovimento.matches || lerSessao(CHAVE_INTRO)) return;
  gravarSessao(CHAVE_INTRO, '1');

  const raiz = document.documentElement;
  raiz.classList.add('intro-ativa');

  // v4: o logo surge, a barra enche e a tela sobe como uma cortina (sem timecode).
  const tela = document.createElement('div');
  tela.className = 'intro';
  tela.innerHTML = '<img class="intro__logo" src="./assets/img/logo-luz.png" alt="" width="2120" height="1337">' +
    '<span class="intro__barra"><span></span></span>';
  document.body.append(tela);
  const logo = tela.querySelector('.intro__logo');
  const barra = tela.querySelector('.intro__barra span');
  const duracao = window.innerWidth < 768 ? 700 : 1000;
  let encerrada = false;

  function terminar() {
    if (encerrada) return;
    encerrada = true;
    tela.remove();
    raiz.classList.remove('intro-ativa');
    document.dispatchEvent(new CustomEvent('wee:intro-fim'));
  }

  function subirCortina() {
    if (encerrada) return;
    logo.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-40px)', opacity: 0 }],
      { duration: 400, easing: EASE_CORTE, fill: 'forwards' });
    const sobe = tela.animate(
      [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
      { duration: 800, delay: 120, easing: EASE_CORTE, fill: 'forwards' }
    );
    sobe.onfinish = terminar;
  }

  logo.animate([{ clipPath: 'inset(100% 0 0 0)', transform: 'translateY(30px)' }, { clipPath: 'inset(0 0 0 0)', transform: 'none' }],
    { duration: 700, easing: EASE_SAIDA, fill: 'backwards' });
  barra.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
    { duration: duracao, easing: EASE_CORTE, fill: 'forwards' }).onfinish = subirCortina;

  tela.addEventListener('click', terminar);     // quem não quer esperar pula
  setTimeout(terminar, 2600);                    // rede de segurança
}

/* ---------- Transição entre páginas ---------- */
export function iniciarTransicoes() {
  const voltando = lerSessao(CHAVE_ENTRADA) === '1';
  if (voltando) apagarSessao(CHAVE_ENTRADA);

  // Chegou por uma transição: barras começam fechadas e se abrem.
  if (voltando && !menosMovimento.matches && !document.documentElement.classList.contains('intro-ativa')) {
    const c = criarCortina();
    c.topo.style.transform = 'scaleY(1)';
    c.base.style.transform = 'scaleY(1)';
    abrirCortina(c).then(() => {
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
    });
  }

  if (menosMovimento.matches) return;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const destino = new URL(a.href, location.href);
    if (destino.origin !== location.origin) return;             // WhatsApp, PDF externo, etc.
    if (destino.pathname === location.pathname) return;          // âncoras da mesma página
    e.preventDefault();
    gravarSessao(CHAVE_ENTRADA, '1');
    const c = criarCortina();
    fecharCortina(c).then(() => { location.href = destino.href; });
  });
}
