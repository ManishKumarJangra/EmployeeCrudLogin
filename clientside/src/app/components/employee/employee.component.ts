import { EmployeeService } from '../../services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from './../../models/employee/employee';
import 'datatables.net';
import 'datatables.net-bs4';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeesList: Employee[] = [];
  roles: { id: number; name: string }[] = [];
  genders: { id: number; name: string }[] = [];
  departments: {id: number; name: string }[] = [];
  dataTable: any;

  newEmpForm!: FormGroup;
  editEmpForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.employeeService.getRoles().subscribe((data) => {
      this.roles = data;
    });

    this.employeeService.getGenders().subscribe((data) => {
      this.genders = data;
    });

    this.employeeService.getDepartments().subscribe((data) => {
      this.departments = data;
    });

    // Validators for new Employee form
    this.newEmpForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      roleId: [0, Validators.required],
      departmentId: [0, Validators.required],
    });
    // Validators for editEmployee form
    this.editEmpForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      roleId: [0, Validators.required],
      departmentId: [0, Validators.required],
    });
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (res) => {
        this.employeesList = res;
        console.log(this.employeesList);

        // DataTable Implementation
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        setTimeout(() => {
          this.dataTable = $('#tblData').DataTable({
            paging: true,
            searching: true,
            ordering: true,
          });
        }, 0);
      },
      (error) => {
        console.log('Unable to access API!');
      }
    );
  }

  saveClick() {
    if (this.newEmpForm.invalid) return; //If form is invalid, Stops further execution
    // console.log(this.newEmployee);
    this.employeeService.saveEmployee(this.newEmpForm.value).subscribe(
      () => {
        Swal.fire('Success!', 'Employee added successfully!', 'success');
        this.toastr.success('Employee added successfully!', 'Success', {
          progressBar: true,
        });
        this.getAllEmployees();
        this.newEmpForm.reset();
        $('#newEmployee').modal('hide');
      },
      () => {
        console.log('unable to read API');
        this.toastr.error('Something went wrong!', 'Error');
      }
    );
  }

  editClick(emp: Employee) {
    this.editEmpForm.patchValue(emp);
  }

  updateClick() {
    if (this.editEmpForm.invalid) return; //If form is invalid, Stops further execution

    this.employeeService
      .updateEmployee(this.editEmpForm.value.id, this.editEmpForm.value)
      .subscribe(
        (response) => {
          Swal.fire('Success!', 'Employee data has been updated', 'success');
          this.toastr.success('Employee updated successfully!', 'Success', {
            progressBar: true,
          });
          this.getAllEmployees();
          this.editEmpForm.reset();
          $('#editEmployee').modal('hide');
        },
        (error) => {
          console.log('unable to access API');
          this.toastr.error('Something went wrong!', 'Error');
        }
      );
  }

  deleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure to Delete this?',
      text: 'You would not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete Data',
      cancelButtonText: 'cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(
          (response) => {
            this.getAllEmployees();

            Swal.fire('Deleted!', 'Employee has been deleted', 'success');
            this.toastr.success('Employee deleted successfully!', 'Success', {
              progressBar: true,
            });
          },
          (error) => {
            console.log('Unable to access API');
            this.toastr.error('Something went wrong!', 'Error');
          }
        );
      }
    });
  }
}
