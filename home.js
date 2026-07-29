console.log("home.js is running");

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // THEME
    // ===============================

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }


    const darkToggle = document.getElementById("darkModeToggle");

    if (darkToggle) {

        darkToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );

        });

    }


    // ===============================
    // AUTO FOCUS SEARCH BAR
    // ===============================

    const searchBox = document.getElementById("searchInput");

    if (searchBox) {

        setTimeout(() => {
            searchBox.focus();
        }, 200);

    }


    // ===============================
    // PAGE FADE IN
    // ===============================

    window.requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });


    // ===============================
    // SIDEBAR
    // ===============================

    window.toggleSidebar = function () {

        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.toggle("open");
        }

    };



    // ===============================
    // BACKGROUND IMAGE
    // ===============================

    function applyBackground(image) {

        if (!image) return;

        document.body.classList.add("has-background");

        document.body.style.backgroundImage =
            `url("${image}")`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

    }



    const savedBackground =
        localStorage.getItem("backgroundImage");


    if (savedBackground) {

        applyBackground(savedBackground);

    }



    const picker =
        document.getElementById("backgroundPicker");


    if (picker) {

        picker.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) return;


            const reader = new FileReader();


            reader.onload = function (e) {

                const image = e.target.result;


                localStorage.setItem(
                    "backgroundImage",
                    image
                );


                applyBackground(image);

            };


            reader.readAsDataURL(file);

        });

    }



    const removeBackground =
        document.getElementById("removeBackground");


    if (removeBackground) {

        removeBackground.addEventListener("click", () => {


            localStorage.removeItem(
                "backgroundImage"
            );


            document.body.style.backgroundImage = "";

            document.body.classList.remove(
                "has-background"
            );


        });

    }


});
