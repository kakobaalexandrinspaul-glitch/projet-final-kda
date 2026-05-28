const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const username = document.getElementById("fullname")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value;

        const day = document.getElementById("day")?.value;
        const month = document.getElementById("month")?.value;
        const year = document.getElementById("year")?.value;

        if (!username || !email || !password || !day || !month || !year) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        try {

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    birthDate: {
                        day,
                        month,
                        year
                    }
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erreur inscription");
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.user.id);
            localStorage.setItem("userUsername", result.user.username);

            alert("Compte créé avec succès");

            window.location.href = "/profil-client";

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    return;
}

const savedUsername = localStorage.getItem("userUsername") || "Utilisateur";

function updateAvatars(src) {
    document.querySelectorAll(".user-avatar-element, .profile-picture")
        .forEach((img) => {
            img.src = src;
        });
}

function loadProfile() {

    const headerName = document.getElementById("top-bar-name");
    const profileName = document.getElementById("profile-name");

    if (headerName) headerName.textContent = savedUsername;
    if (profileName) profileName.textContent = savedUsername;

    const avatar = localStorage.getItem("userAvatarData");

    if (avatar) updateAvatars(avatar);
}

const tweetsContainer = document.getElementById("user-tweets-container");

async function fetchTweets() {

    if (!tweetsContainer) return;

    try {

        const response = await fetch("/api/tweets");
        const tweets = await response.json();

        tweetsContainer.innerHTML = "";

        tweets.forEach((tweet) => {

            const div = document.createElement("div");
            div.classList.add("tweet-item");
            div.textContent = tweet.content;

            tweetsContainer.appendChild(div);
        });

    } catch (error) {
        console.error("Erreur chargement tweets", error);
    }
}

const tweetTextarea = document.getElementById("tweet-textarea");
const submitTweetBtn = document.getElementById("submit-tweet-btn");

if (tweetTextarea && submitTweetBtn) {

    tweetTextarea.addEventListener("input", () => {
        submitTweetBtn.disabled = tweetTextarea.value.trim().length === 0;
    });

    submitTweetBtn.addEventListener("click", async () => {

        const content = tweetTextarea.value.trim();
        const token = localStorage.getItem("token");

        if (!content) return;

        try {

            const response = await fetch("/api/tweets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    content
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erreur publication tweet");
            }

            tweetTextarea.value = "";
            submitTweetBtn.disabled = true;

            fetchTweets();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });
}

const avatarFileInput = document.getElementById("avatar-file-input");

if (avatarFileInput) {

    avatarFileInput.addEventListener("change", (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {

            const imageData = event.target.result;

            localStorage.setItem("userAvatarData", imageData);
            updateAvatars(imageData);
        };

        reader.readAsDataURL(file);
    });
}

const bannerFileInput = document.getElementById("banner-file-input");

if (bannerFileInput) {

    bannerFileInput.addEventListener("change", (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            localStorage.setItem("userBannerData", event.target.result);
        };

        reader.readAsDataURL(file);
    });
}

loadProfile();
fetchTweets();
