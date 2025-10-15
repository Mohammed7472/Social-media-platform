const baseUrl = "https://tarmeezacademy.com/api/v1";
let mode = "home";

let postsContainer = document.querySelector(".posts");
let loginBtn = document.querySelector("#loginModal #login");
let createBtn = document.querySelector(".create-btn");

let userBtns = document.querySelector(".user-btns");
setupUI();

/* ==== Posts ==== */
function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`;
  setupUI();
}

/* ==== User Auths ==== */

function login() {
  toggleLoader(true);
  let params = {
    username: document.querySelector("#loginModal #log-username").value,
    password: (password = document.querySelector(
      "#loginModal #log-password"
    ).value),
  };
  axios
    .post(`${baseUrl}/login`, params)
    .then((response) => {
      let message = `You are Logged in successfully.`;
      let userData = response.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      hideModal("loginModal");
      showAlert(message, "success");
      setupUI();
      createBtn.style.display = "flex";
      getPosts();
    })
    .catch((error) => {
      let message = `${error.response.data.message}`;
      showAlert(message, "danger");
    })
    .then(() => {
      closeAlert();
      toggleLoader(false);
    });
}

function register() {
  let username = document.querySelector("#registerModal #username").value;
  let password = document.querySelector("#registerModal #password").value;
  let email = document.querySelector("#registerModal #email").value;
  let name = document.querySelector("#registerModal #name").value;
  let image = document.querySelector("#registerModal #user-image").files[0];

  // Form Data (To Send Files [Image as a File])
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("name", name);
  formData.append("image", image);
  toggleLoader(true);
  axios
    .post(`${baseUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      let userData = response.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      showAlert(`You have been successfully registered.`, "success");
      hideModal("registerModal");
      setupUI();
    })
    .catch((error) => {
      let message = `${error.response.data.message}`;
      showAlert(`${message}`, "danger");
    })
    .then(() => {
      closeAlert();
      toggleLoader(false);
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  let message = `You You are Logged out successfully.`;
  showAlert(message, "success");
  setupUI();
  closeAlert();
  mode === "home" ? getPosts() : (window.location = `index.html`);
}

/* ==== UI  ==== */

function setupUI() {
  if (localStorage.getItem("token") !== null) {
    let user = JSON.parse(localStorage.getItem("user"));
    userBtns.innerHTML = `<div>
         <img class=" border border-2 rounded-circle" style="width: 35px; height: 35px; cursor: pointer;"
          src="${user.profile_image}">
       <b class="username" style="margin: 0 10px;">${user.username}</b>
     <button type="button" class="btn btn-outline-danger" onclick="logout()">logout</button>  
    </div>`;
    if (createBtn !== null) {
      createBtn.style.display = "flex";
    }
    document.querySelector(".nav-item .profile-link").href = "profile.html";
  } else {
    userBtns.innerHTML = `<div class="user-btns d-flex justify-content-end gap-2">
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Login
      </button>
      <button type="button" class="btn btn-outline-success" data-bs-toggle="modal"
        data-bs-target="#registerModal">
        Register
      </button>
    </div>`;
    if (createBtn !== null) {
      createBtn.style.display = "none";
    }
    document.querySelector(".nav-item .profile-link").href = "#";
  }
}

/* ==== Modals And Alerts ==== */

function hideModal(modalId) {
  const modal = document.getElementById(`${modalId}`);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
}

function showAlert(message, type) {
  let alertPlaceholder = document.getElementById("specialAlert");
  if (alertPlaceholder == null) {
    alertPlaceholder = document.createElement("div");
    alertPlaceholder.id = "specialAlert";
    document.querySelector(".alerts").appendChild(alertPlaceholder);
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}

function closeAlert(alertId = "specialAlert") {
  setTimeout(() => {
    let alert = bootstrap.Alert.getOrCreateInstance(
      document.getElementById(alertId)
    );
    alert.close();
  }, 3000);
}

function userLoggedIn() {
  if (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("user") !== null
  ) {
    return true;
  } else {
    return false;
  }
}

/* ====== Actions [Create |Delete | Update] */

function createBtnClicked() {
  showModal("postModal");
  document.getElementById("postModal").classList.add("create-modal");
  document.querySelector("#postModal .action-btn").innerHTML = "create";
  document.querySelector("#postModal .modal-title").innerHTML =
    "Create A New Post";
  document.querySelector("#postModal #post-title").value = "";
  document.querySelector("#postModal #post-body").value = "";
  document.querySelector("#postModal #post-image").files[0] = "";
}

function createNewPost() {
  isCreate = document
    .getElementById("postModal")
    .classList.contains("create-modal");
  let title = document.querySelector("#postModal #post-title").value;
  let body = document.querySelector("#postModal #post-body").value;
  let image = document.querySelector("#postModal #post-image").files[0];
  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);
  let headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  let url = `${baseUrl}/posts`;
  if (isCreate) {
    url = `${baseUrl}/posts`;
  } else {
    formData.append("_method", "put");
    url = `${baseUrl}/posts/${postId}`;
  }
  toggleLoader(true);
  axios
    .post(url, formData, { headers })
    .then((response) => {
      let message = isCreate
        ? "New Post Has Been Created."
        : "Post Has Been Updated.";
      showAlert(message, "success");
      hideModal("postModal");
      mode === "home" ? getPosts() : getUserPosts();
    })
    .catch((error) => {
      let meessage = error.response.data.message;
      showAlert(meessage, "danger");
    })
    .then(() => {
      closeAlert("specialAlert");
      toggleLoader(false);
    });
}

function editBtnClicked(postJSON) {
  showModal("postModal");
  document.getElementById("postModal").classList.remove("create-modal");
  document.querySelector("#postModal .action-btn").innerHTML = "update";
  const post = JSON.parse(decodeURIComponent(postJSON));
  document.querySelector("#postModal .modal-title").innerHTML = "Update Post";
  document.querySelector("#postModal #post-title").value = post.title;
  document.querySelector("#postModal #post-body").value = post.body;
  document.querySelector("#postModal #post-image").files[0] = post.image;
  postId = post.id;
}

function deleteBtnClicked(id) {
  showModal("deletePostModal");
  postId = id;
}

function deletePost() {
  toggleLoader(true);
  axios
    .delete(`${baseUrl}/posts/${postId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      showAlert("The Post Deleted Successfully.", "success");
      mode === "home" ? getPosts() : getUserPosts();
    })
    .catch((error) => {
      let message = error.response.data.message;
      showAlert(message, "danger");
    })
    .then(() => {
      hideModal("deletePostModal");
      closeAlert("specialAlert");
      toggleLoader(false);
    });
}

function showModal(modalId) {
  let postModal = new bootstrap.Modal(document.getElementById(`${modalId}`));
  postModal.toggle();
}

/* ============ Loader =============== */

function toggleLoader(show = true) {
  document.getElementById("loader").style.display = show ? "block" : "none";
}
