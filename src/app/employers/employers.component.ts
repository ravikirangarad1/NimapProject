import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { DataserviceService } from '../dataservice.service';
import { RegistrationPopUpComponent } from '../registration-pop-up/registration-pop-up.component';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {
  formData: any;
  profileImage: any;

  constructor(private formDataService: DataserviceService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();
    console.log(this.formData,"in job");
    this.profileImage = this.formDataService.getImage();

  }

  openpopup(): void {
    this.dialog.open(ContactUsComponent, {
      data: {
        isSelected: true
      },
      width: '700px',
      height:'800px',
      disableClose: false // Prevent closing modal by clicking outside or pressing ESC
    });
  }
  openpopup2(): void{
    this.dialog.open(RegistrationPopUpComponent, {
      data: {
        isSelected: true
      },
      width: '700px',
      height:'800px',
      disableClose: false // Prevent closing modal by clicking outside or pressing ESC
    });
  }

}