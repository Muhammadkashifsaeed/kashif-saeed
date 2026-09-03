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
    period: '2024 - Present',
    description: 'Promoted to a full-time role after a successful 5-month internship. Currently developing and maintaining modern, responsive web applications using React.js and Next.js, collaborating with the team to deliver high-quality digital products.',
    type: 'work'
  },
  {
    id: 101,
    role: 'Frontend Developer Intern',
    company: 'Digistartp UK',
    period: '2023 - 2024 (5 Months)',
    description: 'Completed a 5-month internship focusing on frontend development. Gained hands-on experience in building user interfaces, writing clean code, and working with modern web technologies.',
    type: 'internship'
  },
  {
    id: 2,
role: 'Fresh Graduate – Seeking Frontend Developer Internship',
company: 'Open to Opportunities',
period: '2024 - Present',
description: 'Fresh Computer Science graduate with strong interest in frontend development. Actively seeking an internship opportunity to apply skills in React.js, JavaScript, and Tailwind CSS. Passionate about building responsive and user-friendly web applications while learning industry best practices and improving coding standards.',
type: 'internship'
  },
  {
    id: 3,
role: 'BS Computer Science',
company: 'COMSATS University Islamabad, Vehari Campus',
period: '2022 - 2026',
description: 'Computer Science student with strong interest in frontend development. Passionate about building responsive and modern web applications using React.js, JavaScript, and Tailwind CSS. Actively seeking internship and junior frontend developer opportunities to gain real-world experience and grow in the field.',
type: 'education'
  },
  {
   id: 4,
role: 'React & Modern JavaScript (Self Practice)',
company: 'Self-Learning (Senior Developer Guidance + Online Resources)',
period: '2023',
description: 'Learned React and modern JavaScript through self-practice, online resources, and guidance from senior developers. Built 5 real-world frontend projects to strengthen understanding of components, state management, and responsive UI development.',
type: 'certification'
  },
  {
   id: 5,
role: 'Tailwind CSS (Self Practice)',
company: 'Self-Learning (Online Resources + Practice Projects)',
period: '2023',
description: 'Learned Tailwind CSS through self-practice and online resources with focus on utility-first styling, responsive design, and building modern UI components. Applied concepts in multiple frontend projects to improve real-world development skills.',
type: 'certification'
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
