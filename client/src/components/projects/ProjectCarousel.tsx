import * as React from "react";
import { Project } from "@/lib/projects";
import { useRef, useState } from "react";
import { X } from "lucide-react";

interface ProjectCarouselProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCarousel({ project, onClose }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => setIsDragging(false);

  const images = Array(3).fill(project.image);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 hover:opacity-70 transition-opacity"
      >
        <X size={24} />
      </button>

      <div
        ref={carouselRef}
        className="h-screen flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="w-screen flex-none snap-start"
          >
            <div className="h-screen grid grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
              </div>
              <div className="relative h-screen">
                <img
                  src={image}
                  alt={`${project.title} view ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
