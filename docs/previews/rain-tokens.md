# Rain Tokens System

## Overview
The code rain effect has been upgraded from single characters to weighted code fragments (tokens) for a more realistic "kod gibi" appearance.

## Token Categories & Weights

### High Frequency (Most Common)
- **SYMBOLS** (3.0x): `{`, `}`, `(`, `)`, `[`, `]`, `<`, `>`, `</>`, `::`, `=>`, `==`, `===`, `!=`, `!==`, `?`, `:`, `;`, `,`, `.`, `…`, `|`, `||`, `&`, `&&`, `~`, `^`, `%`, `+`, `-`, `*`, `/`, `\`, `->`, `<-`, `=>`
- **CORE** (2.0x): `if`, `else`, `for`, `while`, `do`, `in`, `of`, `new`, `try`, `catch`, `finally`, `break`, `continue`, `switch`, `case`, `return`, `yield`, `await`, `async`
- **JS** (2.0x): `let`, `const`, `var`, `class`, `extends`, `import`, `from`, `export`, `default`, `this`, `super`, `typeof`, `instanceof`

### Medium Frequency
- **PY** (1.8x): `def`, `class`, `self`, `None`, `lambda`, `with`, `as`, `yield`, `async`, `await`, `elif`, `pass`
- **REGEX** (1.5x): `/`, `\`, `\d`, `\w`, `\s`, `\b`, `\B`, `^`, `$`, `.*`, `.*?`, `+?`, `?:`, `(?=)`, `(?! )`, `(?<)`, `(?<=)`, `(?<! )`, `[A-Z]`, `[a-z]`, `\n`, `\t`
- **LITERALS** (1.5x): `0`, `1`, `42`, `3.14`, `0xFF`, `NaN`, `null`, `undefined`, `true`, `false`
- **BITS** (1.5x): `0`, `1`, `001`, `010`, `101`, `110`, `0110`, `1010`, `0011`

### Low Frequency
- **C** (1.0x): `int`, `char`, `void`, `auto`, `enum`, `struct`, `using`, `namespace`, `public`, `private`, `protected`, `static`, `virtual`, `override`
- **HTMLCSS** (1.0x): `<div>`, `</div>`, `<span>`, `</span>`, `<a>`, `</a>`, `<ul>`, `</ul>`, `<li>`, `</li>`, `<p>`, `</p>`, `{ }`, `:root`, `--var`, `calc()`, `rem`, `px`

## Technical Implementation

### Files Modified
1. **`lib/rainTokens.js`** - Token system with weighted pools
2. **`js/animations/CodeRain.js`** - Updated to use tokens instead of single chars
3. **`debug/rain-tokens.html`** - Debug page with controls

### Key Changes
- **Token System**: `TokenSystem` class with weighted token pools
- **Rendering**: Tokens render as full strings, not character-by-character
- **Font**: Updated to `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
- **Physics**: Unchanged - same speed, tail length, spawn rate
- **Theme Colors**: Unchanged - still reads from CSS variables

### Performance
- **Pool Caching**: Weighted pool built once at initialization
- **Memory Efficient**: No per-frame token generation
- **FPS Stable**: Comparable to original implementation

## Debug Page Features

### Controls
- **Density Slider**: 0.5x - 2.0x rain density
- **Max Length**: 3-8 character token length limit
- **Reshuffle**: Rebuild token pool and show new sample

### Information Display
- **Token Sample**: First 20 tokens from current pool
- **Pool Stats**: Token counts per category with weights
- **Theme Info**: Color information for both themes

## Theme Integration

### Color Reading
```javascript
const rs = getComputedStyle(document.documentElement);
const rainColor = rs.getPropertyValue('--code-rain-color').trim();
const glowColor = rs.getPropertyValue('--code-rain-glow').trim();
```

### Theme Colors
- **Light Theme**: `#00FFFF` (cyan)
- **Matrix Theme**: `#00FF41` (green)

## Testing

### Debug Page
- **URL**: `/debug/rain-tokens.html`
- **Features**: Live controls, token sampling, pool statistics
- **Visual**: White background with green rain for testing

### Main Site
- **URL**: `http://localhost:8095`
- **Integration**: Seamless with existing theme system
- **Performance**: No frame drops, smooth animation

## Acceptance Criteria ✅

- [x] **Performance**: Comparable to current implementation
- [x] **Visual**: Tokens feel "kod gibi", short and readable
- [x] **Theme Colors**: Unchanged (light = cyan, matrix = green)
- [x] **Debug Page**: Shows weighted variety
- [x] **Physics**: Unchanged speed, tail length, spawn rate
- [x] **Typography**: Monospace font for consistency
