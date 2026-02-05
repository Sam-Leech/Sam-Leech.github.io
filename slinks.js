const popup = document.getElementById("addLinkPopup");
const saveBtn = document.getElementById("saveLink");

// OPEN POPUP WHEN + BUTTON IS CLICKED
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-button")) {
        popup.style.display = "flex";
    }
});

// SAVE LINK
saveBtn.onclick = () => {
    const name = document.getElementById("linkName").value;
    const url = document.getElementById("linkURL").value;

    if (!name || !url) return;

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];
    links.push({ name, url });
    localStorage.setItem("customLinks", JSON.stringify(links));

    popup.style.display = "none";
    renderCustomLinks();
};

// RENDER LINKS
function renderCustomLinks() {
    const container = document.querySelector(".custom-links");
    container.innerHTML = "";

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach(link => {
        const div = document.createElement("div");
        div.className = "small-box";
        div.textContent = link.name;
        div.onclick = () => window.location.href = link.url;
        container.appendChild(div);
    });

    // ADD THE + BUTTON BACK
    const addBtn = document.createElement("div");
    addBtn.className = "small-box add-button";
    addBtn.textContent = "+";
    container.appendChild(addBtn);
}

function renderCustomLinks() {
    const container = document.querySelector(".custom-links");
    container.innerHTML = "";

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach((link, index) => {
      const div = document.createElement("div");
      div.className = "small-box";

      // favicon
      const icon = document.createElement("img");
      icon.className = "favicon";
      icon.src = `https://www.google.com/s2/favicons?domain=${link.url}&sz=64`;

      // link text
      const text = document.createElement("span");
      text.textContent = link.name;

      // delete button
      const del = document.createElement("div");
      del.className = "delete-btn";
      del.textContent = "×";
      del.onclick = (e) => {
          e.stopPropagation();
          deleteLink(index);
      };

      div.appendChild(icon);
      div.appendChild(text);
      div.appendChild(del);

      div.onclick = () => window.location.href = link.url;

      container.appendChild(div);
  });


    // add the + button back
    const addBtn = document.createElement("div");
    addBtn.className = "small-box add-button";
    addBtn.textContent = "+";
    container.appendChild(addBtn);
}
function deleteLink(index) {
    const links = JSON.parse(localStorage.getItem("customLinks")) || [];
    links.splice(index, 1);
    localStorage.setItem("customLinks", JSON.stringify(links));
    renderCustomLinks();
}

renderCustomLinks();

popup.style.display = "none";

popup.addEventListener("click", e => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});
links.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "small-box";

    // link text
    const text = document.createElement("span");
    text.textContent = link.name;

    // delete button
    const del = document.createElement("div");
    del.className = "delete-btn";
    del.textContent = "×";
    del.onclick = (e) => {
        e.stopPropagation(); // stops click from opening the link
        deleteLink(index);
    };

    div.appendChild(text);
    div.appendChild(del);

    div.onclick = () => window.location.href = link.url;
    container.appendChild(div);
});
