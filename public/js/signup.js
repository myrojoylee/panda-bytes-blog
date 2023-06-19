const signupInsteadHandler = async (event) => {
  event.preventDefault();
  console.log("i got clicked");
};

document
  .querySelector("#signup-instead")
  .addEventListener("click", signupInsteadHandler);

document
  .querySelector("#login-instead")
  .addEventListener("click", signupInsteadHandler);
