const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const detail = document.querySelector("#post-detail").value.trim();

  console.log("do we get here ?");

  if (title && detail) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, detail }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(error);
      alert("Failed to create post");
    }
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-title").value;
  const detail = document.querySelector("#update-detail").value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(id);
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      detail,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Failed to edit post");
  }
};

const deletePostHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    console.log(id);
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

document
  .querySelectorAll(".updateBtn")
  .forEach((btn) => btn.addEventListener("click", updatePostHandler));

document
  .querySelectorAll(".deleteBtn")
  .forEach((btn) => btn.addEventListener("click", deletePostHandler));

// let username = [];
// let blurb = document.querySelector(".blurb");
// const currentUser = document.createElement("p");
// blurb.appendChild(currentUser);
// currentUser.textContent = username[0];

// function captureUsername() {
//   // let postList = document.querySelectorAll(".numbered-post");
//   // let checkLogin = document.querySelectorAll(".nav");

//   // checks dashboard for name and puts to variable
//   let currentUser = document.querySelector(".current-user").textContent;
//   username.push(currentUser);
//   console.log(username);
//   return username;
// }

// captureUsername();
