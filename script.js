const input = document.getElementById("goalInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("goalList");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Render goals
function renderGoals() {
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", goal.completed);

    li.innerHTML = `
      <input type="checkbox" ${goal.completed ? "checked" : ""}>
      <span>${goal.text}</span>
      <i class="fa-solid fa-trash delete"></i>
    `;

    // Toggle complete
    li.querySelector("input").addEventListener("change", () => {
      goals[index].completed = !goals[index].completed;
      saveGoals();
    });

    // Delete
    li.querySelector(".delete").addEventListener("click", () => {
      goals.splice(index, 1);
      saveGoals();
    });


    list.appendChild(li);
  });

  updateProgress();

}
function updateProgress() {
  if (goals.length === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "0% completed";
    return;
  }

  const completed = goals.filter(g => g.completed).length;
  const percent = Math.round((completed / goals.length) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% completed`;
}

const categorySelect = document.getElementById("category");

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  const category = categorySelect.value;

  if (text === "") return;

  goals.push({
    text,
    completed: false,
    category
  });

  input.value = "";
  saveGoals();
});

// Save to localStorage
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

// Add new goal
// addBtn.addEventListener("click", () => {
//   const text = input.value.trim();
//   if (text === "") return;

//   goals.push({ text, completed: false });
//   input.value = "";
//   saveGoals();
// });

// Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

renderGoals();
