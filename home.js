console.log("home.js is running");

document.addEventListener("DOMContentLoaded", () => {

    // 1. Apply saved theme BEFORE anything else
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    // 2. Fade-in effect AFTER theme is applied
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    // 3. Sidebar toggle
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

        async function fetchSuggestions() {
            const query = searchInput.value.trim();
            lastQuery = query;

            if (query.length === 0) {
                suggestionsBox.classList.remove("show");
                setTimeout(() => suggestionsBox.style.display = "none", 150);
                return;
            }

            const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
                "https://suggestqueries.google.com/complete/search?client=chrome&q=" + query
            )}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                // Ignore outdated responses
                if (searchInput.value.trim() !== lastQuery) return;

                const suggestions = data[1];

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

            } catch {
                suggestionsBox.classList.remove("show");
                setTimeout(() => suggestionsBox.style.display = "none", 150);
            }
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
