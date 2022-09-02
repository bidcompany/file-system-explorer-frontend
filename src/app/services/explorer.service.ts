import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Path {
  base: string;
  path: string;
  depth: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  path: Path = { 
    base: environment.endpoint, 
    depth: 0,
    path: ''
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

  rootPath() {
    this.path.path = '';
  }

  computePathDepth() {
    if (!this.path.path.startsWith('/')) {
      this.path.path = '/' + this.path.path;
    }

    this.path.depth += this.path.path.split("/").length - 1;
  }

  getPathContent(): Observable<any> {
    return this.httpClient.get(environment.endpoint + '/api/v1/hist?path=' + this.path.path)
      .pipe(map((resp: any) => { 
        return resp.data.result; 
      }), catchError((err: HttpErrorResponse) => {
        throw err;
      }));
  }

  downloadFile(fileName: string) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.httpClient.get(environment.endpoint + '/api/v1/hist/download?file=' + this.path.path + '/' + fileName, httpOptions);
  }

  downloadFolder(folderName: string) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.httpClient.get(environment.endpoint + '/api/v1/hist/folder?file=' + this.path.path + '/' + folderName, httpOptions);
  }
}
