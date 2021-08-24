import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Output() action = new EventEmitter();

  @Input() popupTitle: string = '';
  @Input() question: string = '';
  @Input() yesValue: string = '';
  @Input() noValue: string = '';
  constructor() {}

  ngOnInit() {}

  onClick(val) {
    this.action.emit(val);
  }
}
