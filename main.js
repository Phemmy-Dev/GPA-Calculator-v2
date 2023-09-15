const form = document.getElementById("gpa-form");
const courseCodeInput = document.getElementById("course-code");
const courseUnitInput = document.getElementById("course-unit");
const gradeInput = document.getElementById("grade");
const gradeTable = document.getElementById("grade-table");
const totalGpa = document.getElementById("total-gpa");
const addGradeButton = document.getElementById("add-grade");
const removeLastButton = document.getElementById("remove-last");
const downloadScreenshotButton = document.getElementById("download-screenshot");
const gpaContainer = document.getElementById("container");
const gpaResults = document.getElementById("gpa-results");
const toggleModeButton = document.getElementById("toggle-mode");
const body = document.body;
const gpaScoreSummary = document.getElementById("gpaSummary");

const grades = [];

addGradeButton.addEventListener("click", () => {
  const courseCode = courseCodeInput.value;
  const courseUnit = parseFloat(courseUnitInput.value);
  const grade = parseFloat(gradeInput.value);

  if (!courseCode || isNaN(courseUnit) || isNaN(grade)) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  grades.push({ courseCode, courseUnit, grade });
  updateGradeTable();
  calculateGPA();
  clearForm();
});

removeLastButton.addEventListener("click", () => {
  if (grades.length > 0) {
    grades.pop();
    updateGradeTable();
    calculateGPA();
  }
});

function updateGradeTable() {
  gradeTable.innerHTML = "";
  grades.forEach((entry) => {
    const row = gradeTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.textContent = entry.courseCode;
    cell2.textContent = entry.courseUnit;
    cell3.textContent = entry.grade;
  });
}

function calculateGPA() {
  if (grades.length === 0) {
    totalGpa.textContent = "0.0";
    return;
  }

  let totalPoints = 0;
  let totalUnits = 0;

  grades.forEach((entry) => {
    totalPoints += entry.courseUnit * entry.grade;
    totalUnits += entry.courseUnit;
  });

  const gpa = (totalPoints / totalUnits).toFixed(2);
  totalGpa.textContent = gpa;
}

function clearForm() {
  courseCodeInput.value = "";
  courseUnitInput.value = "";
  gradeInput.value = "5"; // Set default grade to 'A'
}

downloadScreenshotButton.addEventListener("click", () => {
  // Preload any custom fonts (if applicable)
  // Example: document.fonts.load('16px YourCustomFont');

  // Use html2canvas with configuration to capture at a higher scale
  html2canvas(gpaResults, {
    scale: 4, // Increase the scale factor for better quality
    useCORS: true, // Enable CORS for external resources (e.g., images from other domains)
  }).then((canvas) => {
    // Create an "a" element to trigger the download
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "yourr_gpa_screenshot.png";
    a.click();
  });
});

// Toggle mode when the button is clicked
toggleModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Store the user's preference in localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", "dark");
    toggleModeButton.textContent = "Light Mode"; // Switch to Light mode
  } else {
    localStorage.setItem("mode", "light");
    toggleModeButton.textContent = "Dark Mode"; // Switch to Dark mode
  }
});
