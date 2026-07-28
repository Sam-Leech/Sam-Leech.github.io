// POPUP + OVERLAY
const popup = document.getElementById("addLinkPopup");
const overlay = document.getElementById("popupOverlay");
const saveBtn = document.getElementById("saveLink");

// OPEN POPUP
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-button")) {

        document.getElementById("linkName").value = "";
        document.getElementById("linkURL").value = "";

        popup.classList.add("active");
        overlay.classList.add("active");
    }
});

// CLOSE POPUP
overlay.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
});

// RENDER LINKS
function renderCustomLinks() {

    const container = document.querySelector(".custom-links");

    if (!container) return;

    container.querySelectorAll(".saved-link").forEach(link => link.remove());

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach((link, index) => {

        const href = link.url.startsWith("http")
            ? link.url
            : "https://" + link.url;

        const box = document.createElement("a");
        box.className = "small-box saved-link";
        box.href = href;
        box.target = "_blank";
        box.style.textDecoration = "none";
        box.style.color = "inherit";

        // favicon
        const img = document.createElement("img");
        img.className = "favicon";
        img.src = `https://www.google.com/s2/favicons?domain=${new URL(href).hostname}&sz=64`;

        img.onerror = function () {
            this.style.display = "none";
        };

        // name
        const span = document.createElement("span");
        span.textContent = link.name;

        // delete button
        const del = document.createElement("div");
        del.className = "delete-btn";
        del.textContent = "×";

        del.addEventListener("click", (e) => {

            e.preventDefault();
            e.stopPropagation();

            const links = JSON.parse(localStorage.getItem("customLinks")) || [];

            links.splice(index, 1);

            localStorage.setItem("customLinks", JSON.stringify(links));

            renderCustomLinks();
        });

        box.appendChild(img);
        box.appendChild(span);
        box.appendChild(del);

        container.insertBefore(
            box,
            container.querySelector(".add-button")
        );
    });
}

// SAVE LINK
saveBtn.addEventListener("click", () => {

    let name = document.getElementById("linkName").value.trim();
    let url = document.getElementById("linkURL").value.trim();

    if (!name || !url) return;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.push({ name, url });

    localStorage.setItem("customLinks", JSON.stringify(links));

    popup.classList.remove("active");
    overlay.classList.remove("active");

    renderCustomLinks();
});

// STARTUP
document.addEventListener("DOMContentLoaded", () => {

    renderCustomLinks();

    // Greeting
    let deviceName = localStorage.getItem("deviceName");

    if (!deviceName) {

        deviceName = prompt("What would you like to be called?");

        if (deviceName && deviceName.trim() !== "") {
            localStorage.setItem("deviceName", deviceName);
        } else {
            deviceName = "User";
        }
    }

    const hour = new Date().getHours();

    let greeting = "Hello";

    if (hour < 12)
        greeting = "Good morning";
    else if (hour < 18)
        greeting = "Good afternoon";
    else
        greeting = "Good evening";

    document.getElementById("greetingText").textContent =
        `${greeting}, ${deviceName}`;

    // Clock
    function updateTime() {

        document.getElementById("timeText").textContent =
            new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
    }

    updateTime();
    setInterval(updateTime, 1000);

});
