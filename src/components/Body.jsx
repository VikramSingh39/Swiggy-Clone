import React, { useEffect, useState } from 'react'
import RestaurantCart from './RestaurantCart'
import {PromotedRest} from './RestaurantCart'
// import { ResList } from './utils/ResList'
import Shimmer from './Shimmer'
import { nanoid } from 'nanoid'
import '../styles.css'
import { Link } from 'react-router'


function Body() {
      const [rest, setRest] = useState([]);
      const[filteredRestaurant, setFilterRestaurant] = useState([]);
      const [searchText, setSearchText] = useState("");

      useEffect(()=>{
            fetchData();
      },[])

      const fetchData = async()=>{
            const data = await fetch("https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=29.15010&lng=75.71760&carousel=true&third_party_vendor=1");

            const jsonData = await data.json();

            const restaurantList = jsonData?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
            setRest(restaurantList);
            setFilterRestaurant(restaurantList);
            // console.log(restaurantList);
      };


      useEffect(()=>{
            const inputText = searchText.toLowerCase();
            const filtered = rest.filter((res)=>
            res.info.name.toLowerCase().includes(inputText));
            setFilterRestaurant(filtered);
      }, [searchText]);

      const RestaurantCardPromoted = PromotedRest(RestaurantCart);

  return (
    <>
    <div className=' flex justify-between items-center mt-8 mb-12 pl-8 pr-8 w-[100%]'>
    <div className='w-[50%]'>
        <input className='search-input rounded-4xl p-4 outline-0 border-[1.5px] w-[65%] border-black' type="text" placeholder='search here' value={searchText}
        onChange={(e)=> setSearchText(e.target.value)}/>    
    </div>
          
      
      <div className='filter-buttons  w-[50%] flex flex-wrap gap-4'>
            <button className='filter-btn' onClick={()=>{
             const filtered =   rest.filter((res)=>res.info.avgRating >= 4.4);
             setFilterRestaurant(filtered); 

            }}>Top Rated Restaurant</button> 

            <button className='filter-btn' onClick={()=>{
             const filtered =   rest.filter((res) => res?.info?.sla?.lastMileTravel <=2.6);
             setFilterRestaurant(filtered); 

            }}>Nearest</button> 


            <button className='view-all'onClick={()=>{
                  setFilterRestaurant(rest); 
            }} >View All</button>
      </div>

    </div>

      {filteredRestaurant.length == 0? ( <div className='flex flex-wrap gap-16 justify-center items-center'><Shimmer/></div>): 
      (      <div className="dynamicRes flex flex-wrap gap-16 justify-center items-center">
      {filteredRestaurant.map((restaurant)=>(
            <Link key={restaurant.info.id} to={'/restaurants/'+restaurant.info.id}>

            {restaurant.promoted ? (<RestaurantCardPromoted data={restaurant?.info}  />): (<RestaurantCart data={restaurant?.info} />)}
            </Link>
          
      ))}  
      </div>)}
  
    </>

  )
}

export default Body;