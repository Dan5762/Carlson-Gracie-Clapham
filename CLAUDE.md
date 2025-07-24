# Carlson Gracie Clapham BJJ Website - Rebuild Guide

This guide describes the site structure from `page.html` to enable a simplified, non-Framer rebuild.

## Site Overview
**Type:** Single-page Brazilian Jiu-Jitsu gym website  
**Location:** Clapham, London (borders of Lambeth and Wandsworth)  
**Lineage:** Carlson Gracie Brazilian Jiu-Jitsu  
**Goal:** Local gym promotion with sign-up conversion

## Layout Structure

### 1. Navigation Bar
- **Fixed/sticky header** across all screen sizes
- **Brand logo:** "BJJ Clapham" (Overpass 800, 28px)
- **Menu items:** Home | About | Timetable | Membership | Location | FAQ
- **CTA button:** "Sign up" (red, rounded)
- **Social icons:** Facebook & Instagram links
- **Mobile:** Simplified version with logo + social icons only

### 2. Hero Section
- **Background:** Large Carlson Gracie Bulldogs logo (SVG)
- **Content overlay:** Semi-transparent white box (79% opacity, 5px border-radius)
- **Main heading:** "Carlson Gracie Clapham" (large, centered)
- **CTA button:** "Sign up" (prominent red button)

### 3. Content Sections
Based on navigation, include these sections:
- **About:** Gym info, instructors, Carlson Gracie lineage
- **Timetable:** Class schedules and times
- **Membership:** Pricing plans and options
- **Location:** Address, contact info, map
- **FAQ:** Common questions about training
- **Sign-up:** Contact form/registration

## Design Specifications

### Colors
- **Primary Red:** `rgb(233, 70, 41)` (buttons, accents)
- **Background:** `rgb(255, 255, 255)` (white)
- **Text:** `rgb(0, 0, 0)` (black)
- **Overlay:** `rgba(255, 255, 255, 0.79)` (semi-transparent white)

### Typography
- **Headings/Brand:** Overpass 800 weight
- **Body Text:** Inter Variable (400, 500, 600 weights)
- **Sizes:** 14px (buttons), 16px (body), 28px (nav), larger for headings

### Interactive Elements
- **Buttons:** 100px border-radius (fully rounded), hover effects
- **Links:** Smooth scroll to sections, hover color changes
- **Social icons:** Black SVG icons with hover effects

### Responsive Breakpoints
- **Mobile:** ≤809px (simplified nav, stacked layout)
- **Tablet:** 810px-1199px (medium layout)
- **Desktop:** ≥1200px (full horizontal nav)

## Key Images & Assets

### Required Images
- **Hero background:** Carlson Gracie Bulldogs team logo
- **Favicon:** BJJ/gym themed icon
- **Social preview:** Team/gym photo for sharing

### Social Media Links
- **Facebook:** https://www.facebook.com/carlsongracieclapham
- **Instagram:** https://www.instagram.com/carlsongracieclapham

## Content Guidelines

### Meta Information
- **Title:** "BJJ Clapham - Carlson Gracie Brazilian Jiu-Jitsu"
- **Description:** "Carlson Gracie Clapham Jiu Jitsu, Self-defense and fitness classes on the borders of Lambeth and Wandsworth. Contact us now to start your BJJ journey today!"

### Key Messaging Focus
- Carlson Gracie lineage and authenticity
- Local community (Clapham/Lambeth/Wandsworth)
- Self-defense and fitness benefits
- Beginner-friendly approach
- Community and team building

## Technical Requirements

### Essential Features
- **Single-page application** with smooth scrolling
- **Responsive design** (mobile-first)
- **SEO optimization** (meta tags, structured data)
- **Fast loading** (optimized images, minimal JS)
- **Accessibility** (proper headings, alt text, ARIA labels)

### Preferred Structure
```
Header (fixed)
├── Logo/Brand
├── Navigation Menu
├── Sign-up Button
└── Social Icons

Main Content
├── Hero Section
├── About Section  
├── Timetable Section
├── Membership Section
├── Location Section
├── FAQ Section
└── Sign-up/Contact Section

Footer (optional)
└── Additional contact info
```

## Implementation Notes

### Simplification Goals
- Remove Framer-specific complexity
- Use semantic HTML5 elements
- Clean, maintainable CSS (avoid complex selectors)
- Minimal JavaScript (smooth scrolling, mobile menu)
- Standard web fonts or Google Fonts alternatives

### Priority Features
1. **Mobile-responsive navigation**
2. **Hero section with clear CTA**
3. **Contact/sign-up conversion path**
4. **Social media integration**
5. **Clean, professional design**

### Optional Enhancements
- Contact form functionality
- Google Maps integration
- Image gallery
- Testimonials section
- Class booking system

---

*This guide provides the foundation for creating a clean, modern BJJ gym website that maintains the original design intent while using standard web technologies.*