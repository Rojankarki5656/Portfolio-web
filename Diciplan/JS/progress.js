import { db } from "../JS/firebaseconfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // ✅ Import Firestore functions

// ✅ Fetch Task Data
async function fetchTaskData() {
    const tasksRef = collection(db, "tasks");  // ✅ Correct way to reference Firestore collection
    const querySnapshot = await getDocs(tasksRef);

    let taskCountByDay = { "Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0 };

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        if (task.status === "completed") {
            let createdDate = new Date(task.createdAt);
            let dayOfWeek = createdDate.getDay();
            let dayName = Object.keys(taskCountByDay)[dayOfWeek];
            taskCountByDay[dayName]++;
        }
    });
 
    return Object.values(taskCountByDay);
}

// ✅ Fetch Data and Update Chart
fetchTaskData().then((data) => {
    progressChart.data.datasets[0].data = data; // ✅ Update dataset

    // ✅ Dynamically adjust Y-axis max based on highest task count
    const maxTasks = Math.max(...data, 5); // Ensure at least 5 as the default max value
    progressChart.options.scales.y.max = maxTasks + 1; // Add some padding above highest value

    progressChart.update(); // ✅ Refresh the chart
});

// ✅ Progress Chart Setup
const progressChart = new Chart(document.getElementById('progress-chart'), {
    type: "line",
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: "Tasks Completed",
            data: [], // Will be updated dynamically
            borderColor: "#6a11cb",
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});
