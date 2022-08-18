import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { __addUser } from "../../redux/modules/user"
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Redux getUsers
import {__getUsers} from "../../redux/modules/user"

// import components
import img from "../../img/SignUp.jpg"
import BackButton from "../../component/backButton/BackButton";

const SignUp = () => {

  // Redux
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.user)

  // useEffect(() => {
  //   dispatch(__getUsers());
  // }, [dispatch]);

  // Router
  const navigate = useNavigate();

  // Hook
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordCon] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [check, setCheck] = useState(false);

  let [valCheck, setValCheck] = useState({
    userCheck: false,
    password: false,
    passwordConfirm: false
  });

  // console.log("checking state "+ valCheck.userCheck)
  // const [nickCheck, setNickCHeck]

  // setCheckVal({userCheck: true})
  // console.log("this is login " + valCheck.userCheck)

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(password !== "" && passwordConfirm !== "" && gender !== "" && age !== "" )
    {
      axios.post(process.env.REACT_APP_API_KEY +'users/signup', // 
    {
     "nickname": nickname,
     "password": password, 
     "passwordConfirm": passwordConfirm,
     "gender": gender,
     "age": age
    })
    .then(function (response) {
      // let token = response.headers.authorization;
      // localStorage.setItem("SavedToken", token);
      console.log(response)
      alert("회원가입이 완료 되셨습니다.")
      navigate('/login')
    })
    .catch(function (error) {
      console.log(error);
    });
    
    // console.log("회원가입이 완료 되셨습니다.")

  //   if(nickname !== "" || password !== "" || passwordConfirm !== "" || gender !== "" || age !== ""){
  //   dispatch(__addUser({
  //     "nickname": nickname,
  //     "password": password,
  //     "passwordConfirm": passwordConfirm,
  //     "gender": gender,
  //     "age": age
  //   }))
  //   navigate('/')
  // }
    console.log("로그인이 완료되었습니다.")
    }

  };

  const userValidation = () => {
    //user validation
    axios.post(process.env.REACT_APP_API_KEY + 'users/nickcheck',// 
    {
     "nickname": nickname
    })
    .then(function (response) {

      console.log("API check " + response.data.success)

      if(response.data.success === false){
       setValCheck((prev) => ({...prev, userCheck: false}));
        console.log("checking state false "+ valCheck.userCheck)
      }
      else{
        // data 있음
        // userCheck: false
        setValCheck((prev) => ({...prev, userCheck: true}));
        // userCehck: true
        console.log("사용가능")
        console.log(valCheck)
      }

    })
    .catch(function (error) {
    });

  }

  var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  // setCheck(true)

  // console.log("hello " + regExp.test("hello"))

  const checkNick = (value) => {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if(value === "" || !regExp.test(value)){
      // setCheck(true)
      return true;
    }
    else{
      // console.log("checking here " + check)
      
      return false
    }
  }

  // console.log("chekcing" + checkNick("asd"))

  return(
    <>
      <StHeader>
        <BackButton />
      </StHeader>
      {/* {console.log("checking state "+ valCheck.userCheck)} */}
      <LeftCon>
      </LeftCon>
      <MiddleCon>
        <FormCon>
          <form onSubmit={onSubmitHandler}>
            <Title>회원가입</Title>
            <InputCon>
              <Label>닉네임</Label>
              {console.log("checking checkNick fun " + checkNick(nickname))}
              {checkNick(nickname)
                ?
                <div>
                  <NotNicInputBox
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => {
                      // Getting User title input
                      setNickname(e.target.value);
                    }}
                  >
                  </NotNicInputBox>
                  {valCheck.userCheck ? <p>중복확인을 해주세요!</p> : <p>아아디는 영문자로 시작하는 6~20자 영문자 또는 숫자이여야 합니다</p>}
                </div>
                :
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
                  <CheckBtn type="button" onClick={() => { userValidation() }}>중복확인</CheckBtn>
                  {console.log("inside render check " + valCheck.userCheck)}
                  {check ? <p>사용가능한 아아디 입니다.</p> : <p>이미 사용된 아아디 입니다.</p>}
                </div>
              }

              {/* <PasswordAndConfirmPasswordValidation></PasswordAndConfirmPasswordValidation> */}

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
              {(password === passwordConfirm) ? (password === "" && passwordConfirm === "") ? <></> : <p className="correctPw"> 비밀번호가 일치합니다! </p> : <p className="incorrectPw"> 비밀번호가 일치하지 않습니다! </p>}
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
  border-color: #004e66
;
}
`;

const NotNicInputBox = styled.input`
width: 100%;
padding: 5% 0 3% 0;
border-radius: 10px;
border-style: solid;
border-color: #C0C0C0;
display:inline-block;

&:focus {
  outline: none;
  border-color: #004e66
;
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
  border-color: #ff5f2e;

  background-color: #ff5f2e;
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
  border-color: #004e66
;
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

const FormCon = styled.div`
  margin: 10% 25%;
`;
const StHeader = styled.div`
margin:15px 0 0 58%;
position:absolute;
z-index:10;
transform:scale(0.7)
`;

