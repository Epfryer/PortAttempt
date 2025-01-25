import { useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import type { Project } from "@/lib/projects";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="group relative h-screen flex items-center overflow-hidden">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Scrollbar]}
        slidesPerView="auto"
        scrollbar={{ draggable: true }}
        spaceBetween={0}
        className="w-full h-full"
        style={{ overflow: 'auto' }}
      >
        {/* First slide with text */}
        <SwiperSlide style={{ width: '100vw' }}>
          <div className="relative w-full h-full">
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 bg-white/70 p-4 rounded shadow-lg">
              <h3 className="text-2xl font-semibold">{projects[0].title}</h3>
              <p className="mt-4 text-gray-600">{projects[0].description}</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Remaining slides without text */}
        {projects.slice(1).map((project) => (
          <SwiperSlide key={project.id} style={{ width: '100vw' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
