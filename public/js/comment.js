const commentFormHandler = async (event) => {
  event.preventDefault();

  const detail = document.querySelector("#comment-detail").value;
  const blogger_id = Number(document.querySelector("#blogger-id").textContent);

  console.log(`hey`);
  if (detail) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ detail, blogger_id }),
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
