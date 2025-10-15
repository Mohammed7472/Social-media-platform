mode = "profile";
getUser();
getUserPosts();

// Extract User Id From The URL Search Params
function getUserId() {
  let currentUser = JSON.parse(localStorage.getItem("user"));
  let urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("userId");
  userId = userId !== null ? userId : currentUser.id;
  return userId;
}

function getUser() {
  toggleLoader(true);
  let userId = getUserId();
  let userPostsContainer = document.querySelector(".user-posts");
  axios.get(`${baseUrl}/users/${userId}`).then((response) => {
    toggleLoader(false);
    let user = response.data.data;
    document.querySelector(
      "#user-info"
    ).innerHTML = `<div class="card shadow rounded">
    <div class="card-body">
          <div class="row justify-content-around">
            <div class="col-2">
              <img src="${user.profile_image}"
                style="width: 180px; height: 180px; border: 3px solid grey;" class="rounded-circle">
            </div>

            <div class="main-info col-4 d-flex flex-column justify-content-evenly"
              style="font-size: 20px; font-weight: 500">
              <p>${user.email}</p>
              <p>${user.name}</p>
              <p>${user.username}</p>
            </div>

            <div class="col-3 d-flex flex-column justify-content-evenly" style="color: rgb(172, 172, 172)">
              <div class="count-info">
                <span class="posts-count" style="font-size: 50px; color: #000">${user.posts_count}</span>
                posts
              </div>
              <div class="count-info">
                <span class="comments-count" style="font-size: 50px; color: #000">${user.comments_count}</span>
                comments
              </div>
            </div>
          </div>
        </div>
        </div>`;
    document.querySelector(
      ".main-title"
    ).innerHTML = `${user.username}'s Posts`;
  });
}

function getUserPosts() {
  toggleLoader(true);
  let userId = getUserId();
  axios.get(`${baseUrl}/users/${userId}/posts`).then((response) => {
    toggleLoader(false);
    let posts = response.data.data;
    let userPostDiv = document.querySelector(".user-posts");
    userPostDiv.innerHTML = "";
    for (post of posts) {
      userPostDiv.innerHTML += `<div class="card shadow mb-4" style="width: 100%;">
        <div class="card-header user d-flex align-items-center justify-content-between gap-2">
          <div class="user-info">
            <img class=" border border-2" style="width: 40px; height: 40px; border-radius: 50%;"
            src="${post.author.profile_image}">
           <b class="username">${post.author.username}</b>
          </div>
          ${showEditAndDeleteBtns(post)}
        </div> 
        <div class="card-body" style="cursor: pointer" onclick="postClicked(${
          post.id
        })">
          <img src="${post.image}" class="card-img-top" alt="post-img">
          <span class="time">${post.created_at}</span>
          <h5 class="card-title mt-2">${
            post.title !== null ? post.title : ""
          }</h5>
          <p class="card-text">${post.body}</p>
        </div>
         <div class="card-footer d-flex align-items-center justify-content-between">
         <div class="comments">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
           <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>
          <span class="count"> (${post.comments_count}) Comments</span>
         </div>
         <div class="tags">
         ${
           post.tags.length > 0
             ? post.tags.forEach(
                 (tag) =>
                   `<span class="btn btn-secondary btn-sm rounded-5">${tag.name}</span>`
               )
             : ""
         }
         </div>
        </div>
      </div>`;
    }
  });
}
