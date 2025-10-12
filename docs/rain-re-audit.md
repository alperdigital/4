# Code Rain Reverse Engineering Audit

## Color/Alpha/Blend/Filter Sources Found:

### CSS Variables (Primary Source):
- `css/variables.css:19` - `--code-rain-color: #00FF41` (Matrix default)
- `css/variables.css:20` - `--code-rain-glow: rgba(0,255,65,0.55)` (Matrix default)
- `css/variables.css:97` - `--code-rain-color: #00FFFF` (Light theme)
- `css/variables.css:98` - `--code-rain-glow: rgba(0,255,255,0.60)` (Light theme)
- `css/variables.css:119` - `--code-rain-color: #00FF41` (Matrix explicit)
- `css/variables.css:120` - `--code-rain-glow: rgba(0,255,65,0.55)` (Matrix explicit)

### JavaScript Color Usage:
- `js/animations/CodeRain.js:151` - `this.ctx.fillStyle = colors.color`
- `js/animations/CodeRain.js:152` - `this.ctx.shadowColor = colors.glow`
- `js/animations/CodeRain.js:201` - `this.ctx.fillStyle = colors.color`
- `js/animations/CodeRain.js:202` - `this.ctx.shadowColor = colors.glow`
- `js/animations/CodeRain.js:234` - `this.ctx.fillStyle = colors.glow`

### Color Reading Function:
- `js/utils.js:23-28` - `getCodeRainColors()` function reads CSS variables
- `js/config.js:11` - `codeRainColor: '#00FF41'` (Matrix fallback)
- `js/config.js:18` - `codeRainColor: '#00FFFF'` (Light fallback)

### Canvas Properties:
- `js/animations/CodeRain.js:101` - `fillStyle = 'rgba(0, 0, 0, 0.05)'` (fade effect)
- `js/animations/CodeRain.js:139` - `fillStyle = parseRGBAWithOpacity(colors.glow, opacity)` (trail)
- `js/animations/CodeRain.js:153` - `shadowBlur = 8` (glow effect)

### CSS Filters/Effects:
- `styles.css:453` - `filter: invert(1) !important` (high-contrast canvas)
- `styles.css:84-88` - `.high-contrast .code-rain { opacity: 0.1 !important }`
- `css/light-theme.css:158-161` - `.high-contrast .code-rain { opacity: 0.3 }`

### Theme Management:
- `js/theme/ThemeManager.js:69-70` - Sets CSS variables dynamically
- `js/MatrixApp.js:210` - `document.body.style.filter = 'hue-rotate(180deg)'` (POTENTIAL ISSUE)

## HYPOTHESIS: Why #00FFFF becomes red

1. **Hue Rotation**: `js/MatrixApp.js:210` applies `hue-rotate(180deg)` to entire body
2. **CSS Variable Override**: Multiple conflicting definitions in variables.css
3. **Canvas Inversion**: `styles.css:453` inverts canvas colors in high-contrast mode
4. **Opacity Stacking**: Multiple opacity layers causing color blending
5. **Fallback Chain**: JavaScript fallback to config.js instead of CSS variables

## CRITICAL FINDINGS:

1. **Body-level hue-rotate(180deg)** - This would turn cyan (#00FFFF) into red
2. **Canvas inversion filter** - Inverts all colors in high-contrast mode
3. **Multiple CSS variable definitions** - Conflicting color definitions
4. **Opacity conflicts** - Different opacity values in different files

## ROOT CAUSE ANALYSIS:

The primary suspect is the `hue-rotate(180deg)` filter applied to the entire body in MatrixApp.js, which would transform cyan (#00FFFF) into red. Combined with canvas inversion and opacity conflicts, this creates the color distortion.
