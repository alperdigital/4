# Loading Splash Preview

## Animation Sequence

1. **Initial State**: Letters start at `-120vh` (far above viewport)
2. **Staggered Drop**: Each letter drops with 70ms delay
3. **Spring Animation**: Letters bounce into place with spring physics
4. **Hold**: 400ms pause after last letter lands
5. **Fade Out**: Overlay fades out over 400ms

## Theme Support

### Light Theme
- Background: `rgba(255, 255, 255, 0.95)`
- Letter Color: `#00FFFF` (cyan from `--code-rain-color`)
- Glow: `0 0 8px rgba(0, 255, 255, 0.35)`

### Matrix Theme
- Background: `rgba(0, 0, 0, 0.95)`
- Letter Color: `#00FF41` (matrix green from `--code-rain-color`)
- Glow: `0 0 8px rgba(0, 255, 65, 0.35)`

## Accessibility Features

- **Reduced Motion**: Static display for 300ms if `prefers-reduced-motion: reduce`
- **High Contrast**: Removes text-shadow, increases font-weight to 900
- **ARIA**: `role="dialog"`, `aria-modal="true"`, `aria-label="Loading Alperdigital"`
- **Focus Management**: Proper focus handling during splash

## Performance

- **Session Storage**: Shows only once per tab session
- **Lightweight**: No heavy canvases, pure CSS animations
- **SSR Safe**: Works without server-side rendering
- **Scroll Lock**: Prevents background scrolling during splash

## Files Created

1. `components/LoadingSplash.tsx` - React component (for reference)
2. `js/LoadingSplash.js` - Vanilla JavaScript implementation
3. `styles/loading-splash.css` - Standalone CSS file
4. CSS integrated into `styles.css` - Main stylesheet

## Integration

The splash is automatically initialized when the page loads via:
```html
<script src="js/LoadingSplash.js"></script>
```

## Testing

- Hard refresh shows splash once
- Theme toggle affects letter colors
- Reduced motion skips animation
- Lighthouse performance maintained
