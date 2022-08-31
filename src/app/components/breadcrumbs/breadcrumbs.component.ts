import { Component, OnInit } from '@angular/core';
import { ExplorerService } from 'src/app/services/explorer.service';
import { Path } from 'src/app/services/explorer.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  path: Path;

  constructor(
    private explorerService: ExplorerService
  ) 
  {
    this.path = this.explorerService.path
  }

  ngOnInit(): void {
  }

  goBack() {
    this.explorerService.popPath();
  }
}
