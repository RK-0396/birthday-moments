/**
 * Image Utilities & Romantic SVG Fallback Generator
 * Ensures that even if /public/images/ photos are missing initially,
 * the site renders stunning, romantic vector art instead of broken image links.
 */

export const getPlaceholderSvg = (title = "Love", type = "portrait") => {
  const encodeSvg = (svgString) => `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

  if (type === "portrait") {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a121a" />
            <stop offset="50%" stop-color="#2b0910" />
            <stop offset="100%" stop-color="#150407" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#f4a5b7" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#4a121a" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        <circle cx="300" cy="320" r="240" fill="url(#glow)" />
        <path d="M300 240 C320 180, 420 180, 420 270 C420 370, 300 440, 300 480 C300 440, 180 370, 180 270 C180 180, 280 180, 300 240 Z" fill="#e6c594" opacity="0.85" />
        <text x="50%" y="620" text-anchor="middle" fill="#fff2d6" font-family="Georgia, serif" font-size="28" font-style="italic">${title}</text>
        <text x="50%" y="660" text-anchor="middle" fill="#f4a5b7" font-family="sans-serif" font-size="16" letter-spacing="3">REPLACE IN /PUBLIC/IMAGES</text>
      </svg>
    `);
  }

  if (type === "polaroid" || type === "story") {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3d0e16" />
            <stop offset="100%" stop-color="#1a060a" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        <circle cx="300" cy="270" r="140" fill="#f4a5b7" opacity="0.15" />
        <path d="M300 210 C315 160, 390 160, 390 230 C390 310, 300 370, 300 400 C300 370, 210 310, 210 230 C210 160, 285 160, 300 210 Z" fill="#f4a5b7" opacity="0.75" />
        <text x="50%" y="470" text-anchor="middle" fill="#e6c594" font-family="Georgia, serif" font-size="24" font-style="italic">${title}</text>
      </svg>
    `);
  }

  // Cover artwork
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="100%" height="100%" fill="#2b0910" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#e6c594" stroke-width="2" stroke-dasharray="6,6" />
      <path d="M200 160 C210 120, 260 120, 260 170 C260 230, 200 270, 200 290 C200 270, 140 230, 140 170 C140 120, 190 120, 200 160 Z" fill="#e6c594" />
    </svg>
  `);
};

