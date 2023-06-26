// fetches data from the form and processes data
const commentFormHandler = async (event) => {
  event.preventDefault();

  const detail = document.querySelector("#comment-detail").value;
  const blogger_id = document.querySelector("#current-user").textContent;
  const post_id = document.querySelector("#numbered-post").textContent;

  console.log(`hey`);
  if (detail) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ blogger_id, post_id, detail }),
      headers: { "Content-Type": "application/json" },
    });

    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    console.log(id);
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      detail.textContent = `Field cannot be left blank!`;
    }
  }
};

document
  .querySelector(".submitCommentBtn")
  .addEventListener("click", commentFormHandler);
