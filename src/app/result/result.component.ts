import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GithubService} from "../service/github.service";
import {ActivatedRoute} from "@angular/router";

import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

export class GithubRepo {
  constructor(
    public id: number,
    public name: String,
    public full_name: String
  ) {
  }
}

export class Repo {
  constructor(
    public id: number,
    public size: number,
    public watchers: number,
    public subscribers_count: number
  ) {
  }
}


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  repos: GithubRepo[];
  repoDetails: Repo;
  closeResult: string;
  loaded: boolean;

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.githubService.returnAllRepos(this.route.snapshot.paramMap.get('username')).subscribe(
      response => {
        this.repos = response;
      }
    )
  }

  open(content, repoName) {
    this.githubService.returnRepoDetails(this.route.snapshot.paramMap.get('username'), repoName).subscribe(
      response => {
        this.repoDetails = response;
      }
    );


    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', windowClass: 'dark-modal'})
      .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ResultComponent.getDismissReason(reason)}`;
    });
  }

}
