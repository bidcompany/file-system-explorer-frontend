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
  ) 
  {
    this.elements = this.explorerService.path.elements;
  }

  elements: Array<any>;

  ngOnInit(): void {
    this.explorerService.getPathContent().subscribe();
  }
}
