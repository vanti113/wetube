import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postDelComment,
  postRegisterView,
} from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delComment, postDelComment);

export default apiRouter;
