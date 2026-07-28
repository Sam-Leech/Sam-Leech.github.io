async function fetchSuggestions() {
    const query = searchInput.value.trim();
    lastQuery = query;

    if (query.length === 0) {
        suggestionsBox.classList.remove("show");
        setTimeout(() => suggestionsBox.style.display = "none", 150);
        return;
    }

    // Remove old Google script if still present
    document.getElementById("google-suggestion-script")?.remove();

    const callbackName = "googleSuggestCallback";

    window[callbackName] = (data) => {

        // Ignore outdated responses
        if (searchInput.value.trim() !== lastQuery) return;

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

        delete window[callbackName];

        const script = document.getElementById("google-suggestion-script");
        if (script) script.remove();
    };


    const script = document.createElement("script");

    script.id = "google-suggestion-script";

    script.src =
        "https://suggestqueries.google.com/complete/search" +
        "?client=chrome" +
        "&callback=" + callbackName +
        "&q=" + encodeURIComponent(query);

    script.onerror = () => {
        suggestionsBox.classList.remove("show");
        setTimeout(() => suggestionsBox.style.display = "none", 150);

        delete window[callbackName];
        script.remove();
    };

    document.body.appendChild(script);
}
