import { Directive, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector:"[dropfile]"
})
export class DropfileDirective {
  @Output() filedroped = new EventEmitter<FileList>();
  @HostBinding('class.dragover') classes = false;

  preventDefault_evt: string[] = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
  dragEnter_evt: string[] = ['dragover', 'dragenter'];
  dragLeave_evt: string[] = ['dragleave', 'dragend', 'drop'];

  constructor(private _el: ElementRef) {
    let preventDefault = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    }
    let dragEnter = (e: any) => {
      //console.log(e.type);
      if (!this.classes) this.classes = true;
    }
    let dragLeave = (e: any) => {
      //console.log(e.type);
      if (this.classes) this.classes = false;
    }
    let ondrop = (e) => {
      this.filedroped.next(e.dataTransfer.files);
    }

    this.preventDefault_evt.forEach(event => {
      _el.nativeElement.addEventListener(event, preventDefault, false);
    });
    this.dragEnter_evt.forEach(event => {
      _el.nativeElement.addEventListener(event, dragEnter, false);
    });
    this.dragLeave_evt.forEach(event => {
      _el.nativeElement.addEventListener(event, dragLeave, false);
    });
    _el.nativeElement.addEventListener('drop', ondrop, false);
  }
}