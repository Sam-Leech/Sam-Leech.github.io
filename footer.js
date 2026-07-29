document.addEventListener("DOMContentLoaded", () => {


    // Greeting

    let deviceName = localStorage.getItem("deviceName");

    if (!deviceName) {

        deviceName = prompt("What would you like to be called?");

        if (deviceName) {
            localStorage.setItem("deviceName", deviceName);
        }
        else {
            deviceName = "User";
        }
    }


    const hour = new Date().getHours();

    let greeting;

    if (hour < 12)
        greeting = "Good morning";

    else if (hour < 18)
        greeting = "Good afternoon";

    else
        greeting = "Good evening";


    document.getElementById("greetingText").textContent =
        `${greeting}, ${deviceName}`;



    // Clock
    function updateTime(){

        const now = new Date();

        document.getElementById("timeText").textContent =
            now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

    }

    updateTime();
    setInterval(updateTime,1000);



    // Weather placeholder
    // Weather - Manchester

    async function updateWeather() {

        try {

            // Manchester coordinates
            const latitude = 53.4808;
            const longitude = -2.2426;

            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=Europe%2FLondon`
            );

            const data = await response.json();

            const temp = Math.round(
                data.current.temperature_2m
            );

            const code = data.current.weather_code;


            let icon = "🌤";

            if (code === 0) {
                icon = "☀️";
            }
            else if (code <= 3) {
                icon = "🌤";
            }
            else if (code <= 48) {
                icon = "🌫";
            }
            else if (code <= 67) {
                icon = "🌧";
            }
            else if (code <= 77) {
                icon = "❄️";
            }
            else if (code <= 82) {
                icon = "🌦";
            }
            else if (code >= 95) {
                icon = "⛈";
            }


            document.getElementById("weatherText").textContent =
                `${icon} Manchester ${temp}°C`;

        }
        catch (error) {

            document.getElementById("weatherText").textContent =
                "🌤 Manchester";

            console.log("Weather error:", error);

        }

    }


    updateWeather();

    // refresh every 30 minutes
    setInterval(updateWeather, 1800000);

});
