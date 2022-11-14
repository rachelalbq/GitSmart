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
  issues!: iResponseListarIssue | any;
  noRepor: string = 'Sem repositórios';
  issueEdit!: number;
  issueTitulo!: string;
  issueText!: string;
  repositorie!: string;
  visible: boolean = false;

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    console.log('user', this.users);
  }

  close() {
    this.repositorie = '';
  }

  serchIssues(repo: string) {
    this.issueService.searchIssues(this.users, repo).subscribe({
      next: (res: iResponseListarIssue | any) => {
        this.repositorie = repo;
        this.issues = res;
      },
      error: (error) => {
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          text: 'Não foi possível mostrar issues.',
        });
      },
    });
  }

  openEditIssue(issue: number, issueTitulo: string, issueText: string) {
    this.issueEdit = issue;
    this.issueTitulo = issueTitulo;
    this.issueText = issueText;
  }

  issueReload(event: boolean, repo: string) {
    if (event === true) {
      this.serchIssues(repo);
      this.close();
    }
  }

  issueReloadEdit(event: boolean, repo: string) {
    if (event === true) {
      this.serchIssues(repo);
      this.close();
      this.issueEdit = 0;
    }
  }
}
