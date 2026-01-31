let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function addSubject() {
    let subject = document.getElementById("subject").value;
    let total = Number(document.getElementById("total").value);
    let attended = Number(document.getElementById("attended").value);

    if (subject === "" || total === 0) {
        alert("Please enter valid details");
        return;
    }

    let percentage = ((attended / total) * 100).toFixed(2);
    let message = "";

if (percentage >= 75) {
    let bunkAllowed = Math.floor((attended / 0.75) - total);
    message = `✅ Safe | Can bunk ${bunkAllowed} classes`;
} else {
    let needed = Math.ceil((0.75 * total - attended) / (1 - 0.75));
    message = `⚠️ Need ${needed} more classes`;
}


    subjects.push({ subject, percentage, message });


    localStorage.setItem("subjects", JSON.stringify(subjects));
    displaySubjects();
    drawChart();
    document.getElementById("subject").value = "";
    document.getElementById("total").value = "";
    document.getElementById("attended").value = "";
 

}

function displaySubjects() {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    subjects.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.subject}</td>
                <td>${item.percentage}%</td>
                <td>${item.message}</td>
                <td><button onclick="deleteSubject(${index})">❌ Delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
displaySubjects();
drawChart();

function deleteSubject(index) {
    subjects.splice(index, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    displaySubjects();
    drawChart();
}
function drawChart() {
    let ctx = document.getElementById("attendanceChart").getContext("2d");

    let labels = subjects.map(s => s.subject);
    let data = subjects.map(s => s.percentage);

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Attendance %",
                data: data
            }]
        }
    });
}
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}





