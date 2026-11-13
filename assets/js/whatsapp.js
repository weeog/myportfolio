// wee. — todos os botões de WhatsApp abrem a mesma conversa, com a mesma mensagem.
// Uso no HTML: <a data-wa>…</a>. Número e texto ficam em data/contato.js.

const MENSAGEM = 'Oi wee, quero um orçamento.';

function numero() {
  return String((window.WEE_CONTATO || {}).whatsapp || '').replace(/\D/g, '');
}

/** Monta o href de um elemento com data-wa. Sem número, marca o botão como pendente. */
function aplicarWhats(el) {
  const n = numero();
  if (!n) {
    el.classList.add('sem-numero');
    el.setAttribute('href', '#contato');
    el.title = '[PREENCHER: número do WhatsApp em data/contato.js]';
    return;
  }
  el.classList.remove('sem-numero');
  el.removeAttribute('title');
  el.href = `https://wa.me/${n}?text=${encodeURIComponent(MENSAGEM)}`;
  el.target = '_blank';
  el.rel = 'noopener';
}

export function iniciarWhats(raiz = document) {
  raiz.querySelectorAll('[data-wa]').forEach(aplicarWhats);

  // Ponto único para a medição de cliques por origem (ferramenta [A DEFINIR]).
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-wa]');
    if (!el || el.classList.contains('sem-numero')) return;
    document.dispatchEvent(new CustomEvent('wee:whatsapp', { detail: { origem: el.dataset.origem || 'geral' } }));
  });
}
