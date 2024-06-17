import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ClientsComponent } from './clients/clients.component';
import { JobComponent } from './job/job.component';
import { EmployersComponent } from './employers/employers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'about-us', component: AboutUsComponent },
{ path: 'job', component: JobComponent },
{ path: 'clients', component: ClientsComponent },
{ path: 'employers', component: EmployersComponent },
{ path: 'contact-us', component: ContactUsComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
