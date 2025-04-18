import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  totalRecords = 0;
  search = '';
  pageNumber = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    const params = {
      search: this.search,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this.studentService.getStudents(params).subscribe((response) => {
      this.students = response.data;
      this.totalRecords = response.totalRecords;
    });
  }

  onSearchChange() {
    this.pageNumber = 1;
    this.getStudents();
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.getStudents();
  }

  onPageSizeChange() {
    this.pageNumber = 1;
    this.getStudents();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalRecords / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }
}
