// wee. — menu em tela cheia: abre com wipe, prende o foco, fecha com Esc.

const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
const EASE_CORTE = 'cubic-bezier(.65, 0, .35, 1)';
const EASE_SAIDA = 'cubic-bezier(.16, 1, .3, 1)';

function travar(sim) {
  document.documentElement.classList.toggle('menu-aberto', sim);
  document.dispatchEvent(new CustomEvent('wee:trava', { detail: sim }));
}

export function iniciarMenu() {
  const menu = document.getElementById('menu');
  const abrir = document.querySelector('[data-menu-abrir]');
  if (!menu || !abrir) return;
  const fechar = menu.querySelector('[data-menu-fechar]');
  const links = [...menu.querySelectorAll('.menu__link')];
  let animacao = null;

  const focaveis = () => [...menu.querySelectorAll('a[href], button:not([disabled])')]
    .filter((el) => el.offsetParent !== null);

  function abrirMenu() {
    animacao?.cancel();
    menu.hidden = false;
    abrir.setAttribute('aria-expanded', 'true');
    travar(true);
    (fechar || focaveis()[0])?.focus();

    if (menosMovimento.matches) {
      menu.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
      return;
    }
    // #9: o painel desce com clip-path e os links entram em sequência.
    animacao = menu.animate(
      [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }],
      { duration: 550, easing: EASE_CORTE }
    );
    links.forEach((link, i) => {
      link.animate(
        [{ transform: 'translateY(60%)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 700, delay: 180 + i * 60, easing: EASE_SAIDA, fill: 'backwards' }
      );
    });
  }

  function fecharMenu({ devolverFoco = true } = {}) {
    if (menu.hidden) return;
    abrir.setAttribute('aria-expanded', 'false');
    const terminar = () => {
      menu.hidden = true;
      travar(false);
    };
    if (devolverFoco) abrir.focus();

    if (menosMovimento.matches) { terminar(); return; }
    animacao?.cancel();
    animacao = menu.animate(
      [{ clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(100% 0 0 0)' }],
      { duration: 420, easing: EASE_CORTE }
    );
    animacao.onfinish = terminar;
  }

  abrir.addEventListener('click', abrirMenu);
  fechar?.addEventListener('click', () => fecharMenu());

  // Clicar num link destrava a rolagem ANTES de a navegação rodar (o Lenis
  // estava parado com o menu aberto, por isso o link não rolava) e fecha o menu.
  menu.addEventListener('click', (e) => {
    if (!e.target.closest('a[href]')) return;
    travar(false);
    fecharMenu({ devolverFoco: false });
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fecharMenu(); return; }
    if (e.key !== 'Tab') return;
    const itens = focaveis();
    if (!itens.length) return;
    const primeiro = itens[0];
    const ultimo = itens[itens.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });
}
