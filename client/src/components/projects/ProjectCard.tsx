import { motion } from "framer-motion";
import { useState, useRef } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCarousel } from "./ProjectCarousel";

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onExpand: (id: string | null) => void;
}

export function ProjectCard({ project, isExpanded, onExpand }: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create dummy content with the same image repeated
  const content = [
    { image: project.image, text: project.description },
    { image: project.image, text: "" },  // Second copy
    { image: project.image, text: "" },  // Third copy
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
            className="grid grid-cols-[1fr,minmax(120px,15vw)] gap-[calc(1vw)] items-center w-full max-w-3xl mx-auto cursor-pointer flex justify-center relative" 
            onClick={() => onExpand(project.id)}
            style={{
              transform: 'translateX(-10%)',  // Adjust this value to center based on the middle of the image
              width: 'calc(100% - 2rem)'     // Account for padding
            }}
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
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div ref={carouselRef} className="max-w-7xl mx-auto grid grid-cols-[minmax(200px,25%),1fr] gap-4 p-4">
              <div className="p-4 max-w-[200px]">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{content[currentIndex].text}</p>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
              </div>
              <div className="relative">
                <ProjectCarousel 
                  images={content.map(item => item.image)}
                  onSlideChange={setCurrentIndex}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}