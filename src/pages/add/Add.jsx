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
    body: "",
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
    if (posting.title === "" || posting.place === "" || posting.body === "") {
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
              <StarRating onChangeHandler={onChangeHandler} />
            </StarBox>
            <textarea
              type="text"
              placeholder="내용을 입력해주세요"
              name="body"
              value={posting.body}
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
  width: 1200px;
  height: 800px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AddContainer = styled.div`
  margin: 10px auto;
  border: 3px #004e66 solid;
  border-radius: 10px;
  width: 100%;
  padding: 40px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  /* border: 1px solid red; */
`;
const ImgContainer = styled.div`
  width: 60%;
  height: 100%;
  input[type="file"] {
    border: 1px #004e66 solid;
    width: 200px;
    height: 100px;
  }
`;
const ImgInput = styled.div`
  border: 2px #fcbe32 dashed;
  width: 500px;
  height: 480px;
`;
// const ImgButton = styled.input`
//   border: 1px red solid;
//   width: 100px;
//   height: 100px;
// `;

const FormBox = styled.div`
  /* border: none; */
  width: 60%;
  height: 100%;

  input[type="text"] {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 60px;
    margin-bottom: 30px;
    font-size: medium;
    padding-left: 10px;
  }
  textarea[type="text"] {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    margin-top: 20px;
    font-size: large;
    padding-left: 20px;
    padding-top: 20px;
  }
  button {
    border: none;
    border-radius: 10px;
    width: 200px;
    height: 50px;
    background-color: #ff5f2e;
    color: #e1eef6;
    font-size: medium;
    margin-top: 20px;
    margin-left: 200px;
  }
`;
const StarBox = styled.div`
  border: none;
  width: 100%;
  height: 50px;
  margin-top: 0px;
  align-items: center;
  float: left;
`;
// const AddButton = styled.button`
//   border: 1px solid black;
//   width: 200px;
//   height: 50px;
// `;
