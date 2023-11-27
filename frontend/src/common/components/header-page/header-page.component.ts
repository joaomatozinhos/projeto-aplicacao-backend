import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/common/util/util.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],
})
export class HeaderPageComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit() {}
}
