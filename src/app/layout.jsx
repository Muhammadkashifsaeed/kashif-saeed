import './globals.css';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3001';
};

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Kashif Saeed | Next.js Developer Portfolio',
  description: 'Portfolio of Kashif Saeed, a passionate Next.js Developer from Lahore, Pakistan, specializing in responsive and beautiful web experiences.',
  keywords: ['Kashif Saeed', 'Next.js Developer', 'Frontend Developer', 'React Developer', 'Web Developer', 'Portfolio', 'Pakistan'],
  authors: [{ name: 'Kashif Saeed', url: 'https://github.com/Muhammadkashifsaeed' }],
  creator: 'Kashif Saeed',
  publisher: 'Kashif Saeed',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kashif Saeed | Next.js Developer Portfolio',
    description: 'Portfolio of Kashif Saeed, a passionate Next.js Developer from Lahore, Pakistan.',
    url: '/',
    siteName: 'Kashif Saeed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashif Saeed | Next.js Developer Portfolio',
    description: 'Portfolio of Kashif Saeed, a passionate Next.js Developer from Lahore, Pakistan.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
