# Deployment Guide - Carlson Gracie Clapham Website

## What's Included in Production

This optimized website contains only the files needed for deployment:

### Core Files
- `index.html` - Main website file with inlined critical CSS
- `styles.css` - Main stylesheet
- `script.min.js` - Minified JavaScript functionality  
- `common.min.js` - Minified shared JavaScript utilities

### Images (Optimized)
- `images/bulldogs.svg` - Hero background logo
- `images/optimized/` - All optimized images in WebP and fallback formats
  - Icon files (favicons and touch icons)
  - Responsive images at different sizes (mobile/desktop/full)

### Configuration Files
- `.htaccess` - Security headers and caching for Apache servers
- `_headers` - Security headers and caching for Netlify/static hosts
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - SEO sitemap
- `CNAME` - GitHub Pages custom domain configuration

## Deployment Options

### Option 1: Static Host (Recommended)
**Netlify, Vercel, GitHub Pages, etc.**

1. Upload all files to your hosting platform
2. The `_headers` file will automatically configure security headers
3. No additional setup required

### Option 2: Apache Server
1. Upload all files to your web server
2. Ensure `.htaccess` files are enabled in your Apache configuration
3. The `.htaccess` file will handle security headers and caching

### Option 3: Nginx Server
Add this configuration to your nginx config:
```nginx
# Security Headers
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

# Cache static assets for 1 year
location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# No cache for HTML
location ~* \.html$ {
    expires 0;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## Performance Optimizations Included

✅ **Image Optimization** - All images converted to WebP with fallbacks, ~1MB payload reduction  
✅ **JavaScript Minification** - 60%+ size reduction in JS files  
✅ **Critical CSS Inlined** - Above-the-fold styles loaded immediately  
✅ **Resource Prioritization** - Hero image preloaded, fonts optimized  
✅ **Security Headers** - Full CSP, HSTS, and other security measures  
✅ **Caching Strategy** - 1-year cache for assets, no-cache for HTML  
✅ **Accessibility** - Proper ARIA labels and semantic markup  

## File Size Summary

**Total payload**: ~500KB (down from ~1.5MB)
- HTML: ~45KB (including inlined CSS)
- CSS: ~25KB
- JavaScript: ~5KB (minified)
- Images: ~400KB (WebP optimized)

## No Build Process Required

This is a static website with no build dependencies. Simply upload the files and they're ready to serve. All optimizations have been pre-applied.

## Testing the Site

1. Open `index.html` in a browser to test locally
2. Check that images load properly from the `images/optimized/` folder
3. Verify social links work correctly
4. Test the contact form functionality

## Updates and Maintenance

To make content changes:
1. Edit `index.html` directly
2. If adding new images, use the same WebP + fallback pattern
3. Re-deploy the updated files

The site is fully optimized and ready for production deployment!