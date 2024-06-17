import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-registration-pop-up',
  templateUrl: './registration-pop-up.component.html',
  styleUrls: ['./registration-pop-up.component.css']
})
export class RegistrationPopUpComponent {
  selectedImage: any;
  selectedAge: number = 20; // Default age
  formData: any = {};

  constructor(private formDataService: DataserviceService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAgeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedAge = +target.value;
  }

  submitForm() {
    // Store form data using the service
    this.formDataService.setFormData(this.formData);
    // Reset form after submission
    this.closeForm();
    // Optionally, navigate to the homepage
    // this.router.navigate(['/home']);
  }

  closeForm() {
    this.selectedImage = null;
    this.selectedAge = 20; // Reset age to default
    this.formData = {}; // Reset form data object
  }
}
