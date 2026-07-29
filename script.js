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
/* ==========================================
   MADRISSA ATTENDANCE REGISTER PWA
   SCRIPT.JS FINAL VERSION - PART 2
   Five Prayers Attendance System
========================================== */


// =============================
// Attendance Status Function
// =============================

function markAttendance(
    studentId,
    prayer,
    status
){

let student =
students.find(
s=>s.id===studentId
);



if(!student)
return;



// Save Prayer Status

student.prayers[prayer] = status;



// Calculate Total

calculateAttendance(student);



// Save Database

saveStudents();


// Refresh Table

renderStudents();


}






// =============================
// Calculate Student Attendance
// =============================

function calculateAttendance(student){


let present = 0;

let absent = 0;

let leave = 0;



Object.values(student.prayers)
.forEach(value=>{


if(value==="Present"){

present++;

}


else if(value==="Absent"){

absent++;

}


else if(value==="Leave"){

leave++;

}


});



student.present = present;

student.absent = absent;

student.leave = leave;


}








// =============================
// Prayer Attendance Buttons
// =============================

function attendanceButtons(
studentId,
prayer
){



return `


<div class="attendance-btn">


<button 
class="present"
onclick="markAttendance(
${studentId},
'${prayer}',
'Present'
)">

P

</button>



<button
class="absent"
onclick="markAttendance(
${studentId},
'${prayer}',
'Absent'
)">

A

</button>




<button
class="leave"
onclick="markAttendance(
${studentId},
'${prayer}',
'Leave'
)">

L

</button>


</div>


`;

}








// =============================
// Replace Table Render
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

<td>

${student.roll}

</td>



<td>

${student.name}

</td>





<td>

${attendanceButtons(
student.id,
"fajr"
)}

<br>

${student.prayers.fajr}

</td>





<td>

${attendanceButtons(
student.id,
"zuhr"
)}

<br>

${student.prayers.zuhr}

</td>





<td>

${attendanceButtons(
student.id,
"asr"
)}

<br>

${student.prayers.asr}

</td>





<td>

${attendanceButtons(
student.id,
"maghrib"
)}

<br>

${student.prayers.maghrib}

</td>





<td>

${attendanceButtons(
student.id,
"isha"
)}

<br>

${student.prayers.isha}

</td>






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






// Global Access

window.markAttendance =
markAttendance;


window.attendanceButtons =
attendanceButtons;
/* ==========================================
   MADRISSA ATTENDANCE REGISTER PWA
   SCRIPT.JS FINAL VERSION - PART 3
   Dashboard + Monthly Report + Search
========================================== */



// =============================
// Calculate All Attendance
// =============================

function calculateMonthlyAttendance(){


let totalPresent = 0;

let totalAbsent = 0;

let totalLeave = 0;



students.forEach(student=>{


totalPresent += student.present;


totalAbsent += student.absent;


totalLeave += student.leave;


});



return {

present: totalPresent,

absent: totalAbsent,

leave: totalLeave

};


}







// =============================
// Update Dashboard
// =============================

function updateDashboard(){


let data =
calculateMonthlyAttendance();



let totalStudents =
document.getElementById(
"totalStudents"
);



let totalPresent =
document.getElementById(
"totalPresent"
);



let totalAbsent =
document.getElementById(
"totalAbsent"
);



let totalLeave =
document.getElementById(
"totalLeave"
);




if(totalStudents){

totalStudents.innerText =
students.length;

}



if(totalPresent){

totalPresent.innerText =
data.present;

}



if(totalAbsent){

totalAbsent.innerText =
data.absent;

}



if(totalLeave){

totalLeave.innerText =
data.leave;

}



}





// =============================
// Monthly Report
// =============================

function monthlyReport(){


let box =
document.getElementById(
"monthlyReport"
);



if(!box)
return;



let data =
calculateMonthlyAttendance();



box.innerHTML = `


<h3>
Monthly Attendance Summary
</h3>


<p>
Total Students:
${students.length}
</p>


<p>
Present:
${data.present}
</p>


<p>
Absent:
${data.absent}
</p>


<p>
Leave:
${data.leave}
</p>


`;



}








// =============================
// Search Student
// =============================

const searchBox =
document.getElementById(
"searchBox"
);



if(searchBox){


searchBox.addEventListener(
"input",
function(){


let value =
this.value
.toLowerCase();



let rows =
document.querySelectorAll(
"#attendanceTable tbody tr"
);



rows.forEach(row=>{


let name =
row.children[1]
.innerText
.toLowerCase();



if(
name.includes(value)
){


row.style.display="";


}

else{


row.style.display="none";


}



});


});


}








// =============================
// Update Everything After Change
// =============================


function refreshDashboard(){


updateDashboard();

monthlyReport();


}




// Auto Refresh

setInterval(

refreshDashboard,

1000

);






// Initial Load

refreshDashboard();




// Global

window.calculateMonthlyAttendance =
calculateMonthlyAttendance;


window.updateDashboard =
updateDashboard;


window.monthlyReport =
monthlyReport;
