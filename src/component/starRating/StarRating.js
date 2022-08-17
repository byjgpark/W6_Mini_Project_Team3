import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ onChangeHandler }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  console.log(rating)

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        // console.log("Checking Array "+JSON.stringify([...Array(5)]))
        return (
          <label>
            <input
              className="rating"
              type="radio"
              name="star"
              value={ratingValue}
<<<<<<< HEAD
              onChange={(e) => onChangeHandler(e)}
=======
              onChange={(e)=> onChangeHandler(e)}
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9
              onClick={() => setRating(ratingValue)}
            />
            {/* {console.log("this is rating" + ratingValue)} */}
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#fcbe32" : "#e4e5e9"}
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
