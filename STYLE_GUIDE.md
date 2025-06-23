# 🎛 REPSPHERES Style Guide
"Precision. Power. Kinetics."

## ⚙️ BRAND AESTHETIC

### Overall Visual Style
- **Luxury-mechanical kinetic interface** (Cartier x Shelby GT500 x quantum HUD)
- High-gloss panels with engraved depth, layered lighting, and micro-motion
- Theme based on "AI intelligence meets physical tactility"

## 🎨 COLOR SYSTEM

| Purpose | CSS Var Name | Example Value |
|---------|-------------|---------------|
| Jewel Highlight | `--gem-impossible` | `rgb(255, 0, 255)` |
| Jewel Edge Glow | `--gem-shift` | `rgb(0, 255, 255)` |
| Jewel Core | `--gem-deep` | `rgb(255, 0, 170)` |
| Accent Primary | `--accent-color` | dynamic per gauge |
| Background Base | `--bg-color` | `#0a0a0c` |
| Glass Highlight | `--glass-glow` | rgba variants |

## ✒️ TYPOGRAPHY

### Fonts
- Orbitron, Space Grotesk, JetBrains Mono

### Usage
- **Nav & Labels**: Space Grotesk (tight uppercase, no spacing)
- **Counters**: JetBrains Mono with `font-variant-numeric: tabular-nums`
- **Hero & Callouts**: Orbitron or custom monospace-futuristic

## 🧭 NAVIGATION SYSTEM

### Layout
- Floating bezel, max width 96vw, centered with screw-anchored ends
- 4-point screws (top-left, top-right, bottom-left, bottom-right) with slight `--angle` variation
- Orb logo centered, glowing jewel core pulsing (`logo-jewel`)
- `nav-rail` for AI sync, with LED nodes and sweeping gradient pulse

## 📈 GAUGES & PANELS

### Panel Style
- `.premium-panel`: dark glossy inset with chrome bevel
- Corner screws: `.corner-screw` with inset jewel detail

### Gauge Needle
- `.analog-needle`: triangle-shaped, chrome tapered with glowing jewel cap
- Always spins from -135deg, then makes 2–3 full revolutions
- Lands with ease: `"elastic.out(1, 0.5)"`

### Needle Jewel
- `.analog-center`: pulses + flashes with `.jewel-flare` when needle settles
- **Flare**:
  - Size: 60% scale max
  - Color: `--gem-deep` for subtlety
  - Duration: ≤0.5s

## 💎 JEWEL SYSTEM

| Element | Style |
|---------|-------|
| Center jewel | radial-gradient + SVG fill + CSS pulse |
| Jewel flare | Cross burst from jewel center on needle settle |
| Status icon | `.status-icon` pulsing dot with `pulseDot` |

## 💡 MOTION PRINCIPLES

### Needle Kinetics
- Always spin on load
- Minimum 2 full spins (720deg), up to 3 (1080deg)
- Fast `power3.in` + `elastic.out` for kinetic snap

### Jewel Flare
- Small scale burst 1.0 → 1.5 → 1.0
- Glows softly, doesn't overtake the needle

### Screws
- Idle rotate every 4 seconds randomly ±15°
- Never fully straight unless aligned on purpose

### Panel Hover / Scroll Motion
- 3D tilt on cursor hover
- Glow sweep on full load possible (bonus idea)

## 🔊 OPTIONAL SOUND DESIGN (Future Add)

| Trigger | Sound Effect |
|---------|-------------|
| Needle settle | metallic tick |
| Jewel flare | soft pulse hum |
| Button hover | electric chirp |

## 📱 RESPONSIVE CONSIDERATIONS

On mobile:
- Nav collapses into centered logo + CTA
- Panels reduce font size for `.value-display`
- Jewel flare shrinks proportionally

## 🧪 UI THEMES (Scroll-Activated)

| Section | Gem Colors |
|---------|-----------|
| Hero | Magenta/Cyan/Deep Pink |
| Market | Green/Orange/Black Emerald |
| Canvas | Amber/Rose Quartz |
| Sphere OS | Sapphire/Violet |
| Podcasts | Infrared Pink/Magenta/Violet Blend |

Controlled by scroll position → updates `--gem-*` vars.