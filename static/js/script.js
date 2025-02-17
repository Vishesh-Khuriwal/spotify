document.addEventListener("DOMContentLoaded", function () {
    // Cache elements for better performance
    const greetingElement = document.getElementById("greeting");
    const playButton = document.querySelector(".play-btn");
    const volumeControl = document.querySelector("#volume");
    const progressBar = document.querySelector("#progress");

    // Greeting based on system time
    if (greetingElement) {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
        greetingElement.textContent = greeting;
    }

    // Play button functionality
    if (playButton) {
        let isPlaying = false;
        playButton.addEventListener("click", function () {
            isPlaying = !isPlaying;
            const playIcon = playButton.querySelector("i");
            if (playIcon) {
                playIcon.classList.toggle("fa-play", !isPlaying);
                playIcon.classList.toggle("fa-pause", isPlaying);
            }
            console.log(isPlaying ? "Music Playing" : "Music Paused");
        });
    }

    // Volume Control
    if (volumeControl) {
        volumeControl.addEventListener("input", function () {
            const volume = parseFloat(this.value);
            console.log("Volume:", volume.toFixed(2)); // Shows more precise value
        });
    }

    // Progress Bar
    if (progressBar) {
        progressBar.addEventListener("input", function () {
            const position = parseFloat(this.value);
            console.log("Seek Position:", position.toFixed(2));
        });
    }
});

// Navigation Buttons
function goBack() {
    window.history.back();
}

function goForward() {
    window.history.forward();
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch playlists from Flask API
    async function fetchPlaylists() {
        try {
            const response = await fetch("/get-playlists");
            const data = await response.json();

            if (data.error) {
                console.error("Error fetching playlists:", data.error);
                return;
            }

            displayPlaylists(data.tracks.items); // Call function to update UI
        } catch (error) {
            console.error("Failed to fetch playlists:", error);
        }
    }

    function displayPlaylists(tracks) {
        const playlistContainer = document.querySelector(".playlist-grid");
        playlistContainer.innerHTML = ""; // Clear previous content

        tracks.forEach(track => {
            const playlistDiv = document.createElement("div");
            playlistDiv.classList.add("playlist");

            // Create image element
            const img = document.createElement("img");
            img.src = track.track.album.images[0].url;
            img.alt = track.track.name;

            // Create title
            const title = document.createElement("p");
            title.textContent = track.track.name;

            playlistDiv.appendChild(img);
            playlistDiv.appendChild(title);
            playlistContainer.appendChild(playlistDiv);
        });
    }

    fetchPlaylists(); // Load playlists on page load
});