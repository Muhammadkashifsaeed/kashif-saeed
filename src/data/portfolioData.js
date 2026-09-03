import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt
} from 'react-icons/fa';
import { SiTailwindcss, SiFramer, SiNextdotjs } from 'react-icons/si';
import { MdDevices } from 'react-icons/md';

export const skills = [
{ name: 'HTML5', icon: FaHtml5, level: 95, category: 'Frontend' },
{ name: 'CSS3', icon: FaCss3Alt, level: 92, category: 'Frontend' },
{ name: 'JavaScript ES6+', icon: FaJs, level: 88, category: 'Frontend' },
{ name: 'React.js', icon: FaReact, level: 85, category: 'Frontend' },
{ name: 'Tailwind CSS', icon: SiTailwindcss, level: 84, category: 'Styling' },
  { name: 'Git & GitHub', icon: FaGitAlt, level: 88, category: 'Tools' },
  { name: 'Framer Motion', icon: SiFramer, level: 68, category: 'Animation' },
  { name: 'Responsive Design', icon: MdDevices, level: 90, category: 'Core' },
  { name: 'Next.js', icon: SiNextdotjs, level: 80, category: 'Frontend' },
];

export const projects = [
  {
    id: 1,
    title: 'Grillados',
    description: 'A modern fast food web application offering an intuitive ordering experience and vibrant UI.',
    image: '/images/grillados.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://grillados-2.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/grillados',
    featured: true
  },
  {
    id: 2,
    title: 'Integrity Specialists International',
    description: 'Proven professional and technical solutions for domestic & international customers in onshore and offshore projects and asset lifecycles.',
    image: '/images/Integrity.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://system-dusky-mu.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/System',
    featured: true
  },
  {
    id: 3,
    title: 'Corporate Website',
    description: 'Get a smart Way For Your Business. Agile helps you convert data into a strategic asset and top-notch business insights.',
    image: '/images/sinee.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://corporate-website-black-six.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/corporate-website',
    featured: true
  },
  {
    id: 4,
    title: 'AI Ranking Checker',
    description: 'Know How AI Sees Your Brand. Track brand visibility across ChatGPT, Perplexity, Gemini, Claude, and AI-powered search.',
    image: '/images/tacks.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://ai-ranking-checker.vercel.app/en',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/ai-ranking-checker',
    featured: true
  },
  {
    id: 5,
    title: 'Netflix Clone',
    description: 'A fully responsive movie streaming web application clone featuring detailed movie info and a sleek dark UI.',
    image: '/images/saremes.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://tvstartstup.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/tvstartstup',
    featured: true
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Real-time weather updates worldwide. Get current temperature, humidity, wind speed, and 5-day forecast for any city. Built with OpenWeatherMap API.',
    image: '/images/weather-app.png',
    technologies: ['React', 'Vite', 'OpenWeatherMap API', 'Tailwind CSS', 'Axios'],
    liveUrl: 'https://weather-app-u3su.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Weather-app',
    featured: true
  },
  {
    id: 7,
    title: 'Todo App',
    description: 'Task management application with add, edit, delete, and mark complete features. Tasks saved in local storage for persistence across sessions.',
    image: '/images/todo-app.png',
    technologies: ['React', 'Vite', 'Local Storage', 'Tailwind CSS', 'React Icons'],
    liveUrl: 'https://app-todo-io8y.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/App-todo',
    featured: true
  },
  {
    id: 8,
    title: 'Real Estate Website',
    description: 'Modern property listing platform with advanced search filters, property categories, agent profiles, and contact forms. Fully responsive design.',
    image: '/images/real-estate.png',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Swiper.js'],
    liveUrl: 'https://real-estate-website-83fh.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Real-Estate-Website',
    featured: true
  },
  {
    id: 9,
    title: 'Calculator App',
    description: 'A fully functional calculator application with basic arithmetic operations (add, subtract, multiply, divide). Clean UI with responsive design and keyboard support.',
    image: '/images/calculator.png',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'CSS Grid'],
    liveUrl: 'https://calculator-xi-kohl-27.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Calculator',
    featured: true
  }
];

export const experience = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Digistartp UK',
    period: 'May 2026 - Present',
    description: 'Developing and maintaining modern, responsive web applications using React.js and Next.js. Collaborating with the team to deliver high-quality digital products and seamless user experiences.',
    type: 'work'
  },
  {
    id: 2,
    role: 'Frontend Development (Self-Learning)',
    company: 'Self-Taught & Practice Projects',
    period: 'Jan 2026 - May 2026',
    description: 'Dedicated time to advance skills in modern web technologies including Next.js, advanced React patterns, and Tailwind CSS. Built complex practice projects to prepare for a full-time role.',
    type: 'certification'
  },
  {
    id: 3,
    role: 'BS Computer Science',
    company: 'COMSATS University Islamabad, Vehari Campus',
    period: '2022 - Jan 2026',
    description: 'Completed degree with a strong foundation in computer science and a passion for frontend development. Learned core programming concepts, data structures, and web development fundamentals.',
    type: 'education'
  }
];

export const personalInfo = {
  name: 'Kashif Saeed',
  title: 'Frontend Developer',
  tagline: 'Crafting beautiful, responsive, and user-friendly web experiences with React and Tailwind CSS',
  email: 'kashifsaeed8856@gmail.com',
  phone: '+92 306 2933633',
  location: 'Lahore Pakistan',
  social: {
    github: 'https://github.com/Muhammadkashifsaeed',  // keep as placeholder or replace with your GitHub URL
    linkedin: 'https://www.linkedin.com/in/kashif-saeed-232b883a2?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/malikkashif048048?igsh=cmtjcGpqNHBpaTZv',
    facebook: 'https://www.facebook.com/share/1CRuXrEn2H/',
    whatsapp: `https://wa.me/3062933633`
  }
};
