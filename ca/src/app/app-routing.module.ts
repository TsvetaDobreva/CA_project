import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { AboutAsComponent } from './core/about-as/about-as.component';
import { ProjectsComponent } from './core/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
    data: { title: 'Начало'}
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
    data: { title: 'Свържи се с нас'}
  },
  {
    path: 'aboutUs',
    component: AboutAsComponent,
    data: { title: 'За нас'}
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'Реализирани проекти'}
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: { title: 'Страницата не е открита'}
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
