import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { skills } from '../data/portfolioData';

const Skills = () => {
  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [gridRef, isGridInView] = useInView({ once: true });
  const [legendRef, isLegendInView] = useInView({ once: true, delay: 400 });
  const progressRefs = useRef([]);

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/5 to-purple-500/5 rounded-full blur-3xl -z-10" />

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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto">
            A showcase of my technical expertise and proficiency in modern web development technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="glass rounded-2xl p-6 card-hover hover-lift"
                style={{
                  opacity: isGridInView ? 1 : 0,
                  transform: isGridInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                  transition: 'all 0.5s ease-out',
                  transitionDelay: isGridInView ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl"><Icon /></span>
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold inline-block text-dark-300">Proficiency</span>
                    <span className="text-xs font-semibold inline-block text-accent">{skill.level}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-dark-800">
                    <div
                      ref={el => progressRefs.current[index] = el}
                      className="h-full flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-accent to-purple-600 transition-all duration-1500 ease-out"
                      style={{
                        width: isGridInView ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Categories Legend */}
        <div
          ref={legendRef}
          className="mt-16 flex flex-wrap justify-center gap-4 transition-all duration-600"
          style={{
            opacity: isLegendInView ? 1 : 0,
            transform: isLegendInView ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          {categories.map((category) => (
            <div key={category} className="glass px-6 py-3 rounded-full">
              <span className="font-medium text-accent">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

