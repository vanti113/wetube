import mongoose from "mongoose";
import dotenv from "dotenv"; // dotenv를 임포트하고 따로 만든 파일에서 정보를 불러온다. 이때 필요한 것은
dotenv.config();

//몽고디비와의 연결은 다음과 같이 진행한다. 옵션들은 크게 신경쓰지 말고 그냥 같이 적어 넣는다.
mongoose.connect(process.env.MONGO_URL, {
  // 왼쪽의 process.env.키 형식으로 env파일 내부의 중요한 정보를 참조가능하게 된다.
  useNewUrlParser: true,
  useFindAndModify: false,
});

// 몽고디비 와의 연결을 변수에 저장해 놓는다.
const db = mongoose.connection;

//아래의 구문은 한번만 디비에 커넥션을 열어준다. 이때 핸들링 함수가 준비된 동작을 하게 되어있다.
//db.on에 대해서 자세히는 모르지만, 이 함수는 에러를 핸들링하는 것 같다. 인수로 스트링으로 된 옵션과,
//핸들러함수를 가지고 있고, 에러는 error변수에 담겨서 리포팅되게 되어있다.
const handleOpen = () => console.log("✅ Connected To DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection : ${error}`);
db.once("open", handleOpen);
db.on("error", handleError);
