import routes from "../routes";
import Video from "../models/Video"; // 컨트롤러애서 모델을 사용할수 있게 해준다.

export const home = async (req, res) => {
  // await는 성공을 보장하는 함수가 아니다. 에러가 발생해도 실행은 넘어간다. 따라서 에러를 확인하기 위해
  //try catch 문을 사용하여 에러를 핸들링 해주자.
  try {
    // async 함수는 나를 기다려주는 무언가이다.
    // await 명령어를 씀으로서 find함수가 데이터베이스로 만들어진Video문서에서 해당되는 문서를 찾을때까지 기다리라는 의미
    const videos = await Video.find({}); // {}의 의미는 오브젝트를 전부 가져와라?
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    //만약 에러가 발생한다면 아래와 같이 videos는 빈배열의 기본값을 가지고 있으므로 빈배열이 된다.
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos,
  });
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(title, description);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
