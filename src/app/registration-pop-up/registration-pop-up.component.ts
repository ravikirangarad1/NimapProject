import { Component, HostListener } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-registration-pop-up',
  templateUrl: './registration-pop-up.component.html',
  styleUrls: ['./registration-pop-up.component.css']
})




export class RegistrationPopUpComponent {
  selectedImage: any | ArrayBuffer | null = null;
  imageError: string | null = null;
  selectedAge: number = 20; // Default age
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  age: any
  state: any;

  pills: string[] = ['Cricket','football','hockey'];
  value: string | undefined;
  isFocussed: boolean | undefined;
  list: string[] = ['hallo', 'bye', 'all', 'farout'];
  filteredList: string[] | undefined;

  title = 'Add Employee form';
  empForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
      Validators.maxLength(20)
    ]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', [Validators.required, this.validatePhone]),
    state: new FormControl('',Validators.required),
    newsletter: new FormControl('',Validators.required),
    addressType: new FormControl(''),
    homeAddress1: new FormControl(''),
    homeAddress2: new FormControl(''),
    companyAddress1: new FormControl(''),
    companyAddress2: new FormControl(''),
    tags: new FormControl([]) // Form control to store selected tags
  });


  formData: any

  constructor(private formDataService: DataserviceService, private router: Router) { }

  ngOnInit(): void {
    this.onAddressTypeChange();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          console.log("img.width = ", img.width);
          console.log("img.height = ", img.height);
          if (img.width === 310 && img.height === 325) {
            this.selectedImage = e.target.result;
            this.imageError = null;
            this.formDataService.setImage(this.selectedImage);
          } else {
            this.imageError = 'Image dimensions must be 310x325 pixels.';
            this.selectedImage = null;
          }
        };
        img.onerror = () => {
          this.imageError = 'Invalid image file.';
          this.selectedImage = null;
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onAgeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedAge = +target.value;
  }

  addData() {
    this.formData = {
      firstName: this.empForm.value.firstName,
      lastName: this.empForm.value.lastName,
      email: this.empForm.value.email,
      phonenumber: this.empForm.value.phonenumber,
      age: this.selectedAge,
      state: this.empForm.value.state,
      tags: this.pills 
    };
    console.log(this.formData,"formdata");
    
    this.formDataService.setFormData(this.formData);
    this.router.navigate(['/job'])
  }

  closeForm() {
    this.selectedImage = null;
    this.selectedAge = 20; // Reset age to default
    // this.formData = {}; // Reset form data object
  }

  validatePhone(control: AbstractControl) {
    const phoneNumber = control.value;
    if (phoneNumber && phoneNumber.toString().length !== 10) {
      return { InvalidPhone: true };
    }
    return null;
  }
  sanitizeInput(event: any) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');
    event.target.value = sanitizedValue;
  }

  onAddressTypeChange(): void {
    this.empForm.get('addressType')?.valueChanges.subscribe(value => {
      if (value === 'Home') {
        this.empForm.get('homeAddress1')?.setValidators([Validators.required]);
        this.empForm.get('homeAddress2')?.setValidators([Validators.required]);
        this.empForm.get('companyAddress1')?.clearValidators();
        this.empForm.get('companyAddress2')?.clearValidators();
      } else if (value === 'Company') {
        this.empForm.get('homeAddress1')?.clearValidators();
        this.empForm.get('homeAddress2')?.clearValidators();
        this.empForm.get('companyAddress1')?.setValidators([Validators.required]);
        this.empForm.get('companyAddress2')?.setValidators([Validators.required]);
      }
      this.empForm.get('homeAddress1')?.updateValueAndValidity();
      this.empForm.get('homeAddress2')?.updateValueAndValidity();
      this.empForm.get('companyAddress1')?.updateValueAndValidity();
      this.empForm.get('companyAddress2')?.updateValueAndValidity();
    });
  }



  @HostListener('keyup.Enter', ['$event.target.value'])
  onEnter(value: string) {
    if (value && !this.pills.includes(value)) {
      this.addPill(value);
      this.value = '';
    }
  }


  addPill(value: string | undefined) {
    if (value && value.trim() && !this.pills.includes(value.trim())) {
      this.pills.push(value.trim());
      this.updateTagsFormControl(); // Update tags form control
    }
    this.value = ''; // Clear the input field value after attempting to add the tag
    this.filteredList = [];
  }
  
  
  removePill(value: string) {
    this.pills = this.pills.filter(x => x !== value);
    this.updateTagsFormControl(); // Update tags form control
  }
  
  
  private updateTagsFormControl() {
    this.empForm.get('tags')?.setValue(this.pills);
  }
  


  // Example of changeValue method
  changeValue(val: string) {
    this.doSearch(val);
    this.value = val;
  }

  // Example of doSearch method
  doSearch(term: string) {
    this.filteredList = term && term.length > 1 ? this.list.filter(x => x.includes(term)) : [];
  }

  // Example of changeFocussed method
  changeFocussed(state: boolean) {
    setTimeout(() => this.isFocussed = state, 200);
  }

}
