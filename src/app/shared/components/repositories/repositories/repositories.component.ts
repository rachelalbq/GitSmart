import { Component, Input, OnInit } from '@angular/core';
import { iReponseRepor } from 'src/app/shared/interfaces/repor.interface';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() repositories!: iReponseRepor | any;
  noRepor: string = 'Sem repositórios';

  constructor() {}

  ngOnInit(): void {
    console.log(this.repositories.length);
  }
}
