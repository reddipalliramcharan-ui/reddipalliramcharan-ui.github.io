// Get students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Form elements
const form = document.getElementById("studentForm");
const modal = document.getElementById("formModal");

// Display students when page loads
displayStudents();
updateStatistics();


// ===============================
// OPEN FORM
// ===============================

function openForm() {

    modal.style.display = "flex";

    document.getElementById("formTitle").textContent = "Add Student";

    form.reset();

    document.getElementById("editIndex").value = "";
}


// ===============================
// CLOSE FORM
// ===============================

function closeForm() {
    modal.style.display = "none";
}


// ===============================
// ADD / EDIT STUDENT
// ===============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("studentName").value.trim();

    const id =
        document.getElementById("studentId").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const phone =
        document.getElementById("studentPhone").value.trim();

    const gender =
        document.getElementById("studentGender").value;

    const department =
        document.getElementById("studentDepartment").value;

    const year =
        document.getElementById("studentYear").value;

    const percentage =
        document.getElementById("studentPercentage").value;

    const editIndex =
        document.getElementById("editIndex").value;


    // Check duplicate ID
    const duplicate = students.some((student, index) => {

        return student.id.toLowerCase() === id.toLowerCase()
            && index != editIndex;

    });


    if (duplicate) {

        alert("Student ID already exists!");

        return;
    }


    const student = {

        name: name,
        id: id,
        email: email,
        phone: phone,
        gender: gender,
        department: department,
        year: year,
        percentage: percentage

    };


    // Edit existing student
    if (editIndex !== "") {

        students[editIndex] = student;

        alert("Student updated successfully!");

    }

    // Add new student
    else {

        students.push(student);

        alert("Student added successfully!");

    }


    // Save data
    saveStudents();

    // Refresh display
    displayStudents();

    updateStatistics();

    // Close form
    closeForm();

});


// ===============================
// DISPLAY STUDENTS
// ===============================

function displayStudents() {

    const container =
        document.getElementById("studentContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const department =
        document.getElementById("departmentFilter")
        .value;


    container.innerHTML = "";


    // Filter students
    const filteredStudents = students.filter(student => {

        const matchesSearch =
            student.name.toLowerCase().includes(search) ||
            student.id.toLowerCase().includes(search) ||
            student.email.toLowerCase().includes(search);

        const matchesDepartment =
            department === "all" ||
            student.department === department;

        return matchesSearch && matchesDepartment;

    });


    // No students
    if (filteredStudents.length === 0) {

        container.innerHTML = `
            <div class="empty">
                <h3>No students found</h3>
                <p>Add a student or change your search.</p>
            </div>
        `;

        return;
    }


    // Display student cards
    filteredStudents.forEach(student => {

        const originalIndex =
            students.indexOf(student);

        const firstLetter =
            student.name.charAt(0).toUpperCase();


        const card = document.createElement("div");

        card.className = "student-card";


        card.innerHTML = `

            <div class="student-avatar">
                ${firstLetter}
            </div>

            <h3>${student.name}</h3>

            <p class="student-id">
                ID: ${student.id}
            </p>

            <div class="student-info">

                <p>
                    📧 <strong>Email:</strong>
                    ${student.email}
                </p>

                <p>
                    📱 <strong>Phone:</strong>
                    ${student.phone}
                </p>

                <p>
                    👤 <strong>Gender:</strong>
                    ${student.gender}
                </p>

                <p>
                    🏫 <strong>Department:</strong>
                    <span class="badge">
                        ${student.department}
                    </span>
                </p>

                <p>
                    📚 <strong>Year:</strong>
                    ${student.year}
                </p>

                <p>
                    📊 <strong>Percentage:</strong>
                    ${student.percentage}%
                </p>

            </div>

            <div class="card-buttons">

                <button
                    class="edit-btn"
                    onclick="editStudent(${originalIndex})">
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${originalIndex})">
                    🗑️ Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(index) {

    const student = students[index];


    document.getElementById("formTitle")
        .textContent = "Edit Student";


    document.getElementById("editIndex")
        .value = index;


    document.getElementById("studentName")
        .value = student.name;

    document.getElementById("studentId")
        .value = student.id;

    document.getElementById("studentEmail")
        .value = student.email;

    document.getElementById("studentPhone")
        .value = student.phone;

    document.getElementById("studentGender")
        .value = student.gender;

    document.getElementById("studentDepartment")
        .value = student.department;

    document.getElementById("studentYear")
        .value = student.year;

    document.getElementById("studentPercentage")
        .value = student.percentage;


    modal.style.display = "flex";

}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(index) {

    const studentName =
        students[index].name;


    const confirmation =
        confirm(
            `Are you sure you want to delete ${studentName}?`
        );


    if (!confirmation) {
        return;
    }


    students.splice(index, 1);


    saveStudents();

    displayStudents();

    updateStatistics();


    alert("Student deleted successfully!");

}


// ===============================
// CLEAR ALL STUDENTS
// ===============================

function clearAllStudents() {

    if (students.length === 0) {

        alert("There are no students to delete.");

        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete ALL students?"
        );


    if (!confirmation) {
        return;
    }


    students = [];


    saveStudents();

    displayStudents();

    updateStatistics();


    alert("All student records deleted!");

}


// ===============================
// SAVE TO LOCAL STORAGE
// ===============================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ===============================
// UPDATE STATISTICS
// ===============================

function updateStatistics() {

    document.getElementById("totalStudents")
        .textContent = students.length;


    const male =
        students.filter(
            student => student.gender === "Male"
        ).length;


    const female =
        students.filter(
            student => student.gender === "Female"
        ).length;


    const departments =
        new Set(
            students.map(
                student => student.department
            )
        ).size;


    document.getElementById("maleStudents")
        .textContent = male;


    document.getElementById("femaleStudents")
        .textContent = female;


    document.getElementById("totalDepartments")
        .textContent = departments;

}


// ===============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeForm();
    }

});