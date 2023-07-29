import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { RouterModule } from '@angular/router';
import { AboutAsComponent } from './about-as/about-as.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LayoutComponent,
    SidenavListComponent,
    AboutAsComponent,
    ContactUsComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LayoutComponent,
    SidenavListComponent,
    AboutAsComponent,
    ContactUsComponent,
    ProjectsComponent
  ]
})
export class CoreModule { }
