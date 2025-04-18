import { EmployeeService } from '../../services/employee/employee.service';
import {Component, OnInit } from '@angular/core';
import {
  CreateEmp,
  Employee,
  UpdateEmp,
} from './../../models/employee/employee';
import 'datatables.net';
import 'datatables.net-bs4';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeesList: Employee[] = [];
  newEmployee: CreateEmp = new CreateEmp();
  editEmployee: UpdateEmp = new UpdateEmp();
  roles: { id: number; name: string }[] = [];
  genders: { id: number; name: string }[] = [];
  dataTable: any;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

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

  ngOnInit() : void {
    this.getAllEmployees();
    this.employeeService.getRoles().subscribe((data) => {
      this.roles = data;
    });

    this.employeeService.getGenders().subscribe((data) => {
      this.genders = data;
    });
  }

  saveClick() {
    // console.log(this.newEmployee);
    this.employeeService.saveEmployee(this.newEmployee).subscribe(
      (response) => {
        Swal.fire('Success!', 'Employee added successfully!', 'success');
        this.toastr.success('Employee added successfully!', 'Success', {
          progressBar: true,
        });
        this.getAllEmployees();
        this.clearRec();
      },
      (error) => {
        console.log('unable to read API');
        this.toastr.error('Something went wrong!', 'Error');
      }
    );
  }

  editClick(emp: any) {
    this.editEmployee = emp;
  }

  updateClick() {
    this.employeeService
      .updateEmployee(this.editEmployee.id, this.editEmployee)
      .subscribe(
        (response) => {
          Swal.fire('Success!', 'Employee data has been updated', 'success');
          this.toastr.success('Employee updated successfully!', 'Success', {
            progressBar: true,
          });
          this.getAllEmployees();
          this.clearRec();
        },
        (error) => {
          console.log('unable to access API');
          this.toastr.error('Something went wrong!', 'Error');
        }
      );
  }

  private clearRec() {
    this.newEmployee.name = '';
    this.newEmployee.address = '';
    this.newEmployee.phoneNumber = '';
    this.newEmployee.gender = '';
    this.newEmployee.roleId = 0;
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
