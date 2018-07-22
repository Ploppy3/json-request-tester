import { Component, HostListener, DoCheck, NgZone, OnInit } from "@angular/core";
import { fadeInOut } from "./animations";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { SessionService } from "./session.service";
import { Data } from "./data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut],
})

export class AppComponent implements DoCheck, OnInit {
  inWindow: boolean;
  inDropZone: boolean;

  @HostListener('window:dragenter', ['$event'])
  private onDragEnter(event) {
    this.inWindow = true;
  }
  @HostListener('window:dragleave', ['$event'])
  private onDragEnd(event) {
    this.inWindow = false;
  }

  public showFabToTop = false;
  public lastScrollY = 0; // used to keep track of fabToTop state

  constructor(
    private zone: NgZone, private sessionservice: SessionService
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      window.onscroll = (event) => {
        let scrollY = window.scrollY;
        if (scrollY >= 96 && this.lastScrollY < 96) {
          this.zone.run(() => {
            this.showFabToTop = true;
          });
        } else if (scrollY < 96 && this.lastScrollY >= 96) {
          this.zone.run(() => {
            this.showFabToTop = false;
          });
        }
        this.lastScrollY = scrollY;
      }
    })
  }

  ngDoCheck(): void {
    if (!environment.production)
      console.log('check'); // writes 'check' in console to quickly identity performance issues
  }

  public scrollToTop() {
    window.scroll({ top: 0 });
  }

  public stopDragoverEventPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  public onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inWindow = false;
    this.inDropZone = false;
    console.log(e.dataTransfer.files);

    this.handleJSONUpload(e.dataTransfer.files).subscribe(
      (data: Data) => {
        console.log(data);
        this.sessionservice.tests$.next(data.tests);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );
  }

  public handleJSONUpload (files: FileList): Observable<Object> {
    return new Observable((observer) => {
      for(let i = 0; i < files.length; i++) {
        let file = files[i];
        let last = i == files.length - 1;
  
        if ( /\.(json)$/i.test(file.name) ) {
          var reader = new FileReader();
  
          reader.addEventListener("load", function () {
            try {
              observer.next(JSON.parse(this.result));
              if (last) observer.complete();
            } catch(e) {
              if (last) observer.complete();
            }
          }, false);
  
          reader.readAsText(file);
        } else {
          if (last) observer.complete();
        }  
      };
    })
  }
}
