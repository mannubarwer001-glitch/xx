function loadDashboard() {
    const students = getData("students");
    const attendance = getData("attendance");
    const marks = getData("marks");

    document.getElementById("ds-total").innerHTML = students.length;

    let totalAttendance = 0;
    if (students.length > 0) {
        students.forEach(student => {
            const records = attendance.filter(r => r.studentId === student.id);
            const present = records.filter(r => r.status === "P").length;
            if (records.length > 0) {
                totalAttendance += getPercentage(present, records.length);
            }
        });
        totalAttendance = Math.round(totalAttendance / students.length);
    }
    document.getElementById("ds-att").innerHTML = `${totalAttendance}%`;

    let totalMarks = 0;
    if (marks.length > 0) {
        marks.forEach(record => {
            totalMarks += getPercentage(record.score, record.maxMarks);
        });
        totalMarks = Math.round(totalMarks / marks.length);
    }
    document.getElementById("ds-marks").innerHTML = `${totalMarks}%`;

    const tableContainer = document.getElementById("dashTable");
    if (students.length === 0) {
        tableContainer.innerHTML = "<div class='empty'>No Student Found</div>";
        return;
    }

    let tableHtml = `
        <table>
            <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
            </tr>
    `;

    students.forEach(student => {
        tableHtml += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.className || ""}</td>
            </tr>
        `;
    });

    tableHtml += "</table>";
    tableContainer.innerHTML = tableHtml;
}