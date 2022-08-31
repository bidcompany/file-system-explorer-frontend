import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Path {
  base: string;
  path: string;
  depth: number;
  elements: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  path: Path = { 
    base: environment.endpoint, 
    depth: 0,
    path: '',
    elements: []
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  pushPath(suffix: string) {
    this.path.path += '/' + suffix;
    this.path.depth += 1;
    this.getPathContent().subscribe();
  }

  popPath() {
    this.path.path = this.path.path.substring(0, this.path.path.lastIndexOf('/'));
    this.path.depth -= 1;
    this.getPathContent().subscribe();
  }

  getPathContent() {
    return this.httpClient.get(environment.endpoint + '/api/v1/hist?path=' + this.path.path)
      .pipe(tap((resp: any) => {
        console.log(resp.data.result);
        this.path.elements = resp.data.result;
      }));
  }

  downloadFile() {
    
  }
}
