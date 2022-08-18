import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import styled from "styled-components";

// import img
import img from "../../img/SignUp.jpg"
import BackButton from "../../component/backButton/BackButton";

const SignUp = () => {

  // Router
  const navigate = useNavigate();

  // Hook
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordCon] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [ checkPw, setCheckPw ] = useState('');

  var booVal = false;

  let [valCheck, setValCheck] = useState({
    userCheck: false,
    password: false,
    passwordConfirm: false,
  });

  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-z]/ig);

  useEffect(() => {

    if ( password.length < 6 || password.length > 20) {
      setCheckPw(false);
    }
    else if ( password.search(/\s/) != -1 ) {
      setCheckPw(false);
    } else if ( num < 0 || eng < 0) {
      setCheckPw(false);
    } else if ( password === null ) {
      setCheckPw(false)
    }else {
      setCheckPw(true);
    }
  }, [password])

 
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (valCheck.userCheck === false){
      alert("중복확인을 해주세요!")
    }
    
    else if(password === "" && passwordConfirm === "" && gender === "" && age === "" ){
      alert("회원정보를 모두 입력해주세요")
    }
    
    else if(password !== "" && passwordConfirm !== "" && gender !== "" && age !== "" )
    {
      axios.post(process.env.REACT_APP_API_KEY +'/users/signup', // 
    {
     "nickname": nickname,
     "password": password, 
     "passwordConfirm": passwordConfirm,
     "gender": gender,
     "age": age
    })
    .then(function (response) {
  
      alert("회원가입이 완료 되셨습니다.")
      navigate('/login')
    })
    .catch(function (error) {
    });
    

    }
  };

  const userValidation = () => {
    //user validation
    axios.post(process.env.REACT_APP_API_KEY + '/users/nickcheck',// 
    {
     "nickname": nickname
    })
    .then(function (response) {


      if(response.data.success === false){
        
        // DB O
       setValCheck((prev) => ({...prev, userCheck: false}));

      }
      else{

        // DB X
        setValCheck((prev) => ({...prev, userCheck: true}));
      }

    })
    .catch(function (error) {
    });

  }

  const checkNick = (value) => {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (value === "" || !regExp.test(value)) {
      // setCheck(true)
      return true;
    }
    else{
      booVal = true
      return false

    }
  };

  const onChangleGender = (e) => {
    setGender(e.target.value)
  }

  const onChangleAge = (e) => {
    setAge(e.target.value)
  }
  return(
    <>
      <StHeader>
        <BackButton />
      </StHeader>
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
                 <CheckBtn type="button" onClick={() =>{userValidation() }}>중복확인</CheckBtn>
                 {!valCheck.userCheck?<NotCheck>ID 중복검사를 해주세요!</NotCheck>:<RightCheck>사용가능한 아아디 입니다.</RightCheck>}
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
                { (!checkPw) ? (password === "") ? <NotCheck>영문 대소문자/숫자 조합, 6자~20자를 입력해주세요!</NotCheck> : <WrongCheck>비밀번호를 형식에 맞게 작성해주세요!</WrongCheck> : <RightCheck> 올바른 비밀번호입니다! </RightCheck>}
              </InputCon>
              <InputCon>

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
                { (password === passwordConfirm) ? (password === "" && passwordConfirm === "") ? <></> : <RightCheck> 비밀번호가 일치합니다! </RightCheck> : <WrongCheck> 비밀번호가 일치하지 않습니다! </WrongCheck> }
              </InputCon>
              <InputCon>
                <Label>성별</Label>
                <label onChange={onChangleGender}>
                <input type="radio" value="남" name="gender" checked={gender === "남"} /> 남
                <input type="radio" value="여" name="gender" checked={gender === "여"}/> 여
                </label>

              </InputCon>
              <InputCon>
                <Label>나이대</Label>
                  
                <label onChange={onChangleAge}>
                <input type="radio" value="10" name="age" checked={age === "10"} /> 10대
                <input type="radio" value="20" name="age" checked={age === "20"} /> 20대
                <input type="radio" value="30" name="age" checked={age === "30"}/> 30대
                </label>
              
              </InputCon>
              <BtnCon>
                <Button type="submit">
                회가입
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
`;
const NicInputBox = styled.input`
  width: 70%;
  padding: 5% 0 3% 0;
  border-radius: 10px;
  border-style: solid;
  border-color: #c0c0c0;
  display: inline-block;

  &:focus {
    outline: none;
    border-color: #004e66;
  }
`;

const NotCheck = styled.p`
  margin: 2% 0 0 0;
  font-size: 0.9em;
`
const RightCheck = styled.p`
  margin: 2% 0 0 0;
  font-size: 0.9em;
  color: green;
`
const WrongCheck = styled.p`
  margin: 2% 0 0 0;
  font-size: 0.9em;
  color: red;
`

const CheckBtn = styled.button`
  width: 27%;
  display: inline-block;
  padding: 5% 0 3% 0;
  float: right;
  font-weight: bold;

  border-radius: 10px;
  border-style: solid;
  border-color: #ff5f2e;

  background-color: #ff5f2e;
  color: white;
`;

const InputBox = styled.input`
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

const Label = styled.div`
  font-size: 0.9em;
  font-weight: bold;
`;

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