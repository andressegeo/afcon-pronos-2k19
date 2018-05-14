import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { RestService } from './api/rest.service';
import { UserService } from './api/user.service';
import { ApiService } from './api/api.service';
import { RankingsComponent } from './rankings/rankings.component';
import { BettingBoardComponent } from './betting-board/betting-board.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';


const appRoutes: Routes = [
  {
    path: 'classements',
    component: RankingsComponent
  },
  {
    path: 'matches',
    component: BettingBoardComponent
  },
  {
    path: 'admin',
    component: AdminBoardComponent
  },
  {
    path: '',
    redirectTo: '/matches',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RankingsComponent,
    BettingBoardComponent,
    AdminBoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production }
    ),
    HttpClientModule
  ],
  providers: [
    RestService,
    UserService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
