import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'findr';
  notificationToggle: boolean = false;
  notificationText: string = '';
  constructor(private userService: UserService) {
    this.userService.notification.subscribe((data) => {
      this.notificationToggle = data;
      this.notificationText = this.userService.notificationText;
    });
  }
  ngOnInit() {}
  toggleNotification() {
    this.userService.notification.next(false);
  }
}
