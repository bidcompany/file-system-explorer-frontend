import { Component } from '@angular/core';
import { ElementComponent } from './components/element/element.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements: Array<any> = [];

  ngOnInit(): void {
    this.elements = [
      {
        type: 'directory',
        ext: null,
        name: '.git'
      },
      {
        type: 'file',
        ext: 'gitignore',
        name: '.gitignore'
      },
      {
        type: 'directory',
        ext: null,
        name: '.vscode'
      },
      {
        type: 'file',
        ext: 'js',
        name: 'app.js'
      },
    ]
  }
}
