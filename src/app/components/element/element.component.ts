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

  iconTypes: Array<string> = [
    'aac', 'ai', 'bmp', 'cs', 'css',
    'csv', 'doc', 'docx', 'exe', 'gif',
    'heic', 'html', 'java', 'jpg', 'js',
    'json', 'jsx', 'key', 'm4p', 'md',
    'mdx', 'mov', 'mp3', 'mp4', 'otf',
    'pdf', 'php', 'png', 'pptx', 'psd',
    'py', 'raw', 'rb', 'sass', 'scss',
    'sh', 'sql', 'svg', 'tiff', 'tsx',
    'ttf', 'txt', 'wav', 'woff', 'xlsx',
    'xml', 'yml',
  ];

  constructor(
    private explorerService: ExplorerService,
  ) {
    this.type = '';
    this.ext = null;
    this.name = '';
  }

  ngOnInit(): void {
     if (
      this.ext != null &&
      !this.iconTypes.includes(this.ext) 
    ) {
      this.ext = 'generic';
    }
  }

  elementAction() {
    if (this.type == 'directory') {
      this.explorerService.pushPath(this.name);
      this.getPathEvent.emit();
    } else if (this.type == 'file') {
      this.elementDownload();
    } else {
      // error
    }
  }

  elementDownload() {
    if (this.type == 'directory') {
      console.log(this.name);
      
      this.explorerService.downloadFolder(this.name)
      .subscribe((data: any) => { 
        var blob = new Blob([data]);
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.name + '.tar.gz';
        link.click();
      });
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
