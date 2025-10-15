getSelectedPost();

function getSelectedPost() {
  toggleLoader(true);
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("postId");
  axios.get(`${baseUrl}/posts/${postId}`).then((response) => {
    toggleLoader(false);
    let post = response.data.data;
    let allComments = "";
    for (comment of post.comments) {
      allComments += `<div class="p-3 my-2" style="background-color: #2196f33b;">
      <div class="comment-author d-flex align-items-center gap-3">
        <img class=" border border-2" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
        src="${comment.author.profile_image}">
        <b class="username">${comment.author.username}</b>
      </div>
      <p class="comment-body my-2">${comment.body}</p>
      </div>
   `;
    }
    document.querySelector(".post").innerHTML = `
      <h2 class="my-3">${post.author.username} Post</h2>
    <div class="card shadow mb-4" style="width: 100%;">
    <div class="card-header user d-flex align-center align-items-center gap-2">
      <img class=" border border-2" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
        src="${post.author.profile_image}">
      <b class="username">${post.author.username}</b>
    </div>
    <div class="card-body" onclick="postClicked(${post.id})">
      <img src="${post.image}" class="card-img-top" alt="post-img">
      <span class="time">${post.created_at}</span>
      <h5 class="card-title mt-2">${post.title !== null ? post.title : ""}</h5>
      <p class="card-text">${post.body}</p>
    </div>
     <div class="card-footer">
     <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
       <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>
      <span class="count"> (${post.comments_count}) Comments</span>
     </div>
    </div>
    <div class="comments py-2" style="border-top: 1px solid #dee2e6">
    <div class="content">${allComments}</div>
    ${
      userLoggedIn()
        ? `<div class="add-comment input-group" style="width: 98%; margin: 20px auto;">
    <input type="text" class="comment-input form-control" placeholder="add your comment.." >
   <button class="btn btn-outline-primary" type="button" onclick="addNewComment(${post.id})">Send</button>
  </div>`
        : ""
    }
     </div>
  </div>`;
  });
}

function addNewComment(postId) {
  toggleLoader(true);
  let commentBody = document.querySelector(".comment-input").value;
  let params = {
    body: commentBody,
  };
  axios
    .post(`${baseUrl}/posts/${postId}/comments`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      showAlert("The comment has been created successfully.", "success");
      closeAlert("specialAlert");
      getSelectedPost();
    })
    .catch((error) => {
      let message = error.response.data.message;
      showAlert(message, "danger");
      closeAlert();
    })
    .then(() => {
      toggleLoader(false);
    });
}
