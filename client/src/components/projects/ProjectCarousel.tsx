import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

interface ProjectCarouselProps {
  images: string[];
  onSlideChange?: (index: number) => void;
}

export function ProjectCarousel({ images, onSlideChange }: ProjectCarouselProps) {
  if (!images?.length) return null;

  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      navigation
      slidesPerView={1}
      scrollbar={{ draggable: true, hide: false }}
      spaceBetween={0}
      className="!w-full !h-full"
      onSlideChange={(swiper: SwiperType) => onSlideChange?.(swiper.activeIndex)}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
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
