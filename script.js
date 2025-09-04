// Example: Dynamic Progress Update
let lessonsCompleted = 7;
let totalLessons = 10;

const progress = document.getElementById("progress");
const lessonCount = document.getElementById("lesson-count");

function updateProgress() {
  let percent = (lessonsCompleted / totalLessons) * 100;
  progress.style.width = percent + "%";
  lessonCount.textContent = lessonsCompleted;
}

// Example: Increase lesson count on click
progress.addEventListener("click", () => {
  if (lessonsCompleted < totalLessons) {
    lessonsCompleted++;
    updateProgress();
  }
});

updateProgress();
