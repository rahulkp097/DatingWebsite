import React from 'react'


function Banner() {






  return (
    <div className="carousel" style={{ height: '700px', overflow: 'hidden' }}>
     <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://images.pexels.com/photos/6401602/pexels-photo-6401602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full object-cover h-full" 
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">❮</a>
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide2" className="carousel-item relative w-full">
      <img src="https://images.pexels.com/photos/9143900/pexels-photo-9143900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full object-cover h-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" className="btn btn-circle">❮</a> 
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
    </div> 
  
    <div id="slide3" className="carousel-item relative w-full">
      <img src="https://images.pexels.com/photos/5378979/pexels-photo-5378979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full object-cover h-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" className="btn btn-circle">❮</a> 
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div>
  </div>


  )
}

export default Banner