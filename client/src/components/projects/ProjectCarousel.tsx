import { useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Required Swiper styles
import type { Project } from "@/lib/projects"; // Update to your actual path

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="group relative h-screen flex items-center overflow-hidden">
      {/* Close button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full h-full">
        <Swiper
          slidesPerView={3}       // Show multiple items at once
          spaceBetween={0}        // Remove gaps between images
          className="h-full w-full" 
        >
          {/* First slide with text */}
          <SwiperSlide className="flex h-full">
            <div className="relative w-full flex items-center justify-center">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="object-cover w-full"
              />
              <div className="absolute bottom-8 left-8 bg-white/70 p-4 rounded shadow-lg">
                <h3 className="text-2xl font-semibold">
                  {projects[0].title}
                </h3>
                <p className="mt-4 text-gray-600">
                  {projects[0].description}
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Remaining slides with just images */}
          {projects.slice(1).map((project) => (
            <SwiperSlide key={project.id} className="flex h-full">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
