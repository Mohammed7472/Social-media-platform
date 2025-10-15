let currentPage = 1;
let lastPage = 1;
mode = "home";
setupUI();
getPosts();

/* =========== Handle Infinite Scroll =========== */

window.addEventListener("scroll", () => {
  let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  let pageScroll = scrollTop + clientHeight >= scrollHeight - 800;
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
    for (post of posts) {
      postsContainer.innerHTML += `<div class="card shadow mb-4" style="width: 100%;">
        <div class="card-header user d-flex align-items-center justify-content-between gap-2">
          <div class="user-info" style="cursor: pointer" onclick="goToUserProfile(${
            post.author.id
          })">
            <img class=" border border-2" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
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
