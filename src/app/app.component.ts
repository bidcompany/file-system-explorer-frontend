import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }

  elements: Array<any> = [];

  ngOnInit(): void {
    this.elements = [
      {
        type: 'directory',
        ext: null,
        name: '.git'
      },
      {
        type: 'directory',
        ext: null,
        name: 'folder_a'
      },
      {
        type: 'directory',
        ext: null,
        name: 'folder_b'
      },
      {
        type: 'file',
        ext: 'csv',
        name: 'users.csv'
      },
      {
        type: 'file',
        ext: 'xls',
        name: 'data.xls'
      },
      {
        type: 'file',
        ext: 'sql',
        name: 'export.sql'
      },
      {
        type: 'file',
        ext: 'xml',
        name: 'markup.xml'
      },
      {
        type: 'file',
        ext: 'xmlx',
        name: 'markup2.xmlx'
      },
      {
        type: 'file',
        ext: 'gif',
        name: 'funny.gif'
      },
      {
        type: 'file',
        ext: 'png',
        name: 'very_funny.png'
      },
    ]
  }
}
