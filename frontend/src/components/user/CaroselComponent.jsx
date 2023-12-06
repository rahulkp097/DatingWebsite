import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const CaroselComponent = ({ data }) => {
  const isSingleSlide = data.length === 1;

  if (data.length < 3) {
    // Render as cards if there are fewer than three slides
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((profile, index) => (
          <Link to={`/userprofile/${profile._id}`} key={index}>
            <div className="indicator">
              {profile?.subscription?.planName && (
                <span
                  className={`indicator-item badge ${
                    profile?.subscription?.planName === "Premium Plan"
                      ? "badge-secondary"
                      : "badge-primary"
                  } hidden sm:inline`}
                >
                  {profile?.subscription?.planName}
                </span>
              )}
              <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      profile?.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    })`,
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                <div className="relative flex flex-col gap-3">
                  <h1 className="text-xl lg:text-2xl text-white">
                    {profile?.name}{" "}
                  </h1>
                  <p className="lg:text-[18px] text-white">{profile?.age} </p>
                </div>
                <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Render Swiper if there are three or more slides
  return (
    <div className="flex items-center justify-center flex-col h-[600px]">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        freeMode={!isSingleSlide}
        slidesPerView={isSingleSlide ? 1 : "auto"}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[100%] lg:max-w-[80%]"
      >
        {data.map((profile, index) => (
          <SwiperSlide key={index}>
            <Link to={`/userprofile/${profile._id}`}>
              <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      profile?.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    })`,
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                <div className="relative flex flex-col gap-3">
                  <h1 className="text-xl lg:text-2xl text-white">
                    {profile?.name}{" "}
                  </h1>
                  <p className="lg:text-[18px] text-white">{profile?.age} </p>
                </div>
                <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CaroselComponent;
