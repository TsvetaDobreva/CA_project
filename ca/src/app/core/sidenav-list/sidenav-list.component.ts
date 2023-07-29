import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

  @Output() sidenavClose = new EventEmitter();

  constructor(private userService: UserService) { }

  get isLoggedIn() {
    return this.userService.isLoggedIn
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  // get user() {
  //   return this.userService.userData
  // }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
