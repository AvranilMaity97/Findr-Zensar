import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  @ViewChild('navItemsRef') navItemsRef: ElementRef;
  @ViewChild('headerRef') headerRef: ElementRef;
  navToggle = true;
  flag: boolean = true;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {}
  ngAfterContentChecked() {
    if (this.navItemsRef && this.headerRef.nativeElement.offsetWidth > 786) {
      this.navToggle = true;
      this.flag = true;
      this.renderer.setStyle(
        this.navItemsRef.nativeElement,
        'transform',
        'translateY(0px)'
      );
    } else if (
      this.navItemsRef &&
      this.headerRef.nativeElement.offsetWidth <= 786
    ) {
      if (this.flag) {
        this.navToggle = true;
        this.toggle();
        this.flag = false;
      }
    }
  }

  toggle() {
    if (this.headerRef.nativeElement.offsetWidth <= 786) {
      if (this.navToggle) {
        this.renderer.setStyle(
          this.navItemsRef.nativeElement,
          'transform',
          'translateY(-296px)'
        );
      } else {
        this.renderer.setStyle(
          this.navItemsRef.nativeElement,
          'transform',
          'translateY(0px)'
        );
        console.log('F');
      }
      this.navToggle = !this.navToggle;
    }
  }
}
