import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

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
    return this.userService.isAdminRole;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
