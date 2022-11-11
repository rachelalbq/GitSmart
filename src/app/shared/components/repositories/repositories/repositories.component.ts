import { IssuesService } from './../../../services/issues.service';
import { Component, Input, OnInit } from '@angular/core';
import { iResponseListarIssue } from 'src/app/shared/interfaces/issue.interface';
import { iReponseRepor } from 'src/app/shared/interfaces/repor.interface';
import { iResponseUser } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() repositories!: iReponseRepor | any;
  @Input() users!: iResponseUser | any;
  // @Input() issues!: iResponseListarIssue | any;
  issues!: iResponseListarIssue | any;
  noRepor: string = 'Sem repositórios';
  public isCollapsed = false;
  repositorie!: any;

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    console.log('user', this.users);
  }

  toggle() {
    this.isCollapsed = true;
  }

  close() {
    this.isCollapsed = false;
    this.repositorie = '';
  }

  serchIssues(repo: string) {
    this.issueService.searchIssues(this.users, repo).subscribe({
      next: (res: iResponseListarIssue) => {
        this.repositorie = repo;
        this.issues = res;
        console.log('show', this.issues);
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          text: 'Não foi possível mostrar repositórios.',
        });
      },
    });
  }
}
