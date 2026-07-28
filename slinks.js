// POPUP + OVERLAY
const popup = document.getElementById("addLinkPopup");
const overlay = document.getElementById("popupOverlay");
const saveBtn = document.getElementById("saveLink");

// OPEN POPUP
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-button")) {

        // Clear fields every time popup opens
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

document.addEventListener("DOMContentLoaded", () => {

    // --- Name prompt (your original behaviour) ---
    let deviceName = localStorage.getItem("deviceName");

    if (!deviceName) {
        deviceName = prompt("What would you like to be called?");
        if (deviceName && deviceName.trim() !== "") {
            localStorage.setItem("deviceName", deviceName);
        } else {
            deviceName = "User";
        }
    }

    // --- Greeting ---
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    document.getElementById("greetingText").textContent =
        `${greeting}, ${deviceName}`;

    // --- Time on the right ---
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.getElementById("timeText").textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);
});
