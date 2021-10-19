import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  image: File;
  previewURL: string | ArrayBuffer;
  editFlag: boolean = false;
  userId: string;
  userData: User;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private afs: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.editFlag = true;
        this.userId = params.get('id');
      }
    });

    this.initForm();
  }

  initForm() {
    if (!this.editFlag) {
      this.addUserForm = this.formBuilder.group({
        name: ['', Validators.required],
        Image: '',
        address: '',
        city: '',
        state: '',
        about: '',
        createdOn: new Date(),
        modifiedOn: new Date(),
      });
    } else {
      let user: User = JSON.parse(sessionStorage.getItem('user'));
      this.addUserForm = this.formBuilder.group({
        _id: user._id,
        name: [user.name, Validators.required],
        Image: user.Image,
        address: user.address,
        city: user.city,
        state: user.state,
        about: user.about,
        modifiedOn: '',
      });
      this.previewURL = user.Image;
    }
  }
  imageInputChange(imageInput: any) {
    this.image = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.image);

    reader.onload = (event) => {
      this.previewURL = reader.result;
    };
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.addUserForm.value);

    let storageRef = this.afs.ref(
      'user-images/' + this.addUserForm.get('name').value.split(' ').join('-')
    );
    if (!this.editFlag) {
      let uploadTask = storageRef.put(this.image);
      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.addUserForm.get('Image').patchValue(downloadURL);
          this.userService.addUser(this.addUserForm.value).subscribe(
            (data) => {
              this.userService.notificationText = `${
                this.addUserForm.get('name').value.split(' ')[0]
              } has been added!`;
              this.userService.notification.next(true);

              this.location.back();
            },
            (err) => {
              this.userService.notificationText = `${
                this.addUserForm.get('name').value.split(' ')[0]
              } couldn't be added!`;
              this.userService.notification.next(true);
            }
          );
        });
      });
    } else {
      this.addUserForm.get('modifiedOn').patchValue(new Date());
      let i = 0;
      this.userService.userData.forEach((user) => {
        if (user._id == this.userId) {
          this.userService.userData[i] = this.addUserForm.value;
        }
      });
      if (this.image != undefined) {
        storageRef.delete();
        let uploadTask = storageRef.put(this.image);
        uploadTask.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.addUserForm.get('Image').patchValue(downloadURL);
            this.userService
              .updateUserDetails(this.userId, this.addUserForm.value)
              .subscribe(
                (data) => {
                  this.userService.notificationText = `Changes saved!`;
                  this.userService.notification.next(true);
                  sessionStorage.setItem(
                    'user',
                    JSON.stringify(this.addUserForm.value)
                  );
                  this.location.back();
                },
                (err) => {
                  this.userService.notificationText = `Changes couldn't be saved!`;
                  this.userService.notification.next(true);
                }
              );
          });
        });
      } else {
        this.userService
          .updateUserDetails(this.userId, this.addUserForm.value)
          .subscribe(
            (data) => {
              let i = 0;

              this.userService.notificationText = `Changes saved!`;
              sessionStorage.setItem(
                'user',
                JSON.stringify(this.addUserForm.value)
              );
              this.userService.notification.next(true);
              this.userService.getUserData().subscribe((data) => {
                this.userService.userData = data;
                this.location.back();
              });
            },
            (err) => {
              this.userService.notificationText = `Changes couldn't be saved!`;
              this.userService.notification.next(true);
            }
          );
      }
    }
  }
}
