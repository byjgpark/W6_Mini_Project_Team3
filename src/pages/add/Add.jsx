import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addDetailThunk } from "../../redux/modules/postSlice";
import StarRating from "../../component/starRating/StarRating";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    id: 0,
    title: "",
    place: "",
    star: "",
    content: "",
    imgUrl: "url",
  };

  const [posting, setPosting] = useState(initialState);
  console.log(posting);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPosting({ ...posting, [name]: value });
  };

  const onSumbitHandler = (event) => {
    event.preventDefault();
    if (
      posting.title === "" ||
      posting.place === "" ||
      posting.content === ""
    ) {
      event.preventDefault();
      alert("내용을 모두 채워주세요");
    } else {
      event.preventDefault();
      dispatch(addDetailThunk(posting));
      setPosting(initialState);
      alert("정상적으로 등록 되었습니다");
      navigate("/");
    }
  };

  return (
    <AddWrap>
      <AddContainer>
        <InputBox>
          <ImgContainer>
            <ImgInput></ImgInput>
            <input type="file" accept="image/*" />
          </ImgContainer>
          <FormBox>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              name="title"
              value={posting.title}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="추천 장소를 입력해주세요"
              name="place"
              value={posting.place}
              onChange={onChangeHandler}
            />
            <StarBox>
              <StarRating />
            </StarBox>
            <textarea
              type="text"
              placeholder="내용을 입력해주세요"
              name="content"
              value={posting.content}
              onChange={onChangeHandler}
            />
            <button onClick={onSumbitHandler}>게시물 등록하기</button>
          </FormBox>
        </InputBox>
      </AddContainer>
    </AddWrap>
  );
};

export default Add;

const AddWrap = styled.div`
  border: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddContainer = styled.div`
  margin: 10px auto;
  border: 1px red solid;
  border-radius: 10px;
  width: 800px;
  height: 500px;
  padding: 40px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImgContainer = styled.div`
  input[type="file"] {
    border: 1px red solid;
    width: 100px;
    height: 100px;
  }
`;
const ImgInput = styled.div`
  border: 1px red dotted;
  width: 400px;
  height: 300px;
`;
// const ImgButton = styled.input`
//   border: 1px red solid;
//   width: 100px;
//   height: 100px;
// `;

const FormBox = styled.div`
  border: 1px red solid;
  width: 400px;
  height: 500px;
  input[type="text"] {
    border: 1px solid black;
    width: 400px;
    height: 50px;
    margin-top: 20px;
  }
  textarea[type="text"] {
    border: 1px solid black;
    width: 400px;
    height: 150px;
    margin-top: 20px;
  }
  button {
    border: 1px solid black;
    width: 200px;
    height: 50px;
  }
`;
const StarBox = styled.div`
  border: 1px solid black;
  width: 400px;
  height: 50px;
  margin-top: 20px;
  /* display: flex; */
  align-items: center;
  /* justify-content: center; */
  float: left;
`;
// const AddButton = styled.button`
//   border: 1px solid black;
//   width: 200px;
//   height: 50px;
// `;
