const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const detail = document.querySelector("#post-detail").value.trim();

  console.log("do we get here ?");
  console.log(title);
  console.log(detail);
  if (title && detail) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, detail }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const updateFormHandler = async (event) => {
  event.preventDefault();

  // const title = document.querySelector("#post-title").value;
  // const detail = document.querySelector("#post-detail").value;
  if (event.target.hasAttribute("data-id")) {
    const id = event.targt.getAttribute("data-id");
    const response = await fetch(`api/posts/${id}`, {
      method: "GET",
    });

    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

const deleteBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".submitBtn").addEventListener("click", newFormHandler);

document
  .querySelector("#post-detail")
  .addEventListener("click", console.log("got clicked!"));
