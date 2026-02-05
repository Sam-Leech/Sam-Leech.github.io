/* -----------------------------------
   PAGE FADE-IN
----------------------------------- */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/* -----------------------------------
   SIDEBAR TOGGLE
----------------------------------- */
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

/* -----------------------------------
   DARK MODE (with persistence)
----------------------------------- */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

/* -----------------------------------
   CUSTOM LINKS: RENDER + DELETE
----------------------------------- */
function renderCustomLinks() {
    const container = document.querySelector(".custom-links");
    container.innerHTML = "";

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach((link, index) => {
        const div = document.createElement("div");
        div.className = "small-box";

        const icon = document.createElement("img");
        icon.className = "favicon";
        icon.src = `https://www.google.com/s2/favicons?domain=${link.url}&sz=64`;

        const text = document.createElement("span");
        text.textContent = link.name;

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

        // Middle-click support
        div.addEventListener("mousedown", (e) => {
            if (e.button === 1) {
                e.preventDefault();
                window.open(link.url, "_blank");
            }
        });

        // Left-click support
        div.addEventListener("click", () => {
            window.open(link.url, "_blank");
        });

        container.appendChild(div);
    });

    // Add button
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

/* -----------------------------------
   POPUP + OVERLAY (fade-in/out)
----------------------------------- */
const popup = document.getElementById("addLinkPopup");
const overlay = document.getElementById("popupOverlay");
const saveBtn = document.getElementById("saveLink");

// OPEN POPUP
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-button")) {

        // Clear fields every time
        document.getElementById("linkName").value = "";
        document.getElementById("linkURL").value = "";

        popup.classList.add("active");
        overlay.classList.add("active");
    }
});

// CLOSE POPUP WHEN CLICKING OUTSIDE
overlay.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
});

// SAVE LINK
saveBtn.onclick = () => {
    const name = document.getElementById("linkName").value;
    const url = document.getElementById("linkURL").value;

    if (!name || !url) return;

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];
    links.push({ name, url });
    localStorage.setItem("customLinks", JSON.stringify(links));

    popup.classList.remove("active");
    overlay.classList.remove("active");

    renderCustomLinks();
};

/* -----------------------------------
   INITIAL RENDER
----------------------------------- */
renderCustomLinks();
