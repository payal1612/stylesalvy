# StyleSense Design Guidelines

## Design Approach: Reference-Based (Beauty & Fashion Industry Standards)

**Primary References**: Sephora's sophisticated beauty UI, Pinterest's visual discovery patterns, Fenty Beauty's inclusive color presentation, with Linear's clean typography and Airbnb's warmth and trust signals.

**Core Philosophy**: Create an elegant, color-forward experience that feels professional yet empowering. The interface should celebrate diversity in beauty while maintaining a clean, modern aesthetic that builds trust in the AI technology.

---

## Color Palette

### Light Mode
- **Primary Brand**: 335 85% 45% (deep rose/berry - beauty industry warmth)
- **Primary Hover**: 335 85% 38%
- **Secondary**: 345 70% 50% (coral accent for warmth)
- **Neutral Dark**: 240 8% 15% (text)
- **Neutral Mid**: 240 6% 50% (secondary text)
- **Neutral Light**: 240 10% 97% (backgrounds)
- **Success**: 142 76% 36% (analysis complete)
- **Background**: 0 0% 100% (pure white for color accuracy)
- **Surface**: 240 20% 99% (subtle warm tint)

### Dark Mode
- **Primary Brand**: 335 75% 55% (lighter rose for dark bg)
- **Primary Hover**: 335 75% 62%
- **Secondary**: 345 65% 60%
- **Neutral Dark**: 240 8% 95% (text)
- **Neutral Mid**: 240 6% 70%
- **Neutral Light**: 240 8% 12% (backgrounds)
- **Background**: 240 10% 8%
- **Surface**: 240 10% 11%

**Color Usage Strategy**: Since this app IS about colors (makeup, palettes, skin tones), use the primary brand color sparingly for UI chrome. Let the user's personalized color palettes and analysis results be the visual stars. Maintain neutral backgrounds to ensure accurate color perception of recommendations.

---

## Typography

**Primary Font**: 'Inter' (via Google Fonts) - Clean, modern, excellent readability for technical analysis data
**Display Font**: 'Playfair Display' (via Google Fonts) - Elegant serif for hero headlines and section titles, adds sophistication

### Type Scale
- **Hero Display**: text-6xl font-display (Playfair Display, 700 weight)
- **Section Headings**: text-4xl font-display (Playfair Display, 600 weight)
- **Card Titles**: text-2xl font-sans (Inter, 600 weight)
- **Body Large**: text-lg font-sans (Inter, 400 weight)
- **Body**: text-base font-sans (Inter, 400 weight)
- **Small/Captions**: text-sm font-sans (Inter, 500 weight for labels)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** (e.g., p-4, gap-8, my-12, py-20)

**Container Strategy**:
- Full-width sections with max-w-7xl centered containers
- Content sections: max-w-6xl
- Text-heavy content: max-w-3xl for readability
- Generous vertical spacing: py-16 to py-24 for major sections

**Grid Patterns**:
- Analysis results: 2-column on md, 3-column on lg
- Color palette displays: 4-6 columns for swatches
- Makeup recommendations: 2-column cards on md+
- Feature showcases: 3-column grid on lg

---

## Component Library

### Navigation
- Fixed top nav with transparent-to-solid scroll transition
- Logo left, main nav center, CTA + profile right
- Mobile: hamburger menu with full-screen overlay
- Subtle shadow on scroll: shadow-md

### Hero Section (Home Page)
- **Layout**: Full-viewport height (min-h-screen) split asymmetrically
- **Left 55%**: Headline in Playfair Display, subheadline, dual CTAs (primary "Try AI Stylist" + outline "See How It Works")
- **Right 45%**: Large hero image showing diverse faces with subtle overlay showcasing color analysis
- **Background**: Soft radial gradient from surface to background color
- **Trust Signals**: Below fold - "Trusted by 50,000+ beauty enthusiasts" with small user avatars

### Color Palette Display Component
- Grid of color swatches (rounded-2xl, min 80x80px each)
- Each swatch shows: hex code below, name on hover
- Organized by category: "Your Best Colors" / "Makeup Tones" / "Avoid These"
- Subtle drop shadows for depth (shadow-lg)
- Interactive hover states with scale-105 transform

### Analysis Result Cards
- Large rounded cards (rounded-3xl) with gradient backgrounds
- Icon + Label + Result layout
- Face shape: illustrative icon + detected shape name
- Skin tone: large color swatch + tone name + undertone
- Use soft shadows (shadow-xl) for elevation
- Animations: Subtle fade-in on load with stagger effect

### Makeup Recommendation Cards
- Product-card style: Image placeholder + shade swatch + product name
- "Try AR" button overlaid on product image (with backdrop blur)
- Organized in horizontal scrollable sections by category
- Heart icon for favorites (top-right)

### AR Try-On Interface
- Full-screen camera modal with rounded corners inset
- Controls: Bottom sheet with shade selector (horizontal scroll)
- Face mesh overlay: subtle guide lines showing detection
- Capture/Share buttons: floating action style
- Semi-transparent dark backdrop for focus

### Chat Interface (AI Stylist)
- Clean message bubbles: User (right, brand color), AI (left, surface color)
- Avatar icons: User photo vs AI bot icon
- Input: Fixed bottom with rounded-full input field
- Suggested prompts: Pill-shaped chips above input
- Typing indicator: Three animated dots

### Forms & Inputs
- Rounded-xl inputs with border-2 on focus
- Label above, helper text below in neutral-mid color
- File upload: Drag-drop zone with dashed border + icon
- Camera capture: Large circular button with icon, countdown overlay

### Buttons
- **Primary**: Solid brand color, rounded-full, px-8 py-4, font-semibold
- **Secondary**: Outline with brand color border, same rounding
- **Outline on images**: backdrop-blur-md with semi-transparent bg
- **Icon buttons**: Rounded-full, p-3, surface color background
- Hover: Subtle scale-105 + brightness adjustment

### Modal/Overlays
- Rounded-3xl corners
- Backdrop: Dark overlay with blur (backdrop-blur-sm)
- Close: X icon top-right with hover state
- Max-width: max-w-2xl for content modals, full for AR

---

## Page-Specific Layouts

### Home Page
1. **Hero**: Asymmetric split with image (described above)
2. **How It Works**: 3-step visual flow with icons, connected with dotted lines
3. **Features Grid**: 3-column cards (Upload, Analyze, Personalize)
4. **Testimonials**: 2-column cards with user photos + color palette results
5. **Sample Analysis**: Interactive demo showing detected tones + recommendations
6. **Final CTA**: Centered, bold headline + primary button, soft gradient background

### Upload/Camera Page
- Centered card (max-w-2xl) with toggle between upload/camera
- Large drop zone with icon + instructional text
- Preview: Circular crop with detected face highlighted
- Progress indicator while analyzing
- Subtle background pattern (dots or subtle texture)

### Analysis Result Page
- Split view: Left sidebar (30%) shows uploaded photo with overlays
- Right content area (70%): Stacked result cards
- Each analysis category: Card with icon, detected value, confidence meter
- Color palette section: Full-width grid of recommended swatches
- Bottom CTAs: "Get Makeup Recommendations" + "Save Results"

### Makeup Recommendation Page
- Sticky sidebar: User's skin tone + undertone card
- Main content: Categorized sections (Foundation, Lipstick, Blush, Eyes)
- Each section: Horizontal scroll of product cards (4-5 visible)
- "Try This Shade" AR button on each card
- Filter chips: Occasion, finish type, brand

### Profile & History
- Tab navigation: Overview / History / Saved Palettes
- History: Timeline view with date + thumbnail + quick actions
- Saved palettes: Masonry grid of color collections
- Edit profile: Inline editing with auto-save indicators

---

## Images

**Hero Image**: Diverse group of faces (3-4 people) with subtle AR overlay showing colorful analysis markers and tone swatches. Professional photography with soft, even lighting. Conveys technology + beauty + inclusivity.

**Feature Section Images**: 
- "Upload Process": Phone mockup showing app interface
- "AI Analysis": Abstract visualization of face mesh with data points
- "Results": Split-screen showing before (photo) and after (styled recommendation)

**Testimonial Images**: Real user photos (diverse representation) with their personalized color palettes displayed as overlay

**Makeup Recommendation Images**: Use high-quality product placeholder images (bottles, compacts, lipsticks) with clean, white backgrounds for consistency

---

## Accessibility & Interactions

- **Dark Mode**: Full dark mode support with proper contrast ratios, form inputs with visible borders
- **Animations**: Minimal and purposeful - fade-ins on scroll, subtle hover scale (scale-105), loading spinners
- **Color Contrast**: Ensure all text meets WCAG AA standards, especially on color swatches
- **Focus States**: Visible focus rings (ring-2 ring-offset-2) on all interactive elements
- **AR Accessibility**: Provide non-AR alternative for viewing makeup shades

---

## Key Design Principles

1. **Color Accuracy First**: Use neutral backgrounds for color displays to ensure accurate perception
2. **Celebrate Diversity**: Show variety in models, skin tones, and style preferences throughout
3. **Trust Through Clarity**: Make AI analysis transparent with confidence scores and explanations
4. **Progressive Disclosure**: Show basics first, reveal details on interaction
5. **Mobile-First**: Ensure AR features and uploads work seamlessly on mobile devices