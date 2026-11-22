// wee. — lightbox de vídeo. O iframe só é criado no clique (fachada).

let dialog, palco, tituloEl, cta, caixa, ultimoFoco;
let fechando = false;

/** Converte um link do YouTube ou Vimeo no endereço de incorporação. */
function enderecoEmbed(link) {
  let url;
  try { url = new URL(link, location.href); } catch { return null; } // aceita caminho relativo (ex.: assets/video/x.mp4)
  const host = url.hostname.replace(/^www\.|^m\./, '');

  if (host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    let id = '';
    if (host === 'youtu.be') id = url.pathname.slice(1);
    else if (url.searchParams.get('v')) id = url.searchParams.get('v');
    else {
      const partes = url.pathname.split('/').filter(Boolean);
      if (['shorts', 'embed', 'live'].includes(partes[0])) id = partes[1] || '';
    }
    id = id.split('/')[0];
    if (!/^[\w-]{6,}$/.test(id)) return null;
    return { tipo: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean).find((p) => /^\d+$/.test(p));
    if (!id) return null;
    return { tipo: 'iframe', src: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1` };
  }

  if (/\.(mp4|webm)$/i.test(url.pathname)) return { tipo: 'video', src: link };
  return null;
}

function aviso(texto) {
  const div = document.createElement('div');
  div.className = 'midia-vazia';
  div.textContent = texto;
  return div;
}

export function abrirVideo({ titulo, link, formato }) {
  if (!dialog) return;
  ultimoFoco = document.activeElement;
  tituloEl.textContent = titulo || 'Vídeo';
  dialog.classList.toggle('lightbox--vertical', formato === '9:16');

  const embed = link ? enderecoEmbed(link) : null;
  if (!link) {
    palco.replaceChildren(aviso('[PREENCHER: link do vídeo em data/projetos.js]'));
  } else if (!embed) {
    palco.replaceChildren(aviso('Este link não é do YouTube nem do Vimeo. Suba o vídeo para um dos dois.'));
  } else if (embed.tipo === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.src = embed.src;
    iframe.title = titulo || 'Vídeo';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    palco.replaceChildren(iframe);
  } else {
    const video = document.createElement('video');
    video.src = embed.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    palco.replaceChildren(video);
  }

  dialog.showModal();
  // transitions.dev "modal": a caixa sobe de --modal-scale até 1.
  caixa?.classList.remove('is-closing');
  requestAnimationFrame(() => caixa?.classList.add('is-open'));
  document.dispatchEvent(new CustomEvent('wee:trava', { detail: true }));
}

/** Fecha com a saída do transitions.dev ("is-closing" por --modal-close-dur) e só então fecha o <dialog>. */
function fecharVideo() {
  if (!dialog.open || fechando) return;
  if (!caixa) { dialog.close(); return; }
  fechando = true;
  const ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--modal-close-dur')) || 150;
  caixa.classList.remove('is-open');
  caixa.classList.add('is-closing');
  setTimeout(() => {
    caixa.classList.remove('is-closing');
    fechando = false;
    dialog.close();
  }, ms);
}

export function iniciarLightbox() {
  dialog = document.querySelector('[data-lightbox]');
  if (!dialog) return;
  palco = dialog.querySelector('[data-lightbox-palco]');
  tituloEl = dialog.querySelector('[data-lightbox-titulo]');
  cta = dialog.querySelector('[data-lightbox-cta]');
  caixa = dialog.querySelector('[data-lightbox-caixa]');

  dialog.querySelector('[data-lightbox-fechar]')?.addEventListener('click', fecharVideo);
  // Clique fora da caixa (no fundo escuro) fecha.
  dialog.addEventListener('click', (e) => { if (e.target === dialog) fecharVideo(); });
  // Esc: segura o fechamento nativo para tocar a saída.
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); fecharVideo(); });
  // Ao fechar (botão, Esc ou clique fora): para o vídeo e devolve o foco.
  dialog.addEventListener('close', () => {
    caixa?.classList.remove('is-open', 'is-closing');
    palco.replaceChildren();
    document.dispatchEvent(new CustomEvent('wee:trava', { detail: false }));
    ultimoFoco?.focus?.();
  });
  // O link de orçamento dentro do lightbox leva ao contato: fecha antes de rolar.
  cta?.addEventListener('click', () => { if (cta.getAttribute('href') === '#contato') fecharVideo(); });
}
