import { Component } from '@angular/core';
import { ExplorerService } from './services/explorer.service';

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

  startLoading() {
    this.loadingTimer = setTimeout(() => {
      this.loading = true;
      this.elements = [];
    }, 100);
  }

  stopLoading() {
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
    }
    this.loading = false;
  }

  getPathContent() {
    this.startLoading();
    
    this.explorerService.getPathContent()
      .subscribe((data) => {
        this.elements = data;
        this.stopLoading();
      });
  }
}
