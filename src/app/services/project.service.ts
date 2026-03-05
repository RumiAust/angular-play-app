import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { mProjectModel } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectsList(): Observable<mProjectModel[]> {
    const jsonPath =  'assets/data/projects.json';
    return this.http.get<{ projects: mProjectModel[] }>(jsonPath).pipe(
      map((response: { projects: mProjectModel[]; }) => response.projects)
    );

  }
}