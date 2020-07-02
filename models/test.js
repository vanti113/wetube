const obj = {
  jack: "jack",
  team: null,
};

//대입식 삼항 연산자.
const name = obj.team
  ? console.log("my name is jack")
  : console.log("i have no name");
