import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import noImage from "../assets/no-image.jpg";

const Slider = ({ data }) => {
  return (
    <SwiperComponent
      modules={[Navigation, Autoplay]}
      spaceBetween={10}
      slidesPerView={5}
      navigation
      // autoplay={{ delay: 2500, disableOnInteraction: false }}
      className="mySwiper"
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <img
            src={
              item.profile_path
                ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                : noImage
            }
            alt={item.name}
          />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default Slider;
