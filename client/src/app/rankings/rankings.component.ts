import { Component, OnInit } from '@angular/core';
import { Rank, RankingService } from '../api/ranking.service';
import { UserService, User } from '../api/user.service';

const ELEMENT_DATA: Rank[] = [
  {
    rank: 1, user: {
      id: 1, email: "", entity: "",
      name: "Jacky 4L",
      predictions: [],
      picture_url: "https://lh3.googleusercontent.com/Q6Vk-wiksoqyOc_1DkrAzmNwDtZl1QeAxUgf93pmHKoJNLvKKwTv4RZOQDJ1QHdtGjAcgvHxiEUUcQ=x0-y0-z0",
      worldcup_winner: {id: 1, name: "France", iso2: "fr", flag_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", eliminated: false},
      has_modified_worldcup_winner: false,
      points: 100
    }
  },
  {
    rank: 2, user: {
      id: 2, email: "", entity: "",
      name: "Roger Moore",
      predictions: [],
      picture_url: "https://lh3.googleusercontent.com/Q6Vk-wiksoqyOc_1DkrAzmNwDtZl1QeAxUgf93pmHKoJNLvKKwTv4RZOQDJ1QHdtGjAcgvHxiEUUcQ=x0-y0-z0",
      worldcup_winner: {id: 1, name: "France", iso2: "fr", flag_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", eliminated: false},
      has_modified_worldcup_winner: false,
      points: 80
    }
  },
  {
    rank: 3, user: {
      id: 1, email: "", entity: "",
      name: "Richard J'ire",
      predictions: [],
      picture_url: "https://lh3.googleusercontent.com/Q6Vk-wiksoqyOc_1DkrAzmNwDtZl1QeAxUgf93pmHKoJNLvKKwTv4RZOQDJ1QHdtGjAcgvHxiEUUcQ=x0-y0-z0",
      worldcup_winner: {id: 1, name: "France", iso2: "fr", flag_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", eliminated: false},
      has_modified_worldcup_winner: false,
      points: 60
    }
  },
  {
    rank: 4, user: {
      id: 1, email: "", entity: "",
      name: "Marylin Mon Rot",
      predictions: [],
      picture_url: "https://lh3.googleusercontent.com/Q6Vk-wiksoqyOc_1DkrAzmNwDtZl1QeAxUgf93pmHKoJNLvKKwTv4RZOQDJ1QHdtGjAcgvHxiEUUcQ=x0-y0-z0",
      worldcup_winner: {id: 1, name: "France", iso2: "fr", flag_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", eliminated: false},
      has_modified_worldcup_winner: false,
      points: 40
    }
  },
  {
    rank: 5, user: {
      id: 1, email: "", entity: "",
      name: "Patrick C'est Bastien",
      predictions: [],
      picture_url: "https://lh3.googleusercontent.com/Q6Vk-wiksoqyOc_1DkrAzmNwDtZl1QeAxUgf93pmHKoJNLvKKwTv4RZOQDJ1QHdtGjAcgvHxiEUUcQ=x0-y0-z0",
      worldcup_winner: {id: 1, name: "France", iso2: "fr", flag_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", eliminated: false},
      has_modified_worldcup_winner: false,
      points: 20
    }
  }
];

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  ranking = [];
  /*applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }*/

  constructor(private rankingService: RankingService, private userService: UserService) { }

  ngOnInit() {
    this.userService.userSubject.subscribe(user => {
      this.rankingService.globalRanking.subscribe(ranking => {
        ranking.forEach(rank => {
          rank.highlighted = rank.user.id == user.id;
          this.ranking.push(rank);
        });
      });
    });
  }

}
