import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationPopUpComponent } from '../registration-pop-up/registration-pop-up.component';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formData: any;


  constructor(private dialog: MatDialog,private formDataService: DataserviceService) { }

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();

  }

  openpopup(): void {
    this.dialog.open(RegistrationPopUpComponent, {
      width: '700px',
      height:'800px',
      disableClose: false // Prevent closing modal by clicking outside or pressing ESC
    });

    
  }




}
