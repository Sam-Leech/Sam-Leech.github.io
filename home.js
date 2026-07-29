console.log("home.js is running");

document.addEventListener("DOMContentLoaded", () => {

    // Apply saved theme BEFORE anything else
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    // Fade-in
    document.body.classList.add("loaded");

    // Sidebar toggle
    window.toggleSidebar = function () {
        document.getElementById('sidebar').classList.toggle('open');
    };

    /* -----------------------------------
       SEARCH SUGGESTIONS
    ----------------------------------- */

    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestionsBox");
    const searchForm = document.getElementById("searchForm");

    // Focus the search box on page load
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

            const items = suggestionsBox.querySelectorAll("div");

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

                setTimeout(() => {
                    suggestionsBox.style.display = "none";
                }, 150);

                selectedIndex = -1;
            }

        });


        function updateSelection(items) {

            items.forEach(item => {
                item.classList.remove("selected");
            });


            if (selectedIndex >= 0) {

                items[selectedIndex].classList.add("selected");

                items[selectedIndex].scrollIntoView({
                    block: "nearest"
                });
            }

        }



        function fetchSuggestions() {

            const query = searchInput.value.trim();

            lastQuery = query;


            if (query.length === 0) {

                suggestionsBox.classList.remove("show");

                setTimeout(() => {
                    suggestionsBox.style.display = "none";
                }, 150);

                return;
            }


            const callback = "googleSuggestCallback";


            const oldScript =
                document.getElementById("googleSuggestScript");

            if (oldScript) {
                oldScript.remove();
            }


            const script = document.createElement("script");

            script.id = "googleSuggestScript";


            window[callback] = function(data) {


                if (searchInput.value.trim() !== lastQuery) {

                    delete window[callback];
                    script.remove();

                    return;
                }


                const suggestions = data[1] || [];


                suggestionsBox.innerHTML = "";

                selectedIndex = -1;


                suggestions.forEach(s => {

                    const div = document.createElement("div");

                    div.textContent = s;


                    div.onclick = () => {

                        searchInput.value = s;

                        searchForm.submit();

                        searchInput.value = "";

                        suggestionsBox.classList.remove("show");

                        setTimeout(() => {
                            suggestionsBox.style.display = "none";
                        }, 150);
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



        // Hide suggestions when clicking outside
        document.addEventListener("click", (e) => {

            if (!e.target.closest(".search-wrapper")) {

                suggestionsBox.classList.remove("show");

                setTimeout(() => {
                    suggestionsBox.style.display = "none";
                }, 150);

            }

        });



        // Clear search bar after submitting
        searchForm.addEventListener("submit", () => {

            setTimeout(() => {

                searchInput.value = "";

                suggestionsBox.classList.remove("show");

                setTimeout(() => {
                    suggestionsBox.style.display = "none";
                }, 150);

            }, 100);

        });

    }

});
