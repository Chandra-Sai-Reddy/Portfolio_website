# 📁 File Placement Guide for Your Portfolio

## 1. 📄 Resume File
**Location:** `/public/Chandra_Sai_Reddy_Resume.pdf`

- Place your PDF resume in the `public` folder
- Name it exactly: `Chandra_Sai_Reddy_Resume.pdf`
- The social icons already link to this file path
- Users will be able to download it directly

## 2. 🎨 Navbar Logo/Icon
**Current Location:** `/public/s.png` (or `/public/S.png`)

### To Replace the Logo:
1. **Option A - Replace existing file:**
   - Simply replace the `s.png` file in the `public` folder
   - Keep the same filename for no code changes needed
   - Recommended size: 120x40px for desktop, will auto-scale

2. **Option B - Use a new file:**
   - Add your new logo to the `public` folder
   - Update the path in `/components/navigation.tsx` (lines 65 and 79)
   - Change from `src="/s.png"` to `src="/your-logo.png"`

### Logo Requirements:
- Format: PNG with transparent background recommended
- Size: Height around 40px, width can be auto
- The logo automatically inverts colors in dark mode
- If you don't want auto-invert, remove `dark:invert` class

## 3. 👤 Profile Photo
**Current Location:** `/public/Profile_photo.JPG`

- Already configured and working
- Used in About section and Open Graph meta tags

## Quick Commands:

### To add your resume:
```bash
# Copy your resume to the public folder
cp ~/Downloads/your-resume.pdf /Users/donthireddychandrasaireddy/chandra-portfolio/public/Chandra_Sai_Reddy_Resume.pdf
```

### To add your logo:
```bash
# Copy your logo to the public folder
cp ~/Downloads/your-logo.png /Users/donthireddychandrasaireddy/chandra-portfolio/public/s.png
```

## Notes:
- All files in the `public` folder are accessible at the root URL
- Example: `/public/resume.pdf` → `https://yoursite.com/resume.pdf`
- Keep file sizes optimized for web (logos < 100KB, resume < 2MB)
