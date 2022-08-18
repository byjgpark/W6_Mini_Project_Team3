import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img from "../../img/LoginIn.jpg";
import axios from "axios";
import BackButton from "../../component/backButton/BackButton";

// redux
import { userStatus } from "../../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {

  //Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  //Router
  const navigate = useNavigate();

  //Hook
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  // handleSubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ID === "" && password === "") {
      alert("아아디와 비밀번호를 입력해주세요");
    } else if (ID === "") {
      alert("아아디를 입력해주세요");
    } else if (password === "") {
      alert("비밀번호를 입력주세요");
    } else {
      axios
        .post(
          process.env.REACT_APP_API_KEY + "users/login", //
          { nickname: ID, password: password }
        )
        .then(function (response) {
          console.log(response.data.success);
          if (response.data.success === true) {
            dispatch(userStatus(true));
            let token = response.headers.authorization;
            localStorage.setItem("SavedToken", token);
            console.log(
              "this is local storage" +
                window.localStorage.getItem("SavedToken")
            );
            alert("로그인이 완료되었습니다");
            console.log();
            navigate("/");
          } else {
            alert("로그인이 실패했습니다.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };

  return (
    <>
      <StHeader>
        <BackButton />
      </StHeader>
      <LeftCon></LeftCon>
      <MiddleCon>
        <FormCon>
          <form onSubmit={handleSubmit}>
            <LoginTitle>로그인</LoginTitle>
            <SignInInputCon>
              <LoginLabel>아이디</LoginLabel>
              <SigninTxtbox
                type="text"
                value={ID}
                placeholder="아이디를 입력해주세요"
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
            </SignInInputCon>
            <LoginLabel>비밀번호</LoginLabel>
            <SignInInputCon>
              <SigninTxtbox
                type="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </SignInInputCon>
            <SignInBtnCon>
              <LoginBtn
              // onClick={()=>{signinCheck({ID:ID, password: password})}}
              >
                로그인
              </LoginBtn>
            </SignInBtnCon>
          </form>
          <Ptag>
            아직 회원이 아니신가요?&nbsp;<Atag href="/signup">회원가입</Atag>
          </Ptag>
        </FormCon>
      </MiddleCon>
      {/* <RightCon>
</RightCon> */}
    </>
  );
};

export default LoginPage;

const LoginTitle = styled.div`
  font-size: 1.7em;
  padding-bottom: 5%;
  font-weight: normal;
`;

const LoginLabel = styled.label`
  font-size: 0.9em;
  font-weight: bold;
`;

const SigninTxtbox = styled.input`
  width: 100%;
  padding: 5% 0 3% 0;
  border-radius: 10px;
  border-style: solid;
  border-color: #c0c0c0;

  &:focus {
    outline: none;
    border-color: #004e66;
  }
`;

const FormCon = styled.div`
  margin: 10% 25%;
`;

const Ptag = styled.p`
  display: flex;
  justify-content: center;
  font-size: 0.9em;
  margin-top: 8%;
  color: grey;
`;
const Atag = styled.a`
  color: #ff5f2e;
`;

const SignInInputCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 2% 0 4% 0;
`;

const SignInBtnCon = styled.div`
  margin-top: 10%;
  display: flex;
  justify-content: center;
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 5% 0 3% 0;
  display: inline-block;
  font-size: 0.9em;
  font-weight: bold;

  background-color: #ff5f2e;
  color: white;
  text-align: center;

  border-radius: 10px;
  border-style: solid;
  border-color: #ff5f2e;
`;

const LeftCon = styled.div`
  height: 100%;
  width: 55%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;

  background-image: url(${img});
  background-size: 100% 100%;

  left: 0;
`;

const MiddleCon = styled.div`
  height: 100%;
  width: 45%;
  position: absolute;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;

  right: 0;
`;
const StHeader = styled.div`
  margin: 15px 0 0 58%;
  position: absolute;
  z-index: 10;
  transform: scale(0.7);
`;
// // const RightCon = styled.div`
// // height: 100%;
// // width: 20%;
// // position: absolute;
// // z-index: 1;
// // top: 0;
// // overflow-x:
