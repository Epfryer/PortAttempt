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
      slidesPerView="auto"
      scrollbar={{ draggable: true }}
      spaceBetween={0}
      className="w-full h-full"
      onSlideChange={(swiper: SwiperType) => onSlideChange?.(swiper.activeIndex)}
    >
      {images.map((image, index) => (
        <SwiperSlide 
          key={index} 
          style={{ width: '100%' }}
          className="h-full aspect-[16/9]"
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
