import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  username;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  githubSearch(username) {
    this.username = username;
    this.router.navigate(['result', this.username])
  }

}
