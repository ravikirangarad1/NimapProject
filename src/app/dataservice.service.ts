import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private formData: any = null;

  private image: string | null = null;

  constructor() { }



  setImage(image: string) {
    this.image = image;
  }

  getImage(): string | null {
    return this.image;
  }

  setFormData(data: any) {
    this.formData = data;
    console.log("in service",data);
    
  }

  getFormData() {
    return this.formData;
  }
}
