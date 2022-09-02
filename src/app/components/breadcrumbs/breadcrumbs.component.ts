import { Component, OnInit } from '@angular/core';
import { ExplorerService } from 'src/app/services/explorer.service';
import { Path } from 'src/app/services/explorer.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  path: Path;
  @Output() getPathEvent = new EventEmitter();

  constructor(
    private explorerService: ExplorerService
  ) 
  {
    this.path = this.explorerService.path;
  }

  ngOnInit(): void {
  }

  goBack() {
    this.explorerService.popPath();
    this.getPathEvent.emit();
  }

  getPathContent() {
    this.explorerService.computePathDepth();
    this.getPathEvent.emit();
  }
}
