import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  employeeForm: FormGroup;
  showModal = false;
  imagePreview: any;

  constructor(private fb: FormBuilder) {

    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      department: [''],
      salary: [''],
      address: ['']
    });

  }

  previewData() {
    this.showModal = true;
  }

  onImageUpload(event: any) {

    const file = event.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);

    }

  }

}
