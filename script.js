/* ==========================================
   MADRISSA ATTENDANCE REGISTER PWA
   SCRIPT.JS FINAL VERSION - PART 1
   Database + Student Management
   Watermark: M Ijaz GHS 124 NB
========================================== */


// Storage Keys

const STUDENT_KEY = "madrissa_students_v1";
const INFO_KEY = "madrissa_info_v1";


// Main Database

let students =
JSON.parse(
localStorage.getItem(STUDENT_KEY)
) || [];



// HTML Elements

const tableBody =
document.querySelector(
"#attendanceTable tbody"
);


const madrissaName =
document.getElementById(
"madrissaName"
);


const inchargeName =
document.getElementById(
"inchargeName"
);


const dateInput =
document.getElementById(
"date"
);





// =============================
// Load Madrissa Information
// =============================

function loadInfo(){

let info =
JSON.parse(
localStorage.getItem(INFO_KEY)
);


if(info){

madrissaName.value =
info.name || "";


inchargeName.value =
info.incharge || "";


dateInput.value =
info.date || "";

}

}





// =============================
// Save Madrissa Information
// =============================

function saveInfo(){


let info={

name:madrissaName.value,

incharge:inchargeName.value,

date:dateInput.value

};


localStorage.setItem(

INFO_KEY,

JSON.stringify(info)

);


}



// Auto Save

madrissaName.addEventListener(
"input",
saveInfo
);


inchargeName.addEventListener(
"input",
saveInfo
);


dateInput.addEventListener(
"change",
saveInfo
);






// =============================
// Save Students
// =============================

function saveStudents(){

localStorage.setItem(

STUDENT_KEY,

JSON.stringify(students)

);

}







// =============================
// Add Student
// =============================

document
.getElementById("addStudent")
.addEventListener(
"click",
addStudent
);



function addStudent(){


let name =
prompt(
"طالب علم کا نام لکھیں"
);



if(!name || name.trim()=="")
return;



let roll =
students.length + 1;



let student={


id:Date.now(),


roll:roll,


name:name.trim(),



prayers:{


fajr:"",

zuhr:"",

asr:"",

maghrib:"",

isha:""


},



present:0,

absent:0,

leave:0


};



students.push(student);



saveStudents();



renderStudents();


}







// =============================
// Delete Student
// =============================

function deleteStudent(id){


let confirmDelete =
confirm(
"کیا طالب علم Delete کرنا ہے؟"
);



if(!confirmDelete)
return;



students =
students.filter(
student =>
student.id !== id
);



saveStudents();


renderStudents();


}






// =============================
// Edit Student
// =============================

function editStudent(id){


let student =
students.find(
s=>s.id===id
);



if(!student)
return;



let newName =
prompt(
"نیا نام لکھیں",
student.name
);



if(newName){

student.name =
newName.trim();



saveStudents();


renderStudents();

}


}






// =============================
// Basic Table Render
// (Attendance Buttons Part 2)
// =============================


function renderStudents(){


if(!tableBody)
return;



tableBody.innerHTML="";



students.forEach(
(student,index)=>{


let row =
document.createElement("tr");



row.innerHTML=`

<td>${student.roll}</td>

<td>${student.name}</td>


<td>${student.prayers.fajr}</td>

<td>${student.prayers.zuhr}</td>

<td>${student.prayers.asr}</td>

<td>${student.prayers.maghrib}</td>

<td>${student.prayers.isha}</td>


<td>

<button 
class="editBtn"
onclick="editStudent(${student.id})">

Edit

</button>

</td>


<td>

<button
class="deleteBtn"
onclick="deleteStudent(${student.id})">

Delete

</button>

</td>


`;



tableBody.appendChild(row);



});


}






// =============================
// Start Application
// =============================


loadInfo();

renderStudents();




// Global Access

window.editStudent =
editStudent;


window.deleteStudent =
deleteStudent;
