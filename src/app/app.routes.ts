import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },
    {
        path: 'todos',
        loadComponent: () => import('./todos/todos').then(m => m.Todos)
    },
    {
        path: 'counter',
        loadComponent: () => import('./components/counter/counter').then(m => m.Counter)
    }
];
