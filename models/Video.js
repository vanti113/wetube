import mongoose from "mongoose";

//mongdoDB에서는 모든게 스키마로부터 정의된다. 따라서 스키마의 형태를 정의해 둘 필요가 있다. 아래파일을 참고하자.

const VideoSchema = new mongoose.Schema({
  // 아래의 내용은SQL에서 테이블 정의시 사용하는 규칙과 일맥상통한다. 즉, 스키마의 특성과 요구사항을 정의하는 것이다.
  fileUrl: {
    type: String,
    required: "File URL is required", // 이옵션은 fileURL에 요구사항을 정의하고, 만약 없을경우 오른쪽 에러 메세지를 출력하는 것이다.
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

//이제 위에서 만들어 둔 스키마로 문서를 만든다. 아래는 데이터베이스 내에서 쓰일 문서를 만드는 과정이다.
//이 문서는 데이터베이스에서의 테이블 역할을 할것이며, 테이블 명은 Video, 테이블 컬럼의 정의는 옆의 VideoSchema가 할것이다.

const model = mongoose.model("Video", VideoSchema);

export default model; //이제 만든 몽고디비 문서(테이블)을 외부로 반출하자.
// 그리고 init파일에서 이 모델을 인식시켜야 한다.
