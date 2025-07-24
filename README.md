# Carlson Gracie Clapham - BJJ Website

This is a clean, human-readable version of the Carlson Gracie Clapham Brazilian Jiu-Jitsu website, originally exported from Framer and restructured for better maintainability.

## 🥋 About

Carlson Gracie Clapham is a Brazilian Jiu-Jitsu academy located on the borders of Lambeth and Wandsworth in South London. The website provides information about classes, membership, instructors, and facilities.

## 📁 Project Structure

```
carlson-gracie-clapham/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # All CSS styles, organized and commented  
├── script.js           # JavaScript for smooth scrolling and interactions
├── page.html           # Original Framer export (reference)
└── README.md           # This documentation
```

## 🚀 What Was Improved

### From Framer Export to Clean Code
The original `page.html` was a 91,000+ token single file with:
- All CSS and HTML minified in one file
- No semantic HTML structure
- Framer-specific class names and attributes
- Difficult to read and maintain

### ✅ Improvements Made
1. **Separated Concerns**: Split into HTML, CSS, and JS files
2. **Semantic HTML**: Used proper HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
3. **Clean CSS**: Organized 37KB of CSS into logical sections with comments
4. **Readable Structure**: Properly indented and formatted code
5. **Enhanced SEO**: Added proper meta tags, Open Graph, and Twitter cards
6. **Accessibility**: Added ARIA labels and semantic markup
7. **Maintainable**: Clear structure for future updates and customizations

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Social Media Links**: Links to Facebook and Instagram pages
- **Contact Information**: Phone, email, and location details
- **Class Timetable**: Schedule of BJJ classes
- **Membership Plans**: Pricing and membership options

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with modern standards
- **CSS3**: Modern CSS with custom properties and flexbox/grid
- **Vanilla JavaScript**: Clean, dependency-free JavaScript
- **Font**: Overpass and Inter font families with variable font support

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 810px - 1199px  
- **Mobile**: Below 809px

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Serve locally** (optional) using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## 🎯 Sections

- **Home**: Hero section with gym logo and call-to-action
- **About**: Information about the academy and instructors
- **Timetable**: Class schedules and training times
- **Membership**: Pricing plans and membership options
- **Location**: Address and contact information
- **FAQ**: Frequently asked questions
- **Sign-up**: Call-to-action for new members

## 🔧 Customization

### Colors
The main brand colors are defined in CSS custom properties:
- Primary: `rgb(233, 70, 41)` (Red/Orange)
- Background: `rgb(255, 255, 255)` (White)
- Text: Various shades of black and gray

### Fonts
- **Headers**: Overpass (800 weight)
- **Body Text**: Inter Variable
- **Fallbacks**: Arial system fonts

### Modifying Content
1. **Text Content**: Edit the HTML in `index.html`
2. **Styling**: Modify CSS in `styles.css`
3. **Interactions**: Update JavaScript in `script.js`

## 📞 Contact Information

- **Website**: [Original Framer Site](https://carlsongracieclapham.framer.website/)
- **Facebook**: [carlsongracieclapham](https://www.facebook.com/carlsongracieclapham)
- **Instagram**: [carlsongracieclapham](https://www.instagram.com/carlsongracieclapham)

## 📝 License

This is a restructured version of the original Framer export. All content belongs to Carlson Gracie Clapham BJJ Academy.

---

*Made human-readable and maintainable • Brazilian Jiu-Jitsu in South London*
