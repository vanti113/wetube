import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtn = document.querySelectorAll("#jsDeleteBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

/*  */

const deleteComment = async (event) => {
  const {
    parentNode: { id },
  } = event.target;

  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/del/${id}`,
    method: "POST",
    data: { id },
  }); //axios는 링크에 리퀘스트 하고 그 리스폰스를 받아올수 있으니까.
  console.log(response);
  if (response.status === 200) {
    const targetNode = document.getElementById(id);
    commentList.removeChild(targetNode);
    decreaseNumber();
  }
};

/*  */

const addComment = (comment, objId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");

  const delIcon = document.createElement("i");
  const classList = ["fas", "fa-ban"];
  delIcon.classList.add(...classList);
  delIcon.addEventListener("click", deleteComment);

  /*  */

  /* const a = document.createElement("a");
  a.classList.add("del__CommentBtn");
  a.innerText = "delete";
  a.addEventListener("click", deleteComment); */

  /*  */
  span.innerText = comment;
  li.id = objId;
  li.appendChild(span);
  // li.appendChild(a);

  li.appendChild(delIcon);

  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment },
  });
  console.log(response);
  const {
    data: { objId },
  } = response;
  if (response.status === 200) {
    addComment(comment, objId);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtn.forEach((el) => {
    el.addEventListener("click", deleteComment);
  });
}

if (addCommentForm) {
  init();
}
