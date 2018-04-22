import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pg-error-retry',
  templateUrl: './error-retry.component.html',
  styleUrls: ['./error-retry.component.scss']
})
export class ErrorRetryComponent implements OnInit {

  @Output() retry = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onRetry() {
    this.retry.emit();
  }
}
