import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

interface ProjectCarouselProps {
  images: string[];
  onSlideChange?: (index: number) => void;
}

export function ProjectCarousel({ images, onSlideChange }: ProjectCarouselProps) {
  if (!images?.length) return null;

  return (
    <Swiper
      modules={[Scrollbar]}
      slidesPerView={1}  // Changed to 1 to ensure consistent sizing
      scrollbar={{ draggable: true }}
      spaceBetween={0}
      className="w-full aspect-[16/9]"  // Added aspect ratio
      onSlideChange={(swiper: SwiperType) => onSlideChange?.(swiper.activeIndex)}
    >
      {images.map((image, index) => (
        <SwiperSlide 
          key={index} 
          className="w-full h-full"  // Simplified class
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
