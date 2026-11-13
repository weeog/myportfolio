# specs/site.md — O que construir

> **Revisão 2026-11-12, 3ª (pedido do dono):** em Projetos saem o "Ver todos", a grade e o botão WhatsApp; o carrossel mostra só os destaques (8 agora). O CTA de fim de Projetos deixa de existir (o item "fim de Projetos" da §8 não vale mais). Detalhes em `memoria.md`.
>
> **Revisão 2026-11-12, 2ª (pedido do dono, substitui "Filtros" e a linha do tempo abaixo):** Projetos sem filtros; carrossel com setas (mesma lógica de Meu Olhar) com os destaques; "Ver todos" continua. A palavra gigante de fundo troca conforme o card do centro: FESTAS, EVENTO ou MOTION. Instagram: https://www.instagram.com/rec.wee/. Detalhes em `memoria.md`.
>
> **Revisão 2026-11-12 (pedido do dono, substitui os itens abaixo):** landing única; página Currículo e seção "Para quem" removidas; seções: Hero → Showreel → Sobre mim → Projetos → Meu Olhar → Contato. Hero: "Com a visão de um diretor e a criatividade de uma criança, seu projeto vira filme!". Filtros: Todos, Festas, Eventos, Motions. Todo WhatsApp: +55 14 99148-5234, "Oi wee, quero um orçamento.". Contato: criticalkrx@gmail.com, @rec.wee, Botucatu e Região. Detalhes em `memoria.md`.

> Fonte de verdade do escopo do portfólio **wee.**
> Convenção: `[APROVADO]` decidido pelo dono · `[PROPOSTA]` sugerido, aguardando aprovação · `[A DEFINIR]` falta informação real.
> Última atualização: 2026-11-12. Todas as propostas deste arquivo foram aprovadas pelo dono em 2026-11-12.

---

## 1. Objetivo do site `[APROVADO]`

Gerar **pedidos de orçamento**. O visitante assiste aos trabalhos, entende para quem wee. filma e chama no WhatsApp com uma mensagem pronta.

- Métrica principal: cliques nos botões de WhatsApp, separados por origem (hero, público, projeto, CTA final, botão flutuante). `[APROVADO]` A ferramenta de medição está `[A DEFINIR]`.

## 2. Público-alvo `[APROVADO]`

| Público | Quem contrata | Categoria no portfólio |
|---|---|---|
| Festas e eventos | Produtores, casas noturnas, festivais, organizadores | `festas` |
| Marcas e empresas | Marketing, agências, pequenos negócios | `marcas` |
| Artistas e músicos | Artistas independentes, selos, produtoras musicais | `clipes` |
| Casamentos e eventos sociais | Noivos, famílias, formandos, cerimonialistas | `sociais` |

Os quatro públicos aparecem na seção "Para quem" e servem de filtro de projetos. Os tipos de entrega de cada público (aftermovie, institucional, clipe, filme de casamento etc.) estão `[A DEFINIR]` com o dono.

## 3. Produto e proposta de valor

- **Marca:** `wee.` `[APROVADO]`
- **Descritor:** "filmmaker" ou "videomaker" `[A DEFINIR]` (a V1 usava "videomaker"; o briefing fala "filmmaker").
- **Produto:** serviços de produção audiovisual sob orçamento. Lista real de serviços (ex.: captação, edição, color, motion, fotografia) `[A DEFINIR]`. Não publicar serviço que o dono não confirmar.
- **Proposta de valor:** `[APROVADO]` "Filmes que fazem o seu momento, a sua marca ou o seu som serem lembrados", derivada da linha da V1 "para quem quer ser lembrado". O texto do hero que vai expressar essa proposta ainda está `[A DEFINIR]`.
- **Sem preços públicos** `[APROVADO]` (o objetivo é orçamento, não venda de pacotes).
- **Sem clientes, logos ou depoimentos por enquanto** `[APROVADO]` (o dono ainda não tem esse material pronto).

## 4. Idiomas `[APROVADO]`

- Somente **português do Brasil** (`lang="pt-BR"`). Sem seletor de idioma.

## 5. Páginas `[APROVADO]`

| # | Página | URL | Papel |
|---|---|---|---|
| 1 | Landing | `/` | Vender: mostrar o trabalho e converter em WhatsApp |
| 2 | Currículo | `/curriculo/` | Dar credibilidade: experiência, habilidades, ferramentas, formação |

Extra `[APROVADO]`: uma página 404 simples, no mesmo estilo, com link para a landing.

## 6. Seções necessárias

### 6.1 Landing (ordem `[APROVADO]`)

1. **Header fixo:** logo `wee.`, link "Currículo", botão "Pedir orçamento" (WhatsApp) e botão de menu.
2. **Hero:** título forte, subtítulo de uma linha, CTA primário (WhatsApp) e CTA secundário ("Ver showreel"). Fundo liso (Película + grão). Abaixo do título, um quadro 16:9 com o loop curto e mudo do showreel. *(D1, 2026-11-12: o loop não é fundo de tela cheia.)*
3. **Showreel:** o quadro do hero cresce até ocupar a tela. Play com som só por ação do usuário.
4. **Projetos:** grade/linha do tempo filtrável pelas 4 categorias. Cada projeto abre num lightbox com o vídeo. A linha do tempo mostra **até 8 projetos em destaque**; os demais abrem numa grade simples pelo botão "Ver todos". *(D3, 2026-11-12)*
5. **Para quem:** os 4 públicos em sequência fixada (pin), cada um com descrição curta e CTA de WhatsApp com mensagem própria.
6. **Sobre / manifesto:** frase de posicionamento, fotos de bastidor e link "Ver currículo".
7. **Como funciona** `[OPCIONAL]`: etapas do trabalho. Só entra com conteúdo real do dono (sem inventar prazos ou etapas).
8. **CTA final + contatos:** chamada grande, botão WhatsApp, e-mail e Instagram.
9. **Rodapé:** logo, links, redes e copyright.
10. **Botão flutuante de WhatsApp:** aparece depois do hero e some quando o CTA final está visível.

### 6.2 Currículo

1. Header (o mesmo da landing).
2. **Intro:** nome/marca, função, cidade/região, CTA WhatsApp + "Baixar currículo (PDF)".
3. **Experiência:** linha do tempo.
4. **Habilidades.**
5. **Ferramentas:** softwares e equipamentos (só os reais).
6. **Formação.**
7. **Idiomas** `[A DEFINIR]`: entra só se o dono quiser.
8. CTA final + rodapé (os mesmos da landing).

O conteúdo da V1 (Botucatu/SP, Premiere, After Effects, DaVinci, ferramentas de IA, datas, formações, gráfico de competências) é **exemplo**. Nada disso entra sem confirmação.

## 7. Funcionalidades

| Funcionalidade | Detalhe | Status |
|---|---|---|
| WhatsApp com mensagem pronta | Link `https://wa.me/<número>?text=<mensagem codificada>`, com mensagem diferente por origem/público | `[APROVADO]` |
| Lightbox de vídeo | Fachada leve (capa + play); o iframe do YouTube/Vimeo só carrega no clique (`youtube-nocookie` / `dnt=1`). Fecha com Esc, botão ou clique fora | `[APROVADO]` |
| Filtro de projetos | Chips: Todos · Festas · Marcas · Clipes · Sociais | `[APROVADO]` |
| Preview no hover | Desktop: loop mudo curto ao passar o mouse no card. Celular: só a capa | `[APROVADO]` |
| Menu em tela cheia | Abre com wipe; links grandes; fecha com Esc; foco preso dentro | `[APROVADO]` |
| Rolagem suave + animações de scroll | Lenis + GSAP ScrollTrigger (ver design.md §12) | `[APROVADO]` (stack) |
| Transição entre páginas | Wipe entre Landing e Currículo | `[APROVADO]` |
| Dados dos projetos num arquivo único | `data/projetos.js`: showreel + lista de projetos com título, categoria, cliente (se autorizado), ano, duração, link, capa, loop, formato 16:9 ou 9:16 e `destaque` (entra na linha do tempo) | `[APROVADO]` |
| Dados de contato num arquivo único | `data/contato.js`: WhatsApp, e-mail, Instagram e cidade, usados pelas duas páginas *(D2, 2026-11-12)* | `[APROVADO]` |
| Download do currículo | PDF estático | `[A DEFINIR]` (arquivo) |
| SEO básico | `title`/`description` por página, Open Graph, favicon, `sitemap.xml`, `robots.txt`. JSON-LD (`Person`/`LocalBusiness`) só com dados reais | `[APROVADO]` |
| Medição de cliques | Ferramenta `[A DEFINIR]` (ex.: Vercel Analytics, GA4, Plausible) | `[A DEFINIR]` |

## 8. Chamadas para ação

**Primária `[APROVADO]`:** "Pedir orçamento" abre o WhatsApp com mensagem pronta.

Onde aparece: header, hero, cada público da seção "Para quem", fim de Projetos, CTA final, botão flutuante e intro do Currículo.

Mensagens prontas `[APROVADO]`:

| Origem | Mensagem |
|---|---|
| Geral (header, hero, flutuante) | "Oi, wee.! Vi seu portfólio e quero um orçamento." |
| Festas e eventos | "Oi, wee.! Quero um orçamento para filmar uma festa/evento." |
| Marcas e empresas | "Oi, wee.! Quero um orçamento de vídeo para a minha marca/empresa." |
| Artistas e músicos | "Oi, wee.! Quero um orçamento para um clipe/conteúdo musical." |
| Casamentos e sociais | "Oi, wee.! Quero um orçamento para filmar um casamento/evento social." |
| Projeto específico | "Oi, wee.! Vi o projeto "<título>" no seu portfólio e quero algo parecido." |

**Secundárias:** "Ver showreel", "Ver projetos", "Ver currículo", "Baixar currículo (PDF)", e-mail e Instagram.

## 9. Informações que ainda precisam ser definidas

O dono já tem estes itens, mas ainda não enviou:
- [ ] Número de WhatsApp, e-mail, Instagram e cidade/região de atuação.
- [ ] Link do showreel e links dos projetos (YouTube/Vimeo/Drive), com título, categoria, ano e capa de cada um.

Ainda a decidir ou produzir:
- [ ] Descritor da marca: filmmaker ou videomaker.
- [ ] Logo `wee.` em arquivo (ou aprovação do logotipo tipográfico proposto no design.md).
- [ ] Texto do hero e proposta de valor.
- [ ] Lista real de serviços.
- [ ] Loops curtos e mudos (5–10 s) para o fundo do hero e os previews dos cards.
- [ ] Foto de retrato e fotos de bastidor.
- [ ] Conteúdo do Currículo: experiência, habilidades, ferramentas, formação, idiomas e o PDF.
- [ ] Nomes de clientes que podem ser exibidos em cada projeto (só com autorização).
- [ ] Licença comercial + webfont das fontes Rodmolle e Milesdane (ver memoria.md).
- [ ] Domínio e hospedagem.
- [ ] Ferramenta de medição de cliques.
- [ ] Seção "Como funciona": entra ou não, e com que conteúdo.

## 10. Stack técnica `[APROVADO]`

- **HTML5 + CSS + JavaScript puro** (ES modules). Sem framework e sem etapa de build.
- **GSAP 3 + ScrollTrigger** via CDN, com versão fixa.
- **Lenis** (rolagem suave) via CDN, com versão fixa.
- **Fontes self-hosted** em `woff2`, geradas a partir dos arquivos enviados (depois da licença).
- **Vídeos longos** hospedados no YouTube/Vimeo. **Loops curtos** (hero/previews) self-hosted em `mp4` (H.264) + `webm`.
- **Hospedagem estática** `[A DEFINIR]`: Vercel, Netlify ou GitHub Pages.

Estrutura de pastas `[APROVADO]`:

```
/
├─ index.html              # Landing
├─ curriculo/index.html    # Currículo
├─ 404.html
├─ assets/
│  ├─ css/   (tokens.css, base.css, componentes.css, secoes.css)
│  ├─ js/    (main.js, animacoes.js, lightbox.js, menu.js, whatsapp.js)
│  ├─ fonts/ (woff2)
│  ├─ img/   (capas, fotos, og-image)
│  └─ video/ (loops curtos)
├─ data/
│  ├─ projetos.js          # showreel + lista de projetos (único lugar para editar)
│  └─ contato.js           # WhatsApp, e-mail, Instagram, cidade
└─ referencias/            # prints, gravação, V1 (fora do deploy)
```

## 11. Responsividade

- **Mobile-first.** Breakpoints: `480px`, `768px`, `1024px`, `1440px`.
- Sem rolagem horizontal na página em nenhuma largura. Margem lateral mínima de **16px** no celular.
- Seções com pin horizontal (Projetos) viram lista vertical ou carrossel com `scroll-snap` abaixo de `1024px` e em telas de toque.
- Títulos gigantes usam `clamp()` e nunca quebram palavra no meio. Testar 320px, 375px, 768px, 1024px, 1440px e 1920px.
- Áreas de toque com pelo menos **44×44px**.
- O botão flutuante e o header respeitam `env(safe-area-inset-*)`.
- Hover só em `@media (hover: hover) and (pointer: fine)`.

## 12. Acessibilidade (meta: WCAG 2.2 AA)

- Contraste AA em todo texto (combinações aprovadas em design.md §2).
- `prefers-reduced-motion: reduce`: desliga Lenis, pin, scrub e parallax; mantém só fades curtos.
- Vídeo em loop automático tem botão de pausar/retomar, sempre mudo.
- Navegação completa por teclado: foco visível, "Pular para o conteúdo", menu e lightbox com foco preso e Esc para fechar.
- HTML semântico (`header`, `nav`, `main`, `section` com títulos, `footer`). Um `h1` por página.
- Texto alternativo em capas e fotos. Iframes com `title`. Ícones decorativos com `aria-hidden`.
- O conteúdo fica legível sem JavaScript (aprimoramento progressivo: as animações só escondem elementos depois que o JS carregou).
- Informação nunca depende só de cor.

## 13. Desempenho

- Metas no celular (Lighthouse/PageSpeed): **Performance ≥ 90**, LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- JS total ≤ 150 KB gzip (GSAP + ScrollTrigger + Lenis + código próprio).
- Loop do hero ≤ 2,5 MB no celular (720p) e ≤ 5 MB no desktop, com `poster` e `preload="none"`. Com o loop num quadro abaixo do título (D1), o candidato a LCP é o título do hero. Com `Save-Data` ou conexão lenta, mostrar só o poster.
- Capas em AVIF/WebP com `srcset`, `loading="lazy"` abaixo da dobra e `width`/`height` definidos.
- Iframes de vídeo só carregam no clique (fachada).
- Fontes: `woff2`, `font-display: swap`, preload só da fonte display. Subconjunto latino.
- Animações só em `transform`, `opacity` e `clip-path`.

## 14. Escopo

**Dentro do escopo:**
- Landing + Currículo + 404, em PT-BR.
- Portfólio de vídeos com filtro e lightbox.
- CTAs de WhatsApp com mensagens prontas.
- Animações de scroll (GSAP/Lenis) conforme design.md.
- Responsividade, acessibilidade e SEO básico.
- Arquivo de dados para editar projetos sem mexer no layout.

**Fora do escopo (por ora):**
- Inglês ou qualquer outro idioma.
- Tabela de preços e venda de pacotes.
- Formulário de orçamento com backend.
- Logos de clientes, depoimentos e prova social (até existir material real).
- Blog, CMS, área do cliente, agendamento online, pagamentos.
- Páginas individuais por projeto.
- Telegram como canal principal.
