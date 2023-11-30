import React from 'react'


function Banner() {






  return (
      <div className="carousel relative" style={{ height: '700px', overflow: 'hidden' }}>
    <div id="slide1" className="carousel-item w-full sm:w-full md:w-full lg:w-full xl:w-full relative">
      <img
        src="https://images.pexels.com/photos/6401602/pexels-photo-6401602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full object-cover h-full"
        alt="Slide 1"
      />
      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2">
        <a href="#slide3" className="btn btn-circle ">❮</a>
        <a href="#slide2" className="btn btn-circle ">❯</a>
      </div>
    </div>
    <div id="slide2" className="carousel-item w-full sm:w-full md:w-full lg:w-full xl:w-full relative">
      <img
      src="https://images.pexels.com/photos/2532215/pexels-photo-2532215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full object-cover h-full"
        alt="Slide 2"
      />
      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2">
        <a href="#slide1" className="btn btn-circle ">❮</a>
        <a href="#slide3" className="btn btn-circle ">❯</a>
      </div>
    </div>
    <div id="slide3" className="carousel-item w-full sm:w-full md:w-full lg:w-full xl:w-full relative">
      <img
        src="https://images.pexels.com/photos/8350970/pexels-photo-8350970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full object-cover h-full"
        alt="Slide 3"
      />
      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2">
        <a href="#slide2" className="btn btn-circle">❮</a>
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div>
  </div>


  )
}

export default Banner