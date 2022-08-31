import { Injectable } from '@angular/core';

export interface Path {
  path: string;
  depth: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  path: Path = { 
    path: 'home', 
    depth: 0 
  };

  constructor() { }

  pushPath(suffix: string) {
    this.path.path += '/' + suffix;
    this.path.depth += 1;
  }

  popPath() {
    this.path.path = this.path.path.substring(0, this.path.path.lastIndexOf('/'));
    this.path.depth -= 1;
  }

  getPathContent() {

  }

  downloadFile() {

  }
}
