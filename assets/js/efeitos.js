// wee. — efeitos vivos sem GSAP: o REC que enlouquece e o cursor de vídeo (desktop).
// Com "reduzir movimento", nada disto roda: os números ficam parados.

const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
const hoverFino = window.matchMedia('(hover: hover) and (pointer: fine)');
const pad = (n) => String(n).padStart(2, '0');

/** Timecode aleatório no formato HH:MM:SS:FF, com horas quase sempre 00. */
function tcAleatorio() {
  const h = Math.random() < 0.9 ? 0 : Math.floor(Math.random() * 3);
  return `${pad(h)}:${pad(Math.floor(Math.random() * 60))}:${pad(Math.floor(Math.random() * 60))}:${pad(Math.floor(Math.random() * 30))}`;
}

/** Todo [data-louco] muda a cada ~70 ms, só enquanto está na tela. Às vezes "falha" em vermelho. */
export function timecodesLoucos() {
  if (menosMovimento.matches) return;
  const alvos = [...document.querySelectorAll('[data-louco]')];
  if (!alvos.length) return;

  const visiveis = new Set();
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
  });
  alvos.forEach((el) => observador.observe(el));

  setInterval(() => {
    if (document.hidden) return;
    visiveis.forEach((el) => {
      el.textContent = tcAleatorio();
      if (Math.random() < 0.07) {
        el.classList.add('tc--falha');
        setTimeout(() => el.classList.remove('tc--falha'), 110);
      }
    });
  }, 70);
}

/** Pausa as animações em loop (blocos, REC, moldura, chapéu) das seções fora da tela (design.md §12.3). */
export function pausarForaDaTela() {
  if (menosMovimento.matches || !('IntersectionObserver' in window)) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => e.target.classList.toggle('pausada', !e.isIntersecting));
  }, { rootMargin: '200px 0px' }); // retoma um pouco antes de a seção aparecer
  document.querySelectorAll('.hero, .showreel, .sobre-mim').forEach((secao) => observador.observe(secao));
}

/** Disco que segue o mouse e vira rótulo ("PLAY" sobre vídeos, "VER" sobre links). Só desktop. */
export function cursorVideo() {
  if (!hoverFino.matches || menosMovimento.matches) return;
  const cursor = document.querySelector('[data-cursor]');
  if (!cursor) return;
  const rotulo = cursor.querySelector('.cursor__rotulo');
  let mx = -100, my = -100, cx = -100, cy = -100;

  // O laço de quadros só roda enquanto o disco ainda está chegando ao mouse; parado, não gasta nada.
  let rodando = false;
  function seguir() {
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    if (Math.abs(mx - cx) < 0.05 && Math.abs(my - cy) < 0.05) { rodando = false; return; }
    requestAnimationFrame(seguir);
  }

  // O disco só aparece sobre cards e links (com rótulo). Solto na página, some: não sobra ponto branco parado.
  window.addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!rodando) { rodando = true; requestAnimationFrame(seguir); }
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('ativo'));

  document.addEventListener('pointerover', (e) => {
    // Dentro do showreel não há disco: o botão já tem o seu próprio ícone de play e o texto não pode ficar coberto.
    const noShowreel = e.target.closest('.showreel');
    // Só nos cards: PLAY. Links e botões fora do showreel: VER.
    const video = !noShowreel && e.target.closest('.card__botao');
    const link = !noShowreel && e.target.closest('a, button');
    const texto = video ? 'PLAY' : link ? 'VER' : '';
    cursor.classList.toggle('ativo', Boolean(texto));
    cursor.classList.toggle('cursor--grande', Boolean(texto));
    rotulo.textContent = texto;
  });
}
