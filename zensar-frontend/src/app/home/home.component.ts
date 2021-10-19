import {
  AfterViewInit,
  ChangeDetectorRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('addUserButton') addUserButton: ElementRef;
  @ViewChild('cardsContainerRef') cardsContainerRef: ElementRef;
  @ViewChildren('cardRef') cards: QueryList<ElementRef>;

  minWidth: number = 220;
  maxWidth: number = 300;

  users: User[] = [];
  usersBackup: User[] = [];
  loading: Boolean = true;
  error: Boolean = false;
  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUserData().subscribe((data) => {
      this.loading = false;
      this.users = data.slice(0);
      this.usersBackup = data.slice(0);
      this.userService.userData = data.slice(0);
    });
  }
  ngAfterViewInit() {
    this.setCardDisplay();
    // this.renderer.listen(this.addUserButton.nativeElement,'')
    // this.renderer.setStyle(

    //   this.addUserButton.nativeElement,''
    // )
  }

  filter(name: string) {
    if (name.length > 0) {
      this.users = this.usersBackup.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
    } else if (name.length == 0) {
      this.users = this.usersBackup.slice(0);
    }
    this.setCardDisplay();
  }

  sort(sortBy: string) {
    if (sortBy == 'Recently Created') {
      this.users = this.users.sort((a, b) => {
        if (a.createdOn < b.createdOn) {
          return 1;
        } else if (a.createdOn > b.createdOn) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      this.users = this.users.sort((a, b) => {
        if (a.modifiedOn < b.modifiedOn) {
          return 1;
        } else if (a.modifiedOn > b.modifiedOn) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    this.users.forEach((user) => {
      console.log(user.name, user.createdOn);
    });
  }
  openUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/user', user._id]);
  }
  setCardDisplay() {
    this.renderer.setStyle(
      this.cardsContainerRef.nativeElement,
      'display',
      'grid'
    );
    this.ref.detectChanges();
    let cardCount, totalSpace, space, val, cardWidth, usedCardCount;
    for (let i = this.minWidth; i <= this.maxWidth; i++) {
      cardWidth = i;
      cardCount = Math.floor(
        this.cardsContainerRef.nativeElement.offsetWidth / i
      );
      totalSpace =
        this.cardsContainerRef.nativeElement.offsetWidth - cardCount * i;
      space = totalSpace / (cardCount - 1);

      if (space >= 20 && space <= 25) {
        val = '';
        for (let j = 1; j <= cardCount; j++) {
          val += 'auto ';
        }
        val = val.substring(0, val.length - 1);

        this.renderer.setStyle(
          this.cardsContainerRef.nativeElement,
          'grid-template-columns',
          val
        );
        this.renderer.setStyle(
          this.cardsContainerRef.nativeElement,
          'grid-column-gap',
          '' + space + 'px'
        );
        this.renderer.setStyle(
          this.cardsContainerRef.nativeElement,
          'grid-row-gap',
          '' + space + 'px'
        );
        this.cards.forEach((card) => {
          this.renderer.setStyle(
            card.nativeElement,
            'width',
            '' + cardWidth + 'px'
          );
        });
        usedCardCount = cardCount;
      }
    }
    if (this.users.length < usedCardCount) {
      this.renderer.setStyle(
        this.cardsContainerRef.nativeElement,
        'display',
        'flex'
      );
    } else {
      this.renderer.setStyle(
        this.cardsContainerRef.nativeElement,
        'display',
        'grid'
      );
    }
  }
}
