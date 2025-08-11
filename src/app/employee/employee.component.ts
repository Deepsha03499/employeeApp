import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonService } from '../services/common.service';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  
  Math = Math;
  constructor(
    private service: EmployeeService, 
    private fb: FormBuilder,
    private commonS: CommonService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.empForm();
    this.getDepartments();
  }

  searchTerm: string = '';
  totalCount: number = 0;
  pageNo: number = 1;
  pageSize: number = 10;
  employees: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50];
  employeeForm!: FormGroup;

  isLoading = false;
    getEmployees() {
      let payload = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        searchTerm : this.searchTerm
          }
          this.service.getEmployee(payload).subscribe({
        next: (res) => {
          this.employees = res.response.employees;
          this.totalCount = res.response.totalCount;
          this.pageSize = res.response.pageSize;
          this.pageNo = res.response.pageNo;
        },
        error: (err) => {
          console.error('Error fetching employees:', err);
        }
      });
    }

    onSearchChange() {
      this.pageNo = 1;
      this.getEmployees();
    }

    onPageSizeChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      this.pageSize = Number(selectElement.value);
      this.pageNo = 1;
      this.getEmployees();
    }
    
    goToPage(page: number) {
      if (page >= 1 && page <= Math.ceil(this.totalCount / this.pageSize)) {
        this.pageNo = page;
        this.getEmployees();
      }
    }

    // Form handling
    empForm(){
      this.employeeForm = this.fb.group({
        Employee_Id: [0],
        Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        DepartmentId: [0],
        Email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        Phone_Number: ['', [Validators.required, Validators.pattern(/^[1-9]\d{9}$/)]]
      });
    }

    markAllAsTouched() {
      Object.values(this.employeeForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    onSubmit() {
      if (!this.employeeForm.valid) {
          this.markAllAsTouched();
          console.log(this.employeeForm.value);
          return;
      }
      this.isLoading = true;
      const formData = this.employeeForm.value;
      const request = formData.Employee_Id > 0 ? this.service.updateEmployee(formData) : this.service.addEmployee(formData);
    
      request.subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(`Employee ${formData.Employee_Id > 0 ? 'updated' : 'added'} successfully:`, res);
          this.getEmployees();
          alert(`Employee ${formData.Employee_Id > 0 ? 'updated' : 'added'} successfully`);
          this.employeeForm.reset({
            Employee_Id:0
          });
        },
        error: (err) => {
          console.error(`Error ${formData.Employee_Id > 0 ? 'updating' : 'adding'} employee:`, err);
          this.isLoading = false;
        }
      });
      this.closeModal();
    }

    formModal: boolean = false;
    openModal() {
      this.formModal = true;
    }
    closeModal() {
      this.employeeForm.reset({
        Employee_Id: 0
      });
      this.formModal = false;
      this.deleteModal = false;
    }
    editModal(emp: any) {
      this.formModal = true;
      this.employeeForm.patchValue({
        Employee_Id: emp.employee_Id,
        Name: emp.name,
        DepartmentId: emp.departmentId,
        Email: emp.email,
        Phone_Number: emp.phone_Number
      });
    }

    // deletion handling
    deleteModal: boolean = false;

    selectedEmpId: number | null = null;

    openDeleteModal(emp: any) {
      this.selectedEmpId = emp;
      console.log('Opening delete modal for employee ID:', emp);
      console.log('Selected Employee ID:', this.selectedEmpId);
      this.deleteModal = true;
    }

    confirmDelete() {
      if (!this.selectedEmpId) return;
      this.isLoading = true;
      console.log('Deleting employee with ID:', this.selectedEmpId);
      this.service.deleteEmployee(this.selectedEmpId).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Employee deleted successfully:', res);
          this.getEmployees();
          alert('Employee deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.isLoading = false;
        }
      });
      this.closeModal();
    }

    // department List
    departments: any[] = [];

    getDepartments(): void {
      this.commonS.getDeparment().subscribe({
        next: (res) => {
          console.log(res);
          this.departments = res.departments;
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.isLoading = false;
        }
      });
    }
}
