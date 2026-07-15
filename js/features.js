function addNewStudent() {
    const name = document.getElementById("s-name").value.trim();
    const roll = document.getElementById("s-roll").value.trim();
    const className = document.getElementById("s-class").value.trim();
    const email = document.getElementById("s-email").value.trim();

    if (!name || !roll) {
        displayNotification("stuAlert", "Student name and roll number are required.", "error");
        return;
    }

    const students = getStoredItem("students");
    students.push({
        id: `student_${Date.now()}`,
        name,
        roll,
        className,
        email
    });

    setStoredItem("students", students);
    displayNotification("stuAlert", "Student added successfully!", "success");

    document.getElementById("s-name").value = "";
    document.getElementById("s-roll").value = "";
    document.getElementById("s-class").value = "";
    document.getElementById("s-email").value = "";

    renderStudents();
}

function deleteStudent(studentId) {
    const students = getStoredItem("students");
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStoredItem("students", updatedStudents);
    renderStudents();
}

function renderStudents() {
    const students = getStoredItem("students");
    const tableContainer = document.getElementById("stuTable");
    
    document.getElementById("stuCount").textContent = students.length;

    if (students.length === 0) {
        tableContainer.innerHTML = "<div class='empty'>No students added yet.</div>";
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    students.forEach(student => {
        html += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.className || ""}</td>
                <td>
                    <button class="del-btn" onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</tbody></table>";
    tableContainer.innerHTML = html;
}

function renderAttendance() {
    const students = getStoredItem("students");
    const listContainer = document.getElementById("attList");

    if (!listContainer) return;

    if (students.length === 0) {
        listContainer.innerHTML = "<div class='empty'>No students to mark.</div>";
        return;
    }

    let html = "";
    students.forEach(student => {
        html += `
            <div class='att-row'>
                <span>${student.name} (${student.roll})</span>
                <select id='att-${student.id}'>
                    <option value='P'>Present</option>
                    <option value='A'>Absent</option>
                </select>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

function saveAttendance() {
    const students = getStoredItem("students");
    const date = document.getElementById("att-date").value;

    if (!date) {
        displayNotification("attAlert", "Please select a date.", "error");
        return;
    }

    const attendance = getStoredItem("attendance");

    students.forEach(student => {
        const selectBox = document.getElementById(`att-${student.id}`);
        if (selectBox) {
            attendance.push({
                id: `att_${Date.now()}_${student.id}`,
                studentId: student.id,
                date,
                status: selectBox.value
            });
        }
    });

    setStoredItem("attendance", attendance);
    displayNotification("attAlert", "Attendance saved successfully!", "success");
}

function renderMarks() {
    const students = getStoredItem("students");
    const marks = getStoredItem("marks");
    const select = document.getElementById("m-student");
    const tableContainer = document.getElementById("marksTable");

    if (select) {
        let options = "";
        students.forEach(student => {
            options += `<option value='${student.id}'>${student.name}</option>`;
        });
        select.innerHTML = options;
    }

    if (!tableContainer) return;

    if (marks.length === 0) {
        tableContainer.innerHTML = "<div class='empty'>No marks added yet.</div>";
        return;
    }

    let html = `
        <table>
            <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Max Marks</th>
                <th>Percentage</th>
            </tr>
    `;

    marks.forEach(record => {
        const student = students.find(s => s.id === record.studentId);
        const studentName = student ? student.name : "Unknown";

        html += `
            <tr>
                <td>${studentName}</td>
                <td>${record.subject}</td>
                <td>${record.score}</td>
                <td>${record.maxMarks}</td>
                <td>${calculatePercentage(record.score, record.maxMarks)}%</td>
            </tr>
        `;
    });

    html += "</table>";
    tableContainer.innerHTML = html;
}

function addMarks() {
    const studentId = document.getElementById("m-student").value;
    const subject = document.getElementById("m-subject").value.trim();
    const score = Number(document.getElementById("m-score").value);
    const maxMarks = Number(document.getElementById("m-max").value);

    if (!studentId || !subject || !maxMarks) {
        displayNotification("marksAlert", "Please fill all marks fields.", "error");
        return;
    }

    const marks = getStoredItem("marks");
    marks.push({
        id: `mark_${Date.now()}`,
        studentId,
        subject,
        score,
        maxMarks
    });

    setStoredItem("marks", marks);
    displayNotification("marksAlert", "Marks added successfully!", "success");

    document.getElementById("m-subject").value = "";
    document.getElementById("m-score").value = "";
    document.getElementById("m-max").value = "";

    renderMarks();
}