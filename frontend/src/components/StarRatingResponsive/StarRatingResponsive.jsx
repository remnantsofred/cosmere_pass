import './StarRatingResponsive.css';
import React, { useEffect, useState } from 'react';
import { StarIcon } from '../icon/Icon';
import { AiFillStar } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

export const StarRatingResponsive = ({className="responsiveStarRating", id="", setStarReviewRating, assignedRating})=> {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);

  useEffect(()=>{
    if (assignedRating){
      setRating(assignedRating)
    }
  }, [])

  const handleStarSet = (ratingValue) => {
    setRating(ratingValue)
    setStarReviewRating(ratingValue);
  }

  return (
    <div className={className} id={id}>
      {[ ...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label className='starRatingLabel' key={`starRating${i}`}>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={()=> handleStarSet(ratingValue)} 
              />
              <AiFillStar 
                className='star' 
                color={ratingValue <= (hover || rating) ? "#05f" : "#e7e7e7" } 
                size={30} 
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
          </label>
        );
        })}
        
        {/* <p>The rating is {rating}</p> */}
    </div>
  )
}

export default StarRatingResponsive;