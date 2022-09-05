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

  loading: boolean = false;
  loadingTimer: any;

  iconTypes: Array<string> = [
    'tar.gz', 'aac', 'ai', 'bmp', 'cs', 'css',
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

  startLoading() {
    this.loadingTimer = setTimeout(() => {
      this.loading = true;
    }, 100);
  }

  stopLoading() {
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
    }
    this.loading = false;
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
    if (!this.loading) {
      if (this.type == 'directory') {  
        this.startLoading(); 
        this.explorerService.downloadFolder(this.name)
          .subscribe((data: any) => { 
            var blob = new Blob([data]);
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.name + '.tar.gz';
            link.click(); 
  
            this.stopLoading();
            this.getPathEvent.emit();
          });
      } else if (this.type == 'file') {
        this.startLoading();
        this.explorerService.downloadFile(this.name)
          .subscribe((data: any) => { 
            var blob = new Blob([data]);
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.name;
            link.click();
  
            this.stopLoading();
          });
      } else {
        // error
      }
    }
  }
}
