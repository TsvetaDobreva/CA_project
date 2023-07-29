import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { AboutAsComponent } from './core/about-as/about-as.component'
import { ProjectsComponent } from './core/projects/projects.component';
//import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: 'aboutUs',
    component: AboutAsComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
