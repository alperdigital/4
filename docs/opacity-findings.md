# Opacity Findings - Non-Home Pages Transparency Issues

## Critical Issues Found:

1. **styles.css:425** - `opacity: 0.3 !important` (low opacity element)
2. **styles.css:630** - `opacity: 0.3` (fading element)
3. **styles.css:658** - `opacity: 0.8` (semi-transparent)
4. **styles.css:713** - `opacity: 0.7` (semi-transparent)

## Background Transparency:
- **styles.css:511** - `rgba(255, 255, 255, 0.95)` (semi-transparent white)
- **styles.css:82** - `rgba(0, 0, 0, 0.95)` (semi-transparent black)

## Blur Effects:
- **styles.css:1077** - `backdrop-filter: blur(10px)`
- **css/light-theme.css:91** - `backdrop-filter: blur(20px)`
- **css/components.css:28,200** - `backdrop-filter: blur(10px)`

## Action Required:
- Remove all opacity < 1.0 on non-home pages
- Replace rgba() with solid colors
- Remove backdrop-filter blur effects
- Ensure headings, cards, and borders are fully opaque
