import { Directive, ElementRef, HostBinding, Input, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appSegmentEditor]'
})
export class SegmentEditorDirective {

  private htmlElement: HTMLElement;

  @HostBinding('attr.contenteditable') contenteditable = true;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() push = new EventEmitter<void>();
  @Output() pop = new EventEmitter<void>();
  @HostListener('input', ['$event']) onInput(event) {
    this.valueChange.next(this.htmlElement.innerText);
  }
  @HostListener('focus') focus() {
    //*
    //console.log('focus');
    let selection = document.getSelection();
    let range = document.createRange();
    if (this.htmlElement.lastChild) {
      range.setStart(this.htmlElement.lastChild, this.htmlElement.lastChild['length']);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    //*/
  }
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    //console.log('input', event);
    //this.valueChange.next(this.htmlElement.innerText);
    const space = 32;
    const enter = 13;
    const backSpace = 8;
    const slash = 191;
    switch (event.keyCode) {
      case space:
        event.preventDefault();
        if (event.target.innerText.length > 0) {
          this.push.next();
        }
        break;
      case enter:
        event.preventDefault();
        break;
      case backSpace:
        if (event.target.innerText.length == 0) {
          this.pop.next();
        }
        break;
      case slash:
        if (event.target.innerText.length > 0) {
          this.push.next();
        }
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  constructor(
    private el: ElementRef,
  ) {
    this.htmlElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      //this.htmlElement.innerText = changes['value'].currentValue;
    }
  }

}
