import imagePaths from './imagesPath/imagePaths';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

function SliderComponent() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      // centeredSlides={true}
      pagination={{ clickable: true }}
      effect={'silde'}
      autoplay={{ delay: 3000, disableOnInteraction: false, speed: 1500 }}
    >
      {imagePaths.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt="" style={{ height: '300px', width: '1200px' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SliderComponent;
