# wee. — Portfólio de filmmaker

Landing page premium + página de Currículo para apresentar e vender os vídeos de **wee.**
Objetivo único: gerar pedidos de orçamento pelo WhatsApp.

## Fontes de verdade (ler antes de qualquer tarefa)

- @specs/site.md — o que construir: escopo, páginas, seções, funcionalidades, stack e requisitos.
- @specs/design.md — identidade visual: paleta, tipografia, componentes e animações.
- @memoria.md — decisões aprovadas e rejeitadas, problemas, pendências e próximos passos.

## Delegação de decisões (desde 2026-11-12)

O dono delegou ao Claude as decisões de design e implementação. Pode aprovar itens `[PROPOSTA]` e `[A DEFINIR]` dessa área e seguir sem perguntar, registrando cada decisão em @memoria.md.

Continuam com o dono: conteúdo real (textos comerciais, contatos, vídeos, clientes, preços), compra de licenças, publicação e deploy, troca de stack e qualquer ação externa ou irreversível. Nada disso é inventado nem feito sem ele.

## Regra de conflito (obrigatória)

Se algum pedido meu contradisser uma decisão registrada em @specs/site.md, @specs/design.md ou @memoria.md, pare e me avise antes de realizar qualquer alteração. Explique qual decisão seria afetada e pergunte se desejo substituí-la.

## Regras de trabalho

- Não altere a stack técnica sem minha autorização.
- Não remova uma decisão aprovada silenciosamente.
- Não invente informações comerciais, médicas ou técnicas sobre o produto.
- Sempre preserve a consistência visual e estrutural entre as seções.
- Antes de uma mudança grande, apresente um plano resumido.
- Depois de uma decisão importante aprovada, atualize @memoria.md.
- Itens marcados `[PROPOSTA]` ou `[A DEFINIR]` nas specs ainda não são decisões. Confirme comigo antes de tratá-los como definitivos.
- Use só conteúdo real que eu fornecer (nomes, contatos, clientes, números, vídeos). Onde faltar, deixe um placeholder visível `[PREENCHER: ...]`.
- As referências servem só como direção de estrutura e atmosfera. Nunca copie textos, nomes, logos, imagens, elementos exclusivos ou layouts idênticos.
- Escreva e responda em português do Brasil.
- Toda resposta no chat usa o modo caveman lite, aplicado antes de responder, para economizar tokens. Vale só para a conversa: arquivos, código, specs, memória e commits seguem escrita normal.
- Exceções ao caveman: em perguntas de decisão, em resultado final de tarefa e em qualquer aviso de conflito com as specs, a resposta sai em escrita normal, sem compressão. Modo ultra só para status rápido, nunca para decisões ou entrega final.

## Mapa da pasta

- `referencias/refs.txt`: links das referências (A = videomaker-portfolio-v2, B = jjettas) e a orientação "se inspire principalmente nas animações".
- `referencias/screencapture-*.png`, `referencias/Gravando *.mp4`: prints e gravação das referências.
- `referencias/V1 — prévia do portfólio.html`: prévia antiga com conteúdo de exemplo. **Não é fonte de verdade.**
- `assets/fonts/`: fontes enviadas (`rodmolle-condensed-demo.*`, `milesdane-trial.otf`), em versão demo (ver Problemas em @memoria.md).
- `index.html` (landing única, com Sobre mim, Meu Olhar e Contato) e `404.html`. A página de Currículo foi removida em 2026-11-12.
- `assets/css/`: `tokens.css` (espelha @specs/design.md), `base.css`, `componentes.css`, `secoes.css`.
- `assets/js/`: `main.js`, `whatsapp.js`, `menu.js`, `lightbox.js`. Animações de scroll em `animacoes.js`; REC, cursor e pausa das animações fora da tela em `efeitos.js`; galerias com setas (Projetos e Meu Olhar) em `galeria.js`; intro e cortinas entre páginas em `transicao.js`.
- `assets/video/lateral-esquerda.apng` e `lateral-direita.apng`: vídeos laterais do showreel (só desktop), gerados de `imagens\esquerda.mov` e `direita.mov`.
- `..\backup-site-v3-2026-11-12`: cópia anterior à varredura de limpeza e fluidez (fora do projeto).
- `assets/img/logo-luz.png` (fundo escuro) e `logo-tinta.png` (papel): logo oficial, recebida do dono.
- `..\backup-site-v1-2026-11-12`: cópia da versão anterior às animações e ao logo (fora do projeto).
- `data/contato.js` e `data/projetos.js`: único lugar para editar contatos, showreel e projetos.
- `para-subir/`: onde o dono entrega o conteúdo (capas, infos, fotos). Fica fora do deploy. Guia em `para-subir/LEIA-ME.txt`.
- Teste local: configuração `portfolio-wee` no `.claude/launch.json` da pasta raiz (`node portfolio/.claude/servidor.mjs`, http://localhost:5520). A antiga `wee-site` (PowerShell, 5500) fica no `.claude/launch.json` do projeto. Os módulos JS não abrem com duplo clique.
- **v4 (2026-11-21):** o visual vem de `assets/css/v4.css` + `transitions-root.css` (+ `tokens.css`). `base.css`, `componentes.css` e `secoes.css` não são carregados. Detalhes em @memoria.md.
- A pasta `referencias/` fica fora do deploy.
