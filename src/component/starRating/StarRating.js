import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
// import "./StarRating.css";

const StarRating = ({ onChangeHandler }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  console.log(rating);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <StLabel>
            <input
              className="rating"
              type="radio"
              name="star"
              value={ratingValue}
              onChange={(e) => onChangeHandler(e)}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#fcbe32" : "#e4e5e9"}
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </StLabel>
        );
      })}
    </div>
  );
};

export default StarRating;

const StLabel = styled.label`
.rating {
  display: none;
}
.star {
  cursor: pointer;
}
`;