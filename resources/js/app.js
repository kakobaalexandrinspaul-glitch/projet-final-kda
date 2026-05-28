document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================
    INSCRIPTION UTILISATEUR
    =========================
    */

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
                        password
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Erreur inscription");
                }

                /*
                =========================
                SAUVEGARDE SESSION
                =========================
                */

                localStorage.setItem(
                    "userId",
                    result.utilisateur.id
                );

                localStorage.setItem(
                    "userUsername",
                    result.utilisateur.username
                );

                localStorage.setItem(
                    "userEmail",
                    result.utilisateur.email
                );

                alert("Compte créé avec succès");

                window.location.href = "/profil-client";

            } catch (error) {

                console.error(error);

                alert(error.message);
            }
        });

        return;
    }

    /*
    =========================
    PROFIL UTILISATEUR
    =========================
    */

    const savedUsername =
        localStorage.getItem("userUsername") || "Utilisateur";

    function updateAvatars(src) {

        document
            .querySelectorAll(
                ".user-avatar-element, .profile-picture"
            )
            .forEach((img) => {
                img.src = src;
            });
    }

    function loadProfile() {

        const headerName =
            document.getElementById("top-bar-name");

        const profileName =
            document.getElementById("profile-name");

        if (headerName) {
            headerName.textContent = savedUsername;
        }

        if (profileName) {
            profileName.textContent = savedUsername;
        }

        const avatar =
            localStorage.getItem("userAvatarData");

        if (avatar) {
            updateAvatars(avatar);
        }
    }

    /*
    =========================
    CHARGEMENT TWEETS
    =========================
    */

    const tweetsContainer =
        document.getElementById("user-tweets-container");

    async function fetchTweets() {

        if (!tweetsContainer) return;

        try {

            const response =
                await fetch("/api/tweets");

            const tweets =
                await response.json();

            tweetsContainer.innerHTML = "";

            tweets.forEach((tweet) => {

                const div =
                    document.createElement("div");

                div.classList.add("tweet-item");

                div.innerHTML = `
                    <p>${tweet.content}</p>
                `;

                tweetsContainer.appendChild(div);
            });

        } catch (error) {

            console.error(
                "Erreur chargement tweets",
                error
            );
        }
    }

    /*
    =========================
    AJOUT TWEET
    =========================
    */

    const tweetTextarea =
        document.getElementById("tweet-textarea");

    const submitTweetBtn =
        document.getElementById("submit-tweet-btn");

    if (tweetTextarea && submitTweetBtn) {

        tweetTextarea.addEventListener("input", () => {

            submitTweetBtn.disabled =
                tweetTextarea.value.trim().length === 0;
        });

        submitTweetBtn.addEventListener(
            "click",
            async () => {

                const content =
                    tweetTextarea.value.trim();

                const userId =
                    localStorage.getItem("userId");

                if (!content) return;

                try {

                    const response = await fetch(
                        "/api/tweets",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                content,
                                userId
                            })
                        }
                    );

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result.message ||
                            "Erreur publication tweet"
                        );
                    }

                    tweetTextarea.value = "";

                    submitTweetBtn.disabled = true;

                    fetchTweets();

                } catch (error) {

                    console.error(error);

                    alert(error.message);
                }
            }
        );
    }

    /*
    =========================
    PHOTO PROFIL
    =========================
    */

    const avatarFileInput =
        document.getElementById("avatar-file-input");

    if (avatarFileInput) {

        avatarFileInput.addEventListener(
            "change",
            (e) => {

                const file = e.target.files[0];

                if (!file) return;

                const reader =
                    new FileReader();

                reader.onload = (event) => {

                    const imageData =
                        event.target.result;

                    localStorage.setItem(
                        "userAvatarData",
                        imageData
                    );

                    updateAvatars(imageData);
                };

                reader.readAsDataURL(file);
            }
        );
    }

    /*
    =========================
    BANNIERE PROFIL
    =========================
    */

    const bannerFileInput =
        document.getElementById("banner-file-input");

    if (bannerFileInput) {

        bannerFileInput.addEventListener(
            "change",
            (e) => {

                const file = e.target.files[0];

                if (!file) return;

                const reader =
                    new FileReader();

                reader.onload = (event) => {

                    localStorage.setItem(
                        "userBannerData",
                        event.target.result
                    );
                };

                reader.readAsDataURL(file);
            }
        );
    }

    /*
    =========================
    INITIALISATION
    =========================
    */

    loadProfile();

    fetchTweets();

});
