import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  @Input() type: string;
  @Input() ext: string | null;
  @Input() name: string;

  constructor() {
    this.type = '';
    this.ext = null;
    this.name = '';
  }

  ngOnInit(): void {
    if (this.ext?.startsWith('xls')) {
      this.ext = 'xlsx';
    } else if (
      this.ext != null &&
      this.ext != 'csv' &&
      this.ext != 'sql' &&
      this.ext != 'xml'
    ) {
      this.ext = 'generic';
    }
  }

}
