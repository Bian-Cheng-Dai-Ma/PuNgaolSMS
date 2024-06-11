const notify = document.getElementById("submit");
const weatherMessage = document.getElementById("weather-message").value;
notify.addEventListener("click", function(event) {
    const text = {message: weatherMessage};
    const details = JSON.stringify(text);
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: details
    })
})