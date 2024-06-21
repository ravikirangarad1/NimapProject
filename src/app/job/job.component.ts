import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { RegistrationPopUpComponent } from '../registration-pop-up/registration-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmployersComponent } from '../employers/employers.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  formData: any;
  profileImage: any;

  constructor(private formDataService: DataserviceService,private dialog: MatDialog,private activatedRoute: ActivatedRoute,) { }

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

}
