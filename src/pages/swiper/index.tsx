// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.less';
// Import Swiper styles
import 'swiper/swiper.less';

export default () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      pagination={{ clickable: true }}
      centeredSlides
      loop
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div style={{ width: '100%', height: 200, backgroundColor: 'red' }} />
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ width: '100%', height: 200, backgroundColor: 'blue' }} />
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ width: '100%', height: 200, backgroundColor: 'black ' }} />
      </SwiperSlide>
      <SwiperSlide>
        <div style={{ width: '100%', height: 200, backgroundColor: 'skyblue' }} />
      </SwiperSlide>
    </Swiper>
  );
};
