import type { Analysis, MakeupShade } from "@shared/schema";

// Color palettes based on undertone
const colorPalettes: Record<string, string[]> = {
  warm: [
    "#E6B89C", // Peach
    "#D4A59A", // Coral
    "#C49186", // Terracotta
    "#A67B73", // Warm brown
    "#8B6F66", // Camel
    "#704F4F", // Burnt sienna
    "#9B8B6C", // Olive
    "#B8A07E", // Gold
  ],
  cool: [
    "#E8D5E8", // Lavender
    "#C4A4C4", // Mauve
    "#9B7B9B", // Purple
    "#7A5A7A", // Plum
    "#4A6B8A", // Cool blue
    "#5C7C8C", // Slate
    "#8CA4B4", // Powder blue
    "#A8C0D0", // Ice blue
  ],
  neutral: [
    "#D4C4B0", // Beige
    "#B8A890", // Taupe
    "#9C8C78", // Greige
    "#80705C", // Mushroom
    "#A08070", // Rose brown
    "#C0A890", // Sand
    "#90A0A8", // Grey blue
    "#B0B8B0", // Sage
  ],
};

// Makeup shade recommendations based on skin tone and undertone
export function generateMakeupRecommendations(analysis: Analysis): {
  category: 'foundation' | 'lipstick' | 'blush' | 'eyeshadow';
  shades: MakeupShade[];
}[] {
  const { skinTone, undertone } = analysis;

  // Foundation shades
  const foundationShades: Record<string, Record<string, MakeupShade[]>> = {
    light: {
      warm: [
        { name: "Ivory Beige", hex: "#F5E6D3", finish: "Matte" },
        { name: "Warm Porcelain", hex: "#F0DCC4", finish: "Dewy" },
        { name: "Light Golden", hex: "#EDD4B8", finish: "Natural" },
      ],
      cool: [
        { name: "Porcelain Pink", hex: "#F5E6E8", finish: "Matte" },
        { name: "Cool Ivory", hex: "#F0E6EA", finish: "Dewy" },
        { name: "Light Rose", hex: "#EDD8DC", finish: "Natural" },
      ],
      neutral: [
        { name: "Natural Ivory", hex: "#F5E6DC", finish: "Matte" },
        { name: "Neutral Porcelain", hex: "#F0DCD8", finish: "Dewy" },
        { name: "Light Neutral", hex: "#EDD4D0", finish: "Natural" },
      ],
    },
    medium: {
      warm: [
        { name: "Warm Beige", hex: "#E6B89C", finish: "Matte" },
        { name: "Golden Sand", hex: "#D4A590", finish: "Dewy" },
        { name: "Honey", hex: "#C49884", finish: "Natural" },
      ],
      cool: [
        { name: "Cool Beige", hex: "#E6C4C8", finish: "Matte" },
        { name: "Rose Beige", hex: "#D4B0B8", finish: "Dewy" },
        { name: "Neutral Tan", hex: "#C4A0A8", finish: "Natural" },
      ],
      neutral: [
        { name: "True Beige", hex: "#E6C0B0", finish: "Matte" },
        { name: "Neutral Sand", hex: "#D4AC98", finish: "Dewy" },
        { name: "Natural Tan", hex: "#C49C88", finish: "Natural" },
      ],
    },
    tan: {
      warm: [
        { name: "Warm Tan", hex: "#C49186", finish: "Matte" },
        { name: "Golden Bronze", hex: "#B8856E", finish: "Dewy" },
        { name: "Caramel", hex: "#A67B66", finish: "Natural" },
      ],
      cool: [
        { name: "Cool Tan", hex: "#C4A0A4", finish: "Matte" },
        { name: "Cocoa Rose", hex: "#B89498", finish: "Dewy" },
        { name: "Neutral Cocoa", hex: "#A6888C", finish: "Natural" },
      ],
      neutral: [
        { name: "True Tan", hex: "#C49C94", finish: "Matte" },
        { name: "Neutral Bronze", hex: "#B88C84", finish: "Dewy" },
        { name: "Natural Caramel", hex: "#A67C74", finish: "Natural" },
      ],
    },
    deep: {
      warm: [
        { name: "Deep Golden", hex: "#8B6F66", finish: "Matte" },
        { name: "Rich Bronze", hex: "#70544C", finish: "Dewy" },
        { name: "Espresso", hex: "#5C4840", finish: "Natural" },
      ],
      cool: [
        { name: "Deep Cocoa", hex: "#8B7478", finish: "Matte" },
        { name: "Cool Mahogany", hex: "#705C60", finish: "Dewy" },
        { name: "Rich Plum", hex: "#5C484C", finish: "Natural" },
      ],
      neutral: [
        { name: "Deep Neutral", hex: "#8B746E", finish: "Matte" },
        { name: "Neutral Espresso", hex: "#705C56", finish: "Dewy" },
        { name: "Natural Deep", hex: "#5C4844", finish: "Natural" },
      ],
    },
  };

  // Lipstick shades
  const lipstickShades: Record<string, MakeupShade[]> = {
    warm: [
      { name: "Coral Crush", hex: "#FF7F50", finish: "Satin" },
      { name: "Peach Dream", hex: "#FFAE88", finish: "Cream" },
      { name: "Terracotta", hex: "#CC8866", finish: "Matte" },
      { name: "Warm Nude", hex: "#D2A68E", finish: "Satin" },
    ],
    cool: [
      { name: "Berry Bliss", hex: "#A43A57", finish: "Satin" },
      { name: "Cool Rose", hex: "#C45577", finish: "Cream" },
      { name: "Mauve Magic", hex: "#C4A4C4", finish: "Matte" },
      { name: "Cool Nude", hex: "#D4B4C4", finish: "Satin" },
    ],
    neutral: [
      { name: "Perfect Pink", hex: "#E8A4A8", finish: "Satin" },
      { name: "Rose Brown", hex: "#C49488", finish: "Cream" },
      { name: "Nude Blush", hex: "#D4B4A8", finish: "Matte" },
      { name: "True Nude", hex: "#C4A498", finish: "Satin" },
    ],
  };

  // Blush shades
  const blushShades: Record<string, MakeupShade[]> = {
    warm: [
      { name: "Peachy Glow", hex: "#FFB88C", finish: "Powder" },
      { name: "Coral Blush", hex: "#FF9980", finish: "Cream" },
      { name: "Warm Bronze", hex: "#D4A090", finish: "Powder" },
    ],
    cool: [
      { name: "Pink Flush", hex: "#FFB4C4", finish: "Powder" },
      { name: "Rose Petal", hex: "#E8A4B4", finish: "Cream" },
      { name: "Cool Mauve", hex: "#D4A4C4", finish: "Powder" },
    ],
    neutral: [
      { name: "Natural Flush", hex: "#FFB4A8", finish: "Powder" },
      { name: "Soft Rose", hex: "#E8A4A4", finish: "Cream" },
      { name: "Nude Glow", hex: "#D4A49C", finish: "Powder" },
    ],
  };

  // Eyeshadow shades
  const eyeshadowShades: Record<string, MakeupShade[]> = {
    warm: [
      { name: "Golden Bronze", hex: "#B8856E", finish: "Shimmer" },
      { name: "Warm Brown", hex: "#8B6F66", finish: "Matte" },
      { name: "Copper", hex: "#C49186", finish: "Metallic" },
      { name: "Olive Green", hex: "#9B8B6C", finish: "Matte" },
    ],
    cool: [
      { name: "Cool Taupe", hex: "#9B8B9B", finish: "Matte" },
      { name: "Lavender", hex: "#C4A4C4", finish: "Shimmer" },
      { name: "Cool Grey", hex: "#8C9CA4", finish: "Matte" },
      { name: "Plum", hex: "#7A5A7A", finish: "Metallic" },
    ],
    neutral: [
      { name: "True Taupe", hex: "#B8A890", finish: "Matte" },
      { name: "Champagne", hex: "#D4C4B0", finish: "Shimmer" },
      { name: "Soft Brown", hex: "#9C8C78", finish: "Matte" },
      { name: "Rose Gold", hex: "#C4A49C", finish: "Metallic" },
    ],
  };

  return [
    {
      category: "foundation",
      shades: foundationShades[skinTone]?.[undertone] || foundationShades.medium.neutral,
    },
    {
      category: "lipstick",
      shades: lipstickShades[undertone] || lipstickShades.neutral,
    },
    {
      category: "blush",
      shades: blushShades[undertone] || blushShades.neutral,
    },
    {
      category: "eyeshadow",
      shades: eyeshadowShades[undertone] || eyeshadowShades.neutral,
    },
  ];
}

// Outfit recommendations based on occasion and undertone
export function generateOutfitRecommendations(analysis: Analysis): {
  occasion: 'casual' | 'party' | 'formal' | 'interview' | 'wedding';
  colors: string[];
  styles: string[];
  description: string;
}[] {
  const { undertone } = analysis;
  const palette = colorPalettes[undertone] || colorPalettes.neutral;

  const recommendations = [
    {
      occasion: 'casual' as const,
      colors: [palette[0], palette[4], palette[6], '#FFFFFF', '#2C3E50'],
      styles: ['Relaxed', 'Comfortable', 'Everyday'],
      description: undertone === 'warm'
        ? 'For casual wear, embrace earthy tones like peach, camel, and olive. Pair a warm beige top with comfortable denim and add a terracotta cardigan for dimension.'
        : undertone === 'cool'
        ? 'Cool casual looks shine in lavender, slate blue, and soft grey. Try a mauve sweater with cool-toned jeans and powder blue accessories.'
        : 'Versatile neutrals work beautifully for your casual style. Mix beige and taupe pieces with soft grey or sage for an effortlessly chic look.',
    },
    {
      occasion: 'party' as const,
      colors: [palette[1], palette[3], palette[5], '#000000', '#FFD700'],
      styles: ['Bold', 'Glamorous', 'Eye-catching'],
      description: undertone === 'warm'
        ? 'Stand out at parties in rich coral, warm brown, and burnt sienna. A terracotta dress with gold accessories creates a stunning, confident look.'
        : undertone === 'cool'
        ? 'Party in jewel tones! Deep purple, plum, and cool blue make a striking combination. Add silver accessories for extra glamour.'
        : 'For parties, play with rose brown and mushroom tones. A neutral palette lets you add pops of color with accessories while staying elegant.',
    },
    {
      occasion: 'formal' as const,
      colors: [palette[7], palette[5], '#000000', '#FFFFFF', palette[2]],
      styles: ['Elegant', 'Professional', 'Sophisticated'],
      description: undertone === 'warm'
        ? 'Formal events call for sophisticated gold, warm brown, and deep terracotta. A tailored suit in warm brown with gold accents exudes confidence.'
        : undertone === 'cool'
        ? 'Elegant cool tones like ice blue, plum, and slate create a refined formal look. A powder blue dress or suit commands attention gracefully.'
        : 'Timeless elegance in taupe and greige. These neutral tones are perfect for formal settings and can be dressed up with statement jewelry.',
    },
    {
      occasion: 'interview' as const,
      colors: ['#2C3E50', '#FFFFFF', palette[4], palette[6], '#8B7D6B'],
      styles: ['Professional', 'Polished', 'Conservative'],
      description: undertone === 'warm'
        ? 'Interview success in camel and olive with navy. A navy suit with a warm beige blouse projects professionalism while complementing your undertone.'
        : undertone === 'cool'
        ? 'Project confidence in slate, cool grey, and navy. These colors convey professionalism while enhancing your natural cool tones.'
        : 'Classic interview attire in greige and sage. These sophisticated neutrals work in any professional setting and photograph well.',
    },
    {
      occasion: 'wedding' as const,
      colors: [palette[0], palette[2], palette[7], '#FFE4E1', '#F5F5DC'],
      styles: ['Romantic', 'Festive', 'Celebratory'],
      description: undertone === 'warm'
        ? 'Wedding guest perfection in peach, terracotta, and gold. A flowing dress in warm coral tones with gold accessories is both festive and flattering.'
        : undertone === 'cool'
        ? 'Celebrate in romantic lavender, mauve, and soft purple. These feminine tones are perfect for weddings and photograph beautifully.'
        : 'Wedding elegance in soft beige and rose brown. These romantic neutrals work for any wedding season and style.',
    },
  ];

  return recommendations;
}

export function getColorPalette(undertone: string): string[] {
  return colorPalettes[undertone] || colorPalettes.neutral;
}
