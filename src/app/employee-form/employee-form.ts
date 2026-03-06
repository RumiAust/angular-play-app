import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css', // Angular 21 supports this shorthand
})
export class EmployeeForm {

  employeeForm!: FormGroup;
  showModal = false;
  imagePreview: string | ArrayBuffer | null = null;
  imageError = false;

  skillsList = ['Angular', 'React', 'Node', 'Vue'];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^0?[0-9]{10,14}$') // 10–12 digits, optional leading 0
      ]],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      employmentType: ['Full Time', Validators.required],
      skills: this.fb.array([], this.skillsValidator)
    });
  }

  // Getter for skills FormArray
  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  // Custom validator: at least one skill must be selected
  skillsValidator(control: AbstractControl): ValidationErrors | null {
    const arr = control as FormArray;
    return arr.length > 0 ? null : { required: true };
  }

  // Handle skill checkbox changes
  onSkillChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.skills.push(this.fb.control(value));
    } else {
      const index = this.skills.controls.findIndex(x => x.value === value);
      this.skills.removeAt(index);
    }
    this.skills.markAsTouched();
  }

  // Handle image upload
  onImageUpload(event: any) {
    const file = event.target.files[0];

    if (!file) {
      this.imageError = true;
      return;
    }

    this.imageError = false;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // Show modal preview
  previewData() {
    if (this.employeeForm.invalid || !this.imagePreview) {
      this.employeeForm.markAllAsTouched();
      this.imageError = !this.imagePreview;

      // Alert if validation fails
      alert('Please fill all required fields correctly, including profile image.');
      return;
    }

    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }

}