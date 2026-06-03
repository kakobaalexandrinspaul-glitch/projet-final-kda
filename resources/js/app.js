document.addEventListener("DOMContentLoaded", () => {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("userUsername") || "Utilisateur";

    const registerForm = document.getElementById("register-form");

    if (registerForm) {

        registerForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const usernameInput = document.getElementById("fullname")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const password = document.getElementById("password")?.value;

            const day = document.getElementById("day")?.value;
            const month = document.getElementById("month")?.value;
            const year = document.getElementById("year")?.value;

            if (!usernameInput || !email || !password || !day || !month || !year) return;

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameInput,
                    email,
                    password
                })
            });

            const result = await response.json();

            if (!response.ok) return;

            const user = result.utilisateur || result.user;

            localStorage.setItem("userId", user.id);
            localStorage.setItem("userUsername", user.username);
            localStorage.setItem("userEmail", user.email);

            window.location.href = "/profil-client";
        });

        return;
    }

    function updateAvatars(src) {

        document.querySelectorAll(".user-avatar-element, .profile-picture")
            .forEach(img => {
                img.src = src;
            });
    }

    function loadProfile() {

    const currentUsername =
        localStorage.getItem("userUsername") || "Utilisateur";

    const bio =
        localStorage.getItem("userBio") || "Aucune bio";

    const location =
        localStorage.getItem("userLocation") || "Non renseigné";

    const topBar = document.getElementById("top-bar-name");
    const profileName = document.getElementById("profile-name");
    const sidebarName = document.getElementById("sidebar-name");
    const sidebarUsername = document.getElementById("sidebar-username");
    const profileUsername = document.getElementById("profile-username");
    const profileBio = document.getElementById("profile-bio");
    const profileLocation = document.getElementById("profile-location");

    if (topBar) topBar.textContent = currentUsername;
    if (profileName) profileName.textContent = currentUsername;
    if (sidebarName) sidebarName.textContent = currentUsername;

    if (sidebarUsername) {
        sidebarUsername.textContent = "@" + currentUsername;
    }

    if (profileUsername) {
        profileUsername.textContent = "@" + currentUsername;
    }

    if (profileBio) {
        profileBio.textContent = bio;
    }

    if (profileLocation) {
        profileLocation.textContent = location;
    }

    const avatar = localStorage.getItem("userAvatarData");

    if (avatar) {
        updateAvatars(avatar);
        localStorage.setItem("userBio", "");
localStorage.setItem("userLocation", "");
    }
}
    

    const tweetsContainer = document.getElementById("user-tweets-container");

    async function fetchTweets() {

        if (!tweetsContainer) return;

        const response = await fetch("/api/tweets");
        const tweets = await response.json();

        tweetsContainer.innerHTML = "";

        tweets.forEach(tweet => {
            const div = document.createElement("div");
            div.className = "tweet-item";
            div.textContent = tweet.content;
            tweetsContainer.appendChild(div);
        });
    }


    
    const tweetTextarea = document.getElementById("tweet-textarea");
    const submitTweetBtn = document.getElementById("submit-tweet-btn");

    if (tweetTextarea && submitTweetBtn) {

        tweetTextarea.addEventListener("input", () => {
            submitTweetBtn.disabled = tweetTextarea.value.trim().length === 0;
        });

        submitTweetBtn.addEventListener("click", async () => {

            const content = tweetTextarea.value.trim();

            if (!content || !userId) return;

            const response = await fetch("/api/tweets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content,
                    userId
                })
            });

            const result = await response.json();

            if (!response.ok) return;

            tweetTextarea.value = "";
            submitTweetBtn.disabled = true;

            fetchTweets();
        });
    }

    const avatarFileInput = document.getElementById("avatar-file-input");

    if (avatarFileInput) {

        avatarFileInput.addEventListener("change", (e) => {

            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = (event) => {
                localStorage.setItem("userAvatarData", event.target.result);
                updateAvatars(event.target.result);
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
});

const editProfileBtn =
    document.getElementById("edit-profile-btn");

const profileModal =
    document.getElementById("profile-modal");

const closeProfileBtn =
    document.getElementById("close-profile-btn");

const saveProfileBtn =
    document.getElementById("save-profile-btn");
    