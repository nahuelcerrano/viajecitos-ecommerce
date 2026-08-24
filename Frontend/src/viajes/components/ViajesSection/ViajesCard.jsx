import React, { useContext } from "react";

import { CartContext } from '../../../context/Cart'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import viajesCard from './viajes.module.css'

export const ViajesCard = ({
  id,
  url,
  name,
  description,
  price,
}) => {

  const { addToCart } = useContext(CartContext)
  const destinoImageUrl = `/${ url }/${ id }.jpg`
  const capsName = name.toUpperCase()

  return (
    <div className={viajesCard.cardGrid}>
      <div className={viajesCard.cardImage}>
        <img src={ destinoImageUrl } alt={ name } />
      </div>
      <div className={viajesCard.cardText}>
        <h3>{ capsName }</h3>
        <p className={viajesCard.cardDescription}> { description }</p>
        <h3>$ { price }</h3>
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
          onClick={() => addToCart(id)}
          className={viajesCard.cardButtonHover}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};
