# 🌸 Faustina's Birthday Website

A personalised, animated birthday website built with vanilla HTML, CSS, and JavaScript. Features snap scrolling, confetti, a scratch card surprise, typewriter effect, and a full photo timeline — all wrapped in a warm peach aesthetic.

---

## 📁 File Structure

```
faustina_birthday_site/
├── index.html              # Landing page (envelope reveal)
├── faustina_birthday.html  # Main birthday site
├── style.css               # All styling and animations
├── app.js                  # Confetti, typewriter, scratch card, snap scroll logic
└── README.md               # You're reading this
```

> All four files must stay in the **same folder** for the site to work correctly.

---

## 🗂 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Big name reveal with falling petals and confetti burst |
| 2 | **Personal Message** | Typewriter letter that types itself on scroll |
| 3 | **Gallery** | Photo grid with hover captions |
| 4 | **Reasons We Love Faustina** | Photo + text alternating cards |
| 5 | **Interactive Surprise** | Scratch card revealing a hidden message |
| 6 | **Friends' Wishes** | Wall of birthday wishes from friends |
| 7 | **Timeline** | Life milestones with alternating photos and text |
| 8 | **Finale** | Closing birthday message with confetti explosion |

---

## ✏️ How to Customise

### Changing the personal message
Open `app.js` and edit the two lines near the top:

```js
const TYPEWRITER_TEXT = `Your message here...`;
const TYPEWRITER_SIG  = `— Your sign-off here`;
```

### Adding photos to the gallery
In `faustina_birthday.html`, find the `img` tag block and replace the src with your image

<!-- Your photo -->
<img src="your-photo.jpg" alt="Description of photo"/>
```

### Adding photos to the timeline / reasons sections
Find `img` tag block and replace the photo there with yours:

```html
<img src="your-photo.jpg" alt="Description"/>
```

### Adding birthday wishes
In the `#wishes` section, duplicate this block for each friend:

```html
<div class="wish-card">
  <div class="wish-avatar">A</div>       <!-- First letter of name -->
  <div class="wish-name">Abena</div>     <!-- Full name -->
  <div class="wish-text">"Wish text here"</div>
</div>
```

### Adding / editing timeline milestones
Each milestone follows this structure:

```html
<div class="tl-item">
  <div class="tl-dot"></div>
  <div class="tl-photo ...">
    <img src="photo.jpg" alt="..."/>
  </div>
  <div class="tl-content ...">
    <div class="tl-year">2018</div>
    <div class="tl-title">Milestone title</div>
    <div class="tl-desc">Short description of the memory.</div>
  </div>
</div>
```

### Changing the scratch card message
In `faustina_birthday.html`, find the `#scratch-reveal` div:

```html
<div class="reveal-msg">"Your secret message here"</div>
```

### Adding background music
In `faustina_birthday.html`, find the `<audio>` tag and add your MP3 path:

```html
<audio id="bg-music" loop autoplay>
  <source src="best-day-of-my-life.mp3" type="audio/mpeg"/>
</audio>
```

> The MP3 file must be in the same folder as the HTML files.

---

## 🎨 Colours

All colours are defined as CSS variables at the top of `style.css`:

```css
:root {
  --peach:        #FFBF9B;   /* Main peach */
  --peach-light:  #FFE5D4;   /* Light peach */
  --peach-deep:   #F4845F;   /* Deep peach / accent */
  --peach-blush:  #FFF0E8;   /* Background blush */
  --cream:        #FFF8F3;   /* Card backgrounds */
  --brown:        #7C4A2D;   /* Headings and text */
  --text-mid:     #8B5E3C;   /* Body text */
  --text-soft:    #C49070;   /* Subtle labels */
}
```

Change any of these values to update the colour across the whole site instantly.

---

## 🌍 Hosting on GitHub Pages

1. Create a new repository on [github.com](https://github.com)
2. Upload all four files into the repo
3. Go to **Settings → Pages**
4. Under **Source**, select your `main` branch and click **Save**
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Connecting a custom domain
1. Buy a domain (e.g. from [Namecheap](https://namecheap.com), ~$10–15/year)
2. In **Settings → Pages**, enter your domain under **Custom domain**
3. In your domain registrar's DNS settings, add these records:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   yourusername.github.io
```

4. Wait 10–30 minutes for DNS to propagate

### Changes not reflecting after an update?
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Try an incognito window
- Check the **Actions** tab in your repo to confirm the deployment succeeded
- Bump the version number on CSS/JS links in the HTML to bust the cache:

```html
<link rel="stylesheet" href="style.css?v=2"/>
<script src="app.js?v=2"></script>
```

---

## 🛠 Built With

- **HTML5** — structure and content
- **CSS3** — snap scroll, animations, grid layout
- **Vanilla JavaScript** — confetti engine, typewriter, scratch card, IntersectionObserver
- **Google Fonts** — Playfair Display, DM Sans, Great Vibes

No frameworks. No dependencies. Just open `index.html` in a browser and it works.

---

*Made with 🌸 for Faustina*