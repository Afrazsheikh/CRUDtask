import { Component } from '@angular/core';
import { EmplopyeeService } from './Services/emplopyee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { EmplopyeeService } from '../app/Services/emplopyee.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: any[] = [];
  sortField = 'name';
  sortOrder = 'asc';
  emForm: FormGroup;
  editingMode = false;
selectedEmployee: any; // To store the selected employee for editing


  constructor(private employeeService: EmplopyeeService,private formBuilder: FormBuilder) {
     this.emForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
    
  });}

  ngOnInit() {
    this.getAllEm()
    // this.getSortedEmployees();
  }
getAllEm(){
  this.employeeService
      .getEmployees()
      .subscribe(
        (data) => {
          console.log(data);
          
          this.employees = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
}
  getSortedEmployees() {
    this.employeeService
      .getSortedEmployees(this.sortField, this.sortOrder)
      .subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
  }
  sortBy(column: string) {
    if (this.sortField === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = column;
      this.sortOrder = 'asc';
    }
    this.getSortedEmployees();
  }
  addEmployee() {
    console.log(this.emForm.value);
    
    this.employeeService.addEmployee(this.emForm.value).subscribe(
      (response) => {
        window.alert("saved succuess")
        console.log('Employee added:', response);
        this.getAllEm(); // Refresh the employee list
      },
      (error) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  // editEmployee(employee: any): void {
  //   this.emForm.patchValue({
  //     name: employee.name,
  //     department: employee.department,
  //     salary: employee.salary
  //   });
    
  // }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        window.alert("Employee deleted successfully");
        this.getAllEm(); // Refresh the employee list
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
  
  


toggleEditUpdateMode(employee: any): void {
  if (this.editingMode) {
    this.updateEmployee();
  } else {
    this.editEmployee(employee);
  }
}

editEmployee(employee: any): void {
  this.selectedEmployee = employee;
  this.emForm.setValue({
    name: employee.name,
    department: employee.department,
    salary: employee.salary
  });
  this.editingMode = true;
}

updateEmployee(): void {
  const editedEmployee = this.emForm.value;
  const employeeId = this.selectedEmployee._id;
  
  this.employeeService.updateEmployee(employeeId, editedEmployee).subscribe(
    (response) => {
      window.alert("Employee updated successfully");
      this.getAllEm();
   this.emForm.reset()
      this.editingMode = false; // Exit editing mode after update
    },
    (error) => {
      console.error('Error updating employee:', error);
    }
  );
}

}