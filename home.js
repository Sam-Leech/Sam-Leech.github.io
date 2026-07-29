console.log("home.js is running");

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // THEME
    // ===============================

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }


    // Fade-in
    document.body.classList.add("loaded");



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

    const savedBackground = localStorage.getItem("backgroundImage");


    if (savedBackground) {

        document.body.style.backgroundImage =
            `url(${savedBackground})`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

    }



    const picker = document.getElementById("backgroundPicker");


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


                document.body.style.backgroundImage =
                    `url(${image})`;

                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundAttachment = "fixed";

            };


            reader.readAsDataURL(file);

        });

    }



    const removeBackground =
        document.getElementById("removeBackground");


    if (removeBackground) {

        removeBackground.addEventListener("click", () => {

            localStorage.removeItem("backgroundImage");

            document.body.style.backgroundImage = "";

        });

    }




    // ===============================
    // GOOGLE SEARCH
    // ===============================

    const searchInput =
        document.getElementById("searchInput");

    const suggestionsBox =
        document.getElementById("suggestionsBox");

    const searchForm =
        document.getElementById("searchForm");



    // Focus search box

    if (searchInput) {

        setTimeout(() => {

            searchInput.focus();
            searchInput.select();

        }, 100);

    }



    if (searchInput && suggestionsBox && searchForm) {


        let debounceTimer;
        let lastQuery = "";
        let selectedIndex = -1;



        searchInput.addEventListener("input", () => {

            clearTimeout(debounceTimer);

            selectedIndex = -1;


            debounceTimer = setTimeout(() => {

                fetchSuggestions();

            }, 200);

        });




        // Keyboard navigation

        searchInput.addEventListener("keydown", (e) => {


            const items =
                suggestionsBox.querySelectorAll("div");


            if (!items.length) return;



            if (e.key === "ArrowDown") {

                e.preventDefault();

                selectedIndex++;


                if (selectedIndex >= items.length) {
                    selectedIndex = 0;
                }


                updateSelection(items);

            }



            else if (e.key === "ArrowUp") {

                e.preventDefault();

                selectedIndex--;


                if (selectedIndex < 0) {
                    selectedIndex = items.length - 1;
                }


                updateSelection(items);

            }



            else if (e.key === "Enter") {


                if (selectedIndex >= 0) {

                    e.preventDefault();


                    searchInput.value =
                        items[selectedIndex].textContent;


                    searchForm.submit();

                }

            }



            else if (e.key === "Escape") {


                suggestionsBox.classList.remove("show");

                suggestionsBox.style.display = "none";

                selectedIndex = -1;

            }


        });




        function updateSelection(items) {


            items.forEach(item => {

                item.classList.remove("selected");

            });


            if (selectedIndex >= 0) {

                items[selectedIndex]
                    .classList.add("selected");


                items[selectedIndex]
                    .scrollIntoView({
                        block: "nearest"
                    });

            }

        }




        function fetchSuggestions() {


            const query =
                searchInput.value.trim();


            lastQuery = query;



            if (!query) {

                suggestionsBox.classList.remove("show");

                suggestionsBox.style.display = "none";

                return;

            }



            const callback =
                "googleSuggestCallback";



            const oldScript =
                document.getElementById("googleSuggestScript");


            if (oldScript) {
                oldScript.remove();
            }



            const script =
                document.createElement("script");


            script.id =
                "googleSuggestScript";



            window[callback] = function(data) {



                if (searchInput.value.trim() !== lastQuery) {

                    delete window[callback];

                    script.remove();

                    return;

                }



                const suggestions =
                    data[1] || [];



                suggestionsBox.innerHTML = "";

                selectedIndex = -1;



                suggestions.forEach(s => {


                    const div =
                        document.createElement("div");


                    div.textContent = s;



                    div.onclick = () => {


                        searchInput.value = s;

                        searchForm.submit();


                    };



                    suggestionsBox.appendChild(div);


                });



                suggestionsBox.style.display = "block";


                requestAnimationFrame(() => {

                    suggestionsBox.classList.add("show");

                });



                delete window[callback];

                script.remove();


            };



            script.src =
                "https://suggestqueries.google.com/complete/search" +
                "?client=chrome" +
                "&callback=" + callback +
                "&q=" + encodeURIComponent(query);



            document.body.appendChild(script);


        }




        document.addEventListener("click", (e) => {


            if (!e.target.closest(".search-wrapper")) {


                suggestionsBox.classList.remove("show");

                suggestionsBox.style.display = "none";


            }

        });




        searchForm.addEventListener("submit", () => {


            setTimeout(() => {

                searchInput.value = "";

                suggestionsBox.classList.remove("show");

                suggestionsBox.style.display = "none";


            }, 100);


        });


    }


});
