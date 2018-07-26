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
    this.zone.runOutsideAngular(() => {
      e.preventDefault();
      e.stopPropagation();
    })
  }

  public onDrop(files: FileList) {
    this.handleJSONUpload(files).subscribe(
      (data: Data) => {
        console.log(data);
        if (data.version == environment.version) {
          this.sessionservice.tests$.next(data.tests);
          this.sessionservice.saveData(data.tests);
        } else {
          // TODO: show alert
        }
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
        let last = (i == files.length - 1) ? true : false;
  
        if ( /\.(json)$/i.test(file.name) ) {
          var reader = new FileReader();
  
          reader.addEventListener("load", function () {
            try {
              observer.next(JSON.parse(this.result));
            } catch(e) {}
            if (last) observer.complete();
          }, false);
  
          reader.readAsText(file);
        } else {
          if (last) observer.complete();
        }  
      };
    })
  }
}
