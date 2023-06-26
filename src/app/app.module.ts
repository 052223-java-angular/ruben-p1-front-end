import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { CreaturesComponent } from './pages/creatures/creatures.component';
import { DetailsComponent } from './pages/details/details.component';
import {NgOptimizedImage} from "@angular/common";
import {SessionService} from "./services/session.service";
import { ProfileComponent } from './pages/profile/profile.component';
import { ArmyComponent } from './pages/army/army.component';
import { FooterComponent } from './component/footer/footer.component';
import { BattleComponent } from './pages/battle/battle.component';
import {ToasterModule, ToasterService} from "ngx-toaster/src/lib";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    CreaturesComponent,
    DetailsComponent,
    ProfileComponent,
    ArmyComponent,
    FooterComponent,
    BattleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        // import HttpClientModule after BrowserModule.
        HttpClientModule,
        NgOptimizedImage
    ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
