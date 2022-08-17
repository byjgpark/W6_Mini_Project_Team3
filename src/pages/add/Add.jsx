import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addDetailThunk } from "../../redux/modules/postSlice";
import StarRating from "../../component/starRating/StarRating";
new Blob([JSON.stringify()], { type: "application/json" });

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    id: 0,
    title: "",
    place: "",
    star: 0,
    content: "",
    imgUrl: "url",
  };

  const [posting, setPosting] = useState(initialState);
  const [files, setFiles] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPosting({ ...posting, [name]: value });
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    if (posting.title === "" || posting.place === "" || posting.body === "") {
      event.preventDefault();
      alert("내용을 모두 채워주세요");
    } else {
      event.preventDefault();
      let frm = new FormData();
      let postimg = document.getElementById("img_file");

      frm.append(
        "data",
        new Blob([JSON.stringify(posting)], { type: "application.json" })
      );
      frm.append("image", postimg.files[0]);
      try {
        const response = await dispatch(addDetailThunk(frm)).unwrap();
        if (response) {
          navigate(`/detail/${response.id}`);
        }
      } catch (error) {
        console.log(error);
      }

      dispatch(addDetailThunk(posting));
      setPosting(initialState);
      alert("정상적으로 등록 되었습니다");
      navigate("/");
    }
  };
  // 선택된 파일 읽기
  const onLoadFile = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <AddWrap>
      <AddContainer>
        <InputBox>
          <ImgContainer>
            {files === "" ? (
              <Postingimg></Postingimg>
            ) : (
              <Postingimg src={files}></Postingimg>
            )}
            {/* <ImgBtn> */}
            <label htmlFor="img_file"></label>
            {/* <form>{" "} */}
            <input
              type="file"
              id="img_file"
              accept="image/*"
              onChange={onLoadFile}
            />
            {/* </form> */}
            {/* </ImgBtn> */}
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
              name="content"
              value={posting.content}
              onChange={onChangeHandler}
            />
            <button onClick={onSumbitHandler} encType="multipart/form-data">
              게시물 등록
            </button>
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
  height: 90%;
  /* input[type="file"] {
    border: 1px #004e66 solid;
    width: 200px;
    height: 100px;
  } */
`;
const Postingimg = styled.div`
  width: 95%;
  height: 77.5%;
  border-radius: 10px;
  border: 1px solid #004e66;
`;

const ImgBtn = styled.div`
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  background-color: #ff5f2e;
  color: #e1eef6;
  font-size: medium;
  margin-top: 20px;
  margin-left: 180px;

  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const FormBox = styled.div`
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
    cursor: pointer;
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
