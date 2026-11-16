# Myverse — Personal Entertainment Hub

Website pessoal de coleção de entretenimento com design system premium inspirado na qualidade visual de templates modernos (estilo Saazio), organização de coleções estilo Letterboxd e animações elegantes.

## Design System

| Token | Valor |
|---|---|
| Background | `#F7F8FA` |
| Surface | `#FFFFFF` |
| Primary | `#635BFF` |
| Secondary | `#A78BFA` |
| Accent | `#A3E6C5` |
| Text | `#171923` |
| Muted | `#777C8A` |
| Borders | `#E8EAF0` |

- **Tipografia:** Sora (títulos, display) + Inter (corpo)
- **Estilo:** minimalismo sofisticado, bento grids, composição assimétrica, gradientes suaves

## Estrutura

```
entertainment-hub/
├── index.html        # 9 secções editoriais
├── css/style.css     # Design system completo
├── js/app.js         # Dados, reveal, counters, parallax, marquee
└── README.md
```

## Secções

Hero → Marquee → Featured (Bento) → Movies (grid de posters) → Anime (Bento + grid) → Games (grid) → TV Shows (stacked cards) → Characters (animated list) → Music (cards de álbum) → About → Footer

## Animações

- Scroll reveal com stagger (`data-delay`)
- Animated gradient text
- Number ticker (counters com easeOutCubic)
- Marquee infinito com pausa no hover
- Parallax subtil nos elementos do hero
- Hover shine nos botões e posters
- Float animation nos posters decorativos
- Active link no navbar por secção visível

## Como usar

Abrir `index.html` diretamente no navegador ou servir localmente:

```bash
python -m http.server 8000
```
