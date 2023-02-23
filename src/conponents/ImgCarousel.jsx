import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper";
import { useContext } from "react";
import ProductContext from "../context/product/ProductContext";

export default function ImgCarousel() {

    const {imgUrl} = useContext(ProductContext)
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div>
        {imgUrl?.length > 0 && imgUrl.map((url, index) => (
            <SwiperSlide key={index}>
                <img src={url.secure_url} />
            </SwiperSlide>

        ))}
        </div>
      </Swiper>
    </>
  );
}
