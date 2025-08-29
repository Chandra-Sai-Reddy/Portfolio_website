# 📄 Resume Files Setup Guide

## Where to Place Your Resume Files

You need to add two PDF files to the `/public` folder:

### 1. Software Development Engineer Resume
**File Path:** `/public/Chandra_Sai_Reddy_SDE_Resume.pdf`
- For software development, full-stack, and ML engineering roles

### 2. Cloud & DevOps Resume  
**File Path:** `/public/Chandra_Sai_Reddy_Cloud_DevOps_Resume.pdf`
- For cloud architecture, DevOps, and infrastructure engineering roles

## How to Add Your Resume Files

```bash
# Copy your SDE resume
cp ~/Downloads/your-sde-resume.pdf /Users/donthireddychandrasaireddy/chandra-portfolio/public/Chandra_Sai_Reddy_SDE_Resume.pdf

# Copy your Cloud/DevOps resume
cp ~/Downloads/your-cloud-resume.pdf /Users/donthireddychandrasaireddy/chandra-portfolio/public/Chandra_Sai_Reddy_Cloud_DevOps_Resume.pdf
```

## Important Notes

- File names must match exactly as specified above
- Files should be PDF format
- Recommended file size: < 2MB per file
- Files will be downloadable at:
  - `/Chandra_Sai_Reddy_SDE_Resume.pdf`
  - `/Chandra_Sai_Reddy_Cloud_DevOps_Resume.pdf`

## Testing

After adding the files, test the download buttons on the Contact page:
1. Go to http://localhost:3000/contact
2. Scroll to the "Download Resume" section
3. Click each button to verify downloads work

## Alternative Names

If you want to use different file names, update these lines in `/components/sections/contact.tsx`:
- Line ~192: `href="/Chandra_Sai_Reddy_SDE_Resume.pdf"`
- Line ~207: `href="/Chandra_Sai_Reddy_Cloud_DevOps_Resume.pdf"`
