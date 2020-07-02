import express from "express";

const app = express();
const router = express.Router();
const PORT = 2000;
const routes = {
  home: "/",
  user: "/user",
  userDetail: "/userDetal",
  editUser: "/editUser",
};
const homeController = (req, res) => res.send("all request is ok!");
const userControler = (req, res) => res.send("all function is ok!");
const handleListening = () => console.log(`I'm listening from port : ${PORT}`);
router.use(routes.userDetail, userControler);
router.use(routes.home, homeController);
app.use((req, res, next) => console.log("Middle"));
app.use(routes.home, (req, res) => console.log());
app.get(routes.user, router);

app.get(routes.home, (req, res, next) => res.send("HOME"));

app.listen(PORT, handleListening);
