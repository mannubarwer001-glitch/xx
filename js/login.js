const users = {
    admin: "admin123",
    student: "student123"
};

let currentUser = null;

function handleLogin() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    if (users[username] && users[username] === password) {
        currentUser = username;

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("userTag").innerHTML = `User : ${username}`;

        appStartup();

        if (username === "student") {
            document.getElementById("tb-students").style.display = "none";
            document.getElementById("tb-attendance").style.display = "none";
            document.getElementById("tb-marks").style.display = "none";
        }
    } else {
        const alertBox = document.getElementById("loginAlert");
        alertBox.classList.add("show");
        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 3000);
    }
}

function handleLogout() {
    currentUser = null;

    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("app").style.display = "none";
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";

    document.getElementById("tb-students").style.display = "block";
    document.getElementById("tb-attendance").style.display = "block";
    document.getElementById("tb-marks").style.display = "block";
}