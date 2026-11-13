/* =========================================================
   wee. — showreel e projetos (único lugar para editar)

   Campos de cada projeto:
     titulo    texto do card
     categoria "festas" | "eventos" | "motions"   (vazio = ainda não definido)
     formato   "9:16" (vertical) ou "16:9" (horizontal). O vídeo abre nesse formato.
     ano       ex.: "2026"                      (opcional)
     duracao   ex.: "00:01:32"                  (opcional)
     cliente   só se tiver autorização          (opcional)
     link      YouTube (inclusive Shorts), Vimeo, ou caminho local .mp4 (assets/video/...)
     capa      imagem da miniatura (o card é sempre 1:1)
     loop      vídeo curto e mudo para o hover  (opcional)
     destaque  true = aparece no carrossel de Projetos (com setas). false = não aparece no site.

   Festas e showreel: títulos e links vêm dos info.txt da pasta para-subir.
   Eventos e Carnavapo: títulos provisórios ("Evento 0N"), a confirmar pelo dono.
   ========================================================= */
window.WEE_PROJETOS = {
  showreel: {
    titulo: "ShowReel",
    formato: "9:16",   // vertical (info.txt)
    link: "https://www.youtube.com/shorts/oFG9lXsEvlc",
    capa: "assets/img/capas/showreel.jpg",
    loop: "",          // [PREENCHER] loop mudo de 5–10 s (mp4), opcional
    duracao: ""        // [PREENCHER] da descrição do YouTube
  },

  projetos: [
    // Festas (3). Destaque "decida por mim" no info.txt do Baile: decidi destacar.
    { titulo: "Baile Funk 2000s",  categoria: "festas", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/festas-baile-funk-2000s.mp4", capa: "assets/img/capas/festas-01-baile-funk-anos-2000.jpg", loop: "", destaque: true },
    { titulo: "Helipa Festival",   categoria: "festas", formato: "16:9", ano: "", duracao: "", cliente: "", link: "https://youtu.be/g9FBAY9s5Ek",            capa: "assets/img/capas/festas-02-helipa-festival.jpg",      loop: "", destaque: true },
    { titulo: "Tionisio Cabaret",  categoria: "festas", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/festas-tionisio-cabaret.mp4", capa: "assets/img/capas/festas-04-tionisio-cabaret.jpg",     loop: "", destaque: true },

    // Eventos — vertical (4). Títulos provisórios.
    { titulo: "Ato Pró-Lula",categoria: "eventos", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/evento-01.mp4", capa: "assets/img/capas/evento-01.jpg", loop: "", destaque: true },
    { titulo: "Copa do Mundo",categoria: "eventos", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/evento-02.mp4", capa: "assets/img/capas/evento-02.jpg", loop: "", destaque: true },
    { titulo: "Ensaio Comercial",categoria: "eventos", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/evento-04.mp4", capa: "assets/img/capas/evento-04.jpg", loop: "", destaque: true },
    { titulo: "Lash Designer",categoria: "eventos", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/evento-05.mp4", capa: "assets/img/capas/evento-05.jpg", loop: "", destaque: true },

    // Motion — vertical. Título provisório "Carnavapo".
    { titulo: "Carnavapo", categoria: "motions", formato: "9:16", ano: "", duracao: "", cliente: "", link: "assets/video/motion-carnavapo.mp4", capa: "assets/img/capas/motion-carnavapo.jpg", loop: "", destaque: true }
  ]
};
