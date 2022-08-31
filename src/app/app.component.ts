import { Component } from '@angular/core';
import { ExplorerService } from './services/explorer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private explorerService: ExplorerService
  ) { }

  elements: Array<any> = [];
  loading: boolean = false;
  loadingTimer: any;

  ngOnInit(): void {
    this.getPathContent();
  }

  getPathContent() {
    /* show loading animation if user is waiting for > 100ms */
    this.loadingTimer = setTimeout(() => {
      this.loading = true;
      this.elements = [];
    }, 100)
    
    this.explorerService.getPathContent()
      .subscribe((data) => {
        this.elements = data;
        clearInterval(this.loadingTimer);
        this.loading = false;
      });
  }
}
