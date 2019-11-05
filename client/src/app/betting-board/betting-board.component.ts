import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService, Stage } from './../api/stage.service';
import { TeamService, Team } from './../api/team.service';
import { UserService, User } from './../api/user.service';
import { AreYouSureDialogComponent } from './../are-you-sure-dialog/are-you-sure-dialog.component';
import { PronoDialogComponent } from '../prono-dialog/prono-dialog.component';
import { MatchResultEntryComponent } from '../match-result-entry/match-result-entry.component';
import { RandomPredictionsComponent } from '../random-predictions/random-predictions.component';

import { PredictionService } from './../api/prediction.service';
import { Match } from './../api/match.service';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  // OPENING_TIME: number = 1528927200000;
  // END_OF_GROUPS_TIME: number = 1530223200000; 28juin(fini 1 jour avant la vrai ouverture qui était le 30juin)
  // START_OF_FINAL_PHASE_TIME: number = 1530309600000;
  // all those times help to know when user could bet afcon winner
  OPENING_TIME: number = 1561111200000;
  END_OF_GROUPS_TIME: number = 1562101200000; // 2 juillet à 21h, heure de fin du dernier match(21+2h);
  START_OF_FINAL_PHASE_TIME: number = 1562346000000; // Fermeture 2nd prono vainqueur au debut du premier match de 8ième

  stages: Stage[];
  teams: Team[];
  afconWinnerPrediction: Team;
  afconWinner: Team;
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
    // console.log("today: ", this.today)
    // console.log("END_OF_GROUPS_TIME: ", this.END_OF_GROUPS_TIME)
    this.projectSound.volume = 0.2;

    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      this.stageSelected = undefined;

      // Get all stages in databases
      this.stageService.stagesSubject.subscribe(stages => {
        if(stages && stages.length) {
          if(this.today < this.END_OF_GROUPS_TIME) {
            this.stageSelected = 'all';
          } else {
            this.stageSelected = 'knockout_stage_only';
          }
        }
        this.stages = stages;
        // console.log("Stages: ", this.stages);
      });
    });
    // console.log("stage select: ", this.stageSelected)
    this.userService.userSubject.subscribe(user => {
      this.currentUser = user;
      if(user && this.currentUser.afcon_winner) {
        this.afconWinnerPrediction = this.currentUser.afcon_winner;
        // console.log("afconWinnerPrediction: ", this.afconWinnerPrediction.flag_url)
      }else{
        // console.log("ndem: ", this.afconWinnerPrediction)
      }
    });

    //Don't forget flag_url for afcon winner
    this.userService.afconWinnerSubject.subscribe(winner => {
      if(winner && winner.flag_url){
        this.afconWinner = winner
      }else{
        // console.log("NOTHING//")
      }
    });
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  selectAfconWinner() {
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
            let previousWinner = this.afconWinner;
            this.afconWinner = result;
            this.userService.enterAfconWinner(result).subscribe(winner => {
              this.afconWinner = winner;
              this.userService.getCurrentUser();
            }, err => {
              console.error(err);
              this.matSnackBar.open('Erreur. Réessayez...', undefined, {
                duration: 3000
              });
              this.afconWinner = previousWinner;
            });
          }
        });
      }
    });
  }

  get selectedMatches() {
    // console.log('select: ',this.stageSelected);
    if(this.stageSelected !== 'all' && this.stageSelected !== 'knockout_stage_only') {
      // console.log("Nous soe dans les groupes")
      // console.log(this.stageSelected)
      return this.stageSelected.matches;
    } else if(this.stageSelected === 'knockout_stage_only') {
      // console.log("Nous soe dans les phases éliminatoires!");
      let knockoutList = [];
      this.stages.forEach(stage => {
        // console.log(stage);
        if(stage.must_have_winner) {
          knockoutList.push(...stage.matches);
        }
      });
      // console.log("knockoutList: ",knockoutList);
      return knockoutList.sort((m1, m2) => {
        return m1.match_time - m2.match_time;
      });
    } else {
      // console.log("Nous soe dans All")
      let fullList = [];
      this.stages.forEach(stage => {
        // console.log(stage)
        fullList.push(...stage.matches);
      });
      // console.log("fullList: ",fullList);
      return fullList.sort((m1, m2) => {
        return m1.match_time - m2.match_time;
      });
    }
  }
  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px',
      maxWidth: '80%',
      width: '50%',
      minWidth: '300px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let previousPrediction = this.afconWinnerPrediction;
        this.afconWinnerPrediction = result;
        this.userService.predictAfconWinner(result).subscribe(winner => {
          this.afconWinnerPrediction = winner;
        }, err => {
          console.error(err);
          this.matSnackBar.open('Erreur. Réessayez...', undefined, {
            duration: 3000
          });
          this.afconWinnerPrediction = previousPrediction;
        });
      }
    });
  }
  
  openPronoDialog(match): void {
    let currentPrediction = this.getPrediction(match);
    // console.log("currentPrediction: ", currentPrediction)
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
          // console.log("prediction: ",prediction)
          this.userService.updatePrediction(prediction);
        });
      }
    });
  }

  getMatchStage(match: Match): Stage {
    if(this.stageSelected && this.stageSelected !== 'all' && this.stageSelected !== 'knockout_stage_only') {
      return this.stageSelected;
    } else {
      return this.stages.find(s => s.id === match.stages_id);
    }
  }

  canPredict(match: Match): boolean {
    // console.log("match details: ", match)
    if (match.score) {
      return false;
    }
    if (!match.team_1 || !match.team_2) {
      return false;
    }

    let matchStage = this.getMatchStage(match);
    // console.log("today: ", this.today )
    // console.log("open staging", matchStage.opening_time * 1000)
    // console.log("matchStage: ", matchStage)
    if(!matchStage) {
      throw 'No stage found for match ' + match.id;
    }

    // if opening time of stages is not arrived today? return false
    if (this.today < matchStage.opening_time * 1000) {
      return false;
    } else {
      if (match.match_time) {
        // console.log("Here")
        // console.log("today: ", this.today)
        // console.log("time match: ", ((match.match_time - 3600) * 1000))
        return this.today < ((match.match_time - 3600) * 1000);
      } else {
        return (new Date(this.today)).toLocaleDateString() !== (new Date(match.match_time * 1000)).toLocaleDateString()
          && this.today < match.match_time * 1000;
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

  // don't forget 1 pt  for user who have not pronostic the right score
  // 0 pt for person who doesn't pronostic 
  calculatePoints(match) {
    let prediction = this.getPrediction(match);
    if (prediction) {
      if(match.winner === prediction.winner) {
        if(match.score === prediction.score) {
          return 5;
        } else {
          return 3;
        }
      }else{
        return 1;
      }
    }
    return 0;
  }

  get afconWinnerPredictionPoints(): number {
    if(this.currentUser != null
      && this.afconWinnerPrediction != null
      && this.afconWinner != null) {
      
      if(this.afconWinnerPrediction.id === this.afconWinner.id) {
        if(this.currentUser.has_modified_afcon_winner) {
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
// Help to check if user can betting
  isAfconWinnerPredictionOpen(): boolean {
    return this.today < this.OPENING_TIME ||
      (this.today >= this.END_OF_GROUPS_TIME && this.today < this.START_OF_FINAL_PHASE_TIME);
  }

  get teamPickerLabel(): string {
    if(this.today < this.OPENING_TIME) {
      return `Jusqu'à la veille du premier match, pronostique qui va gagner la coupe ici 👉🏽`;
    } else if(this.today >= this.END_OF_GROUPS_TIME && this.today < this.START_OF_FINAL_PHASE_TIME) {
      return `Tu peux modifier ton prono pour le vainqueur de la coupe jusqu'au 5 juillet avant 17h. Mais tu ne gagneras que 10 points (contre 15).`
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
    //console.log("predictionWinner: ", prediction.winner)
    //console.log("matchId: ", match.team_1.id)
    if(prediction && prediction.winner) {
      if(match.team_1.id === prediction.winner) {
        // console.log("matchId: ", match.team_1.flag_url)
        return match.team_1.flag_url;
      } else if(match.team_2.id === prediction.winner) {
        return match.team_2.flag_url;
      }
    }

    return null;
  }

  canRollDices(): boolean {
    return this.today < this.OPENING_TIME
      && this.stageSelected != null
      && (this.stageSelected === 'all' || !this.stageSelected.must_have_winner);
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
      minHeight: '400px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    ref.afterClosed().subscribe(result => {
      if(result) {
        this.userService.getCurrentUser();
      }
    })
  }
}
