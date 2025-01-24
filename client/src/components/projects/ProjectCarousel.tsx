import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useRef, useState, useEffect } from "react";
import * as React from "react";

interface ProjectCarouselProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCarousel({ project, onClose }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [edgeHover, setEdgeHover] = useState<'left'|'right'|null>(null);
  const [scrollInterval, setScrollInterval] = useState<ReturnType<typeof setInterval>|null>(null);
  const [scrollVelocity, setScrollVelocity] = useState(300);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 });

  // Mock additional images for demo - replace with actual project images
  const images = [project.image, project.image, project.image];
  const texts = [
    project.description,
    "Additional project details can be shown here.",
    "More information about the project process and outcomes."
  ];

  const handleEdgeScroll = (direction: 'left'|'right') => {
    const step = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += (direction === 'right' ? 1 : -1) * scrollVelocity;
        setScrollVelocity((v: number) => Math.min(v + 150, 1200));
      }
    };
    setScrollInterval(setInterval(step, 16));
  };

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    if (edgeHover) return;
    
    const delta = e.deltaY * -0.002;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 1), 3);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
    
    setZoomLevel(newZoom);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    
    const { left, width } = carouselRef.current.getBoundingClientRect();
    const position = ((e.clientX - left) / width) * 100;
    
    setEdgeHover(position < 10 ? 'left' : position > 90 ? 'right' : null);
  };

  useEffect(() => {
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [scrollInterval]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white"
    >
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 hover:opacity-70 transition-opacity"
      >
        <X size={24} />
      </button>

      <div
        ref={carouselRef}
        className="h-screen flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setEdgeHover(null)}
        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => 
          handleMouseMove(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
        onTouchEnd={() => {
          if (scrollInterval) {
            clearInterval(scrollInterval);
            setScrollInterval(null);
            setScrollVelocity(300);
          }
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="w-screen flex-none"
          >
            <div className="h-screen grid grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
                  <p className="text-gray-600 mb-4">{texts[index]}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                    <span>{project.category}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="relative h-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src={image}
                  alt={`${project.title} view ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Edge scroll indicators and zoom controls */}
      {edgeHover && (
        <div className="fixed inset-0 flex justify-between pointer-events-none">
          <div className="w-1/5 h-full bg-gradient-to-r from-black/5 to-transparent" />
          <div className="w-1/5 h-full bg-gradient-to-l from-black/5 to-transparent" />
        </div>
      )}
      
      <motion.div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500 bg-white/80 backdrop-blur px-4 py-2 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Scroll near edges to navigate • Wheel to zoom
      </motion.div>
    </motion.div>
  );
}
