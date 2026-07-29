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

        document.body.style.backgroundPosition =
            "center";

        document.body.style.backgroundAttachment =
            "fixed";

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





    // ===============================
    // GOOGLE SEARCH SUGGESTIONS
    // JSONP VERSION (GitHub Pages Safe)
    // ===============================


    const suggestionsBox =
        document.getElementById("suggestionsBox");



    if (searchBox && suggestionsBox) {


        searchBox.addEventListener(
            "input",
            async () => {


                const query =
                    searchBox.value.trim();



                if (!query) {


                    suggestionsBox.innerHTML = "";

                    suggestionsBox.classList.remove(
                        "show"
                    );

                    return;

                }



                try {


                    const data = await new Promise((resolve, reject) => {


                        const callback =
                            "googleSuggestCallback";


                        const script =
                            document.createElement("script");



                        window[callback] = function(response) {


                            resolve(response);


                            delete window[callback];


                            script.remove();


                        };



                        script.onerror = function() {


                            delete window[callback];


                            script.remove();


                            reject(
                                "Google suggestion failed"
                            );


                        };



                        script.src =
                            `https://suggestqueries.google.com/complete/search?client=firefox&callback=${callback}&q=${encodeURIComponent(query)}`;



                        document.body.appendChild(script);


                    });




                    suggestionsBox.innerHTML = "";



                    if (data[1]) {


                        data[1]
                        .slice(0, 8)
                        .forEach(item => {



                            const div =
                                document.createElement("div");



                            div.textContent =
                                item;



                            div.addEventListener(
                                "click",
                                () => {


                                    searchBox.value =
                                        item;


                                    suggestionsBox.innerHTML =
                                        "";


                                    suggestionsBox.classList.remove(
                                        "show"
                                    );


                                }
                            );



                            suggestionsBox.appendChild(div);


                        });


                    }



                    suggestionsBox.classList.add(
                        "show"
                    );



                }
                catch (error) {


                    console.log(
                        "Google suggestion error:",
                        error
                    );


                }


            }
        );





      // ===============================
      // KEYBOARD NAVIGATION
      // ===============================

      let selectedIndex = -1;


      searchBox.addEventListener("keydown", (event) => {

          const suggestions =
              suggestionsBox.querySelectorAll("div");


          if (!suggestions.length) return;


          if (event.key === "ArrowDown") {

              event.preventDefault();

              selectedIndex++;

              if (selectedIndex >= suggestions.length) {
                  selectedIndex = 0;
              }

          }


          else if (event.key === "ArrowUp") {

              event.preventDefault();

              selectedIndex--;

              if (selectedIndex < 0) {
                  selectedIndex = suggestions.length - 1;
              }

          }


          else if (event.key === "Enter") {

              event.preventDefault();

              if (selectedIndex >= 0) {

                  searchBox.value =
                      suggestions[selectedIndex].textContent;

                  suggestionsBox.classList.remove("show");

              }

              return;

          }


          suggestions.forEach(item => {
              item.classList.remove("selected");
          });


          if (selectedIndex >= 0) {

              suggestions[selectedIndex]
                  .classList.add("selected");

          }

      });
      document.addEventListener(
          "click",
          (event) => {

              if (
                  !searchBox.contains(event.target) &&
                  !suggestionsBox.contains(event.target)
              ) {

                  suggestionsBox.classList.remove(
                      "show"
                  );

              }

          }
      );


    }

});
