import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

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

  OPENING_TIME: number = 1528927200000;
  END_OF_GROUPS_TIME: number = 1530223200000;
  START_OF_FINAL_PHASE_TIME: number = 1530309600000;

  stages: Stage[];
  teams: Team[];
  worldcupWinnerPrediction: Team;
  worldcupWinner: Team;
  currentUser: User;
  projectSound = new Audio('/assets/lkfjeff54df5d4f2.mp3');
  whistleSound = new Audio('/assets/whistle.mp3');
  stageSelected;
  today: number = new Date().valueOf();

  constructor(private matDialog: MatDialog,
              private stageService: StageService,
              private teamService: TeamService,
              private userService: UserService,
              private predictionService: PredictionService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.projectSound.volume = 0.2;
    this.whistleSound.volume = 0.2;

    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      this.stageSelected = undefined;

      this.stageService.getStagesWithMatches().subscribe(stages => {
        if(stages && stages.length) {
          this.stageSelected = 'all';
        }
        this.stages = stages;
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

    this.userService.worldcupWinnerSubject.subscribe(winner => {
      this.worldcupWinner = winner;
    });
  }

  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px',
      maxWidth: '1400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let previousPrediction = this.worldcupWinnerPrediction;
      this.worldcupWinnerPrediction = result;
      this.userService.predictWorldcupWinner(result).subscribe(winner => {
        this.worldcupWinnerPrediction = winner;
      }, err => {
        console.error(err);
        this.matSnackBar.open('Erreur. Réessayez...', undefined, {
          duration: 3000
        });
        this.worldcupWinnerPrediction = previousPrediction;
      });
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
      height: '600px',
      maxWidth: '1400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherDialogRef = this.matDialog.open(AreYouSureDialogComponent);
        otherDialogRef.afterClosed().subscribe(sure => {
          if(sure === true) {
            let previousWinner = this.worldcupWinner;
            this.worldcupWinner = result;
            this.userService.enterWorldcupWinner(result).subscribe(winner => {
              this.worldcupWinner = winner;
            }, err => {
              console.error(err);
              this.matSnackBar.open('Erreur. Réessayez...', undefined, {
                duration: 3000
              });
              this.worldcupWinner = previousWinner;
            });
          }
        });
      }
    });
  }

  get selectedMatches() {
    if(this.stageSelected !== 'all') {
      return this.stageSelected.matches;
    } else {
      let fullList = [];
      this.stages.forEach(stage => {
        fullList.push(...stage.matches);
      });
      return fullList.sort((m1, m2) => {
        return m1.match_time - m2.match_time;
      });
    }
  }

  openPronoDialog(match): void {
    let currentPrediction = this.getPrediction(match);
    let dialogRef = this.matDialog.open(PronoDialogComponent, {
      data: { match: match, prediction: currentPrediction },
      height: '450px',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.predictionService.postPredict(match, result).subscribe(prediction => {
          this.userService.updatePrediction(prediction);
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
    return this.currentUser.predictions.find(pred => {
      return pred.matches_id === match.id;
    });
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
            this.userService.enterMatchResult(match, result.score, result.winner).subscribe(response => {
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
    if (prediction) {
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

  whistle(toPlay: boolean) {
    if(toPlay) {
      this.whistleSound.play();
    } else {
      this.whistleSound.pause();
      this.whistleSound.currentTime = 0;
    }
  }

  getDate(time) {
    return new Date(time).toLocaleDateString();
  }

  getTime(time) {
    return new Date(time).toLocaleTimeString();
  }

  isWorldcupWinnerPredictionOpen(): boolean {
    return this.today < this.OPENING_TIME ||
      (this.today >= this.END_OF_GROUPS_TIME && this.today < this.START_OF_FINAL_PHASE_TIME);
  }

  get teamPickerLabel(): string {
    if(this.today < this.OPENING_TIME) {
      return `Jusqu'à la veille du premier match, pronostique qui va gagner la coupe !`;
    } else if(this.today >= this.END_OF_GROUPS_TIME && this.today < this.START_OF_FINAL_PHASE_TIME) {
      return `Tu peux modifier ton prono jusqu'à minuit. Mais tu gagneras moitié moins de points.`
    }
  }

  getWinnerFlag(match: Match): string {
    if(match.winner) {
      if(match.team_1.id === match.winner) {
        return match.team_1.flag_url;
      } else if(match.team_2.id === match.winner) {
        return match.team_2.flag_url;
      }
    }
  }

  getWinnerFlagFromPrediction(match: Match): string {
    let prediction = this.getPrediction(match);

    if(prediction && prediction.winner) {
      if(match.team_1.id === prediction.winner) {
        return match.team_1.flag_url;
      } else if(match.team_2.id === prediction.winner) {
        return match.team_2.flag_url;
      }
    }

    return null;
  }
}
