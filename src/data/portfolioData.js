import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt
} from 'react-icons/fa';
import { SiTailwindcss, SiFramer } from 'react-icons/si';
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
];

export const projects = [
  {
    id: 1,
    title: 'Weather App',
    description: 'Real-time weather updates worldwide. Get current temperature, humidity, wind speed, and 5-day forecast for any city. Built with OpenWeatherMap API.',
    image: '/images/weather-app.png',
    technologies: ['React', 'Vite', 'OpenWeatherMap API', 'Tailwind CSS', 'Axios'],
    liveUrl: 'https://weather-app-u3su.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Weather-app',
    featured: true
  },
  {
    id: 2,
    title: 'Todo App',
    description: 'Task management application with add, edit, delete, and mark complete features. Tasks saved in local storage for persistence across sessions.',
    image: '/images/todo-app.png',
    technologies: ['React', 'Vite', 'Local Storage', 'Tailwind CSS', 'React Icons'],
    liveUrl: 'https://app-todo-io8y.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/App-todo',
    featured: true
  },
  {
    id: 3,
    title: 'Real Estate Website',
    description: 'Modern property listing platform with advanced search filters, property categories, agent profiles, and contact forms. Fully responsive design.',
    image: '/images/real-estate.png',
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Swiper.js'],
    liveUrl: 'https://real-estate-website-83fh.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Real-Estate-Website',
    featured: true
  },
   {
    id: 4,
    title: 'Practice Portfolio Hub',
    description: 'A curated collection of frontend practice projects including responsive HTML/CSS layouts, React components, and JavaScript features. Built as a learning showcase.',
    image: '/images/portfolio.png',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    liveUrl: 'https://portfolios-just-prakits.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Portfolios-just-prakits',
    featured: true
  },
 {
    id: 5,
    title: 'Calculator App',
    description: 'A fully functional calculator application with basic arithmetic operations (add, subtract, multiply, divide). Clean UI with responsive design and keyboard support.',
    image: '/images/calculator.png',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'CSS Grid'],
    liveUrl: 'https://calculator-xi-kohl-27.vercel.app/',
    githubUrl: 'https://github.com/Muhammadkashifsaeed/Calculator',
    featured: true
  },
  {
  id: 6,
  title: 'Ecommerce Website - Modern Online Store',
  description: 'Full-featured ecommerce platform with product listing, shopping cart, user authentication, payment integration, and order management system.',
  image: '/images/Ecommerce.png',
  technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Stripe'],
  liveUrl: 'https://ecommerce-website-6eem.vercel.app/',
  githubUrl: 'https://github.com/Muhammadkashifsaeed/Ecommerce-Website',
  featured: true
}
];

export const experience = [
  {
    id: 1,
role: 'Frontend Developer (Fresh Graduate)',
company: 'Open to Opportunities',
period: '2024 - Present',
description: 'Fresh graduate with strong skills in frontend development using React.js, JavaScript, and Tailwind CSS. Focused on building responsive and user-friendly web interfaces, learning industry best practices, and improving code quality through real-world projects and continuous practice.',
type: 'work'
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
