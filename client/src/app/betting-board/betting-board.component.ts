import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService, Stage } from './../api/stage.service';
import { TeamService, Team } from './../api/team.service';
import { UserService, User } from './../api/user.service';
import { AreYouSureDialogComponent } from './../are-you-sure-dialog/are-you-sure-dialog.component';
import { PronoDialogComponent } from "../prono-dialog/prono-dialog.component";
import { MatchResultEntryComponent } from "../match-result-entry/match-result-entry.component";

import { PredictionService } from "../api/prediction.service";
import {Match} from "../api/match.service";

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: Stage[];
  teams: Team[];
  worldcupWinnerPrediction: Team;
  worldcupWinner: Team;
  currentUser: User;
  projectSound = new Audio('/assets/lkfjeff54df5d4f2.mp3');
  stageSelected: Stage;
  today = new Date().valueOf();

  constructor(private matDialog: MatDialog,
              private stageService: StageService,
              private teamService: TeamService,
              private userService: UserService,
              private predictionService: PredictionService) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      this.stageService.getStagesWithMatches().subscribe(stages => {
        console.log('stages', stages);
        stages.forEach((stage, index) => {
          stage.matches.forEach((value, index_match) => {
            stages[index].matches[index_match].team_1 = teams.find(team => {
              return value.team_1 === team.id;
            });
            stages[index].matches[index_match].team_2 = teams.find(team => {
              return value.team_2 === team.id;
            });
          });
        });
        this.stages = stages
      });
    });
    this.userService.userSubject.subscribe(user => {
      this.currentUser = user;
      if(user && this.currentUser.worldcup_winner) {
        if (typeof this.currentUser.worldcup_winner !== 'number') {
          this.worldcupWinnerPrediction = this.currentUser.worldcup_winner;
        } else {
          this.predictionService.getWordcupWinnerPrediction(user.id).subscribe(team => {
            this.worldcupWinnerPrediction = team;
          })
        }
      }
    });
  }

  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.worldcupWinnerPrediction = result;
      this.userService.postWorldcupWinnerPrediction(result);
    });
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  selectWorldcupWinner() {
    if(!this.isAdmin()) {
      return;
    }

    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherDialogRef = this.matDialog.open(AreYouSureDialogComponent);
        otherDialogRef.afterClosed().subscribe(sure => {
          if(sure === true) {
            this.worldcupWinner = result;
            this.userService.enterWorldcupWinner(result).subscribe();
          }
        })
      }
    });
  }

  openPronoDialog(match): void {
    let dialogRef = this.matDialog.open(PronoDialogComponent, {
      data: { match: match },
      height: '450px',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        result['users_id'] = this.currentUser.id;
        this.predictionService.postPredict(result).subscribe(prediction => {
          this.userService.getCurrentUser();
          /*if (this.getPrediction(match)) {
            this.currentUser.predictions.forEach( (item, index) => {
              if(item.matches_id === match.id) this.currentUser.predictions.splice(index,1);
            });
          }
          this.currentUser.predictions.push(prediction);*/
        });
      }
    });
  }

  canPredict(match): boolean {
    return true;
   /*if (match.score) {
      return false;
    }
    if (!match.team_1 || !match.team_2) {
      return false;
    }
    if (new Date(this.today) < new Date(this.stageSelected.opening_time)) {
      return false;
    } else {
      if (this.stageSelected.closing_time) {
        return this.today > this.stageSelected.closing_time;
      } else {
        return (new Date(this.today)).toLocaleDateString() === (new Date(match.match_time)).toLocaleDateString()
      }
    }*/
  }

  getPrediction(match): any {
    const match_found = this.currentUser.predictions.find(pred => {
      return pred.matches_id === match.id;
    });
    if (match_found) {
      return match_found;
    } else {
      return {
        score: 'Pronostiquer'
      };
    }
  }

  setMatchResult(match) {
    if(!this.isAdmin()) {
      return;
    }

    let dialogRef = this.matDialog.open(MatchResultEntryComponent, {
      data: { match: match },
      height: '450px',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherDialogRef = this.matDialog.open(AreYouSureDialogComponent);
        otherDialogRef.afterClosed().subscribe(sure => {
          if(sure === true) {
            this.userService.enterMatchResult(result, match.id).subscribe(response => {
              this.updateScoreMatch(match.id, result.score, result.winner);
            });
          }
        })
      }
    });
  }

  updateScoreMatch(match_id, score, winner) {
    this.stages.forEach((stage, index_stage) => {
      stage.matches.forEach((match, index_match) => {
        if (match.id === match_id) {
          this.stages[index_stage].matches[index_match].score = score;
          this.stages[index_stage].matches[index_match].winner = winner;
        }
      })
    });
  }

  calculatePoints(prediction, match) {
    if (prediction.score !== 'Pronostiquer') {
      if (match.score) {
        if (prediction.score === match.score) {
          return 3;
        }

        if (prediction.winner === match.winner) {
          return 1;
        }

        return 0;

      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  get worldcupWinnerPredictionPoints(): number {
    if(this.currentUser !== undefined
      && this.worldcupWinnerPrediction !== undefined
      && this.worldcupWinner !== undefined) {

      if(this.worldcupWinnerPrediction.id === this.worldcupWinner.id) {
        if(this.currentUser.has_modified_worldcup_winner) {
          return 5;
        } else {
          return 10;
        }
      } else {
        return 0;
      }
    } else {
      return null;
    }
  }

  playProject(e) {
    e.preventDefault();
    e.stopPropagation();
    this.projectSound.play();
  }

  getDate(time) {
    return new Date(time).toLocaleDateString();
  }

  getTime(time) {
    return new Date(time).toLocaleTimeString();
  }
}
