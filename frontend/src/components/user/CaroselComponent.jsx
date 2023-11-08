import React from 'react'
import { Swiper, SwiperSlide  } from 'swiper/react';

import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { FreeMode, Pagination } from 'swiper/modules'; // Import FreeMode and Pagination


import {RxArrowTopRight} from 'react-icons/rx'
import { Link } from 'react-router-dom';
const CaroselComponent = ({data}) => {
  

  return (
    <div  className="flex items-center justify-center flex-col h-[600px]">
    <Swiper
      breakpoints={{
        340: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="max-w-[100%] lg:max-w-[80%]"
    > {data.map((profile, index) => (
      <SwiperSlide key={index}>
        <Link to={`/userprofile/${profile._id}`}>

<div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
          
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile?.image})` }}
              />
            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
            <div className="relative flex flex-col gap-3">
              {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
              <h1 className="text-xl lg:text-2xl text-white">{profile?.name} </h1>
              <p className="lg:text-[18px] text-white">{profile?.age} </p>
            </div>
            <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
          </div>
              </Link>
      </SwiperSlide>
    ))}
    </Swiper>
      </div>
  )
}

export default CaroselComponent