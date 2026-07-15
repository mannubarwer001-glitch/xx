document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("spt_theme") || "dark-mode";
    document.body.className = theme;
    document.getElementById("themeToggle").textContent = theme === "dark-mode" ? "Light Mode" : "Dark Mode";
});

function handleThemeToggle() {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light-mode" : "dark-mode";
    
    document.body.className = newTheme;
    localStorage.setItem("spt_theme", newTheme);
    document.getElementById("themeToggle").textContent = isDark ? "Dark Mode" : "Light Mode";
}

function switchTab(tabName) {
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

    document.getElementById(`tab-${tabName}`).classList.add("active");
    
    const navBtn = document.getElementById(`tb-${tabName}`);
    if (navBtn) navBtn.classList.add("active");

    if (tabName === "dashboard") loadDashboard();
    else if (tabName === "students") renderStudents();
    else if (tabName === "attendance") renderAttendance();
    else if (tabName === "marks") renderMarks();
    else if (tabName === "report") displayReport();
}

function appStartup() {
    const dateField = document.getElementById("att-date");
    if (dateField) {
        dateField.value = new Date().toISOString().split("T")[0];
    }
    switchTab("dashboard");
}

function displayReport() {
    const students = getStoredItem("students");
    const attendance = getStoredItem("attendance");
    const filter = document.getElementById("r-filter");
    const reportArea = document.getElementById("reportArea");

    if (filter.options.length <= 1) {
        let options = "<option value=''>All Students</option>";
        students.forEach(student => {
            options += `<option value='${student.id}'>${student.name}</option>`;
        });
        filter.innerHTML = options;
    }

    const selectedStudent = filter.value;
    let reportCards = "";

    students.forEach(student => {
        if (selectedStudent !== "" && student.id !== selectedStudent) return;

        const records = attendance.filter(r => r.studentId === student.id);
        const present = records.filter(r => r.status === "P").length;
        const percentage = calculatePercentage(present, records.length);

        reportCards += `
            <div class='report-card'>
                <h3>${student.name} (${student.roll})</h3>
                <p>Attendance Score: ${percentage}%</p>
                <div class='prog-wrap'>
                    <div class='prog-bar' style='width: ${percentage}%; background: #34d399;'></div>
                </div>
            </div>
        `;
    });

    reportArea.innerHTML = reportCards === "" ? "<div class='empty'>No records found.</div>" : reportCards;
}

function triggerPrint() {
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`
        <html>
        <head><title>Performance Report</title></head>
        <body>
            <h2>Performance Reports</h2>
            ${document.getElementById("reportArea").innerHTML}
        </body>
        </html>
    `);
    reportWindow.document.close();
    reportWindow.print();
}