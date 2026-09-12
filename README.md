# Our Little Love Story ❤️ - Romantic Birthday Website

A stunning, luxury, interactive personal love story birthday website for your girlfriend built with **React.js**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, and **HTML5 Canvas**.

---

## ✨ Features

- 🌹 **8 Interactive Love Story Chapters**:
  1. **Cinematic Hero Opening**: Teaser sequence with glowing button "Open Your Surprise ✨".
  2. **Birthday Hero**: Luxury framed portrait with glowing aura & greeting.
  3. **Her Beautiful Memories**: Dual Polaroid Cards & Masonry Gallery with Fullscreen Lightbox.
  4. **Our Story Timeline**: Scroll-animated milestone journey.
  5. **Reasons I Love You**: Interactive reveal cards with personalized notes.
  6. **Interactive Love Graph**: HTML5 Canvas particle heart reacting to touch & cursor hover with floating love words.
  7. **Photo Collage**: Parallax scrolling memory wall with quote banner.
  8. **Love Letter 💌**: Wax-sealed envelope opening animation with typewriter text reveal.
  9. **"I LOVE YOU" Heart Explosion**: Full-screen dramatic text sequence & heart storm.
  10. **Final Surprise**: Final reveal, couple portrait photo, closing message & "Replay Our Story" button.
- 🎵 **Persistent Floating Spotify-Inspired Music Player**: Playlist drawer, play/pause, prev/next, seek bar, volume control, and built-in Web Audio ambient synth fallback so music works out of the box.
- 🎨 **Luxury Design System**: Deep wine, burgundy, champagne gold, soft blush pink, glassmorphism, floating particle canvas, and luxury Google Fonts (*Playfair Display*, *Alex Brush*, *Plus Jakarta Sans*).
- 📱 **Mobile First & Fully Responsive**: Works on smartphones, tablets, and desktop computers.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ How to Personalize

Personalizing the website takes less than 5 minutes!

### 1. Update Personal Texts & Dates
Open `src/config/birthdayConfig.js` and customize:
- `girlfriendName`: Her name (e.g. "Sophia")
- `birthdayDate`: Her birthday date
- `heroSubtitle`: Custom hero subtitle
- `memories`: Array of memory photos, dates, and captions
- `storyMilestones`: Timeline milestones (dates, titles, descriptions, photos)
- `reasons`: Flip card titles and personal notes
- `loveWords`: Words inside the interactive particle heart
- `letterContent`: Your full personal love letter text
- `finalSurprise`: Final reveal message and closing note

### 2. Add Your Own Photos
Place your photos in the `/public/images/` folder:
- `hero-portrait.jpg` (Her hero portrait photo)
- `couple-photo.jpg` (Photo of you together for final reveal)
- `memory-1.jpg`, `memory-2.jpg` ... (Memory gallery photos)
- `story-1.jpg`, `story-2.jpg` ... (Timeline photos)

> **Note**: If any photo file is missing, the site will automatically render a vector SVG illustration!

### 3. Add Your Favorite Songs
Place your MP3 files in the `/public/music/` folder:
- `song1.mp3`, `song2.mp3` ...

Update the playlist titles, artists, and file paths in `src/data/songs.js`.

> **Note**: If MP3 files are omitted, a Web Audio synthesizer will automatically generate romantic ambient piano chords!

---

## 📁 Project Structure

```
src/
  assets/
  components/
    BirthdayHero.jsx
    FinalSurprise.jsx
    FloatingHearts.jsx
    ILoveYouSequence.jsx
    LoveGraph.jsx
    LoveLetter.jsx
    MemoryGallery.jsx
    MusicPlayer.jsx
    Navigation.jsx
    OpeningSurprise.jsx
    PhotoCollage.jsx
    Reasons.jsx
    Timeline.jsx
  config/
    birthdayConfig.js
  data/
    songs.js
  pages/
    Birthday.jsx
  styles/
    animations.css
    globals.css
  utils/
    imageUtils.js
  App.jsx
  main.jsx
public/
  images/
  music/
index.html
package.json
vite.config.js
```

