import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { mProjectModel } from '../../model/project.model';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './greeting.html',
  styleUrls: ['./greeting.css'],
  providers: [ProjectService]
})
export class Greeting {

  message = input('Hello greeting component!');

  // IMPORTANT: Use Observable instead of plain array
  projects$!: Observable<mProjectModel[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projects$ = this.projectService.getProjectsList();
  }
}