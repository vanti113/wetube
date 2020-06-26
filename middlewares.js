import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    //이건 가짜 변수이다. 나중에 수정 예정
    isAuthenticated: true,
    id: 1,
  };
  next();
};
