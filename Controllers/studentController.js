import Student from "../Models/student.js";


function getStudents(req, res) {
    Student.find()
        .then((studentlist) => {
            res.json({
                list: studentlist,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: "An error occurred while fetching the student list.",
                details: error.message,
            });
        });
}

function createStudents(req, res) {
    const newStudent = new Student(req.body);

    newStudent
        .save()
        .then(() => {
            res.json({
                message: "Student created successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to create student",
                error: error.message,
            });
        });
}

function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name })
        .then(() => {
            res.json({
                message: "Student deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to delete student",
                error: error.message,
            });
        });
}

// Exporting the functions if needed

export {getStudents, createStudents,deleteStudent};
