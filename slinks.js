// RENDER SAVED LINKS
function renderCustomLinks() {

    const container = document.querySelector(".custom-links");

    if (!container) return;

    // Remove old rendered links
    container.querySelectorAll(".saved-link").forEach(link => link.remove());

    const links = JSON.parse(localStorage.getItem("customLinks")) || [];

    links.forEach((link, index) => {

        const box = document.createElement("a");

        box.className = "small-box saved-link";
        box.href = link.url;
        box.target = "_blank";
        box.style.textDecoration = "none";
        box.style.color = "inherit";

        // Get website favicon
        let favicon = "";
        try {
            favicon = `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=64`;
        } catch {
            favicon = "";
        }

        box.innerHTML = `
            ${favicon ? `<img class="favicon" src="${favicon}" alt="">` : ""}
            <span>${link.name}</span>
        `;

        // Delete button
        const del = document.createElement("div");
        del.className = "delete-btn";
        del.textContent = "×";

        del.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const links = JSON.parse(localStorage.getItem("customLinks")) || [];
            links.splice(index, 1);

            localStorage.setItem("customLinks", JSON.stringify(links));

            renderCustomLinks();
        };

        box.appendChild(del);

        // Put before the + button
        container.insertBefore(
            box,
            container.querySelector(".add-button")
        );
    });
}
