# MÄG-RISO // Immersive Print Sorcery & Physics Platform

A brutalist, tactile web experience built around the rituals of letterpress printing. MÄG-RISO simulates a working print shop — from the physics of a messy desk to the mechanical sequence of pulling a proof.

**Live:** [magical-risograph.vercel.app](https://magical-risograph-4btybdxux-qt314wink-3329s-projects.vercel.app)

---

## What this is

MÄG-RISO is a single-file immersive web application that treats the browser as a physical print studio. Every interaction is designed to feel material: ink squishes under pressure, type wears down with use, paper grain shifts with the stock you select, and the press clanks when it descends.

It is not a React app. It is a vanilla HTML/JS immersive experience compiled through Vite.

---

## The Shop Floor — 8 Stations

### [desk] — The Messy Physics Desk
A Matter.js physics workspace where project cards float with real mass and gravity. Throw them, stack them, tidy them into a grid, or invert gravity and watch everything float to the ceiling.

- **Draggable cards** with cardboard/paper/sticker weights
- **Collision audio** — tuned chimes on impact
- **Z-index elevation** while dragging
- **HUD controls:** Audio toggle, Shake, Tidy, Scatter, Gravity Invert
- **Form crumple** — submitting the contact form launches a physical ball into the desk

### [lab] — The Halftone Simulator
A live Canvas halftone processor with real ink physics. Upload any image and watch it convert to riso-style halftone dots with organic ink squash deformation.

- **Image upload** — procedural or image-based halftone modes
- **Ink squash** — dots deform as ellipses under pressure
- **Impression depth slider** — controls dot deformation intensity
- **Halftone density, grid frequency, drum misalignment** sliders
- **Paper stock selector** — Cotton / Laid / Rough grain overlays
- **Export PNG** — save the composite

### [archive] — The Stencil Gallery
An exhibition space with an X-ray ghost inspector. Hover to reveal hidden alchemic formulas beneath the surface.

- **X-ray lens** — CSS clip-path reveals a secret layer
- **Kinetic typography** — "BLEEDING INK" reacts to cursor velocity with chromatic split
- **Ink bleed displacement** — SVG turbulence filter distorts text under speed

### [channels] — Drum Isolator
Toggle individual risograph color channels to see how each ink drum contributes to the final composite.

- **4 channels:** Fluorescent Pink, Aqua Teal, Bright Yellow, Purple
- **Real-time composite canvas** with multiply blending
- **Per-channel misalignment offsets**
- **Export PNG**

### [queue] — The Print Queue
A chronological production feed of every sheet that has passed through the press.

- **Filter tabs:** ALL / COMPLETE / DRYING / QUEUED
- **Sort:** newest first, oldest first, most layers
- **Expandable cards** with layer-stack visualization
- **Live progress simulation** — queued items slowly advance to complete
- **Random project generator** — spawn procedurally named prints
- **Archive / delete** individual items
- **Form submissions** inject real jobs into the queue

### [library] — The Ink Library
The complete risograph drum catalog.

- **7 ink swatches** with hex codes
- **Filter by** ALL / FLUORESCENT / STANDARD
- **Click to copy hex**
- **Overprint preview** — multiply blend simulation

### [compose] — The Composing Room
A working movable type shop. Set type by hand, lock up the forme, and pull a proof.

- **5 type case tabs:** LETTERS / NUMBERS / PUNCT / ORNAMENTS / SPACING
- **Ornaments:** fleurons, stars, rules, dingbats
- **Spacing material:** EM quad, EN quad, hair space, leading
- **Type wear system** — frequently used letters fade and blur
- **Print modes:** INK / BLIND (deboss) / FOIL (metallic)
- **Multi-line composing** via leading
- **Full press sequence:** Ink Rollers → Quoin Lockup → Press Pull → Proof Render
- **Registration marks** on every proof
- **Export proof as PNG**

### [project-view] — Project Specimen
Rich, per-project detail pages with custom stats, ink pairs, gravity drivers, and technical blueprints. Navigated from the 3D zine modal.

---

## Magical Interactions

| Interaction | Trigger |
|-------------|---------|
| **Screen switch** | Nav buttons, swipe left/right (touch), or keys `1`–`7` |
| **Back / close** | `Escape` closes zine modals, returns from project view |
| **Audio** | Toggle synthesizer + ambient 55Hz drone |
| **Konami Code** | `↑↑↓↓←→←→BA` — triggers gravity invert + desk scatter + secret toast |
| **Dark Mode** | `[☾]` button in header — inverts the entire studio |
| **Save State** | Lab settings, channels, audio, screen, and dark mode persist to `localStorage` |
| **Deep Linking** | Every screen has a hash URL (`/#/lab`, `/#/compose`) — shareable |
| **PWA** | Installable as a standalone app with offline service worker |

---

## Tech Stack

- **Vite** — vanilla build pipeline (no React, no frameworks)
- **Matter.js** — 2D rigid-body physics desk
- **GSAP** — timelines, tweens, 3D zine modal animations
- **Web Audio API** — procedural noise, collision tones, ambient drone, transition sweeps
- **Canvas 2D** — halftone engine, separation compositor, proof renderer
- **SVG Filters** — ink bleed displacement, turbulence, letterpress stamping
- **Tailwind CSS v4 (CDN)** — utility styling
- **Lucide Icons** — iconography

---

## Running Locally

```bash
cd magical-risograph
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Desk |
| `2` | Lab |
| `3` | Archive |
| `4` | Channels |
| `5` | Queue |
| `6` | Library |
| `7` | Compose |
| `Escape` | Close zine / back from project view |

---

## Architecture Notes

The entire application lives in `index.html` as a self-contained vanilla JS immersive experience. All logic, styles, and markup are inline. Vite builds the project by copying `index.html` and assets to `dist/` — no bundling step required for the app itself.

State is serialized to `localStorage` under the key `magRisoState`. URL hash routing enables browser back/forward and direct links to any screen.

---

## Credits

Engineered as an exploration of tactile web interfaces, procedural audio, and physics-based interaction design. Inspired by the material joy of risograph printing, letterpress mechanics, and brutalist editorial aesthetics.
