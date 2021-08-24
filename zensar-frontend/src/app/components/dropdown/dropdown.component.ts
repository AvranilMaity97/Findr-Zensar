import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @ViewChild('dropdownRef') dropdownRef: ElementRef;
  @ViewChild('inputRef') inputRef: ElementRef;
  @Input()
  placeholder: string = 'Please select an item';
  @Input() type: string;
  @Input() options: string[] = ['Options unavailable'];

  @Output() change = new EventEmitter<string>();

  value: string;
  optionsToggle: boolean = false;
  @HostListener('document:click', ['$event.target'])
  clickedOutside(target): void {
    if (
      !this.dropdownRef.nativeElement.contains(target) &&
      this.optionsToggle
    ) {
      this.toggle();
    }
  }
  constructor() {}

  ngOnInit() {}
  selectOption(option: string) {
    this.inputRef.nativeElement.value = option;
    this.change.emit(option);
    this.toggle();
  }
  toggle() {
    this.optionsToggle = !this.optionsToggle;
  }
}
