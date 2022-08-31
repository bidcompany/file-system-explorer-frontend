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
  ) 
  { 
    this.elements = this.explorerService.getPathContent();
  }

  elements: Observable<Array<any>>;

  ngOnInit(): void {
    
  }
}
