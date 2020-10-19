import routes from "../routes";
import Video from "../models/Video"; // 컨트롤러애서 모델을 사용할수 있게 해준다.
import Comment from "../models/Comment"; // 컨트롤러애서 모델을 사용할수 있게 해준다.

export const home = async (req, res) => {
  // await는 성공을 보장하는 함수가 아니다. 에러가 발생해도 실행은 넘어간다. 따라서 에러를 확인하기 위해
  //try catch 문을 사용하여 에러를 핸들링 해주자.
  try {
    // async 함수는 나를 기다려주는 무언가이다.
    // await 명령어를 씀으로서 find함수가 데이터베이스로 만들어진Video문서에서 해당되는 문서를 찾을때까지 기다리라는 의미
    const videos = await Video.find({}).sort({ _id: -1 }); // {}의 의미는 오브젝트를 전부 가져와라?
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);

    //만약 에러가 발생한다면 아래와 같이 videos는 빈배열의 기본값을 가지고 있으므로 빈배열이 된다.
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
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
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log(title, description);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
    .populate("creator")
    .populate("comments");
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views = video.views + 1;
    video.save(); //도큐먼트의 변경점을 저장해 준다. 몽고디비에 저장된다.
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

//Add Comment

export const postAddComment = async(req,res)=>{
  const {
    params: { id },
    body : {comment},
    user,
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
    
  }finally{
    res.end();
  }


}