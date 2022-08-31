import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
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

  getPathContent(): Observable<any> {
    return this.httpClient.get(environment.endpoint + '/api/v1/hist?path=' + this.path.path)
      .pipe(map((resp: any) => { 
        return resp.data.result; 
      } ));
  }

  downloadFile() {
    
  }
}
