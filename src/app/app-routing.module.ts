import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent} from "./pages/login/login.component";
import { UsersComponent} from "./pages/users/users.component";
import {CreaturesComponent} from "./pages/creatures/creatures.component";
import {DetailsComponent} from "./pages/details/details.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ArmyComponent} from "./pages/army/army.component";

// add components to map here
const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'users', component: UsersComponent},
    { path: 'creatures', component: CreaturesComponent},
    {path: 'details/:name', component: DetailsComponent},
    {path: 'details/user/:name', component: DetailsComponent},
    {path: 'profile/:username', component: ProfileComponent},
    {path: 'army/:name', component: ArmyComponent},
    {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
