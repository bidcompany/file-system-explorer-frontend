import { Component, OnInit, Input  } from '@angular/core';
import { ExplorerService } from 'src/app/services/explorer.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  @Input() type: string;
  @Input() ext: string | null;
  @Input() name: string;
  @Output() getPathEvent = new EventEmitter();

  constructor(
    private explorerService: ExplorerService,
  ) {
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

  elementAction() {
    if (this.type == 'directory') {
      this.explorerService.pushPath(this.name);
      this.getPathEvent.emit();
    } else if (this.type == 'file') {
      this.explorerService.downloadFile(this.name)
        .subscribe((data: any) => { 
          var blob = new Blob([data]);
          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.name;
          link.click();
        });
    } else {
      // error
    }
  }
}
