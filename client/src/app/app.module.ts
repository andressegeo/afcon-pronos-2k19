import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { registerLocaleData } from "@angular/common";
import localeFr from '@angular/common/locales/fr';

import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { RestService } from './api/rest.service';
import { UserService } from './api/user.service';
import { ApiService } from './api/api.service';
import { RankingsComponent } from './rankings/rankings.component';
import { BettingBoardComponent } from './betting-board/betting-board.component';
import { TeamPickerDialogComponent } from './team-picker-dialog/team-picker-dialog.component';
import { RankingsRowComponent } from './rankings/rankings-row/rankings-row.component';
import { RankingService } from './api/ranking.service';
import { StageService } from './api/stage.service';
import { MatchService } from './api/match.service';
import { TeamService } from './api/team.service';
import { PredictionService } from './api/prediction.service';
import { StadiumService } from './api/stadium.service';
import { FakeService } from './api/fake.service';
import { AreYouSureDialogComponent } from './are-you-sure-dialog/are-you-sure-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { PronoDialogComponent } from './prono-dialog/prono-dialog.component';
import { MatchResultEntryComponent } from './match-result-entry/match-result-entry.component';
import { RandomPredictionsComponent } from './random-predictions/random-predictions.component';
import { TournamentComponent } from './tournament/tournament.component';
import { PubDialogComponent } from './pub-dialog/pub-dialog.component';

registerLocaleData(localeFr, 'fr');

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
    path: 'tournament',
    component: TournamentComponent
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
    TeamPickerDialogComponent,
    RankingsRowComponent,
    AreYouSureDialogComponent,
    WelcomeDialogComponent,
    PubDialogComponent,
    RankingsRowComponent,
    PronoDialogComponent,
    MatchResultEntryComponent,
    RandomPredictionsComponent,
    TournamentComponent,
    PubDialogComponent
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
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RestService,
    UserService,
    ApiService,
    RankingService,
    StageService,
    FakeService,
    StadiumService,
    TeamService,
    MatchService,
    PredictionService
  ],
  entryComponents: [
    TeamPickerDialogComponent,
    AreYouSureDialogComponent,
    WelcomeDialogComponent,
    PubDialogComponent,
    TeamPickerDialogComponent,
    PronoDialogComponent,
    MatchResultEntryComponent,
    RandomPredictionsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
