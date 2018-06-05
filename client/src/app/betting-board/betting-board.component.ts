import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService, Stage } from './../api/stage.service';
import { TeamService, Team } from './../api/team.service';
import { UserService, User } from './../api/user.service';
import { AreYouSureDialogComponent } from './../are-you-sure-dialog/are-you-sure-dialog.component';
import { PronoDialogComponent } from "../prono-dialog/prono-dialog.component";
import { MatchResultEntryComponent } from "../match-result-entry/match-result-entry.component";
import { RandomPredictionsComponent } from "../random-predictions/random-predictions.component";

import { PredictionService } from "./../api/prediction.service";
import { Match } from "./../api/match.service";

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
  dicesSound = new Audio('/assets/dices.mp3');
  stageSelected;
  today: number = new Date().valueOf();

  constructor(private matDialog: MatDialog,
              private stageService: StageService,
              private teamService: TeamService,
              private userService: UserService,
              private predictionService: PredictionService,
              private matSnackBar: MatSnackBar,
              private overlay: Overlay) { }

  ngOnInit() {
    this.projectSound.volume = 0.2;

    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      this.stageSelected = undefined;

      this.stageService.stagesSubject.subscribe(stages => {
        if(stages && stages.length) {
          this.stageSelected = 'all';
        }
        this.stages = stages;
      });
    });

    this.userService.userSubject.subscribe(user => {
      this.currentUser = user;
      if(user && this.currentUser.worldcup_winner) {
        this.worldcupWinnerPrediction = this.currentUser.worldcup_winner;
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
      maxWidth: '90%',
      width: '50%',
      minWidth: '400px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
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
      }
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
      maxWidth: '90%',
      width: '50%',
      minWidth: '400px',
      scrollStrategy: this.overlay.scrollStrategies.block()
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
              this.userService.getCurrentUser();
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
      data: { stage: this.getMatchStage(match), match: match, prediction: currentPrediction },
      height: '450px',
      width: '50%',
      minWidth: '400px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.predictionService.postPredict(match, result).subscribe(prediction => {
          this.userService.updatePrediction(prediction);
        });
      }
    });
  }

  getMatchStage(match: Match): Stage {
    if(this.stageSelected && this.stageSelected !== 'all') {
      return this.stageSelected;
    } else {
      return this.stages.find(s => s.id === match.stages_id);
    }
  }

  canPredict(match: Match): boolean {
    if (match.score) {
      return false;
    }
    if (!match.team_1 || !match.team_2) {
      return false;
    }

    let matchStage = this.getMatchStage(match);

    if(!matchStage) {
      throw 'No stage found for match ' + match.id;
    }

    if (this.today < matchStage.opening_time * 1000) {
      return false;
    } else {
      if (matchStage.closing_time) {
        return this.today < matchStage.closing_time * 1000;
      } else {
        return (new Date(this.today)).toLocaleDateString() === (new Date(match.match_time * 1000)).toLocaleDateString()
      }
    }
  }

  getPrediction(match): any {
    if(this.currentUser) {
      return this.currentUser.predictions.find(pred => {
        return pred.matches_id === match.id;
      });
    }
    return undefined;
  }

  setMatchResult(match) {
    if(!this.isAdmin()) {
      return;
    }

    let dialogRef = this.matDialog.open(MatchResultEntryComponent, {
      data: { match: match, stage: this.getMatchStage(match) },
      height: '450px',
      width: '50%',
      minWidth: '400px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherDialogRef = this.matDialog.open(AreYouSureDialogComponent);
        otherDialogRef.afterClosed().subscribe(sure => {
          if(sure === true) {
            this.userService.enterMatchResult(match, result).subscribe(response => {
              match.score = response.score;
              match.winner = response.winner;
              match.final_score = response.final_score;
              this.userService.getCurrentUser();
            });
          }
        })
      }
    });
  }

  calculatePoints(match) {
    let prediction = this.getPrediction(match);

    if (prediction) {
      if(match.winner === prediction.winner) {
        if(match.score === prediction.score) {
          return 3;
        } else {
          return 1;
        }
      }
    }
    return 0;
  }

  get worldcupWinnerPredictionPoints(): number {
    if(this.currentUser != null
      && this.worldcupWinnerPrediction != null
      && this.worldcupWinner != null) {

      if(this.worldcupWinnerPrediction.id === this.worldcupWinner.id) {
        if(this.currentUser.has_modified_worldcup_winner) {
          return 10;
        } else {
          return 15;
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

  shakeDices(doShake: boolean) {
    if(doShake) {
      this.dicesSound.play();
    } else {
      this.dicesSound.pause();
      this.dicesSound.currentTime = 0;
    }
  }

  rollDices() {
    let ref = this.matDialog.open(RandomPredictionsComponent, {
      maxWidth: '500px',
      minHeight: '300px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    ref.afterClosed().subscribe(result => {
      if(result) {
        this.userService.getCurrentUser();
      }
    })
  }
}
