import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-code-wrapper',
  templateUrl: './code-wrapper.component.html',
  styleUrls: ['./code-wrapper.component.scss'],
})
export class CodeWrapperComponent implements OnInit {

  @Input() status: 'DEFAULT' | 'SUCCESS' | 'WARNING' | 'ERROR' = 'DEFAULT';
  @HostBinding('class.success') successClass = false;
  @HostBinding('class.error') errorClass = false;
  @HostBinding('class.warning') warningClass = false;

  constructor(
    private logger: LoggerService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('status' in changes) {
      let value = changes['status'].currentValue;
      this.successClass = false;
      this.errorClass = false;
      this.warningClass = false;
      switch (value) {
        case 'SUCCESS':
          this.successClass = true;
          break;
        case 'WARNING':
          this.warningClass = true;
          break;
        case 'ERROR':
          this.errorClass = true;
          break;

        default:
          break;
      }
    }
  }

}
