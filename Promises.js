//not related to the back end this is theory part
const studentOne = null;

try {
  const value = studentOne.parent.age - studentOne.age;
  console.log(value);
} catch (e) {
  console.log("There was an error" + e);
}

console.log("Program ended successfully");



function getStudents(password) {
  const p = new Promise((resolve, reject) => {
    if (password == 123) {
      
      setTimeout(() => {
        resolve([
          {
            name: "Malith",
            age: 25,
          },
          {
            name: "Dilshan",
            age: 25,
          },
          {
            name: "Sandaruwan",
            age: 25,
          },
        ]);
      }, 10000);
      
    } else {
      
      setTimeout(() => {
        reject("The student list cannot be fetched : password error");
      }, 10000);
      
    }
  });

  return p;
}

getStudents(123)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


function getStudents(password) {
  const p = new Promise((resolve, reject) => {
    if (password == 123) {
      setTimeout(() => {
        resolve([
          {
            name: "Malith",
            age: 25,
          },
          {
            name: "Dilshan",
            age: 25,
          },
          {
            name: "Sandaruwan",
            age: 25,
          },
        ]);
      }, 10000);
    } else {
      setTimeout(() => {
        reject("The student list cannot be fetched : password error");
      }, 10000);
    }
  });

  return p;
}

async function printStudents() {
  
  try {
    
    const studentList = await getStudents(124);
    console.log(studentList);
    
  } catch (e) {
    console.log(e);
  }
  

  console.log("Program is ended");
}

printStudents();



