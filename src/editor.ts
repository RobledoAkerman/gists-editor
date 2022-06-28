export function init() {
  const div = document.querySelector(".root");

  div.innerHTML = `
    <h1 class="title">Gists Editor</h1>
    <div class="token-container">
    <form class="token-form">
      <input 
        name="token" 
        class="token-input" 
        type="password" 
        placeholder="New token"
      />
      <button class="token-save">Save</button>
    </form>
    <button class="token-delete">Delete</button>
    </div>
    <form class="form">
      <input
        name="description"
        class="description"
        type="text"
        placeholder="Gist Description"
      />
      <input
        name="filename"
        class="filename"
        type="text"
        placeholder="Filename including extension"
      />
      <textarea
        name="code"
        class="code"
        type="text"
        placeholder="Code"
      ></textarea>
      <button class="button">Create Secret Gist</button>
    </form>
    `;

  //   const buttonSave = div.querySelector(".token-save");

  const formToken = div.querySelector(".token-form");
  formToken.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());
    const tokenValue = value.token;

    localStorage.setItem("token", tokenValue.toString());
  });

  const buttonDelete = div.querySelector(".token-delete");
  buttonDelete.addEventListener("click", () => {
    localStorage.removeItem("token");
  });

  const formEl = div.querySelector(".form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    const token = localStorage.getItem("token");
    // const token = value.token;
    const description = value.description;
    const filename = value.filename;
    const code = value.code;

    console.log(
      " Description :" +
        description +
        " Filename: " +
        filename +
        " Code: " +
        code
    );

    fetch("https://api.github.com/gists", {
      method: "post",
      headers: {
        "Authorization": "token " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `{
      "description": "${description}",  
      "files":{
        "${filename}":{
            "content":"${code}"
        }
    }
}
`,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
}
