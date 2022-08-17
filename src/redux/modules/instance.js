import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_KEY, // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});
const token = localStorage.getItem("SavedToken");
instance.defaults.headers.common["Authorization"] = token ? `${token}` : null;
=======
baseURL: process.env.REACT_APP_API_KEY, // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});
const token = localStorage.getItem("SavedToken");
instance.defaults.headers.common["Authorization"] = token
? `${token}`
: null;
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.defaults.headers.common["Authorization"] = USER_TOKEN;

<<<<<<< HEAD
export default instance;
=======
export default instance;
>>>>>>> 388d16617d4f8ab68b43e4c7155e22b3f3470bb9
