import { useInView } from '../hooks/useInView';
import { FaGraduationCap, FaLightbulb, FaHeart, FaRocket } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const About = () => {
  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [imageRef, isImageInView] = useInView({ once: true, delay: 100 });
  const [contentRef, isContentInView] = useInView({ once: true, delay: 200 });

  const features = [
    {
      icon: FaLightbulb,
      title: 'Creative Problem Solver',
      description: 'I approach challenges with a creative mindset and find elegant solutions to complex problems.'
    },
    {
      icon: FaHeart,
      title: 'User-Centric Design',
      description: 'Passionate about creating intuitive and accessible user experiences that delight users.'
    },
    {
      icon: FaRocket,
      title: 'Fast Learner',
      description: 'Quick to adapt to new technologies and always eager to improve my skills.'
    },
    {
      icon: FaGraduationCap,
      title: 'Continuous Learner',
      description: 'Committed to learning modern web technologies and improving development skills.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-16 transition-all duration-600"
          style={{
            opacity: isHeadingInView ? 1 : 0,
            transform: isHeadingInView ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <div
            ref={imageRef}
            className="relative transition-all duration-700"
            style={{
              opacity: isImageInView ? 1 : 0,
              transform: isImageInView ? 'translateX(0)' : 'translateX(-50px)'
            }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Image Card with glass background - info inside same card */}
              <div className="glass rounded-2xl p-6 shadow-2xl">
                {/* Image container */}
                <div className="aspect-square rounded-xl overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br from-accent/10 to-purple-500/10">
                  <img
                    src="/kashif.png"
                    alt="Kashif Saeed"
                    className="w-[85%] h-[85%] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent('Kashif Saeed')}&background=0D9488&color=fff&size=400`;
                    }}
                  />
                </div>

                {/* Info - inside the same card */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-300">Name:</span>
                    <span className="font-semibold">{personalInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-300">Location:</span>
                    <span className="font-semibold">{personalInfo.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-300">Email:</span>
                    <span className="font-semibold text-xs">{personalInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-300">Status:</span>
                    <span className="text-green-400 font-semibold">Available for Internship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            ref={contentRef}
            className="transition-all duration-700"
            style={{
              opacity: isContentInView ? 1 : 0,
              transform: isContentInView ? 'translateX(0)' : 'translateX(50px)'
            }}
          >
            <h3 className="text-3xl font-bold mb-6">
              Building Modern <span className="text-gradient">Web Experiences</span>
            </h3>

            <p className="text-dark-200 text-lg leading-relaxed mb-6">
              I am a passionate Junior Frontend Developer with strong interest in building responsive and modern web applications using React.js, JavaScript, and Tailwind CSS.
            </p>

            <p className="text-dark-200 text-lg leading-relaxed mb-8">
              I focus on writing clean code, creating user-friendly interfaces, and continuously improving my development skills through practice and real-world projects.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 card-hover hover-lift"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    opacity: isContentInView ? 1 : 0,
                    transform: isContentInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease-out'
                  }}
                >
                  <item.icon className="text-accent text-2xl mb-3" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-dark-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
