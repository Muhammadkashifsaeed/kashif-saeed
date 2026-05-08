# Portfolio Website

A modern, premium-quality personal portfolio website built for a Junior Frontend Developer with React.js, Tailwind CSS, and Framer Motion.

## Features

- Responsive design for all devices
- Smooth scroll navigation with active section highlighting
- Animated sections using Framer Motion
- Glassmorphism and modern UI effects
- Fully accessible components
- Easy to customize content

## Tech Stack

- **React 18** - Component architecture
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Styling and design
- **Framer Motion** - Animations and transitions
- **React Icons** - Icon library

## Setup & Development

### Prerequisites

- Node.js 16+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with mobile menu
│   ├── Hero.jsx        # Hero section with CTAs
│   ├── About.jsx       # About section
│   ├── Skills.jsx      # Skills showcase
│   ├── Projects.jsx    # Projects grid
│   ├── Resume.jsx      # Resume section with PDF upload
│   ├── Experience.jsx  # Timeline section
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer with links
│   └── BackToTop.jsx   # Scroll-to-top button
├── data/               # Portfolio data (projects, skills, etc.)
│   └── portfolioData.js
├── assets/             # Static assets (images, etc.)
├── App.jsx             # Main app component
├── index.css           # Global styles + Tailwind directives
└── main.jsx            # Entry point

public/
├── vite.svg            # Favicon
└── resume.pdf          # Your resume file (add yours here)
```

## Customization

### Personal Information

Edit `src/data/portfolioData.js` to update:
- Personal details (name, title, contact info)
- Skills list
- Projects
- Experience/Education timeline
- Social media links

### Styling

Customize colors and theme in `tailwind.config.js`:
- Primary color palette
- Font families
- Custom animations
- Extended utilities

### Resume

1. Add your resume PDF to the `public/` folder as `resume.pdf`
2. Update the resume section in `portfolioData.js` if needed
3. Users can also upload new PDFs through the portfolio interface

### Deployment

The project can be deployed to:
- **Vercel** (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

Simply build the project and upload the `dist/` folder contents.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Free to use for personal and commercial projects.
