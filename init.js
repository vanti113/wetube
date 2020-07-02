import app from "./app";
import "./db";
import dotenv from "dotenv";
import "./models/Video"; //models에서 만들었던 video데이터베이스를 인식시킨다.
dotenv.config(); //  이 명령어는 dotenv의 파일로부터 키 : 밸류 형태로 데이터를 가져올수 있게 허락한다.
const PORT = process.env.PORT || 4000; // 왼쪽과 같이, 포트번호는 process.env 형식으로 뒤에 키를 붙여서 객체활용 형식처럼 사용이 가능하게 된다.

const handleListening = () =>
  console.log(`✅Listening on : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
