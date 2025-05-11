document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    setupModal();
    setupSidebar();
    setupLogin();
}

const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const sidebarLoginBtn = document.getElementById("loginBtnSidebar");
const closeBtn = document.getElementsByClassName("CloseModal")[0];
const hamburger = document.getElementById("hamburgerIcon");
const sidebar = document.getElementById("Sidebar");
const userNameNav = document.getElementById("userNameNav");
const userNameSideBar = document.getElementById("userNameSideBar");
const userName = document.getElementById("userName");
const errorText = document.getElementById("errorText");
const saveNameBtn = document.getElementById("saveNameBtn") 

const hamburgerIcon = "./Images/hamburger-icon.png";
const closeIcon = "./Images/close-symbol.svg";

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("ModalOpen");
    document.body.style.overflow = 'auto';
}

function setupModal() {
    function openModal() {
        modal.style.display = "flex";
        document.body.classList.add("ModalOpen");
        document.body.style.overflow = 'hidden';
        userName.value = "";
        errorText.textContent = "";
    }

    loginBtn.addEventListener("click", openModal);
    if (sidebarLoginBtn) {
        sidebarLoginBtn.addEventListener("click", openModal);
    }

    closeBtn.addEventListener("click", closeModal);
}

function setupSidebar() {
    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        hamburger.src = sidebar.classList.contains("active") ? closeIcon : hamburgerIcon;
    });
}

function setupLogin() {
    loginBtn.addEventListener("click", function () {
        if (this.textContent === "LOGGA IN") {
            openModal();
        } else {
            logout();
        }
    });

    if (sidebarLoginBtn) {
        sidebarLoginBtn.addEventListener("click", function () {
            if (this.textContent === "LOGGA IN") {
                openModal();
            } else {
                logout();
            }
        });
    }

    saveNameBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const userNameValue = userName.value.trim();

        if (userNameValue === "") {
            errorText.textContent = "Ange ett namn";
            return;
        }

        const formattedName = userNameValue.toUpperCase();
        const storedNames = JSON.parse(localStorage.getItem("userNames")) || [];

        if (storedNames.find(name => name.toLowerCase() === userNameValue.toLowerCase())) {
            userNameNav.innerHTML = `VÄLKOMMEN TILLBAKA <span style="font-weight: bold;">${formattedName}</span>`;
            userNameSideBar.innerHTML = `VÄLKOMMEN TILLBAKA <span style="font-weight: bold;">${formattedName}</span>`;
        } else {
            userNameNav.innerHTML = `DU ÄR INLOGGAD SOM <span style="font-weight: bold;">${formattedName}</span>`;
            userNameSideBar.innerHTML = `DU ÄR INLOGGAD SOM <span style="font-weight: bold;">${formattedName}</span>`;
        }

        const nameExists = storedNames.some(name => name.toLowerCase() === userNameValue.toLowerCase());
        if (!nameExists) {
            storedNames.push(userNameValue);
            localStorage.setItem("userNames", JSON.stringify(storedNames));
        }

        loginBtn.textContent = "LOGGA UT";
        sidebarLoginBtn.textContent = "LOGGA UT";

        closeModal();
    });

    function logout() {
        userNameNav.textContent = "";
        userNameSideBar.textContent = "";
        loginBtn.textContent = "LOGGA IN";
        sidebarLoginBtn.textContent = "LOGGA IN";

        closeModal();

    }
}

function openModal() {
    modal.style.display = "flex";
    document.body.classList.add("ModalOpen");
    document.body.style.overflow = 'hidden';
}
