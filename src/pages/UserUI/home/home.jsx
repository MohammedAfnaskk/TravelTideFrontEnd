import React, { useState, useEffect } from 'react'
import myImage from '../../../assets/image/home.jpg'
import MapImage from '../../../assets/image/homeMapStatic.jpg'
import { SimpleCard } from './raitingCard';
import  Footer from '../../../components/footer/footer';
import { ComplexNavbar } from '../Navbar/navbar';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleNavigate =() =>{
    navigate('location_plan/')
  }

  return (
 
    <div>
       <ComplexNavbar/>
       <div className="flex flex-col lg:flex-row">
        <div className=" p-2 border-1 sm:w-1/2 md:w-2/5 lg:w-2/5 xl:w-2/5 ">

          <div className='text-dark-600 bg-white text-left font-semibold text-4xl leading-1 ml-2 mt-44 tracking-wide font-sans text-center sm:text-left lg:ml-24 break-all'>

            <p>userYou'll never</p>
            travel without our trip ,planner again

          </div>
          <div className='text-gray-600 bg-white text-left font-normal text-2xl leading-1 ml-2 mt-6 tracking-wide font-sans text-center sm:text-left lg:ml-24'>
            Build, organize, and map your itineraries
            in a free travel app designed for vacations
            & road trips
          </div>
          <button onClick={handleNavigate} className="rounded-full bg-[#f75940] text-white h-12 w-36 lg:ml-24 mt-6 mx-auto block  ">Start planning</button>

        </div>
        <div className="lg:w-3/5 sm:w-full">
          {screenWidth >= 640 ? (<img
            className="h-550 w-full object-cover object-center"
            src={myImage}
            alt="nature image"
          />) : null}
        </div>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5   mt-24 mx-auto block ">

            <img
              className="h-auto w-auto lg:ml-24 rounded-lg object-cover object-center"
              src={MapImage}
              alt="nature image"
            />

          </div>

          <div className=" sm:w-1/2 md:w-2/5 lg:w-2/5 xl:w-2/5 ">

            <div className='text-dark-600 bg-white text-left font-semibold text-4xl leading-1 ml-2 mt-44 tracking-wide font-sans text-center sm:text-left  break-all'>

              <p>Your itinerary and your</p>
              map in one view
            </div>
            <div className='text-gray-600 bg-white text-left font-normal text-2xl leading-1 ml-2 mt-6 tracking-wide font-sans text-center sm:text-left '>
              No more switching between different apps, tabs, and tools to keep track of your travel plans.
            </div>
          </div>
        </div>
      </div>
      <div className='text-dark-600 bg-white  font-semibold text-4xl leading-1  mt-24 tracking-wide font-sans text-center'>
        What travelers are raving about
      </div>
      <div className="overflow-hidden max-h-550 mt-12 lg:ml-24">
        <div className="simplebar flex flex-col lg:flex-row">
          <SimpleCard />
 
        </div>
      </div>
       <Footer/>

      <div>

      </div>
    </div>



  )
}


export default Home