import { Directive, ElementRef, Output, EventEmitter, HostBinding, HostListener, NgZone } from '@angular/core';

@Directive({
  selector:"[dropfile]"
})
export class DropfileDirective {
  private inWindow = false;
  private inDropZone = false;

  @HostListener('window:dragenter', ['$event'])
  private onDragEnter(event) {
    this.inWindow = true;
    this.updateHover();
  }
  @HostListener('window:dragleave', ['$event'])
  private onDragEnd(event) {
    this.inWindow = false;
    this.updateHover();
  }
  @Output() filedroped = new EventEmitter<FileList>();
  @HostBinding('class.drophover') drophover = false;

  constructor(private _el: ElementRef, private _zone: NgZone) { 
    this._zone.runOutsideAngular(() => {
      this.init();
    })
  }

  private init() {
    let preventDefault = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    }

    this._el.nativeElement.addEventListener('dragenter', (event: any) => {
      this.inDropZone = true;
      this.updateHover();
    }, false);

    this._el.nativeElement.addEventListener('dragleave', (event: any) => {
      this.inDropZone = false;
      this.updateHover();
    }, false);

    
    this._el.nativeElement.addEventListener('drop', (event: any) => {
      preventDefault(event);
      this.inDropZone = false;
      this.updateHover();
      this._zone.run(() => {
        this.filedroped.next(event.dataTransfer.files);
      })
    }, false);
    

    this._el.nativeElement.addEventListener('dragover', (event: any) => {
      preventDefault(event);
    }, false);
  }

  private updateHover() {
    this.drophover = (this.inWindow || this.inDropZone);
  }
}