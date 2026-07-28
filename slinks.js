function renderCustomLinks() {

    const container = document.querySelector(".custom-links");

    if (!container) return;

    // Remove old links but keep the + button
    container.querySelectorAll(".saved-link").forEach(link => link.remove());

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach((link, index) => {

        const box = document.createElement("a");
        box.className = "small-box saved-link";
        box.href = link.url.startsWith("http") ? link.url : "https://" + link.url;
        box.target = "_blank";
        box.style.textDecoration = "none";
        box.style.color = "inherit";

        // Favicon
        const img = document.createElement("img");
        img.className = "favicon";
        img.src = `https://www.google.com/s2/favicons?domain=${new URL(box.href).hostname}&sz=64`;

        // Name
        const span = document.createElement("span");
        span.textContent = link.name;

        // Delete button
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

        container.insertBefore(box, container.querySelector(".add-button"));
    });
}
