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

const updateFormHandler = async (event) => {
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
    document.location.replace(`/post/${id}`);
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

const updateOrComment = async (req) => {
  console.log(username);
  // const id = event.target.getAttribute("data-id");
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
  });
  console.log(response);
};
// document
//   .querySelector(".new-post-form")
//   .addEventListener("submit", newFormHandler);

// document.querySelectorAll(".post-card").forEach((post) =>
//   post.addEventListener("click", function () {
//     console.log(`hey`);
//   })
// );

document
  .querySelectorAll(".deleteBtn")
  .forEach((btn) => btn.addEventListener("click", deletePostHandler));

// document.querySelectorAll("a").forEach((link) => {
//   link.addEventListener("click", (e) => {
//     console.log(hello);
//   });
// });

// let user = document.querySelector("#current-user").textContent;
// console.log(user);
let username = [];
let blurb = document.querySelector(".blurb");
const currentUser = document.createElement("p");
blurb.appendChild(currentUser);
currentUser.textContent = username[0];

function captureUsername() {
  // let postList = document.querySelectorAll(".numbered-post");
  // let checkLogin = document.querySelectorAll(".nav");

  // checks dashboard for name and puts to variable
  let currentUser = document.querySelector(".current-user").textContent;
  username.push(currentUser);
  console.log(username);
  return username;
}

captureUsername();
