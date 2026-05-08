import { useInView } from '../hooks/useInView';
import { FaBriefcase, FaUsers, FaGraduationCap, FaCertificate } from 'react-icons/fa';
import { experience } from '../data/portfolioData';

const Experience = () => {
  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [timelineRef, isTimelineInView] = useInView({ once: true });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work': return FaBriefcase;
      case 'internship': return FaUsers;
      case 'education': return FaGraduationCap;
      case 'certification': return FaCertificate;
      default: return FaBriefcase;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'work': return 'text-accent';
      case 'internship': return 'text-purple-500';
      case 'education': return 'text-green-400';
      case 'certification': return 'text-yellow-400';
      default: return 'text-accent';
    }
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto">
            My professional journey, academic background, and certifications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-purple-600 to-green-400" />

          <div
            ref={timelineRef}
            className="space-y-12"
            style={{
              opacity: isTimelineInView ? 1 : 0,
              transition: 'opacity 0.5s ease-out'
            }}
          >
            {experience.map((item, index) => {
              const Icon = getTypeIcon(item.type);
              const colorClass = getTypeColor(item.type);

              return (
                <div
                  key={item.id}
                  className="relative flex items-start gap-6 md:gap-12 transition-all duration-700"
                  style={{
                    opacity: isTimelineInView ? 1 : 0,
                    transform: isTimelineInView ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {/* Icon Container */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20
                               rounded-full glass flex items-center justify-center
                               border-2 ${colorClass.replace('text', 'border')} shadow-lg
                               transition-transform duration-300 hover:scale-110`}
                  >
                    <Icon className={`${colorClass} text-2xl md:text-3xl`} />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 glass rounded-2xl p-6 md:p-8 card-hover">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-1">{item.role}</h3>
                        <p className="text-accent font-medium">{item.company}</p>
                      </div>
                      <span className="text-sm text-dark-300 font-medium bg-dark-800 px-4 py-2 rounded-full mt-2 md:mt-0 w-fit">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-dark-200 leading-relaxed">{item.description}</p>

                    {/* Type Badge */}
                    <div className="mt-4">
                      <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${colorClass} bg-current/10`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
