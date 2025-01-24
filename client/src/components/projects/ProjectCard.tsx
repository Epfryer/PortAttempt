import { motion } from "framer-motion";
import { useState, useRef } from "react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onExpand: (id: string | null) => void;
}

export function ProjectCard({ project, isExpanded, onExpand }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const content = [
    { image: project.image, text: project.description },
    { image: project.image, text: "Additional details about the project process." },
    { image: project.image, text: "More information about outcomes and impact." }
  ];

  return (
    <motion.div 
      layout
      className="relative w-full overflow-hidden mb-[calc(2vh)]"
      initial={false}
    >
      <motion.div 
        layout
        className="w-full mx-auto transition-all"
      >
        {!isExpanded ? (
          // Non-expanded view
          <div 
            className="grid grid-cols-[1fr,minmax(120px,15vw)] gap-[calc(1vw)] items-center w-full max-w-3xl mx-auto cursor-pointer" 
            onClick={() => onExpand(project.id)}
          >
            <div className="text-right">
              <h3 className="text-[calc(0.875rem+0.1vw)] font-medium truncate">
                {project.title}
              </h3>
              <p className="text-[calc(0.75rem+0.1vw)] text-gray-600 mt-[calc(0.25vh)] truncate">
                {project.location}
              </p>
            </div>
            <motion.div
              className="relative aspect-[17/11]"
              whileHover={{ scale: 0.98 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        ) : (
          // Expanded view with edge-to-edge carousel
          <div 
            className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
            onClick={() => onExpand(null)}
          >
            <div 
              ref={carouselRef}
              className="snap-x snap-mandatory scroll-smooth flex overflow-x-auto scrollbar-hide"
            >
              {content.map((item, index) => (
                <div 
                  key={index}
                  className="snap-center shrink-0 w-full flex flex-col items-center px-4"
                >
                  <div className="max-w-7xl w-full grid grid-cols-2 gap-8">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <p className="mt-4 text-gray-600">{item.text}</p>
                      <div className="mt-6 flex gap-4 text-sm text-gray-500">
                        <span>{project.year}</span>
                        <span>{project.category}</span>
                      </div>
                    </div>
                    <div className="relative aspect-[17/11]">
                      <img
                        src={item.image}
                        alt={`${project.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}