import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { nanoid } from "nanoid";
import '../styles.css';
import { cdnURL } from "./utils/Constant";

const RestaurantMenu = () => {
  const [resMenu, setResMenu] = useState([]);
  const [offerlist, setOfferList] = useState([]);
  const [accordian, setAccordian] = useState([]);
  const [accSubData, setAccSubData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const { resId } = useParams();

  const handleAccordian = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const urlConstant = 'https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.3909464&lng=76.9635023&restaurantId=';

  const fetchMenu = async () => {
    const data = await fetch(urlConstant + resId);
    const json = await data.json();

    const resMenuList = json?.data?.cards?.[2]?.card?.card?.info || [];

    const offerListData = json?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];

    const accordianList = json?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const accordianSubData = accordianList?.card?.card?.itemCards || [];

    setResMenu(resMenuList);
    setOfferList(offerListData);
    setAccordian(accordianList);
    setAccSubData(accordianSubData);
    console.log(accordianSubData);

  }

  const {
    name,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    areaName,
    sla,
    locality,
  } = resMenu;
  const deliveryTime = sla?.slaString;

  // ================== Selected Food Information ==================
  return (
    <div className="menu lg:px-[250px] lg:pt-8 p-4">
      <h1 className="font-semibold text-4xl mb-6">{name}</h1>
      <div className="flex flex-col gap-2 border-2 border-gray-300 p-10 rounded-2xl ">
        <strong>
          <span>
            {avgRating >= 4 ? (
              <i className="ri-star-s-fill text-green-700"></i>
            ) : (
              <i className="ri-star-s-fill text-orange-400"></i>
            )}
            {avgRating}
          </span>
          <span>({totalRatingsString})</span>
          <span> . </span>
          <span>{costForTwoMessage}</span>
        </strong>

        <h3>{cuisines?.join(', ')}</h3>
        <div className="flex gap-1.5">
          <h2 className="font-bold">Outlet:</h2>
          <h2 className="text-gray-500"> {areaName}</h2>
        </div>

        <h2>{deliveryTime?.toLowerCase()}<span className="text-gray-500"> to {locality}</span></h2>
      </div>
      {/* =============== Offer's Slider Card ================ */}
      <h1 className="font-semibold text-4xl my-8">Deals for you</h1>
      <div className="offerSlide flex gap-4 overflow-x-auto scrollbar-hide my-6">

        {offerlist.map((offer) => (
          <div key={offer.info.offerIds}>
            <div className="border-black border min-w-[250px] rounded-2xl text-center p-4 flex gap-3.5">
              <img className="w-8 h-auto" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic" alt="" />
              <div>
                <p className="w-[2/10]"><strong>{offer.info.header}</strong></p>
                <p className="w-[2/10]">{offer?.info?.couponCode || ['USE FLAT 10']}</p>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* ============================= Food Accordian ======================== */}
      <h1 className="font-semibold text-4xl my-8">Our Special Menu</h1>
      <div>
        {accordian.map((accHeading, index) => 
          accHeading?.card?.card?.title &&  (
          <div key={nanoid()}>

            <button onClick={() => handleAccordian(index)} className="font-semibold bg-gray-100 rounded-2xl mb-4 p-8 w-full text-[25px] cursor-pointer">
              {accHeading?.card?.card?.title || ['Not Available']}<span className="float-right">⬇️</span></button>

            {openIndex === index && accHeading?.card?.card?.itemCards?.map((item) => (
              
              <div key={item.card.info.id} className="accordianData flex justify-between items-center border-b-[0.5px] mb-10">
                <div className=" flex flex-col gap-2.5">
                  <h1><strong>{item?.card?.info?.name}</strong></h1>
                  <p><strong>₹ {item?.card?.info?.price / 100}</strong></p>
                  <p>{item?.card?.info?.ratings?.aggregatedRating?.rating} <span> ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 || ['Nan']})</span></p>
                  <p>{item?.card?.info?.description}</p>
                </div>
                <div className="mb-10 relative">
                  <img id="menu_image" className="menu_image" src={cdnURL + item?.card?.info?.imageId} alt="" />

                  <button className="p-2 ml-6 mt-[70px] rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all
                   duration-[.3s] absolute bottom-[-10px] left-[1/2] translate-x-1/2">Add +</button>
                </div>

              </div>
            ))}

          </div>
          )

        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;