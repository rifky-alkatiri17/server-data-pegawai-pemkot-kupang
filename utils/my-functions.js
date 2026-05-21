const fs = require('fs'); //core modules

const loadEmployees = ()=>{
	const fileBuffer = fs.readFileSync('./data/pegawai.json','utf-8');
	const employees = JSON.parse(fileBuffer);
	return employees
}

/*const findEmployee = (nama)=>{
	const employees = loadEmployee();
	const employee = employees.filter(item=>item.nama.toLowerCase() === nama.toLowerCase());
	return employee
}*/

// menggunakan includes
const findEmployee = (nama)=>{
	const employees = loadEmployees();
	const employee = employees.filter(item=>item.Nama.toLowerCase().includes(nama.toLowerCase()));
	return employee
}

const addEmployee = (myobjek)=>{
	const employees = loadEmployees();
	employees.push(myobjek)
}



module.exports = {loadEmployees, findEmployee, addEmployee}