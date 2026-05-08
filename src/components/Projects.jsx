import { useState, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub, FaFilter } from 'react-icons/fa';
import { projects } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [gridRef, isGridInView] = useInView({ once: true });

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto mb-8">
            A selection of projects that demonstrate my skills and passion for building exceptional digital experiences
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover-scale tap-scale ${
                filter === 'all'
                  ? 'bg-accent text-white'
                  : 'glass text-dark-200 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover-scale tap-scale ${
                filter === 'featured'
                  ? 'bg-accent text-white'
                  : 'glass text-dark-200 hover:text-white'
              }`}
            >
              <FaFilter className="inline mr-2" />
              Featured
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={`${project.id}-${filter}`}
              className="group"
              style={{
                opacity: isGridInView ? 1 : 0,
                transform: isGridInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transition: 'all 0.5s ease-out',
                transitionDelay: isGridInView ? `${index * 100}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="glass rounded-2xl overflow-hidden h-full flex flex-col card-hover">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 to-transparent" />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-accent/20 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover-scale tap-scale"
                      aria-label="View Live Demo"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover-scale tap-scale"
                      aria-label="View GitHub Repository"
                    >
                      <FaGithub size={20} />
                    </a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-200 text-sm mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-dark-800 text-dark-200 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
