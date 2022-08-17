import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  // const [ratingNum, setRatingnum] = useState(0);

  console.log("This is rating " + rating)
  // console.log("This is rating num " + ratingNum)

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
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            {/* {console.log("this is rating" + ratingValue)} */}
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
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
