
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection,query,where, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

  // 🔥 Your Firebase Config (Replace with your own config)
  const firebaseConfig = {
    apiKey: "AIzaSyDXdYWgyHMAzslfxiUI5yFodzJnEnj3ibs",
    authDomain: "diciplan-c8cab.firebaseapp.com",
    projectId: "diciplan-c8cab",
    storageBucket: "diciplan-c8cab.firebasestorage.app",
    messagingSenderId: "134732086536",
    appId: "1:134732086536:web:a82f73bd321354ab58c0bd",
    measurementId: "G-2NSL6HGZJQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  try {
    const username = sessionStorage.getItem("userName");
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("username", "==", username));

    console.log("Fetching assigned tasks...");
    const querySnapshot = await getDocs(q);
    console.log("Fetched assigned tasks:", querySnapshot);

    querySnapshot.forEach((docSnap) => {
        const task = docSnap.data();
        console.log("Task:", task);

        // Create a task list item
        const taskItem = document.createElement("li");
        taskItem.textContent = task.taskName; // Show only task name

        // Append the task to the appropriate section based on its status
        switch (task.status) {
            case "completed_late":
                document.getElementById("completed-tasks").appendChild(taskItem);
                break;
            case "completed":
                document.getElementById("completed-tasks").appendChild(taskItem);
                break;
            case "not completed":
                document.getElementById("not-completed-tasks").appendChild(taskItem);
                break;
            case "ongoing":
                document.getElementById("ongoing-tasks").appendChild(taskItem);
                break;
            default:
                document.getElementById("pending-tasks").appendChild(taskItem);
                break;
        }
    });
} catch (error) {
    console.error("Error fetching assigned tasks:", error);
}

  // ✅ Function to add a new task
  async function addTask(taskName, username, dateFrom, dateTo, timeFrom, always) {
    
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        taskName: taskName,
        username: username,
        dateFrom: dateFrom,
        dateTo: dateTo,
        timeFrom: timeFrom,
        status: "upcoming", // Default status
        always: always,
        createdAt: new Date().toISOString() // Store timestamp
      });
      alert("Task added successfully!");
      console.log("Task added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }
  async function fetchAssignedTasks() {
    
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to view assigned tasks.");
        return;
    }

    const username = sessionStorage.getItem("userName");
    if (!username) {
        alert("User data not found in session storage.");
        return;
    }

    console.log(username);
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("username", "==", username));

    try {
        console.log("Fetching assigned tasks...");
        const querySnapshot = await getDocs(q);
        console.log("Fetched assigned tasks:", querySnapshot);

        const taskContainer = document.getElementById("assigned-tasks-container");
        const taskList = document.getElementById("assigned-tasks");
        taskList.innerHTML = ""; // Clear previous tasks

        if (querySnapshot.empty) {
            taskList.innerHTML = "<p class='no-tasks'>No assigned tasks found.</p>";
            taskContainer.style.display = "block";
            return;
        }

        querySnapshot.forEach((doc) => {
            const task = doc.data();
            console.log("Task:", task);

            // Create a task card
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            // Set inner content
            taskCard.innerHTML = `
                        <h3>${task.taskName}</h3>
        <p><strong>From:</strong> ${task.dateFrom}</p>
        <p><strong>To:</strong> ${task.dateTo}</p>
         <p><strong>Time:</strong>${task.timeFrom}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Always:</strong> ${task.always ? "✅ Yes" : "❌ No"}</p>
        <button class="mark-as-completed">
            Mark as Completed
        </button>
        <button class="delete-task">
            Delete
        </button>
            `;

            taskList.appendChild(taskCard);
            taskCard.querySelector(".mark-as-completed").addEventListener("click", () => markTaskAsCompleted(doc.id, task.always));
            taskCard.querySelector(".delete-task").addEventListener("click", () => deleteTask(doc.id));
        });

        // Show the assigned tasks container
        taskContainer.style.display = "block";


    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
    }
    
}
// Attach event listener
document.getElementById("view-assigned-tasks").addEventListener("click", fetchAssignedTasks);

  // ✅ Function to delete a task
  async function deleteTask(taskId) {
    await deleteDoc(doc(db, "tasks", taskId));
    console.log("Task deleted");
  }

  // ✅ Event Listener for Adding Task
  document.getElementById("addTaskBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-input").value;
    const username = sessionStorage.getItem("userName");
    const dateFrom = document.getElementById("task-start-date").value;
    const dateTo = document.getElementById("task-end-date").value;
    const timeFrom = document.getElementById("task-time").value;
    const always = document.getElementById("always-checkbox").checked;

    addTask(taskName, username, dateFrom, dateTo, timeFrom, always);
  });

  


  document.getElementById("always-checkbox").addEventListener("change", function() {
    let startDate = document.getElementById("task-start-date");
    let endDate = document.getElementById("task-end-date");
    if (this.checked) {
        startDate.disabled = true;
        endDate.disabled = true;
    } else {
        startDate.disabled = false;
        endDate.disabled = false;
    }
});

window.markTaskAsCompleted = async function(taskId, always) {
  try {
      const taskRef = doc(db, "tasks", taskId);

      if (always) {
          await updateDoc(taskRef, { status: "ongoing" });
          alert("Task will repeat daily.");
      } else {
          await updateDoc(taskRef, { status: "completed" });

          // Move the task to the "Completed" section
          const completedSection = document.getElementById("completed-tasks");
          const taskElement = document.getElementById(`task-${taskId}`);
          if (taskElement) {
              completedSection.appendChild(taskElement);
          }

          alert("Task marked as completed.");
      }

      // Refresh task list to reflect the changes
      fetchAssignedTasks();
  } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
  }
};