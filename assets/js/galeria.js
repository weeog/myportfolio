// wee. — galerias com setas: Meu Olhar (fotos) e Projetos (cards). 3 itens visíveis (centro e vizinhos),
// setas, teclado, deslize e clique nos laterais. Circular: depois do último volta ao primeiro.
// Avisa cada troca com o evento "wee:galeria-troca" (detail: { atual }) no próprio elemento [data-galeria].

export function iniciarGaleria() {
  document.querySelectorAll('[data-galeria]').forEach(montar);
}

function montar(galeria) {
  const trilho = galeria.querySelector('[data-galeria-trilho]');
  const itens = [...trilho.querySelectorAll('.galeria__item')];
  const contador = galeria.querySelector('[data-galeria-contador]');
  const n = itens.length;
  if (!n) return;
  let atual = 0;

  // Distância circular de cada item até o atual, em [-n/2, n/2).
  const distancia = (i) => {
    let d = (((i - atual) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  function render() {
    itens.forEach((el, i) => {
      const d = distancia(i);
      el.classList.toggle('is-centro', d === 0);
      el.classList.toggle('is-esq', d === -1);
      el.classList.toggle('is-dir', d === 1);
    });
    contador.textContent = `${String(atual + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    galeria.dispatchEvent(new CustomEvent('wee:galeria-troca', { detail: { atual } }));
  }

  function ir(passo) {
    atual = (((atual + passo) % n) + n) % n;
    render();
  }

  galeria.querySelector('[data-galeria-anterior]').addEventListener('click', () => ir(-1));
  galeria.querySelector('[data-galeria-proxima]').addEventListener('click', () => ir(1));

  // Clicar num item vizinho leva até ele.
  itens.forEach((el, i) => {
    el.addEventListener('click', () => {
      const d = distancia(i);
      if (d !== 0) ir(d);
    });
  });

  // Teclado: setas esquerda e direita quando a galeria está em foco.
  galeria.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(1); }
  });

  // Deslizar no celular (arrastar mais de 40 px).
  let x0 = null;
  trilho.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  trilho.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
  });

  render();
}
