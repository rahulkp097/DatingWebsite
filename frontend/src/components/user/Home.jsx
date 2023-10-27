import React from 'react';
import { Link } from 'react-router-dom';


function Home() {

  

  return (
    <div>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

      <section className="relative bg-blueGray-50">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: "url('https://images.pexels.com/photos/935789/pexels-photo-935789.jpeg?auto=compress&cs=tinysrgb&w=1600')"}}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                  Over 1,000 People
Waiting To Meet You.
Meet someone new today.
                  </p>
                  <div className="pt-20 flex justify-center items-center space-x-4">
  <Link to='/login'>
     <button
    type="button"
    className="w-40 flex items-center justify-center text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-[#3b5998]/55 mr-2 mb-2 transition-transform transform hover:scale-105"
  >
     Login 
    
  </button>
  </Link>
  <Link to='/register'>
  <button
    type="button"
    className="w-40 flex items-center justify-center text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 transition-transform transform hover:scale-105"
  >
    Register
  </button>
  </Link>
</div>

                </div>
              </div>
            </div>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              
            </svg>
          </div>
        </div>
        <section className="pb-10 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-black">Create A Profile</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Craft your unique dating persona with a captivating profile that reflects the real you.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-black">Find Match</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Dive into our vast pool of potential partners and discover that special someone who shares your interests and values.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-black">Make Connection</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Forge meaningful bonds and kindle the flames of romance with our platform's seamless communication features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative pt-8 pb-6 mt-1">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  
                </div>
              </div>
            </div>
          </footer>
        </section>
      </section>
      <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">WHY You&Me</h2>
          <p className="mb-4">
          It's easy-   ingle2 is a piece of cake to use. Within minutes you'll be chatting with potential dates in your area.</p>
          <p>It's quick-    Most people that use this site find a match within minutes.</p>
          <p>There's tons of singles.    We're one of the biggest dating sites on earth, and it's all totally free.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src="https://images.pexels.com/photos/888894/pexels-photo-888894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 1" />
          <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://images.pexels.com/photos/3692738/pexels-photo-3692738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 2" />
        </div>
      </div>
    </section>
    </div>
  );
}

export default Home;
