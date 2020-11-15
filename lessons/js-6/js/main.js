'use strict';

showEmployee.addEventListener('click', showEmployeeList);

function showEmployeeList() {
	let employeeList = JSON.parse(localStorage.getItem('employeeList')),
		list = document.querySelector('.list'),
		listItems = document.querySelectorAll('.list__item');

	if (employeeList === null) {
		showWarning('Add Employee first');
		return;
	}

	preloader();

	listItems.forEach((item) => {
		item.remove();
	});

	employeeList.forEach((emp, i) => {
		let draw = new Draw(emp, i + 1);

		list.append(draw.render());
	});
}

class Employee {
	constructor(
		firstName,
		lastName,
		role,
		phone,
		id
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.phone = phone;
		this.id = id;
	}

	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

class Window {
	constructor(employee,
				editMode) {

		this.employee = employee;
		this.editMode = editMode;
		this.window = document.querySelector('.window-overlay');
		this.closeBtn = document.querySelector('.close-btn');
		this.saveBtn = document.querySelector('.save');

		if (roleDropdown.innerHTML === '') {
			this.roles = [
				'Admin',
				'Writer',
				'Actor',
				'Doctor',
				'Engineer'
			];
			this.roles.forEach((role) => {
				roleDropdown.innerHTML += `<option value="${role}">${role}</option>`;
			});
		}
	}

	show() {
		if (this.editMode) {
			firstName.value = this.employee.firstName;
			lastName.value = this.employee.lastName;
			roleDropdown.value = this.employee.role;
			phone.value = this.employee.phone;
		}

		this.window.classList.add('show');
	}

	close() {
		this.window.classList.remove('show');

		firstName.value = '';
		lastName.value = '';
		roleDropdown.value = roleDropdown[0].value;
		phone.value = '';
	}

	save() {
		if (firstName.value === '' ||
			lastName.value === '' ||
			phone.value === '') {
			showWarning('Please fill all fields');
			return;
		}


		let item = localStorage.getItem('employeeList'),
			list = item ? JSON.parse(item) : [],
			employee = new Employee(firstName.value, lastName.value, roleDropdown.value, phone.value, `${lastName.value}-${list.length}`);

		list.push(employee);

		localStorage.setItem('employeeList', JSON.stringify(list));

		this.close();
		showEmployeeList();
	}
}

class Draw {
	constructor(employee,
				count) {
		this.employee = employee;
		this.count = count;
	}

	render() {
		let item = document.createElement('li'),
			number = document.createElement('div'),
			name = document.createElement('div'),
			role = document.createElement('div'),
			phone = document.createElement('div'),
			actions = document.querySelector('.list__actions').cloneNode(true);
		
		// add classes
		item.className = 'list__item';
		number.className = 'list__number';
		name.className = 'list__name';
		role.className = 'list__role';
		phone.className = 'list__phone';

		item.dataset.id = this.employee.id;

		// add text
		number.innerText = this.count;
		name.innerText = `${this.employee.firstName} ${this.employee.lastName}`;
		role.innerText = this.employee.role;
		phone.innerText = this.employee.phone;

		// Event Listeners
		actions.querySelector('.delete').addEventListener('click', () => {
			this.delete(this.employee);
		});
		actions.querySelector('.edit').addEventListener('click', () => {
			this.edit(this.employee);
		});

		// Append items
		item.append(number, name, role, phone, actions);
		return item;
	}

	delete(employee) {
		let confirmation = window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`);

		if (confirmation) {
			let list = JSON.parse(localStorage.getItem('employeeList'));
		
			for (let i = list.length - 1; i >= 0; i--) {
				if (list[i].id == employee.id) {
					list.splice(i, 1);
				}
			}
	
			localStorage.setItem('employeeList', JSON.stringify(list));
			showEmployeeList();
		}
	}

	edit(employee) {
		let windowEdit = new Window(employee, true);

		windowEdit.show();
	}
}

let windowAdd = new Window({}, false);
addEmployee.addEventListener('click', () => {
	windowAdd.show();
});

windowAdd.closeBtn.addEventListener('click', () => {
	windowAdd.close();
});

windowAdd.saveBtn.addEventListener('click', () => {
	windowAdd.save();
});

// Show warning
function showWarning(message) {
    let dialog = document.createElement('div'),
        dialogOverlay = document.createElement('div');
    
    dialogOverlay.className = 'dialog-overlay';
    dialog.className = 'dialog';

    dialog.innerHTML = `<p>${message}</p>`;

    document.body.append(dialogOverlay, dialog);

    setTimeout(() => {
        dialogOverlay.remove();
        dialog.remove();
    }, 3000);
}

// Preloader
function preloader() {
	let content = document.querySelector('.content');

	content.classList.add('loading');

	setTimeout(() => {
		content.classList.remove('loading');
	}, 500);
}