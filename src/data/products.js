export const products = {
  blackTea: {
    id: 'blackTea',
    name: 'VIBE Black Tea',
    flavor: 'BLACK TEA',
    tagline: 'Bold • Rich • Warm',
    heroSubtitle: 'A distinctive spirit with a bold personality.',
    description:
      'A deep and evocative spirit defined by slow-extracted single-estate black tea botanicals, layered with notes of warm wood, dark caramel, and subtle amber spice.',
    image: '/vibe-black-tea.png',
    accent: '#D7A45B',
    accentSoft: '#E8C58B',
    accentDark: '#3A1609',
    accentGlow: 'rgba(215, 164, 91, 0.28)',
    ambientBg: '#1c0f0a',
    abv: '40% alc./vol.',
    volume: '70cl',
    profile: {
      aroma: 'Roasted tea leaves, subtle dried fig, and smoked orange blossom',
      palate: 'Silky and velvety, delivering rich tannin depth balanced with warm golden amber notes',
      finish: 'Long, warming, and sophisticated with lingering dark malt and vanilla wood',
    },
    sensoryRadar: [
      { attribute: 'Richness', value: 92 },
      { attribute: 'Warmth', value: 88 },
      { attribute: 'Botanical Depth', value: 95 },
      { attribute: 'Smoothness', value: 86 },
      { attribute: 'Intensity', value: 90 },
    ],
    tastingNotes: ['Ceylon Black Tea', 'Smoked Honey', 'Charred Oak', 'Vanilla Amber'],
    serveRitual: {
      name: 'The Midnight Highball',
      glass: 'Heavy Crystal Tumbler',
      prep: 'Poured over a hand-carved ice sphere, crowned with a twist of charred orange peel.',
    },
    badge: 'Single Batch Character',
  },

  exoticLychee: {
    id: 'exoticLychee',
    name: 'VIBE Exotic Lychee',
    flavor: 'EXOTIC LYCHEE',
    tagline: 'Bright • Smooth • Floral',
    heroSubtitle: 'An expressive fusion of delicate botanicals and vibrant fruit.',
    description:
      'An alluring, radiant spirit marrying natural crisp lychee nectar with gentle botanical florals, velvet rose undertones, and a bright, sophisticated finish.',
    image: '/vibe-exotic-lychee.png',
    accent: '#E89AAA',
    accentSoft: '#F3BDC8',
    accentDark: '#381225',
    accentGlow: 'rgba(232, 154, 170, 0.28)',
    ambientBg: '#270d1e',
    abv: '40% alc./vol.',
    volume: '70cl',
    profile: {
      aroma: 'Freshly peeled lychee, subtle damask rose petal, and white orchid mist',
      palate: 'Luminous and silky, blending exotic fruit sweetness with crisp mineral clarity',
      finish: 'Clean, radiant, and lingering with soft floral nectar and citrus blossom',
    },
    sensoryRadar: [
      { attribute: 'Floral Elegance', value: 94 },
      { attribute: 'Luminosity', value: 90 },
      { attribute: 'Fruit Vibrancy', value: 96 },
      { attribute: 'Smoothness', value: 95 },
      { attribute: 'Freshness', value: 89 },
    ],
    tastingNotes: ['Exotic Lychee Nectar', 'Burgundy Rose Petals', 'White Blossom', 'Crisp Citrus'],
    serveRitual: {
      name: 'The Twilight Spritz',
      glass: 'Fluted Crystal Coupe',
      prep: 'Served chilled with sparkling mineral water and a fresh lychee sphere.',
    },
    badge: 'Artisanal Infusion',
  },
};

export const productList = Object.values(products);
