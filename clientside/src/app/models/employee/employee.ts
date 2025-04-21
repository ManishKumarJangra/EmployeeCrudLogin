export class Employee {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  gender: any;
  roleId: number;
  roleName: string;
  departmentId: number;
  departmentName: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.roleId = 0;
    this.roleName = '';
    this.departmentId = 0;
    this.departmentName = '';
  }
}