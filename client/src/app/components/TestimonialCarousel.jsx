import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const TestimonialCarousel = ({ testimonials }) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="p-6 shadow-lg rounded-lg bg-white text-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            <p className="text-gray-600 mt-4 italic">{testimonial.quote}</p>
            <h3 className="text-xl font-semibold mt-4">{testimonial.name}</h3>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialCarousel;