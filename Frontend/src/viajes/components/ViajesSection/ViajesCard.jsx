import React, { useContext } from "react";
import { CartContext } from '../../../context/Cart'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export const ViajesCard = ({
  id, Id,             // Soporta el mock o el Guid de C#
  url, Url,           // Soporta el mock o la API
  imageId, ImageId,   // Soporta el mock o la API
  name, Name,
  description, Description,
  price, Price
}) => {
  const { addToCart } = useContext(CartContext)

  const validId = id || Id;
  const validUrl = url || Url || "countries";
  
  const validImageId = imageId || ImageId || validId; 
  
  const validName = name || Name || "";
  const validDescription = description || Description || "";
  const validPrice = price || Price || 0;

  const destinoImageUrl = `/${validUrl}/${validImageId}.jpg`;
  const capsName = validName.toUpperCase();

  return (
    <div className="grid grid-rows-[15rem_15rem_3rem] justify-start overflow-hidden rounded-[0.4rem] bg-white shadow-card transition-all duration-500 ease-[ease] hover:scale-[1.03]">
      <div>
        <img className="h-full w-full object-cover" src={destinoImageUrl} alt={validName} />
      </div>
      <div className="flex flex-col items-center justify-evenly px-2.5 text-center font-bold">
        <h3>{capsName}</h3>
        <p className="text-center font-normal text-muted"> {validDescription}</p>
        <h3>$ {validPrice}</h3>
        <div className="flex flex-nowrap">
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiOutlineStar /></span>
        </div>
      </div>
      <div className="flex flex-col items-start overflow-hidden">
        <button 
          onClick={() => addToCart(validId)} 
          className="m-0 h-full w-full rounded-none bg-accent-gradient bg-300% font-sans text-base font-bold text-white shadow-accent transition-all duration-[400ms] ease-in-out hover:bg-right-top"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};
