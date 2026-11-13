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

  const tela = document.createElement('div');
  tela.className = 'intro-obt';
  tela.innerHTML = '<p class="rotulo intro-obt__rotulo"><span class="rec"></span>REC</p>' +
    '<p class="timecode intro-obt__tc">00:00:00:00</p>';
  document.body.append(tela);
  const tc = tela.querySelector('.intro-obt__tc');

  // 24 fps: 00:00:01:12 são 36 quadros. Mais curta no celular (≤ 1,2 s).
  const quadros = 36;
  const duracao = window.innerWidth < 768 ? 650 : 1000;
  const inicio = performance.now();
  let encerrada = false;

  function terminar() {
    if (encerrada) return;
    encerrada = true;
    tela.remove();
    raiz.classList.remove('intro-ativa');
    document.dispatchEvent(new CustomEvent('wee:intro-fim'));
  }

  function abrirIris() {
    if (encerrada) return;
    const iris = tela.animate(
      [{ clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)' }],
      { duration: 760, easing: EASE_SAIDA, fill: 'forwards' }
    );
    iris.onfinish = terminar;
  }

  function contar(agora) {
    if (encerrada) return;
    const p = Math.min(1, (agora - inicio) / duracao);
    const f = Math.round(p * quadros);
    tc.textContent = `00:00:${pad(Math.floor(f / 24))}:${pad(f % 24)}`;
    if (p < 1) requestAnimationFrame(contar);
    else abrirIris();
  }

  tela.addEventListener('click', terminar);     // quem não quer esperar pula
  requestAnimationFrame(contar);
  setTimeout(terminar, 2200);                    // rede de segurança
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
