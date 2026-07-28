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
       SEARCH SUGGESTIONS (only if search bar exists)
    ----------------------------------- */

    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestionsBox");
    const searchForm = document.getElementById("searchForm");

    if (searchInput && suggestionsBox && searchForm) {

        let debounceTimer;
        let lastQuery = "";

        searchInput.addEventListener("input", () => {
            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => {
                fetchSuggestions();
            }, 200);
        });

        function fetchSuggestions() {
            const query = searchInput.value.trim();
            lastQuery = query;

            if (query.length === 0) {
                suggestionsBox.classList.remove("show");
                setTimeout(() => suggestionsBox.style.display = "none", 150);
                return;
            }

            const callback = "googleSuggestCallback";

            const oldScript = document.getElementById("googleSuggestScript");
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

                suggestions.forEach(s => {
                    const div = document.createElement("div");
                    div.textContent = s;

                    div.onclick = () => {
                        searchInput.value = s;
                        searchForm.submit();
                        searchInput.value = "";
                        suggestionsBox.classList.remove("show");
                        setTimeout(() => suggestionsBox.style.display = "none", 150);
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
                setTimeout(() => suggestionsBox.style.display = "none", 150);
            }
        });


        // Clear search bar after submitting
        searchForm.addEventListener("submit", () => {
            setTimeout(() => {
                searchInput.value = "";
                suggestionsBox.classList.remove("show");
                setTimeout(() => suggestionsBox.style.display = "none", 150);
            }, 100);
        });

    }

});
