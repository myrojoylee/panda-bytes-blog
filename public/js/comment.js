const commentFormHandler = async (event) => {
  event.preventDefault();

  const detail = document.querySelector("#comment-detail").value;
  console.log(`hey`);
  if (detail) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  } else {
    detail.textContent = `Field cannot be left blank!`;
  }

  if (response.ok) {
    document.location.replace("/post/");
  }
};

document
  .querySelector(".submitCommentBtn")
  .addEventListener("submit", commentFormHandler);
