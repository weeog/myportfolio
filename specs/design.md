# specs/design.md — Identidade visual

> **Revisão 2026-11-12, 2ª (pedido do dono):** em Projetos, a linha do tempo (§12.2 item 5) virou carrossel com setas, igual a Meu Olhar. A palavra gigante de fundo troca para a categoria do card do centro (FESTAS, EVENTO, MOTION). Laterais do showreel: dois vídeos com fundo transparente (APNG), um de cada lado. Detalhes em `memoria.md`.

> **Revisão 2026-11-12 (pedido do dono):** nova "mudança de vibe" verde + off-white, usada em Sobre mim e Meu Olhar. Ao entrar em Meu Olhar, o site inteiro muda de vibe na rolagem e volta ao sair. Palavras de destaque (diretor, filme, Olhar) em Milesdane. Blocos de alfabeto 3D na palavra "criança". Cores e regras em `assets/css/secoes.css` (`.vibe-verde`) e `assets/js/animacoes.js` (`VIBE_VERDE`). Detalhes em `memoria.md`.

> Fonte de verdade visual do portfólio **wee.**
> Referências (`refs.txt`): **A** = videomaker-portfolio-v2.vercel.app · **B** = jjettas.com. Orientação do dono: "se inspire principalmente nas animações".
> As referências são só direção de estrutura e atmosfera. A identidade abaixo é original.
> Convenção: `[APROVADO]` · `[PROPOSTA]` · `[A DEFINIR]`. Última atualização: 2026-11-12. Todas as propostas deste arquivo foram aprovadas pelo dono em 2026-11-12.

---

## 0. Análise das referências (resumo)

| Aspecto | Ref. A (videomaker) | Ref. B (jjettas) | Princípio que levamos |
|---|---|---|---|
| Estrutura | Hero escuro → objeto-herói com o showreel → painéis arredondados empilhados (Projetos) → contato em cards | Hero com retrato → transição diagonal → carrossel horizontal fixado → citação → pilha de fotos → slideshow fixado de parcerias → fundação → faixa de fotos → menu-rodapé | **Uma ideia por tela**, com um "grande momento" de movimento por seção |
| Paleta | Carvão (#1C1C1C/#262626), verde-limão ácido, branco, bege do objeto | Creme com textura de couro, preto arroxeado, roxo, dourado | **Escuro dominante + um acento vibrante + um claro texturizado** |
| Tipografia | Condensada pesada em caixa alta (Druk) + grotesca (Inter Tight) | Condensada alta (Beachwood) + grotesca pequena | **Display condensada gigante como elemento gráfico**, texto curto e neutro |
| Espaço e ritmo | Respiro amplo e seções que se sobrepõem | Seções de tela cheia; pins que duram 2 a 4 telas de rolagem | **Rolagem como linha do tempo**, alternando pausas (pin) e fluxo |
| Imagens | Objeto 3D realista recortado sobre palavra gigante | Recortes que vazam a borda da seção, polaroids com borda e rotação, produtos recortados | **Camadas**: palavra gigante atrás, mídia na frente, quebrando a borda da seção |
| Tom | Criativo, lúdico, de estúdio | Épico, editorial, premium | **Premium e cinematográfico**, com energia de festa e sobriedade para marcas |
| Hierarquia | Título gigante > subtítulo curto > CTA em pílula | Igual, com rótulos pequenos espaçados | Igual: **título > uma linha de apoio > um CTA** |

**Animações observadas na Ref. B (inspiração principal):** rolagem suave (Lenis); seção seguinte entrando em diagonal por cima do hero; elemento que "viaja" do hero para a seção seguinte; carrossel horizontal fixado com régua numérica em paralaxe; texto gigante em retícula que se resolve numa citação; polaroids que caem e se empilham sobre a citação; slideshow fixado com palavra gigante ao fundo, indicador vertical de progresso e faixa de logos em loop; menu que abre com wipe; botão redondo flutuante.
**Animações na Ref. A:** raios que giram na intro, título que entra por linhas, adesivos que surgem com "pop".

## 1. Direção visual `[APROVADO]`

**Conceito: "Em cena."** O site se comporta como um filme rodando: luz de REC, timecode, cantos de enquadramento (viewfinder), régua de timeline de edição e folha de contato. Tudo vem da linguagem de quem filma, nada do universo das referências.

- **Landing:** escura (sala de cinema), com respiros em "papel".
- **Currículo:** clara (papel), com blocos escuros pontuais. Mesmos tokens e componentes.
- **Assinatura da marca:** o ponto de `wee.` é a **luz de REC**: vermelho-alaranjado, pulsando devagar. Aparece no logo, no indicador de gravação do hero e no botão flutuante.
- **Textura:** grão de película sutil (4–6% de opacidade) sobre os fundos lisos. Nunca sobre o vídeo.

## 2. Paleta `[APROVADO]`

### Principal

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--c-pelicula` | Película | `#0F0E0D` | Fundo escuro principal |
| `--c-grafite` | Grafite | `#1B1917` | Superfícies e cards sobre o escuro |
| `--c-fumaca` | Fumaça | `#34302C` | Bordas, divisórias e régua sobre o escuro |
| `--c-papel` | Papel | `#EDE8E0` | Fundo claro (Currículo, respiros) |
| `--c-papel-2` | Papel 2 | `#E1DACF` | Cards sobre papel |
| `--c-rec` | REC | `#FF4D1F` | Acento primário: CTA, ponto do logo, destaques |

### Secundária

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--c-tungstenio` | Tungstênio | `#FFB13B` | Microdetalhes sobre o escuro: timecode, anel de foco, sublinhado de hover |
| `--c-luz` | Luz | `#F3EFE8` | Texto principal sobre o escuro |
| `--c-tinta` | Tinta | `#141210` | Texto principal sobre o papel e sobre o REC |
| `--c-mudo-escuro` | Cinza sobre escuro | `#9A928A` | Texto secundário sobre o escuro |
| `--c-mudo-claro` | Cinza sobre papel | `#5F5850` | Texto secundário sobre o papel |

**Proporção aproximada na landing:** 70% escuros · 20% papel · 8% REC · 2% tungstênio.

**Contrastes verificados (WCAG):**

| Combinação | Razão | Pode usar em |
|---|---|---|
| Luz sobre Película | ≈ 17:1 | Qualquer texto |
| Cinza sobre escuro sobre Película | ≈ 6,3:1 | Texto secundário |
| REC sobre Película | ≈ 5,8:1 | Texto e ícones |
| Tinta sobre REC (botão) | ≈ 5,6:1 | Rótulo do botão primário |
| Tungstênio sobre Película | ≈ 10:1 | Timecode, detalhes |
| Tinta sobre Papel | ≈ 15:1 | Qualquer texto |
| Cinza sobre papel sobre Papel | ≈ 5,7:1 | Texto secundário |
| ❌ REC sobre Papel | ≈ 2,7:1 | **Proibido como texto.** Só como preenchimento (com texto Tinta) ou decoração |
| ❌ Luz sobre REC | ≈ 2,9:1 | **Proibido como texto**, mesmo grande. Sobre REC, usar sempre Tinta |
| ❌ Tungstênio sobre Papel | ≈ 1,5:1 | **Proibido** |

## 3. Cores por função `[APROVADO]`

| Função | Sobre escuro | Sobre papel |
|---|---|---|
| Fundo | Película; superfícies em Grafite | Papel; superfícies em Papel 2 |
| Texto principal | Luz | Tinta |
| Texto secundário | Cinza sobre escuro | Cinza sobre papel |
| Botão primário | Fundo REC, texto Tinta | Fundo REC, texto Tinta |
| Botão secundário | Contorno Luz, texto Luz | Contorno Tinta, texto Tinta |
| Hover do primário | Fundo Luz, texto Tinta | Fundo Tinta, texto Papel |
| Links | Luz com sublinhado Tungstênio | Tinta com sublinhado REC |
| Anel de foco | 3px Tungstênio + 3px de distância | 3px Tinta + 3px de distância |
| Detalhes (REC, chips ativos, régua) | REC / Fumaça | REC (preenchimento) / Tinta 12% |
| Overlay da capa de vídeo | Degradê Película 0 → 80% de baixo para cima | — |

## 4. Tipografia

| Papel | Fonte | Arquivo | Status |
|---|---|---|---|
| **Display** (títulos, palavras gigantes, menu) | **Rodmolle Condensed**: grotesca condensada, bold | `Rodmolle Condensed Demo.otf` / `.ttf` | `[APROVADO]` (fornecida pelo dono) |
| **Acento editorial** (citações, 1–2 palavras de destaque, notas) | **Milesdane**: serifa display de alto contraste, inclinada | `Milesdane Trial.otf` | `[APROVADO]` (fornecida pelo dono) |
| **Texto e interface** (parágrafos, botões, rótulos, formulários) | **Inter Tight** 400/500/600: grotesca gratuita, já usada na V1 | Google Fonts → self-host | `[APROVADO]` |

**Por que uma terceira fonte:** a Rodmolle é condensada e bold, e a Milesdane é display de alto contraste. Nenhuma das duas fica legível em parágrafos longos e em textos de 12–16px.

**Restrição das versões demo (crítico):**
- **Rodmolle Demo:** todos os dígitos (0–9) são selos "PERSONAL USE ONLY". A licença embutida diz "Personal Use Only. Non-Commercial Use".
- **Milesdane Trial:** os dígitos **2, 5 e 8** são selos "PERSONAL USE ONLY". É versão de teste.
- Enquanto não houver licença: declarar `@font-face` das duas com `unicode-range` **sem** `U+0030-0039`, para os números caírem na Inter Tight. Na prática, números (datas, timecode, telefone, anos) são sempre compostos na Inter Tight com `font-variant-numeric: tabular-nums`.
- **Publicar só depois de comprar as licenças comerciais + webfont** (ver memoria.md).

**Regras de uso:**
- Display sempre em caixa alta, com `line-height` justo e sem tracking positivo.
- Milesdane em no máximo 1–2 palavras por título (ex.: IMAGEM EM *movimento*), em citações e em rótulos tipo "nota". Nunca em parágrafo.
- Inter Tight para todo texto corrido, botões, chips e rótulos.
- No máximo 3 famílias no site inteiro. Nada de fontes extras.

## 5. Escala tipográfica `[APROVADO]`

| Token | Fonte | Celular | Desktop (`clamp`) | Line-height | Tracking |
|---|---|---|---|---|---|
| `--fs-gigante` | Rodmolle | 120px | `clamp(120px, 24vw, 360px)` | 0.8 | -0.01em |
| `--fs-display-xl` (h1) | Rodmolle | 56px | `clamp(56px, 10vw, 160px)` | 0.88 | -0.005em |
| `--fs-display-l` (h2) | Rodmolle | 44px | `clamp(44px, 6.5vw, 104px)` | 0.9 | 0 |
| `--fs-display-m` (h3, cards) | Rodmolle | 24px | `clamp(24px, 2.2vw, 34px)` | 1.0 | 0.01em |
| `--fs-citacao` | Milesdane | 32px | `clamp(32px, 4.5vw, 72px)` | 1.05 | 0 |
| `--fs-corpo-l` | Inter Tight 400 | 17px | `clamp(17px, 1.3vw, 21px)` | 1.45 | 0 |
| `--fs-corpo` | Inter Tight 400 | 16px | 16px | 1.5 | 0 |
| `--fs-botao` | Inter Tight 600 | 16px | 17px | 1 | 0 |
| `--fs-rotulo` | Inter Tight 600, caixa alta | 12px | 13px | 1.2 | 0.08em |
| `--fs-timecode` | Inter Tight 500, `tabular-nums` | 12px | 13px | 1 | 0.04em |

## 6. Espaçamentos `[APROVADO]`

- **Base 4px.** Escala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.
- **Padding vertical das seções:** `clamp(80px, 12vw, 160px)`.
- **Margem lateral (gutter):** 16px (celular) · 24px (tablet) · 48px (desktop).
- **Largura máxima do conteúdo:** 1320px. Texto corrido com no máximo ~60 caracteres por linha.
- **Grid:** 4 colunas (celular) · 8 (tablet) · 12 (desktop), com gap de 16 / 20 / 24px.
- **Ritmo interno:** eyebrow → título 16px · título → parágrafo 24px · parágrafo → CTA 32px.

## 7. Bordas e raios `[APROVADO]`

| Token | Valor | Onde |
|---|---|---|
| `--r-xs` | 4px | Chips internos, tags de timecode |
| `--r-s` | 12px | Cards no celular, thumbnails pequenas |
| `--r-m` | 16px | Cards de projeto no desktop, lightbox |
| `--r-l` | 24px | Cards do Currículo, painéis no celular |
| `--r-xl` | 32px | Painéis de seção que se sobrepõem (desktop) |
| `--r-pill` | 999px | Botões, chips de filtro, botão flutuante |

- Bordas: 1px Fumaça sobre o escuro; 1px Tinta a 12% sobre o papel.
- Sombras: quase nenhuma. Só fotos empilhadas e lightbox: `0 12px 32px rgba(0,0,0,.35)`.
- **Cantos de enquadramento (viewfinder):** 4 cantos em "L" de 16–24px, traço de 1,5px Luz, nas mídias principais (hero, showreel, card em hover). É o ornamento oficial da marca.

## 8. Botões `[APROVADO]`

| Tipo | Visual | Interação |
|---|---|---|
| **Primário** ("Pedir orçamento") | Pílula, fundo REC, texto Tinta, Inter Tight 600, ícone do WhatsApp à esquerda, padding 16×28px, altura mínima 52px | Hover: preenchimento Luz varre da esquerda (300ms) + leve efeito magnético (desktop). Ativo: escala 0,98 |
| **Secundário** ("Ver showreel") | Pílula com contorno de 1,5px (Luz ou Tinta), fundo transparente | Hover: preenchimento varre e o texto inverte |
| **Link** | Texto + sublinhado de 1px que cresce da esquerda | Hover: sublinhado em Tungstênio (escuro) ou REC (papel) |
| **Flutuante WhatsApp** | Círculo de 56px, REC, ícone Tinta, com ponto pulsando | Entra com escala depois do hero; sai quando o CTA final aparece |
| **Chip de filtro** | Pílula de contorno Fumaça; ativo = fundo REC + texto Tinta | Troca com crossfade de 200ms |
| **Ícone** (menu, fechar, som) | Quadrado de 44px, raio 12px | Foco visível sempre |

Regras: um único botão primário por tela. Rótulos com verbo ("Pedir orçamento", "Ver showreel"). Nunca botão só com ícone sem `aria-label`.

## 9. Cards `[APROVADO]`

**Card de projeto**
- Mídia em 16:9 (padrão) ou 9:16 (reels/verticais), raio `--r-m` (`--r-s` no celular).
- Chip de categoria no canto superior esquerdo; duração em timecode (`00:01:32`) no inferior direito.
- Título em Rodmolle (`--fs-display-m`) + linha de apoio em Inter Tight (cliente/ano, só se for real).
- Hover (desktop): o loop mudo começa, a mídia escala 1,03 dentro da máscara, os cantos de enquadramento aparecem e o cursor vira "PLAY".
- Clique: abre o lightbox.

**Painel de público ("Para quem")**
- Tela cheia fixada; palavra gigante ao fundo; mídia ao centro; card de informação (Grafite, raio `--r-l`) à esquerda; CTA de WhatsApp.

**Cards do Currículo**
- Superfície Papel 2 (ou Grafite nos blocos escuros), raio `--r-l`, padding 24–48px.

## 10. Direção das fotografias `[APROVADO]`

- Só fotos **reais** de wee. e dos sets: retrato com câmera, bastidores, equipamento em uso, público de evento.
- Luz de cena (tungstênio, neon, palco), contraste alto, grão natural. Nada de fundo de estúdio genérico.
- Recortes (pessoa sem fundo) podem vazar a borda da seção, como camada.
- Fotos de bastidor no formato **folha de contato/fotograma**: borda Papel, leve rotação (-4° a 4°) e sombra.
- Proibido: banco de imagens, mockups genéricos e "bastidores" gerados por IA apresentados como reais.

## 11. Tratamento do produto (os vídeos) `[APROVADO]`

O produto é o vídeo, e **o vídeo é o herói** de toda tela.
- Nunca aplicar filtro, LUT, grão ou overlay **sobre** o vídeo do dono. Overlay só na capa, para legibilidade do título.
- Capas escolhidas pelo dono (frame forte, sem texto queimado). Formatos 16:9 e 9:16 lado a lado, sem cortar o vertical para caber no horizontal.
- Som só por ação do usuário. Loops automáticos sempre mudos, com controle de pausa.
- Créditos (cliente, função, ano) só quando forem reais e autorizados.
- O showreel tem destaque próprio, antes da grade de projetos.

## 12. Movimento e animações (prioridade do projeto)

### 12.1 Tokens `[APROVADO]`

| Token | Valor | Uso |
|---|---|---|
| `--ease-saida` | `cubic-bezier(.16, 1, .3, 1)` (expo out) | Revelações, entradas |
| `--ease-corte` | `cubic-bezier(.65, 0, .35, 1)` | Wipes, transições de seção e página |
| `--dur-micro` | 150–200ms | Hover, foco, chips |
| `--dur-ui` | 300–400ms | Menu, botões, lightbox |
| `--dur-revelar` | 700–900ms | Títulos e mídias entrando |
| Stagger | 0,06–0,08s | Linhas, palavras, cards |
| Intro total | ≤ 1,8s | Só na primeira visita da sessão |
| Lenis | `lerp: 0.1` | Rolagem suave (desktop e celular) |
| Scrub | `scrub: 0.6` | Animações ligadas à rolagem |
| Ângulo de corte | -6° | Todo wipe diagonal usa o mesmo ângulo |

### 12.2 Catálogo `[APROVADO]`

| # | Momento | Inspiração | Versão wee. | Celular | Movimento reduzido |
|---|---|---|---|---|---|
| 1 | Intro | Ref. A: raios girando | **Obturador:** tela preta, o ponto REC acende, timecode corre 00:00:00:00 → 00:00:01:12 e uma íris abre revelando o hero | Igual, mais curto (≤ 1,2s) | Sem intro |
| 2 | Título do hero | Refs A e B | Linhas sobem de trás de uma máscara, com stagger; a palavra em Milesdane entra por último com leve inclinação | Igual | Fade simples |
| 3 | Hero → Showreel | Ref. B: elemento que viaja entre seções | **Quadro que cresce:** o loop fica num quadro 16:9 abaixo do título do hero, com cantos de enquadramento, e cresce (pin + scrub) até tela cheia; a palavra gigante "PLAY", em REC e decorativa, fica atrás e é encoberta. O hero não tem vídeo de fundo (D1) | Sem pin: o quadro cresce com o scroll normal | Quadro estático |
| 4 | Corte entre seções | Ref. B: entrada diagonal | **Corte seco:** a seção seguinte sobe com `clip-path` em -6°, como a fita de uma claquete | Igual, ângulo de -4° | Sem corte |
| 5 | Projetos | Ref. B: carrossel horizontal + régua numérica | **Timeline de edição:** até 8 cards em destaque (D3) deslizam na horizontal (pin) em alturas alternadas; embaixo, uma régua de timecode (marcas + `00:00:10:00`) anda em paralaxe | Lista vertical / carrossel `scroll-snap`, régua estática | Grade estática |
| 6 | Manifesto | Ref. B: texto em retícula que vira citação | **Foco puxado (rack focus):** a frase gigante começa desfocada e escalada e entra em foco conforme a rolagem | Desfoque menor (custo de GPU) | Texto já em foco |
| 7 | Bastidores | Ref. B: polaroids caindo em pilha | **Folha de contato:** fotogramas com borda Papel caem um a um sobre o manifesto e empilham com rotações diferentes | 3 fotos no máximo, sem pin | Fotos já empilhadas |
| 8 | Para quem | Ref. B: slideshow fixado + palavra gigante + indicador vertical | 4 passos fixados: a palavra gigante troca (FESTAS → MARCAS → CLIPES → SOCIAIS) com máscara; a mídia faz crossfade; indicador vertical de progresso em REC; o CTA muda a mensagem do WhatsApp | Sem pin: 4 blocos empilhados com reveal | Blocos estáticos |
| 9 | Menu | Ref. B: wipe | Painel desce com `clip-path`; links gigantes em Rodmolle entram com stagger; o ponto REC acompanha o hover | Igual | Fade |
| 10 | Botão flutuante | Ref. B: botão redondo fixo | Círculo REC com ponto pulsando; entra com escala depois do hero | Igual (respeita safe-area) | Sem pulsar |
| 11 | Cursor | — | Desktop: círculo que vira "PLAY" sobre mídias e "VER" sobre links | Desligado | Desligado |
| 12 | Transição de página | Ref. B: wipe | Barras de letterbox fecham, troca a página, barras abrem | Igual | Troca direta |
| 13 | Microinterações | — | Varredura nos botões, sublinhado crescendo, chips com crossfade, ponto do logo pulsando a cada 2s | Igual | Mantidas (sem pulsar) |

### 12.3 Regras de movimento

- **Um grande momento por seção.** O resto é discreto.
- O conteúdo precisa ser legível sem JS. As classes que escondem elementos só entram depois que o JS carregou.
- Nenhum texto importante fica invisível por mais de ~1s depois de entrar na tela.
- Só animar `transform`, `opacity`, `clip-path` e `filter` (blur só no manifesto).
- Pins nunca duram mais de 3 telas de rolagem. Sempre deixar claro que a rolagem continua (indicador de progresso).
- `prefers-reduced-motion`: desligar Lenis, pins, scrub, parallax, blur e pulsação. Manter fades de no máximo 200ms.
- Pausar animações e vídeos fora da tela (`IntersectionObserver`).
- Testar a 60fps num celular intermediário antes de aprovar uma animação.

## 13. Regras para desktop e celular `[APROVADO]`

**Desktop (≥ 1024px)**
- Grid de 12 colunas, gutter de 48px, largura máxima de 1320px.
- Pins e rolagem horizontal ativos; previews em hover; cursor personalizado; botão magnético.
- Header com logo, "Currículo", CTA primário e menu.

**Celular (< 768px)**
- Grid de 4 colunas, gutter de 16px, sem rolagem horizontal da página.
- Sem pins longos e sem rolagem horizontal fixada (vira `scroll-snap`). Sem cursor e sem hover.
- Header com logo + menu. O CTA fica no botão flutuante.
- Hero com loop leve (720p) ou só o poster com `Save-Data`.
- Palavras gigantes reduzidas (`clamp`) e sem cortar o meio da palavra.
- Áreas de toque ≥ 44px e textos ≥ 16px.

**Tablet (768–1023px):** comportamento do celular para animações e layout de 8 colunas.

## 14. Elementos que devem ser evitados

**Das referências (não copiar):**
- Ref. A: computador/monitor retrô com teclado, papel-nota "meus projetos atuais", adesivos de ícone nos cantos do título, fundo de raios (starburst), verde-limão ácido, a palavra "SHOWREEL" gigante atrás do objeto, os 3 cards de contato com Telegram em destaque, textos e logotipo.
- Ref. B: textura de couro, roxo + dourado, cartas colecionáveis com moldura dourada, assinatura manuscrita, monograma gigante no fundo, régua de jardas (10/20/30), qualquer referência a esporte, faixa de logos de parceiros, textos, nome e logotipo.

**Em geral:**
- Fotos de banco de imagens, mockups genéricos, imagens de IA passando por reais.
- Emojis como ícones (a V1 usava 🎓). Usar ícones SVG com traço consistente.
- Glassmorphism, degradês genéricos de "startup", neon arco-íris, sombras pesadas.
- Mais de 3 famílias tipográficas. Números nas fontes demo.
- Autoplay com som. Carrossel automático sem controle. Pop-ups.
- Clientes, números ("+200 eventos"), prêmios ou depoimentos sem fonte real.
- Texto em REC ou Tungstênio sobre Papel.
- Animação em todo elemento ao mesmo tempo.

## 15. Notas sobre a V1 (`V1 — prévia do portfólio.html`)

- É uma prévia com conteúdo de exemplo. Não é fonte de verdade.
- **Aproveitar:** a estrutura Landing + Currículo, os painéis arredondados que se sobrepõem, o tom "para quem quer ser lembrado", o filtro de projetos, os blocos do Currículo (timeline, habilidades, ferramentas, formação) e a Inter Tight.
- **Substituir** por estarem quase idênticos à Ref. A: o monitor retrô com o showreel, o papel-nota, os adesivos no título, o fundo de raios e os 3 cards de contato. Também a cor terracota (#D97757) e a fonte Anton, que dão lugar a REC/Película e Rodmolle/Milesdane.
