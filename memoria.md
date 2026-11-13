# memoria.md — Histórico vivo do projeto

> Só o que ajuda a dar continuidade ao projeto. Datas em AAAA-MM-DD. O mais recente vai no topo de cada área.

---

## Decisões aprovadas

- **2026-11-12** · **Projetos sem filtros e com carrossel** (pedido do dono, confirmado em pergunta direta; substitui "Filtros: Todos, Festas, Eventos, Motions" e a linha do tempo de D3): os filtros saem; os destaques (até 8) passam para um carrossel com setas, contador, teclado e deslize, igual a Meu Olhar. "Ver todos" continua, em grade, sem filtro. A palavra gigante de fundo deixa de ser "Projetos" fixo: troca pela categoria do card do centro (FESTAS, EVENTO, MOTION). A régua de timecode ficou abaixo do carrossel (não foi pedida a remoção). Código: `galeria.js` (genérico, uma instância por `[data-galeria]`), `main.js` (`iniciarProjetos`, `PALAVRA_CATEGORIA`), `index.html` (seção 4), `secoes.css` (bloco 4).
- **2026-11-12** · **Projetos: só o carrossel** (pedido do dono, confirmado em pergunta direta; substitui D3, "Ver todos" e o CTA de fim de Projetos de `site.md` §8): saem o botão "Ver todos", a grade e o botão WhatsApp de Projetos. O carrossel mostra só os projetos com `destaque: true`, sem limite. Flyer Tionisio e Polako saíram de `data/projetos.js` e tiveram os arquivos do site apagados (`assets/video/evento-03.mp4`, `assets/img/capas/evento-03.jpg`, `assets/img/capas/festas-03-polako.jpg`). Ensaio Comercial e Lash Designer entram em destaque. Carrossel atual: Baile Funk 2000s, Helipa Festival, Tionisio Cabaret, Ato Pró-Lula, Copa do Mundo, Ensaio Comercial, Lash Designer, Carnavapo (8). Projetos com `destaque: false` não aparecem no site. Os originais em `imagens\` e `para-subir\` não foram mexidos. Testado: 8 cards, sem "Ver todos", seção seguinte é Meu Olhar, a palavra volta a FESTAS depois de 8 setas.
- **2026-11-12** · **Carnavapo em destaque** (pedido do dono): `destaque: true` em `data/projetos.js`, para o motion entrar no carrossel e a palavra virar MOTION. Para caber em 8, o Ensaio Comercial saiu do destaque e foi para "Ver todos" (junto com o Lash Designer). Testado: 8 no carrossel, MOTION com o Carnavapo no centro.
- **2026-11-12** · **Instagram** aponta para `https://www.instagram.com/rec.wee/` (pedido do dono), em todos os links de Instagram (`main.js`, `preencherContatos`).

- **2026-11-12** · **Revisão completa pedida pelo dono** (substitui decisões anteriores; a versão anterior está em `..\backup-site-v2-2026-11-12`):
  - **Hero:** texto "Com a visão de um diretor e a criatividade de uma criança, seu projeto vira filme!". "diretor" e "filme" em Milesdane (mesma tipografia de "lembrados"). "criança" em blocos de alfabeto 3D que balançam. Subtítulo removido. Botões: **WhatsApp** e **Ver showreel**.
  - **WhatsApp:** todo botão abre `https://wa.me/5514991485234` com a mensagem "Oi wee, quero um orçamento." (`assets/js/whatsapp.js`).
  - **Contato:** e-mail criticalkrx@gmail.com, Instagram @rec.wee, atuação "Botucatu e Região". Título da seção: "Vamos trabalhar?".
  - **Projetos:** sem o rótulo "Portfólio". Filtros: Todos, Festas, Eventos, Motions (antes: Festas, Marcas, Clipes, Sociais).
  - **Removidos:** seção "Para quem" e página **Currículo** (pasta `curriculo/` e todos os links).
  - **Sobre mim** (logo abaixo do showreel): documento de identificação com foto 3×4 (placeholder), campos (Nome, Apelido, Nascimento, Função, Atuação, Edição, Captação e roteiro), carimbo, linha de segurança, microtexto e a bio com o texto exato enviado. Chapéu de palha de ilustração acima do "O" de One Piece (SVG próprio, não é o Luffy). A seção usa a vibe verde.
  - **Meu Olhar:** seção nova de fotografias, identidade verde. Ao entrar nela, o site todo muda para a vibe verde (acentos e fundos) e volta ao sair. Fluido, preso à rolagem.
  - **Menu:** corrigido. O link não rolava porque o Lenis estava parado com o menu aberto. Agora todos os itens levam à seção certa.
  - **Mudança de vibe (reutilizável):** cores em `.vibe-verde` (`assets/css/secoes.css`) e em `VIBE_VERDE` (`assets/js/animacoes.js`). Para outra seção, copiar o bloco e marcar a seção com `data-vibe-global`. Pedir "mudar a vibe" de outra seção aplica esta mesma lógica.

- **2026-11-12** · **Delegação ao Claude:** o dono deixa de aprovar decisões de design e implementação e pede que tudo seja aprovado a partir daqui. Itens `[PROPOSTA]` e `[A DEFINIR]` dessa área podem ser decididos e registrados aqui. Fica com o dono: conteúdo real, compras e licenças, publicação/deploy, troca de stack e ações externas (ver `CLAUDE.md`, "Delegação de decisões").

- **2026-11-12** · **Regra de respostas:** toda resposta no chat usa o modo caveman lite, aplicado antes de responder, para economizar tokens. Vale só para o chat; arquivos, código, specs e memória seguem escrita normal. Registrada em `CLAUDE.md` (Regras de trabalho).
- **2026-11-12** · **Exceções ao caveman:** decisões, resultado final e avisos de conflito saem em escrita normal. Ultra só para status rápido (ver `CLAUDE.md`).

- **2026-11-12** · **Logo `wee.` de cabeça para baixo é proposital** (arquivo `imagens\Logo.png`, versões em `assets/img/logo-luz.png` e `logo-tinta.png`). Não girar nem "corrigir".

- **2026-11-12** · **Plano de implementação aprovado**, com quatro ajustes nas specs:
  - **D1** · Hero sem vídeo de fundo. O loop fica num quadro 16:9 abaixo do título e cresce ao rolar (site.md §6.1, design.md §12.2 #3).
  - **D2** · Novo arquivo `data/contato.js` para WhatsApp, e-mail, Instagram e cidade. O showreel entra em `data/projetos.js`.
  - **D3** · Linha do tempo de Projetos com até 8 destaques. O restante abre numa grade pelo botão "Ver todos".
  - **D4** · Ordem das animações: base de rolagem primeiro, intro por último (ver Próximos passos).
- **2026-11-12** · Cores de fundo por seção da landing: Hero, Showreel, Projetos, Para quem e Sobre em escuro; CTA final em Papel; rodapé em escuro. Currículo em Papel.
- **2026-11-12** · **site.md aprovado por inteiro:**
  - ordem das 10 seções da landing;
  - mensagens prontas do WhatsApp por origem/público;
  - lightbox com fachada, filtro por categoria, preview no hover e menu em tela cheia;
  - transição entre páginas;
  - `data/projetos.js` como único lugar para editar projetos;
  - SEO básico e página 404;
  - métrica de cliques por origem;
  - proposta de valor ("Filmes que fazem o seu momento, a sua marca ou o seu som serem lembrados");
  - estrutura de pastas (com `referencias/` fora do deploy).
- **2026-11-12** · **design.md aprovado por inteiro:** conceito "Em cena" (ponto de `wee.` = luz de REC); paleta Película / Grafite / Fumaça / Papel / REC `#FF4D1F` / Tungstênio `#FFB13B`; **Inter Tight** como fonte de texto e interface (3ª família); escala tipográfica, espaçamentos, raios, botões e cards; direção de fotos e tratamento dos vídeos; tokens e catálogo de 13 animações; regras para desktop e celular.
- **2026-11-12** · Marca: **`wee.`** é o nome definitivo.
- **2026-11-12** · Idioma: somente **português do Brasil**.
- **2026-11-12** · Estrutura: **Landing + página Currículo** (2 páginas).
- **2026-11-12** · Público: **festas e eventos, marcas e empresas, artistas e músicos, casamentos e eventos sociais** (os quatro).
- **2026-11-12** · Objetivo principal: **gerar pedidos de orçamento**.
- **2026-11-12** · CTA principal: **WhatsApp direto**, com mensagem pronta.
- **2026-11-12** · Stack: **HTML/CSS/JS puro + GSAP (ScrollTrigger) + Lenis via CDN**, sem build.
- **2026-11-12** · Tipografia: usar as fontes enviadas pelo dono, **Rodmolle Condensed** e **Milesdane**.
- **2026-11-12** · Referências: A = videomaker-portfolio-v2, B = jjettas. Inspiração principal: **as animações** (sobretudo da B).
- **2026-11-12** · Conteúdo real que já existe (ainda não enviado): **links dos vídeos** e **contatos**.

## Decisões rejeitadas

- **2026-11-12** · Loop do showreel como fundo de tela cheia do hero → virou quadro abaixo do título (D1).
- **2026-11-12** · Abrir fonts.googleapis.com pelo navegador do app para baixar a Inter Tight → recusado pelo dono. Não repetir sem pedir.
- **2026-11-12** · Site bilíngue ou só em inglês → ficou só PT-BR.
- **2026-11-12** · Landing única sem Currículo, e site com várias páginas → ficou Landing + Currículo.
- **2026-11-12** · Vender pacotes com preço público → o foco é orçamento.
- **2026-11-12** · Next.js e Astro → ficou HTML/CSS/JS sem build.
- **2026-11-12** · Formulário, e-mail ou Telegram como CTA principal → ficou WhatsApp (e-mail e Instagram ficam como secundários).
- **2026-11-12** · Fontes gratuitas como display (Anton/Big Shoulders, serifas do Google) → ficaram as fontes do dono.

## Alterações realizadas

- **2026-11-13** · **Projeto enviado ao GitHub** (pedido do dono): `https://github.com/weeog/myportfolio` (repositório **público**, branch `main`, 1 commit, 58 arquivos, ~100 MB). Autor do commit: `weeog <weeog@users.noreply.github.com>` (config local do repositório, para não expor o e-mail pessoal). Login feito pelo dono no navegador (Git Credential Manager).
  - **Ficam fora** (`.gitignore`): `imagens/`, `para-subir/`, `referencias/`, `skills/`, `cam ref/` (originais acima de 100 MB, entregas e materiais de terceiros) e `.claude/settings.local.json`.
  - **Fontes demo no repositório (decisão do dono, 2026-11-13):** o primeiro envio deixou as fontes de fora (uso pessoal, sem licença para redistribuir). O dono pediu para subi-las mesmo assim, "mesmo sendo demo", porque devem estar no site (a hospedagem é a Vercel). Entraram `assets/fonts/rodmolle-condensed-demo.otf`, `.ttf` e `milesdane-trial.otf`, e o `LEIA-ME.txt` saiu. **Risco aceito pelo dono:** o repositório é público, então as fontes demo estão redistribuídas, e o site no ar usa fontes de uso pessoal comercialmente. A compra das licenças continua pendente e bloqueante para publicar (ver Pendências).
  - **Atenção:** o repositório é público e inclui `memoria.md` e `CLAUDE.md` (notas internas, contatos e caminhos locais), as specs e todos os vídeos de `assets/video/`. Na Vercel, esses arquivos viram endereços públicos se o projeto for ligado ao repositório sem um `.vercelignore` (proposto, ainda não criado).
  - **Publicação/deploy segue com o dono:** o repositório não é hospedagem. As fontes licenciadas continuam sendo o bloqueio para publicar o site.

- **2026-11-12** · **Varredura (impeccable + safe-refactor), parte 2 de 2: fluidez e teste nos quatro tamanhos.** Feito depois da parte 1 (abaixo).
  - **Título do hero:** `.linha + .linha { margin-top: -.24em; }` (`componentes.css`). O título dividido em linhas ficava 26 px mais alto que o original no desktop (margens negativas que colapsam): a página pulava no fim da entrada e o gatilho que fixa o showreel era medido em 738 em vez de 712 em recargas rápidas. Agora o título dividido mede 409,1 px contra 409,2 px do original, e o gatilho nasce em 712.
  - **Cursor:** o laço de quadros só roda enquanto o disco se move (`efeitos.js`). Parado, 0 quadros (antes rodava sem parar).
  - **Pausa fora da tela (design.md §12.3):** `pausarForaDaTela` em `efeitos.js` marca `.hero`, `.showreel` e `.sobre-mim` com `.pausada` quando saem da tela (margem de 200 px); blocos, REC, moldura e chapéu param e retomam ao voltar. O fundo degradê segue rodando.
  - **Laterais do showreel:** agora em `<picture>` com `media="(min-width: 1024px) and (prefers-reduced-motion: no-preference)"`. No celular e com movimento reduzido o APNG não é baixado (antes: 12 MB baixados e ocultos). Sem o atributo `type`, para não depender de o navegador reconhecer `image/apng`.
  - **APNG regravados** a partir de `imagens\esquerda.mov` e `direita.mov`: topo limpo antes do `scale` (`drawbox ... replace=1`, 12 linhas da fonte) e 8 bits por canal (antes 16). Mesmo tamanho (360×632) e mesmos quadros; PSNR médio de 74,8 dB contra a versão anterior (visualmente igual). Sai a linha escura do topo. Peso: 2,0 MB cada (antes 5,7 MB). As versões anteriores estão no backup v3.
  - **Prova de que o visual não mudou:** caixa e estilo de 301 elementos, em 9 posições de rolagem, antes e depois, em 1280×800 (Windows), 1440×900 (tamanho de Mac), 375×812 (Android emulado: UA Pixel 8, toque) e 390×844 (tamanho de iPhone), mais a 404 em dois tamanhos. Diferenças inesperadas: **zero**. Diferenças esperadas: fonte dos links da logo (sem texto), os novos `<picture>`/`<source>` e a posição inicial do cursor invisível. Altura e largura da página iguais nos quatro.
  - **Testes de uso aprovados:** carrossel (setas, teclado, clique lateral, deslize por toque, FESTAS/EVENTO/MOTION), Meu Olhar, lightbox (YouTube e mp4 vertical), showreel, menu (abrir, Esc, link), links do rodapé, WhatsApp e contatos, sem rolagem lateral, sem erro no console.
  - **Limite do teste:** tudo rodou no navegador interno (Chromium, no Windows). Safari real (Mac e iPhone) e um Android físico **não** foram testados; só tamanho, toque e UA emulados. Pela leitura do código, o site depende de recursos do Safari 16.2+ (`overflow: clip`, `color-mix`) e 15.4+ (`<dialog>`, `dvh`, `:has`).
  - **PLAY atrás do quadro (decidido pelo dono em 2026-11-13: deixar assim):** no desktop, o "PLAY" começa quase todo escondido atrás do quadro do showreel e só aparece ao crescer com a rolagem. Isso veio do ajuste que impediu o corte do vídeo. Substitui o pedido anterior de leitura completa do PLAY no desktop. Não mexer sem novo pedido.
  - **Auditoria (nota 16/20, "bom"):** acessibilidade 3, desempenho 3, temas 3, responsivo 4, integridade 3. Custos conhecidos e mantidos por serem parte do visual aprovado: a mudança de vibe anima 7 variáveis de cor na raiz (recalcula o estilo da página inteira durante a transição) e o carrossel anima `left`/`width`.

- **2026-11-12** · **Varredura (impeccable + safe-refactor), parte 1 de 2: código morto removido.** Backup antes de mexer: `..\backup-site-v3-2026-11-12` (60 arquivos). O launcher do impeccable não rodou (baixaria um binário); o roteiro foi seguido lendo as referências da skill.
  - **CSS removido:** chips de filtro, `.btn--grande`, `.link--seta`, `.topo__link`, `.logo__ponto`, `[aria-current]`, restos do documento (`linha-seguranca`, `topo`, `num`, `rodape`, `microtexto`, `carimbo`), `.olhar__texto`, regras duplicadas (`.menu__contatos li`, `.galeria__item.fotograma img`, seletor repetido do cursor) e propriedades de texto da `.logo` (hoje é imagem).
  - **JS removido:** `focoPuxado`, `carimboBate`, seletores do Currículo e de "Para quem" em `entradaTitulos`, ouvinte `wee:layout`, bloco do PDF do currículo, `data-categoria`/`data-formato` dos cards, parâmetro `ehProjeto` e reaplicação do WhatsApp no lightbox. `curriculoPdf` saiu de `data/contato.js`.
  - **HTML:** ícone `#i-seta` e classes `pagina-landing`/`pagina-404` (sem uso).
  - **Mantido de propósito:** tokens e `.t-citacao` (espelham o design.md), estados guiados por dados (loop, duração, cliente, `sem-numero`), transição entre páginas, `logo-tinta.png`.
  - **Prova (desktop 1280×800):** medição de caixa e estilo de 301 elementos em 5 posições de rolagem, antes e depois. Única diferença: propriedades de fonte nos 3 links da logo, que não têm texto. Nenhuma caixa mudou. Os outros tamanhos foram conferidos na parte 2 (acima).

- **2026-11-12** · **Showreel cortado embaixo** (print do dono): no desktop, a seção tem 100vh, mas o PLAY (34vh) entrava no fluxo acima do quadro 9:16. O quadro passava da altura da seção e era cortado pelo `overflow: clip`. Correção: no desktop com animação, o PLAY sai do fluxo (absoluto, centralizado, atrás de tudo) e o quadro fica centralizado sozinho (`assets/css/secoes.css`, `.anim .showreel__palavra`). Não verificado no navegador (o painel estava oculto e o Playwright não tem Chrome instalado); a causa veio da medição do print.

- **2026-11-12** · **Laterais do showreel trocadas por vídeos do dono** (`imagens\esquerda.mov` à esquerda e `imagens\direita.mov` à direita, ProRes 4444 com fundo transparente, 1080×1920, 5,3 s). Os originais estão em `imagens\`. Não dá para usar o `.mov` no navegador, e o ffmpeg disponível não tem encoder VP9/WebM com alfa. Por isso ficaram em **APNG** (vídeo animado com transparência, em loop, sem JS): `assets/video/lateral-esquerda.apng` e `lateral-direita.apng`, 360×632, 24 fps, 5,7 MB cada. Recorte: 24 px pretos do topo. Sem espelho: cada lado tem o seu vídeo. A figura e o diamante SVG foram removidos (`index.html`, `secoes.css`). Com movimento reduzido ficam ocultos. Em aberto: os vídeos são pretos sobre o fundo escuro, então o contraste é baixo; o dono pode pedir para clarear.

- **2026-11-12** · **Cursor corrigido** (prints do dono): (1) o disco "VER" cobria o botão "Assistir ao showreel". Agora não aparece dentro do `.showreel`. (2) Um ponto branco parado aparecia na área clara do contato. Agora o disco só aparece sobre cards ("PLAY") e links ("VER"), e some quando o mouse sai deles (`assets/js/efeitos.js`). Testado por eventos: showreel sem disco, card PLAY, link VER, texto sem disco.

- **2026-11-12** · **Laterais do showreel** (pedido do dono, com base nas referências `referencias\greenlock.mp4` e `referencias\site death scroll.mp4`, só como inspiração): à esquerda, uma figura pontilhada cai em direção a um diamante que gira; à direita, o espelho (`.lateral--direita`, `scaleX(-1)`). Figura e diamante são SVG próprios, sem copiar nada das referências. Só em desktop (≥ 1024px); animação só com `.anim` (movimento reduzido fica estático). Decisão de design tomada por delegação: a cena fica nas laterais do showreel, onde o espaço vazio aparece. Código em `index.html` (dentro de `#showreel`) e `assets/css/secoes.css` (`.lateral`, `wee-gira`, `wee-queda`). Testado a 1280 px: sem rolagem lateral e sem erro novo. Animação verificada por valores (cai de -40 a 204 px e reinicia). Em aberto: confirmar o traço da figura no celular real, e se o dono quer as laterais também em outras seções.

- **2026-11-12** · **Nomes dos eventos** (dono): 01 "Ato Pró-Lula", 02 "Copa do Mundo", 03 "Flyer Tionisio", 04 "Ensaio Comercial". O 05 segue "Evento 05" (sem nome ainda). O quadrado vazio de evento horizontal foi removido de `data/projetos.js`.
- **2026-11-12** · **Opções de capa enviadas ao dono:** 3 quadros por vídeo (20%, 50% e 80% da duração) em `scratchpad\capas-opcoes\*-opcoes.jpg`. Aguardando a escolha de cada um para trocar as capas.
- **2026-11-12** · **Capas escolhidas pelo dono** (720×1280, em `assets/img/capas/`): Ato Pró-Lula = quadro 1 (15,7 s); Copa do Mundo = quadro 1 (7,0 s); Flyer Tionisio = quadro 3, "DJ Zóio" (12,9 s); Ensaio Comercial = quadro 2 (10,3 s); Lash Designer = quadro 3 (34,8 s). **Suposição:** "Lash Designer" é o vídeo `evento-05` (vick), que é o 6º arquivo da lista do dono. Confirmar. Motion: enviadas 10 opções (grade `motion-10-opcoes.png`). Escolhida a 2ª (7,9 s), capa em `assets/img/capas/motion-carnavapo.jpg` (720×1280). Testado: card "Carnavapo" com capa carregada no filtro Motions.
- **Pendente:** o dono citou "Evento 6: Lash Designer", mas não há vídeo correspondente nas pastas. Aguardar o arquivo.

- **2026-11-12** · **Eventos e motion hospedados no site** (vídeos da pasta `upar ytb\drive-download-…`, todos verticais, comprimidos com o encoder `h264_mf`, 720×1280, ~2 Mbps). Mapeamento provisório, a confirmar pelo dono:
  - `evento-01.mp4` (19,9 MB) = `ATOLULAA.mp4`
  - `evento-02.mp4` (8,3 MB) = `FIM (1).mp4`
  - `evento-03.mp4` (4 MB) = `lv_0_20251209210227.mp4`
  - `evento-04.mp4` (4,9 MB) = `ninoR (1).mp4`
  - `evento-05.mp4` (10,6 MB) = `vick (2).mp4`
  - `motion-carnavapo.mp4` (16 MB) = `lv_0_20260909220536.mp4`, motion "Carnavapo" (confirmado pelo dono).
  - Títulos dos eventos são provisórios ("Evento 01"…). Capas são quadros de 1 s de cada vídeo, em `assets/img/capas/`.
  - Falta o vídeo horizontal de eventos (o card continua em branco).
  - `data/projetos.js` reescrito com esses links. Filtro de Eventos testado: 5 cards com vídeo e capa.

- **2026-11-12** · **Baile 2000s e Tionisio Cabaret hospedados no site** (pedido do dono, porque não conseguia subir no YouTube). Os originais (130 MB cada) estão em `imagens\`. Comprimidos com o ffmpeg do CapCut (encoder `h264_mf` do Windows, 720×1280, 30 fps, ~2 Mbps, AAC 96k): `assets/video/festas-baile-funk-2000s.mp4` (15,2 MB, 1:02) e `assets/video/festas-tionisio-cabaret.mp4` (18,8 MB, 1:16). Em `data/projetos.js`, o link desses dois agora é o caminho local. O Tionisio passa a ser 9:16 (o arquivo é vertical, 1078×1920), embora o `info.txt` dissesse horizontal. Isso contraria a regra de hospedar vídeos longos só no YouTube/Vimeo, e foi decidido pelo dono. `lightbox.js` passou a aceitar caminho relativo para `.mp4`. Testado: os dois abrem no lightbox e tocam.
- **2026-11-12** · **Documento de identificação enxuto:** removidos o texto "Documento de identificação", "Nº 001 · 2003", a linha "WEE • FILMMAKER •", o selo "wee. Botucatu" e o microtexto de REC. O cartão termina na bio.

- **2026-11-12** · **Palavra gigante atrás de Projetos e Meu Olhar** (mesma lógica do "PLAY"): cada seção ganhou um `.palavra-fundo` (texto "Projetos" e "Meu Olhar") atrás de todo o conteúdo (`z-index: -1`, `isolation: isolate`), em REC com opacidade 14%. Ela cresce com a rolagem até 2,1× (`palavrasFundoCrescem` em `animacoes.js`). Sem pin, porque as duas seções são longas; o PLAY segue fixado. Testado: Projetos em 1,35× atrás dos cards, sem erro novo.

- **2026-11-12** · **Zoom do showreel trocado de lugar** (pedido do dono, gravação `Gravando 2026-11-12 123100oie.mp4`): o quadro do vídeo agora fica com tamanho normal. O crescimento com a rolagem passou para a palavra gigante "PLAY", que fica atrás de todo o conteúdo (`.showreel` com `isolation: isolate` e `.showreel__palavra` com `z-index: -1`). No desktop, a seção fica fixa enquanto a palavra cresce (3,4×); no celular, a palavra cresce junto com a rolagem (1,9×). Função `palavraQueCresce` em `animacoes.js`. Testado: quadro sem escala, palavra em 3,4× e atrás do vídeo.

- **2026-11-12** · **Meu Olhar refinado:** removido o texto "[PREENCHER: texto curto sobre a fotografia]". As fotos laterais agora têm desfoque leve (2,5 px) e a principal fica nítida. Ao passar o mouse numa lateral (só com mouse), ela clareia (1 px) e mostra o convite "VER". As transições usam uma curva de saída mais rápida no começo (`--ease-galeria: cubic-bezier(.23, 1, .32, 1)`, 560 ms), seguindo a regra de Emil Kowalski de não usar ease-in em interface. Só `transform`, `opacity` e `filter` são animados. Testado: laterais com blur, centro sem blur, contador e setas funcionando.

- **2026-11-12** · **Fotos de Meu Olhar integradas** (10 fotos de `para-subir/06-meu-olhar/`). Originais em WebP de 1,5 a 8 MB, reduzidas com o ffmpeg (do CapCut) para JPEG de 1000 px de lado maior, 71 a 214 KB cada, em `assets/img/meu-olhar/01.jpg` a `10.jpg`. Ligadas na galeria, com texto alternativo "Fotografia N de 10". Sem legendas (o `MEU-OLHAR.txt` veio vazio). Testado: 10 carregadas, contador e setas funcionando.

- **2026-11-12** · **Chapéu sobre o "O" de One Piece** (bio do Sobre mim): aproximado do "O" e com uma faixa de espaço reservada acima da palavra (`padding-top` em `.onepiece`), para não cobrir a linha de cima. A fita do chapéu agora é verde (identidade), e não vermelha: é um chapéu de palha original, não uma cópia do personagem.

- **2026-11-12** · **Correções a partir da gravação de uso** (`Videos\Gravando 2026-11-12 112759.mp4`, 43 s):
  - **Lightbox vertical:** o palco colapsava (largura zero) e o vídeo do Baile não aparecia. Corrigido em `componentes.css` (`.lightbox--vertical .lightbox__palco`). Testado: 351×624 px com o vídeo.
  - **Cursor "PLAY" sobre o showreel:** o disco cobria o texto do botão e duplicava o ícone de play. O cursor agora só aparece nos cards (`efeitos.js` e `componentes.css`).
  - **Pendentes do dono:** o link do Tionisio Cabaret mostra "vídeo indisponível" no YouTube (provavelmente privado; deixar como não listado ou público). O Polako é um vídeo vertical, mas o `info.txt` diz horizontal.
  - Erro de sintaxe no console continua sem origem identificada; não afeta o uso.

- **2026-11-12** · **Links do YouTube integrados** (showreel e festas), a partir dos `info.txt` de `para-subir/`:
  - Showreel: título "ShowReel", vertical, link `youtube.com/shorts/oFG9lXsEvlc`.
  - Festas: "Baile Funk 2000s" (vertical, destaque decidido por mim), "Helipa Festival", "Polako" e "Tionisio Cabaret" (os três em horizontal, conforme o info.txt; a versão anterior dizia vertical). Categoria "festa" normalizada para "festas".
  - Ano e duração ficam em branco: o info.txt manda pegar na descrição do YouTube, e a leitura automática das páginas não trouxe esses dados.
  - Clique abre o vídeo no lightbox com o formato certo (testado no Baile e no showreel).
  - Obs.: o console mostra um "SyntaxError" sem origem identificada (não está nos meus arquivos; o site funciona).

- **2026-11-12** · **Capa do showreel** tirada do próprio vídeo (`para-subir/01-showreel/final.mp4`, 1080×1920, 52 s), no instante 0,85 s, onde aparece o "eai!" nítido no card laranja. Escolhido pelo dono ("usar o eai do começo"). Frames vizinhos (0,45 a 0,65 s) estavam borrados pela animação. A ferramenta de extração foi o `ffmpeg.exe` que vem com o CapCut instalado (nada novo instalado). O vídeo continua só na pasta do dono e não vai para o site.

- **2026-11-12** · **Conteúdo do dono implementado (showreel e festas 01–04):**
  - Capas convertidas para JPEG (lado maior até 900 px) em `assets/img/capas/`: `showreel.jpg` (598×296, pequena e em 2:1; pedir 1080×1920), `festas-01-baile-funk-anos-2000.jpg`, `festas-02-helipa-festival.jpg`, `festas-03-polako.jpg`, `festas-04-tionisio-cabaret.jpg`.
  - `data/projetos.js`: títulos tirados dos nomes das pastas; categoria festas; formato 9:16. Links ainda vazios (o `info.txt` está em branco).
  - **Cards em 1:1** (`.card__midia`, `componentes.css`). Os cards verticais não ocupam mais duas linhas nem têm largura diferente.
  - O vídeo só abre ao clicar no card (já era assim). Sem link, o lightbox mostra "[PREENCHER: link…]".
  - `base.css`: `.pin-spacer { overflow: clip }`. Corrige o quadro do showreel que crescia e vazava para fora da tela.

- **2026-11-12** · **Câmera 3D removida** (pedido do dono). Sem canvas, sem importmap do Three.js e sem `camera3d.js`. O fundo degradê continua.
- **2026-11-12** · **Galeria em Meu Olhar** (pedido do dono): substitui a grade de 10 fotos. Três fotos visíveis (centro maior e duas vizinhas menores e de lado). Setas esquerda e direita, circulares (depois da 10 volta à 1). Também funciona com teclado (setas, com a galeria em foco), com clique nas fotos vizinhas e com deslize no celular. Contador "01 / 10". Código em `assets/js/galeria.js`; marcação em `index.html`; estilo em `secoes.css` (`.galeria`). Testada no desktop e no celular.

- **2026-11-12** · **Ajustes da câmera, Sobre mim, vibe e contato** (pedido do dono):
  - **Câmera** atrás de todo o conteúdo (z -1, acima só do fundo). Modo grande (quase a tela toda) até o documento chegar a 70% da tela. Daí trava no lado direito e fica ali, mesmo com a rolagem descendo mais. Subir a rolagem além do documento devolve o modo grande (`assets/js/camera3d.js`, classe `camera3d--travada`).
  - **Sobre mim:** removido o fade por rolagem do texto (`focoPuxado` não é mais chamado). O texto aparece normal.
  - **Vibe verde:** a paleta da mudança de vibe agora é verde escuro (fundo) com texto off-white e destaques verde-limão (`VIBE_VERDE` e `.vibe-verde`). O documento de identificação mantém papel claro, com as cores definidas dentro dele.
  - **Contato:** o botão de contato virou só o ícone do WhatsApp (ainda é o ícone desenhado no site, não o logo oficial).
  - **Ponto aberto:** a transição da vibe usa scroll-scrub. O teste automático não conseguiu parar numa posição fixa, então vale conferir no painel rolando devagar.

- **2026-11-12** · **Fundo degradê e Nikon Z30 em 3D** (pedido do dono):
  - **Fundo:** o fundo preto liso (com grão) saiu das seções acima do contato. Agora há três luzes desfocadas (radial-gradient, sem `filter`, leve) que se deslocam com a rolagem (GSAP, scrub) e somem quando entra "Vamos trabalhar". O contato e o rodapé continuam sólidos. Substitui o fundo liso de `design.md` §1 e §12.2 #3 nessas seções. Decisão do dono.
  - **Câmera:** Nikon Z30 em Three.js (r169, jsDelivr), construída em código a partir das três fotos de `cam ref/` (frente, costas e topo). Gira de 0° a 360° conforme a rolagem da página inteira. Fica acima das seções (z-index 1, sem bloquear cliques). Não há modelo baixado.
  - **Skill img2threejs:** o pipeline dela roda com Python e Node, que não estão instalados aqui. Usei a regra dela (modelo em código, a partir da referência) à mão. O teste real da skill segue pendente.
  - Testado no desktop e no celular: sem erro no console, sem rolagem lateral, fundo some antes do contato.

- **2026-11-12** · **Skill nova `img2threejs` (v2.0.1, Apache-2.0)** recebida do dono em `skills\img2threejs-main.zip` e instalada em `C:\Users\natha\.claude\skills\img2threejs`. **Não testada:** a própria documentação diz que não suporta Windows e exige Node.js 18+, Git e Python 3.10+. Nesta máquina não há Node nem Python funcional (o `python` do sistema é só um atalho da Microsoft Store). Pendente: decidir se instala Node e Python (ou WSL) para testar. Uso previsto: gerar modelos 3D em Three.js a partir de imagem; o site 2D não depende dela.

- **2026-11-12** · **Moldes para o conteúdo do dono:**
  - `data/projetos.js`: showreel vertical (9:16) e 11 projetos: 4 festas (vertical), 5 eventos (vertical), 1 horizontal (categoria eventos, confirmada pelo dono), 1 motion (formato a confirmar). Os 8 primeiros vão à linha do tempo; os demais, a "Ver todos".
  - Showreel aceita formato vertical (`data-formato` no quadro, lido de `reel.formato`). Versão horizontal segue disponível com `formato: "16:9"`.
  - Meu Olhar com 10 espaços de foto (5 colunas no desktop).
  - Pasta `para-subir/`: `LEIA-ME.txt` (guia de entrega, tamanhos, vídeos por link), `MODELO-info.txt` e uma pasta por projeto com `info.txt`. Fica fora do deploy.
  - Testado: showreel 299×532, 8 cards na linha, 3 na grade, 10 fotos, sem erro.

- **2026-11-12** · **Hero reformatado** a pedido do dono ("diretor" saía do enquadramento): texto dividido em três frases (`.hero__frase`), que no desktop viram linhas fixas (Com a visão de um diretor / e a criatividade de uma criança, / seu projeto vira filme!). No celular o texto flui normal. "diretor" e "filme" menores (0,8em) com respiro para o itálico. Blocos de "criança" com inclinação menor, para as letras não serem cortadas. Testado em desktop e celular (375 px), sem rolagem lateral.

- **2026-11-12** · **Revisão completa aplicada** (ver Decisões aprovadas):
  - `index.html` reescrito com a nova ordem: Hero → Showreel → Sobre mim → Projetos → Meu Olhar → Contato → Rodapé.
  - `curriculo/` removido (cópia em `..\backup-site-v2-2026-11-12`).
  - Dados: `data/contato.js` (número, e-mail, Instagram, atuação), `data/projetos.js` (categorias festas/eventos/motions).
  - CSS: `secoes.css` reescrito (hero com blocos 3D, documento, Meu Olhar, vibe verde). Removido o CSS de Para quem e do Currículo.
  - JS: `whatsapp.js` (mensagem única), `menu.js` (destrava a rolagem ao clicar um link), `main.js` (categorias), `animacoes.js` (mudança de vibe na rolagem, carimbo, foco puxado na bio; removido o paralaxe de Para quem).
  - Testado em 1440 px e 375 px: sem rolagem lateral, sem erro no console, menu leva às seções, WhatsApp único, filtros certos.

## Soluções aplicadas

- **2026-11-12** · **Marca d'água da fonte demo nos sinais de pontuação** (ex.: "filme!"): a faixa de caracteres da Rodmolle e da Milesdane (`tokens.css`) agora cobre só letras. Pontuação e espaços caem na fonte do sistema. Os dígitos continuam fora pelo mesmo motivo.
- **2026-11-12** · Vírgula sozinha no início de linha no hero: "criança" e a vírgula ficam juntos num bloco `nowrap`.

- **2026-11-12** · **Pedido: backup + skills + animações "loucas" + polish.**
  - Backup da versão anterior em `..\backup-site-v1-2026-11-12` (fora da pasta do projeto, 33 arquivos).
  - Skills instaladas em `C:\Users\natha\.claude\skills\`: **impeccable** (v4.8.2, Apache 2.0) e **emil-design-eng** (Emil Kowalski). Cópias originais continuam em `skills\*.zip` do projeto.
  - Logo recebida (`imagens\Logo.png`): gerados `assets/img/logo-luz.png` (para fundo escuro) e `assets/img/logo-tinta.png` (para papel), com fundo transparente. Logo tipográfica trocada pela imagem em toda página. Isso resolve a pendência "enviar o logo".
  - **Polish (impeccable):** aplicado o checklist de `reference/polish.md` à mão. Não rodei o CLI de critique (o script não está instalado neste ambiente). Correções: contador REC não usa mais a duração do showreel; cursor só com mouse fino; todo efeito novo respeita "reduzir movimento".
  - **REC enlouquecido:** `[data-louco]` troca de valor a cada 70 ms, só enquanto está na tela, com falha em vermelho de vez em quando (`assets/js/efeitos.js`).
  - **Cursor de vídeo** (desktop): disco que segue o mouse e vira "PLAY" sobre cards e o quadro, "VER" sobre botões e links.
  - **Intro do obturador** (landing, 1ª visita da sessão): timecode de 00:00:00:00 a 00:00:01:12 e íris que abre. Clique pula. Fica com 650 ms no celular e 1 s no desktop. A entrada do hero espera a intro terminar (`assets/js/transicao.js`).
  - **Transição entre páginas:** cortinas de letterbox fecham, navegam e abrem no destino (só links internos; a página de destino abre as barras).
  - **Fotogramas** de Sobre caem e empilham ao entrar. **Manifesto** entra em foco puxado (desfoque só ali). **Palavras gigantes** de Para quem têm paralaxe. **Régua** de timecode anda com a rolagem.
  - Testado em 1440 px e 375 px: intro roda, REC muda, cortina navega, fotogramas empilham, sem rolagem lateral, sem erro no console.

- **2026-11-12** · **Animações — primeiro bloco** (passo 8 do plano), em `assets/js/animacoes.js` e `menu.js`:
  - CDN com versão fixa: **GSAP 3.13.0 + ScrollTrigger** e **Lenis 1.3.4** (jsDelivr), carregados só se o visitante não pediu menos movimento.
  - Feitos: rolagem suave (Lenis, `lerp 0.1`, links internos descontando o header); #2 título do hero por linhas com a palavra em Milesdane inclinando; títulos de seção por linhas e blocos de apoio subindo ao entrar; #4 corte diagonal (`clip-path`, -6° no desktop, -4° no celular) em Projetos, Para quem, Sobre e CTA final; #3 quadro do showreel que cresce até cobrir a tela com pin no desktop e só escala no celular; #9 menu com wipe e links em sequência; #10/#13 ponto REC pulsando no logo, no indicador e no botão flutuante; botões primários magnéticos no desktop.
  - Menu e lightbox param o Lenis enquanto estão abertos (evento `wee:trava`). O filtro de projetos recalcula os gatilhos (evento `wee:layout`).
  - Proteções: com "reduzir movimento" nada é carregado; se o CDN falhar, a página fica estática; o conteúdo do hero reaparece sozinho em 1,5 s se o JS não chegar.
  - Conferido em 1440×900 e 375×812: GSAP/Lenis carregam, sem estouro lateral, sem erros do site no console.
- **2026-11-12** · **Base estática do site construída e testada** (passos 3 a 6 do plano), sem animações de scroll:
  - Páginas: `index.html` (10 seções na ordem aprovada), `curriculo/index.html`, `404.html`.
  - CSS: `base.css`, `componentes.css`, `secoes.css` (celular → tablet → desktop).
  - JS: `main.js` (contatos, cards, filtro, "Ver todos", showreel, header, botão flutuante), `whatsapp.js` (mensagens aprovadas), `menu.js`, `lightbox.js` (YouTube/Vimeo só no clique).
  - Dados: `data/contato.js` (vazio) e `data/projetos.js` (8 modelos vazios).
  - Teste local: `.claude/servidor.ps1` + `.claude/launch.json` (http://localhost:5500), fora do deploy.
  - Conferido em 375px, 800px e 1440px: sem estouro lateral, sem erros no console, menu, filtro, lightbox e links de WhatsApp funcionando.
- **2026-11-12** · Textos provisórios usados, por falta de conteúdo: título do hero = proposta de valor aprovada; chamada final = "Pedir orçamento"; rótulos "Portfólio", "Quem eu filmo", "Contato"; botão "Chamar no WhatsApp"; `<title>` e descrição das páginas.
- **2026-11-12** · Pastas criadas conforme site.md §10. Prints, gravação, `refs.txt` e V1 movidos para `referencias/`. Fontes movidas para `assets/fonts/` e renomeadas sem espaços (`rodmolle-condensed-demo.otf/.ttf`, `milesdane-trial.otf`).
- **2026-11-12** · Criado `assets/css/tokens.css` (paleta, escala, espaços, raios, temas escuro/papel e `@font-face` sem os dígitos). É o único código existente. O trabalho foi pausado a pedido do dono para fazer o plano de implementação antes.
- **2026-11-12** · site.md: todas as marcações `[PROPOSTA]` passaram para `[APROVADO]`.
- **2026-11-12** · design.md: todas as marcações `[PROPOSTA]` passaram para `[APROVADO]`.
- **2026-11-12** · Criado o cérebro documental: `CLAUDE.md`, `specs/site.md`, `specs/design.md` e `memoria.md`. Nenhum código do site foi escrito.

## Problemas encontrados

- **2026-11-12** · **Fontes em versão demo, com marca d'água e uso não comercial.**
  - `Rodmolle Condensed Demo`: todos os dígitos 0–9 viram o selo "PERSONAL USE ONLY". A licença embutida diz "Personal Use Only. Non-Commercial Use".
  - `Milesdane Trial`: os dígitos 2, 5 e 8 viram o selo "PERSONAL USE ONLY ekobimantara.com".
  - Os acentos do português estão completos nas duas.
  - Um portfólio que vende serviços é uso comercial, então **não dá para publicar com essas versões**.
- **2026-11-12** · A **V1** (`V1 — prévia do portfólio.html`) repete quase literalmente elementos da Ref. A: monitor retrô com o showreel, papel-nota, adesivos no título, fundo de raios e 3 cards de contato.
- **2026-11-12** · O print completo do jjettas saiu quase todo preto, porque o conteúdo só aparece com a rolagem.
- **2026-11-12** · A gravação `Gravando 2026-11-12 034203.mp4` não pôde ser assistida (não há ferramenta de vídeo no ambiente).
- **2026-11-12** · A seção de Projetos da Ref. A não carrega no site ao vivo ("não foi possível carregar os projetos"), então não há referência de grade de projetos ali.
- **2026-11-12** · As referências estão na raiz do projeto, não numa pasta `referencias/`.

## Soluções aplicadas

- **2026-11-12** · Teste de animações com o painel do navegador oculto: o navegador suspende o `requestAnimationFrame` em segundo plano, então os gatilhos não disparam e parece bug. Para testar nesse estado, forçar `gsap.ticker.tick()` + `ScrollTrigger.update()`; o ideal é testar com o painel visível.
- **2026-11-12** · Quadro do showreel no desktop: a seção passa a ter a altura de uma tela (`.anim .showreel`), e o quadro desloca o centro até o centro da tela enquanto cresce, para cobrir as bordas.
- **2026-11-12** · Estouro lateral no celular (o header fixo ficava mais largo que a tela e o botão de menu sumia): `overflow-x: clip` em cada seção e `minmax(0, 1fr)` na grade do Sobre. Regra para o futuro: todo elemento decorativo que vaza (palavras gigantes, fotogramas girados) precisa ser cortado pela própria seção.
- **2026-11-12** · Cards verticais (9:16) na grade: ocupam duas linhas, sem cortar o vídeo.
- **2026-11-12** · Máquina sem Node nem Python: servidor estático em PowerShell (`.claude/servidor.ps1`). Os módulos JS não abrem com duplo clique no arquivo.
- **2026-11-12** · Fontes demo: definido em design.md §4 que os números são compostos na Inter Tight (`unicode-range` sem `U+0030-0039`). Aplicado em `assets/css/tokens.css`; falta conferir no navegador. A solução definitiva é comprar as licenças.
- **2026-11-12** · V1: design.md §15 lista o que aproveitar e o que substituir. design.md §14 proíbe os elementos copiados.
- **2026-11-12** · Ref. B: analisada ao vivo no navegador, rolando a página inteira. As animações estão catalogadas em design.md §0 e §12.
- **2026-11-12** · Ref. A: analisada pelo print e ao vivo (intro com raios, entrada do título, adesivos).

## Pendências

**Conteúdo (2026-11-12):**
- [ ] Preencher os `info.txt` de showreel e festas (hoje estão em branco): links do YouTube, ano, duração, cliente se autorizado, destaque e frase "Sobre".
- [ ] Capa do showreel em 1080×1920 (a atual é pequena e em 2:1).
- [ ] Eventos (6), horizontal e motion: títulos, capas e links.

**Fundo (2026-11-12):**
- [x] Câmera 3D removida a pedido do dono (2026-11-12). Arquivo `camera3d.js` apagado; a cópia fica no `backup` anterior, se for preciso.
- [ ] Testar o desempenho do fundo degradê num celular real.

**Pedido ao dono (2026-11-12):**
- [x] **Logos do Gmail e do Instagram** *(2026-11-12, feito)*:
  - `assets/img/marca-gmail.png`: PNG 686×512 RGBA, de `https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png` (Mailmeteor, terceiro; o site diz ser o logo oficial, não verificado). Escolhido pelo dono.
  - `assets/img/marca-instagram.svg`: SVG (não PNG), de `https://logotyp.us/file/instagram.svg` (Logotyp.us, terceiro, não oficial). Escolhido pelo dono. A versão oficial da Meta exige aceitar termos antes do download, então ficou de fora.
  - Decisão do dono (2026-11-12): **manter as logos de terceiros**. Não trocar pelas oficiais, a menos que o dono peça.
- [x] Foto 3×4 do documento: `imagens\rosto 3x4.jpg` (1080×1620, 2:3). Copiada para `assets/img/documento-3x4.jpg` e cortada para 3:4 pelo CSS. *(2026-11-12)*
- [x] Fotografias de Meu Olhar: 10 fotos recebidas e integradas (2026-11-12).
- [ ] Texto curto de apresentação de Meu Olhar (hoje é `[PREENCHER]`) e legendas, se quiser.

**Com o dono (conteúdo):**
- [ ] Enviar WhatsApp, e-mail, Instagram e cidade/região de atuação.
- [ ] Enviar o link do showreel e os links dos projetos, com título, categoria, ano e capa.
- [ ] Definir o descritor: filmmaker ou videomaker.
- [x] Enviar o logo `wee.` em arquivo. *(recebido em 2026-11-12, em `imagens\Logo.png`)*
- [x] Confirmar a orientação do logo. *(2026-11-12: o dono confirmou que o "wee" de cabeça para baixo é proposital. Não girar.)*
- [ ] Escrever e aprovar o texto do hero (a proposta de valor já foi aprovada).
- [ ] Listar os serviços reais.
- [ ] Enviar loops curtos e mudos (5–10 s), retrato e fotos de bastidor.
- [ ] Enviar o conteúdo do Currículo e o PDF.
- [ ] Dizer quais clientes podem aparecer nos projetos.

**Com o dono (decisões):**
- [x] Aprovar a paleta proposta (Película / REC / Tungstênio / Papel) em design.md §2. *(aprovado em 2026-11-12)*
- [x] Aprovar a Inter Tight como fonte de texto e interface em design.md §4. *(aprovado em 2026-11-12)*
- [x] Aprovar o conceito "Em cena" e o catálogo de animações em design.md §1 e §12. *(aprovado em 2026-11-12)*
- [x] Aprovar a ordem das seções da landing em site.md §6.1. *(aprovado em 2026-11-12)*
- [x] Aprovar as mensagens prontas do WhatsApp em site.md §8. *(aprovado em 2026-11-12)*
- [ ] Decidir como obter a Inter Tight para hospedar no site: o dono baixa e coloca em `assets/fonts/`, ou autoriza o download. Até lá o texto usa a fonte do sistema.
- [ ] Informar quantos projetos existem no total (define os 8 destaques).
- [ ] Decidir se entra a seção "Como funciona".
- [ ] Escolher hospedagem, domínio e ferramenta de medição.

**Bloqueante para publicar:**
- [ ] **Comprar as licenças comerciais + webfont** da Rodmolle (Ketikata Studio) e da Milesdane (Eko Bimantara) e trocar os arquivos demo pelos licenciados.

**Organização:**
- [x] Mover prints, gravação e V1 para `referencias/` e as fontes para `assets/fonts/`. *(feito em 2026-11-12)*

## Próximos passos

1. ~~Dono revisa e aprova as propostas de design.md.~~ Feito em 2026-11-12.
2. Dono envia contatos e links dos vídeos (de preferência num arquivo `conteudo.md`).
3. ~~Base: `base.css`, conferir as fontes no navegador, servidor local.~~ Feito em 2026-11-12.
4. ~~HTML das três páginas com placeholders `[PREENCHER]`.~~ Feito em 2026-11-12.
5. ~~Componentes e seções estáticas, do celular para o desktop.~~ Feito em 2026-11-12.
6. ~~Funções: WhatsApp, menu, lightbox, cards e filtro, botão flutuante.~~ Feito em 2026-11-12.
7. Conteúdo real, assim que o dono mandar: preencher `data/contato.js`, `data/projetos.js` e os `[PREENCHER]` do HTML.
8. Animações, nesta ordem (D4): ~~Lenis + ScrollTrigger → microinterações, título, menu, botão flutuante → corte diagonal → quadro que cresce~~ (feito em 2026-11-12) → **linha do tempo (#5)** → Para quem (#8) → manifesto e fotogramas (#6, #7) → cursor (#11) → transição de página (#12) → intro (#1). Testar movimento reduzido e celular a cada uma.
   - Ainda não testado: modo "reduzir movimento" (o painel do app não simula essa preferência), queda do CDN e 60 fps num celular real.
9. Auditoria: acessibilidade, Lighthouse no celular e testes em 320–1920px.
10. Publicação: fontes licenciadas, SEO, medição, deploy.
