function getData(key) {
    const data = localStorage.getItem(`spt_${key}`);
    return data ? JSON.parse(data) : [];
}

function getStoredItem(key) {
    return getData(key);
}

function saveData(key, value) {
    localStorage.setItem(`spt_${key}`, JSON.stringify(value));
}

function setStoredItem(key, value) {
    saveData(key, value);
}

function getPercentage(obtainedMarks, totalMarks) {
    if (!totalMarks) return 0;
    return Math.round((obtainedMarks / totalMarks) * 100);
}

function calculatePercentage(obtained, total) {
    return getPercentage(obtained, total);
}

function showMessage(boxId, message, type) {
    const box = document.getElementById(boxId);
    if (box) {
        box.innerHTML = message;
        box.className = `alert ${type} show`;
        setTimeout(() => {
            box.className = "alert";
        }, 3000);
    }
}

function displayNotification(boxId, message, type) {
    showMessage(boxId, message, type);
}