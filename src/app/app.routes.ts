import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },
    {
        path: 'products',
        loadComponent: () => import('./product/product').then(m => m.Product)
    },
    {
        path: 'employees',
        loadComponent: () => import('./employee-form/employee-form').then(m => m.EmployeeForm)
    },
    {
        path: 'counter',
        loadComponent: () => import('./components/counter/counter').then(m => m.Counter)
    },
    {
        path: 'todos',
        loadComponent: () => import('./todos/todos').then(m => m.Todos)
    }
];
