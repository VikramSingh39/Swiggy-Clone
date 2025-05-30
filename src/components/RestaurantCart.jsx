import React from 'react'
import {cdnURL} from './utils/Constant'

const RestaurantCart = (props)=>{
     const {
      cloudinaryImageId,
      name,
      avgRating,     
      cuisines,
      costForTwo,
      sla,
     } = props?.data;
      
     const deliveryTime = sla?.slaString;

     return (
      <div className='resto-cart '>
        <div>
          <img className='food-image w-[250px] h-[200px] rounded-2xl' src={cdnURL + cloudinaryImageId} alt="food_image" />
        </div>

      <div className='about-food'>
      <h2 className='resName'>{name}</h2>
        <h3><i className="ri-star-fill"></i>{avgRating}</h3>
        <h3>{deliveryTime} </h3>
        <p className='cuisine'>{cuisines.join(', ').length > 30 ? 
          <>
          {cuisines.join(', ').slice(0,25)}{('...')}
          </> : cuisines.join(', ')
         } </p>
        <p className='food_price'>{costForTwo}</p>
      </div>
      </div>
  );
};

export const PromotedRest = (RestaurantCart)=>{
  return(props)=>{
        return(
            <div className='relative'>
              <label className='bg-yellow-400 text-black m-2 p-2 absolute rounded-lg top-[-20px] left-[-20px] border-white  border-2'>Promoted</label>
              <RestaurantCart {...props}/>
            </div>  
        )
  }
}

export default RestaurantCart;