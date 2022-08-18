import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addDetailThunk } from "../../redux/modules/postSlice";
import StarRating from "../../component/starRating/StarRating";
import BackButton from "../../component/backButton/BackButton";
import logo from "../../logo.png"

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
    imgUrl: "",
  };

  const [posting, setPosting] = useState(initialState);
  const [files, setFiles] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPosting({ ...posting, [name]: value });
  };

  // 선택된 파일 읽기
  const onLoadFile = (e) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  };

  //저장 함수
  const onPostingHandler = async (event) => {
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
      let frm = new FormData();
      let postimage = document.getElementById("img_file");

      frm.append(
        "data",
        new Blob([JSON.stringify(posting)], { type: "application/json" })
      );
      frm.append("image", postimage.files[0]);
      try {
        const response = await dispatch(addDetailThunk(frm));
        if (response) {
          setPosting(initialState);
          alert("정상적으로 등록 되었습니다");
          navigate("/cards");
        }
      } catch (error) {
      }
    }
  };

  return (
    <>
      <StBackDiv>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      </StBackDiv>
      <AddWrap>
        <AddContainer>
          <InputBox encType="multipart/form-data" onSubmit={onPostingHandler}>
            <ImageBox>
              <ImgForm>
                <strong></strong>
                <PrevImg src={files ? files : ""} alt='이미지 미리보기'/>
              </ImgForm>
              {/* <FileCustom placeholder="업로드 버튼을 클릭해주세요" /> */}
              <FileLabel htmlFor="img_file">이미지 가져오기</FileLabel>
              <FileInput
                type="file"
                id="img_file"
                accept="img/*"
                onChange={onLoadFile}
              />
            </ImageBox>

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
              <button type="submit">게시물 등록</button>
            </FormBox>
          </InputBox>
        </AddContainer>
      </AddWrap>
    </>
  );
};

export default Add;

const AddWrap = styled.div`
  border: none;
  width: 1200px;
  height: 800px;
  display: flex;
  flex-direction:column;
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

const InputBox = styled.form`
  display: flex;
  justify-content: space-around;
  height: 100%;
`;
const ImageBox = styled.div`
  width: 40%;
  height: 70%;
`;

const ImgForm = styled.div`
  border: 1px #004e66 solid;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px dotted #004e66;
`;
const PrevImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit:cover;
`;
const FileLabel = styled.label`
  display: inline-block;
  padding: 0 30px;
  padding-top: 5px;
  padding-bottom: 7px;
  color: #e1eef6;
  vertical-align: middle;
  background-color: #ff5f2e;
  cursor: pointer;
  width: 140px;
  height: 39px;
  line-height: 40px;
  margin-left: 10px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 100px;
  text-align: center;
`;

const FormBox = styled.div`
  width: 50%;
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
const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const StBackDiv = styled.div`
  width:70%;
  padding-left:254px;
`;