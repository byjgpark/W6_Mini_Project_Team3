import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { __addUser } from "../../redux/modules/user"
import img from "../../img/SignUp.jpg"
import "./SignUp.css"

// Redux
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const SignUp = () => {

  // Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user)

  // Router
  const navigate = useNavigate();

  // Hook
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordCon] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    // console.log("회원가입이 완료 되셨습니다.")

    if(nickname !== "" || password !== "" || passwordConfirm !== "" || gender !== "" || age !== ""){
    dispatch(__addUser({
      "nickname": nickname,
      "password": password,
      "passwordConfirm": passwordConfirm,
      "gender": gender,
      "age": age
    }))
    navigate('/')
  }
    // console.log("회원가입이 완료 되셨습니다.") 
  };

  return(
    <>
      <LeftCon>
      </LeftCon>
      <MiddleCon>
        <FormCon>
          <form onSubmit={onSubmitHandler}>
            <Title>회원가입</Title>
            <InputCon>
                <Label>닉네임</Label>
                <div>
                <NicInputBox
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => {
                    // Getting User title input
                    setNickname(e.target.value);
                  }}
                >
                </NicInputBox>
                <CheckBtn onClick={() => {alert("hello")}}>중복확인</CheckBtn>
                </div>
              </InputCon>
              <InputCon>
                <Label>비밀번호</Label>
                <InputBox
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => {
                    // Getting User title input
                    setPassword(e.target.value);
                  }}
                >
                </InputBox>
              </InputCon>
              <InputCon>
                {/* <label className="form__label">Confirm Password </label> */}
                <Label>비밀번호 확인</Label>
                <InputBox
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => {
                    // Getting User title input
                    setPasswordCon(e.target.value);
                  }}
                >
                </InputBox>
              </InputCon>
              <InputCon>
                {/* <label className="form__label">Gender </label> */}
                <Label>성별</Label>
                <InputBox
                  type="text"
                  placeholder="성별"
                  value={gender}
                  onChange={(e) => {
                    // Getting User title input
                    setGender(e.target.value);
                  }}
                >
                </InputBox>
              {/* <div>
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="option1"
                    checked={true}
                    className="form-check-input"
                  />
                  남
                 </label>
                 <label>
                   <input
                     type="radio"
                     name="react-tips"
                     value="option1"
                     checked={true}
                     className="form-check-input"
                   />
                   여
                  </label>
                </div> */}

              </InputCon>
              <InputCon>
                <Label>나이대</Label>
                {/* <label className="form__label">Age </label> */}
                <InputBox
                  type="text"
                  placeholder="나이대"
                  value={age}
                  onChange={(e) => {
                    // Getting User title input
                    setAge(e.target.value);
                  }}
                >
                </InputBox>
              </InputCon>
              <BtnCon>
                <Button type="submit">
                회웝가입
              </Button>
            </BtnCon>
          </form>
        </FormCon>
      </MiddleCon>
    </>
  );
};

export default SignUp;

const Title = styled.div`
  font-size: 1.7em;
  padding-bottom: 5%;
  font-weight: normal;
`;

const InputCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 2% 0 3% 0;
`
const NicInputBox = styled.input`
width: 70%;
padding: 5% 0 3% 0;
border-radius: 10px;
border-style: solid;
border-color: #C0C0C0;
display:inline-block;

&:focus {
  outline: none;
  border-color: green;
}
`;

const CheckBtn = styled.button`
  width: 27%;
  display:inline-block;
  padding: 5% 0 3% 0;
  float:right;
  font-weight: bold;

  border-radius: 10px;
  border-style: solid;
  border-color: #4caf50;

  background-color: #4caf50;
  color: white;
`

const InputBox = styled.input`
width: 100%;
padding: 5% 0 3% 0;
border-radius: 10px;
border-style: solid;
border-color: #C0C0C0;

&:focus {
  outline: none;
  border-color: green;
}
`;

const Label = styled.div`
  font-size: 0.9em;
  font-weight: bold;
`

const BtnCon = styled.div`
margin-top: 8%;
display: flex;
justify-content: center;
`;

const Button = styled.button`
width: 100%;
padding: 5% 0 3% 0;
display: inline-block;
font-size: 0.9em;
font-weight: bold;

background-color: #4caf50;
color: white;
text-align: center;

border-radius: 10px;
border-style: solid;
border-color: #4caf50;
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

const FormCon = styled.div`
  margin: 10% 25%;
`;


