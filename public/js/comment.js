const commentFormHandler = async (event) => {
  event.preventDefault();

  const detail = document.querySelector("#comment-detail").value;
  console.log(`hey`);
  if (detail) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ detail }),
      headers: { "Content-Type": "application/json" },
    });

    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 2
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