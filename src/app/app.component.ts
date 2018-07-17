import { Component, HostListener, DoCheck, NgZone, OnInit } from "@angular/core";
import { fadeInOut } from "./animations";
import { environment } from "../environments/environment";

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
    private zone: NgZone,
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

}
