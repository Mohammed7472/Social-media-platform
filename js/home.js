let currentPage = 1;
let lastPage = 1;
mode = "home";
setupUI();
getPosts();

/* =========== Handle Infinite Scroll =========== */

window.addEventListener("scroll", () => {
  let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  let pageScroll = scrollTop + clientHeight >= scrollHeight - 1200;
  if (pageScroll && currentPage < lastPage) {
    getPosts(++currentPage, false, 4);
  }
});

/* ==== Posts ==== */

function getPosts(page = 1, reload = true, limit = 6) {
  toggleLoader(true);
  axios.get(`${baseUrl}/posts?limit=${limit}&page=${page}`).then((response) => {
    toggleLoader(false);
    lastPage = response.data.meta.last_page;
    let posts = response.data.data;
    if (reload) {
      postsContainer.innerHTML = "";
    }
    let user = JSON.parse(localStorage.getItem("user"));

    for (post of posts) {
      let btns = "";
      if (user !== null) {
        if (user.id === post.author.id) {
          btns = `<div class="btns">
          <button class="btn btn-secondary" onclick="editBtnClicked('${encodeURIComponent(
            JSON.stringify(post)
          )}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg></button>
          <button class="btn btn-danger" onclick="deleteBtnClicked(${
            post.id
          })"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
           <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg></button>
          </div>`;
        }
      }
      postsContainer.innerHTML += `<div class="card shadow mb-4" style="width: 100%;">
        <div class="card-header user d-flex align-items-center justify-content-between gap-2">
          <div class="user-info" style="cursor: pointer" onclick="goToUserProfile(${
            post.author.id
          })">
            <img class=" border border-2" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
            src="${post.author.profile_image}">
           <b class="username">${post.author.username}</b>
          </div>
          ${btns !== null ? btns : ""}
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

let postId;

function goToUserProfile(userId) {
  window.location = `profile.html?userId=${userId}`;
}
