import {
  JetBrains_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider';
import { personalInfo } from '../data/portfolioData';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-syne',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://kashif-saeed.vercel.app';
};

const baseUrl = getBaseUrl();

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Kashif Saeed — Next.js & Frontend Developer',
    template: '%s | Kashif Saeed',
  },
  description:
    'Portfolio of Kashif Saeed — Next.js, React & TypeScript Frontend Developer from Lahore, Pakistan building e-commerce stores, AI/IoT interfaces, content platforms, and modern web applications.',
  applicationName: 'Kashif Saeed Portfolio',
  keywords: [
    'Kashif Saeed',
    'Next.js Developer',
    'Frontend Developer',
    'React Developer',
    'TypeScript Developer',
    'Tailwind CSS',
    'Framer Motion',
    'Web Developer Pakistan',
    'Lahore Frontend Engineer',
    'Pulsamento',
    "Mitul's Market",
    'UploadBlog',
    'HopeNest',
    'Cowgenic',
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.social.github }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kashif Saeed — Next.js & Frontend Developer',
    description:
      'Explore 14+ real-world web applications, interactive tech ecosystem, experience, and resume of Kashif Saeed.',
    url: '/',
    siteName: 'Kashif Saeed Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/kashif.png',
        width: 800,
        height: 1000,
        alt: 'Kashif Saeed — Next.js & Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashif Saeed — Next.js & Frontend Developer',
    description:
      'Crafting responsive, expressive web experiences with Next.js, React, TypeScript, and Framer Motion.',
    creator: '@kashifsaeed',
    images: ['/kashif.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070709' },
    { media: '(prefers-color-scheme: light)', color: '#f4f1ea' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  jobTitle: 'Next.js & Frontend Developer',
  url: baseUrl,
  image: `${baseUrl}/kashif.png`,
  email: personalInfo.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'COMSATS University Islamabad, Vehari Campus',
  },
  knowsAbout: [
    'Next.js',
    'React.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Framer Motion',
    'Frontend Development',
  ],
  sameAs: [
    personalInfo.social.github,
    personalInfo.social.linkedin,
    personalInfo.social.instagram,
    personalInfo.social.facebook,
  ],
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('ks-portfolio-theme');
      var isDark = stored ? stored === 'dark' : true;
      document.documentElement.classList.toggle('dark', isDark);
    } catch (e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${playfair.variable} ${jakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
