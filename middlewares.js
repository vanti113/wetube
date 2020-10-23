import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import awsSDK from "aws-sdk";

const s3 = new awsSDK.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-1",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "baekigun/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "baekigun/avartar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //유저가 등록하게 되거나 로그인 하면 이 로컬변수가 작동한다.
  console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  //로그아웃 상태여야만 접근을 허용하는 미들웨어.
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
  //만약 로그인한 유저가 조인이나 비로그인유저가 접근이 가능한 곳에 가려 한다면 자동으로 홈화면으로 가게 될것.
};

export const onlyPrivate = (req, res, next) => {
  //오직 로그인한 사용자 만이 접근가능하고, 유저가 아니면 접근이 불가능하게 하는 미들웨어. 위에와 반대다.
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
