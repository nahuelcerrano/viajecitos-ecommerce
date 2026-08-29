import React, { useContext } from "react";
import { CartContext } from '../../../context/Cart'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import viajesCard from './viajes.module.css'

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
    <div className={viajesCard.cardGrid}>
      <div className={viajesCard.cardImage}>
        <img src={destinoImageUrl} alt={validName} />
      </div>
      <div className={viajesCard.cardText}>
        <h3>{capsName}</h3>
        <p className={viajesCard.cardDescription}> {validDescription}</p>
        <h3>$ {validPrice}</h3>
        <div className={viajesCard.cardStars}>
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiFillStar /></span>
          <span> <AiOutlineStar /></span>
        </div>
      </div>
      <div className={viajesCard.cardButton}>
        <button 
          onClick={() => addToCart(validId)} 
          className={viajesCard.cardButtonHover}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};