import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User;
  dataLoaded: boolean = false;
  addressToggle: boolean = false;
  address: string = '';
  addressForm: FormGroup;
  popupToggle: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.dataLoaded = true;
    // this.route.params.subscribe((data) => {
    //   this.user = this.userService.getUserById(data.id);
    //   if (!this.user) {
    //     this.router.navigate(['/']);
    //   } else this.dataLoaded = true;
    // });
  }
  initForm() {
    this.addressForm = this.formBuilder.group({
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  toggleAddress() {
    this.addressToggle = !this.addressToggle;
  }
  togglePopup(val: boolean) {
    if (val) {
      this.userService.deleteUser(this.user._id).subscribe(
        (data) => {
          this.userService.notificationText = `${
            this.user.name.split(' ')[0]
          } has been removed!`;
          this.userService.notification.next(true);
          this.router.navigate(['/']);
        },
        (err) => {
          this.userService.notificationText = `${
            this.user.name.split(' ')[0]
          } couldn't be removed!`;

          this.userService.notification.next(true);
        }
      );
    }
    this.popupToggle = !this.popupToggle;
  }

  onEdit() {
    this.router.navigate(['/edit-user', this.user._id]);
  }
  onSubmit() {
    this.userService
      .updateUserAddress(this.user._id, this.addressForm.value)
      .subscribe(
        (data) => {
          this.addressToggle = false;
          this.userService.notificationText = 'Address has been saved!';
          this.userService.notification.next(true);
          this.user.address = this.addressForm.get('address').value;
          this.user.city = this.addressForm.get('city').value;
          this.user.state = this.addressForm.get('state').value;
          // this.userService.userData.forEach((user) => {
          //   if (user._id == this.user._id) {
          //     this.user.address = this.addressForm.get('address').value;
          //     this.user.city = this.addressForm.get('city').value;
          //     this.user.state = this.addressForm.get('state').value;
          //   }
          // });
        },
        (err) => {
          this.userService.notificationText = `Address couldn't be saved!`;
          this.userService.notification.next(true);
        }
      );
  }
}
