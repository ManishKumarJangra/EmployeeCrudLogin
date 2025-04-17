export class Employee {
    id:number;
    name:string;
    address:string;
    phoneNumber:string;
    gender:any;
    roleId:number;
    roleName:any;
    constructor()
    {
        this.id = 0;
        this.name = "";
        this.address = "";
        this.phoneNumber = "";
        this.gender = "";
        this.roleId = 0;
        this.roleName = "";
    }
}

export class CreateEmp {
  name: string;
  address: string;
  phoneNumber: string;
  gender: any;
  roleId: number;
  constructor(){
    this.name = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.roleId = 0;
  }
}
export class UpdateEmp {
    id: number;
  name: string;
  address: string;
  phoneNumber: string;
  gender: any;
  roleId: number;
  constructor() {
    this.id = 0;
    this.name = '';
    this.address = '';
    this.phoneNumber = '';
    this.gender = '';
    this.roleId = 0;
  }
}