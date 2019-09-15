import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GithubRepo, Repo} from "../result/result.component";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {
  }

  returnAllRepos(username) {
    return this.http.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos`)
  }

  returnRepoDetails(username, repoName) {
    return this.http.get<Repo>(`https://api.github.com/repos/${username}/${repoName}`)
  }

}
