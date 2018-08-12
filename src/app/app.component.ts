import { Component, DoCheck, NgZone, OnInit } from "@angular/core";
import { trigger, state, transition, style, animate } from "@angular/animations";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { SessionService } from "./session.service";
import { Data } from "./data";
import { LoggerService } from "./logger.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //fadeInOut,
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition(':enter, hidden => visible', [
        style({
          transform: 'translate3d(0, 10px, 0)',
        }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translate3d(0, 0, 0)', })),
      ]),
      transition(':leave, visible => hidden', [
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ])
  ],
})

export class AppComponent implements DoCheck, OnInit {

  public showFabToTop = false;
  public lastScrollY = 0; // used to keep track of fabToTop state

  constructor(
    private zone: NgZone,
    private sessionservice: SessionService,
    private logger: LoggerService,
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
    this.logger.log(this, 'check'); // writes 'check' in console to quickly identity performance issues
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
        this.logger.log(this, data);
        if (data.version == environment.version) {
          this.sessionservice.tests$.next(data.tests);
          this.sessionservice.saveData(data.tests);
        } else {
          // TODO: show alert
        }
      },
      err => {
        this.logger.log(this, err);
      },
      () => {
        this.logger.log(this, "complete");
      }
    );
  }

  public handleJSONUpload(files: FileList): Observable<Object> {
    return new Observable((observer) => {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let last = (i == files.length - 1) ? true : false;

        if (/\.(json)$/i.test(file.name)) {
          var reader = new FileReader();

          reader.addEventListener("load", function () {
            try {
              observer.next(JSON.parse(this.result));
            } catch (e) { }
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
