import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter<boolean>();

  @Input() text: string = '';
  constructor(private userService: UserService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.onClose();
    }, 8000);
  }
  onClose() {
    this.userService.notification.next(false);
  }
}
