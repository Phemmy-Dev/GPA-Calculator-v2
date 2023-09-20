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
const clearHistoryButton = document.getElementById("clear-history");


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


function removeCourseAtIndex(index) {
  if (index >= 0 && index < grades.length) {
    grades.splice(index, 1);
    updateGradeTable();
    calculateGPA();
  }
}

// function to convert numeric grade points to letter grades
function numericToLetterGrade(numericGrade) {
  // mapping of numeric grades to letter grades here
  if (numericGrade >= 4.5) {
    return "A";
  } else if (numericGrade >= 3.5) {
    return "B";
  } else if (numericGrade >= 2.5) {
    return "C";
  } else if (numericGrade >= 1.5) {
    return "D";
  } else if (numericGrade >= 0.5) {
    return "E";
  } else {
    return "F";
  }
}


function updateGradeTable() {
  gradeTable.innerHTML = "";
  grades.forEach((entry, index) => {
    const row = gradeTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.textContent = entry.courseCode;
    cell2.textContent = entry.courseUnit;
    
    // Displaying the letter grade instead of numeric grade
    cell3.textContent = numericToLetterGrade(entry.grade);

    //A button to create a delete button and add an event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      removeCourseAtIndex(index);
    });
    cell4.appendChild(deleteButton);
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

  // Saving the grades to localStorage
  localStorage.setItem("grades", JSON.stringify(grades));
}

// Retrieving grades from localStorage on page load
const savedGrades = JSON.parse(localStorage.getItem("grades"));
if (savedGrades) {
  grades.push(...savedGrades); // Push saved grades into the grades array
  updateGradeTable();
  calculateGPA();
}



clearHistoryButton.addEventListener("click", () => {
  localStorage.removeItem("grades"); // Clear the saved grades from localStorage
  grades.length = 0; // Clear the grades array
  updateGradeTable();
  calculateGPA();
});


function clearForm() {
  courseCodeInput.value = "";
  courseUnitInput.value = "";
  gradeInput.value = "5"; // Set default grade to 'A'
}

downloadScreenshotButton.addEventListener("click", () => {


  html2canvas(gpaResults, {
    scale: 4, // Increase the scale factor for better quality
    useCORS: true,
  }).then((canvas) => {
    // Create an "a" element to trigger the download
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "yourr_gpa_screenshot.png";
    a.click();
  });
});

// Toggle button when the button is clicked
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


