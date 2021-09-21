document.getElementById("get-text").addEventListener("click", getText);
document.getElementById("get-users").addEventListener("click", getUsers);
document.getElementById("get-posts").addEventListener("click", getPosts);
document.getElementById("add-post").addEventListener("submit", addPost);

const output = document.getElementById("output");

document.addEventListener("DOMContentLoaded", clearFields);

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
}

// regular fetch
function getText() {
  fetch("sample.txt")
    .then(res => res.text())
    .then(data => {
      output.innerHTML = "";

      let title = document.createElement("h2");
      title.textContent = "Text Fetched";
      title.className = "mb-2 mt-2 text-center";
      output.appendChild(title);

      let text = document.createElement("p");
      text.textContent = `${data}`;
      text.className = "text-center";

      output.appendChild(text);
    })
    .catch(err => console.log(err));
}

// using async & await
function getUsers() {

  async function fetchUsers() {
    const res = await fetch("users.json");
    if (res.status === 200) return await res.json();
    else throw new Error("error fetchUsers");
  }

  fetchUsers()
  .then(data => {
    output.innerHTML = "";

    let title = document.createElement("h2");
    title.className = "mb-2 mt-2 text-center";
    title.textContent = "Users Fetched";
    output.appendChild(title);

    data.forEach(user => {
      let userList = document.createElement("ul");
      userList.className = "list-group mb-2";

      userList.innerHTML = `
        <li class="list-group-item">Id: ${user.id}</li>
        <li class="list-group-item">Name: ${user.name}</li>
        <li class="list-group-item">E-mail: ${user.email}</li>
      `;

      output.appendChild(userList);
    });
  })
  .catch(err => console.log(err));
}

function getPosts() {
  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (res.status === 200) return await res.json();
    else throw new Error("error fetchPosts");
  }

  fetchPosts()
  .then(data => {
    output.innerHTML = "";

    let title = document.createElement("h2");
    title.className = "mb-2 mt-2 text-center";
    title.textContent = "Posts Fetched";
    output.appendChild(title);

    data.forEach(post => {
      let postList = document.createElement("div");
      postList.className = "card card-body mb-2";

      postList.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;

      output.appendChild(postList);
    });
  })
  .catch(err => console.log(err));
}

function addPost(e) {
  e.preventDefault();
  
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      // "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json: charset=UTF-8"
    },
    body: JSON.stringify({title, body})
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const alert = document.createElement("div");
    alert.textContent = `New post "${title}" was added to the database (not exactly)!`;
    alert.className = "alert alert-success mt-2";
    
    output.parentElement.insertBefore(alert, output);

    // This is a DOM event {event loop}
    setTimeout(() => alert.remove(), 3000);
    
    clearFields();
  })
  .catch(err => console.log(err));
}
