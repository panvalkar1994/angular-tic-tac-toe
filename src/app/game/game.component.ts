import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  board = [["", "", ""],["", "", ""],["","", ""]];
  player1 = true;
  win = false;

  constructor() { }

  ngOnInit(): void {
  }

  playerMove(row:number, col:number){
    console.log(row,col)
    if(this.board[row][col] != ""){
      alert("You cannot select, already selected cell.");
      return
    }
    if(this.player1){
      this.board[row][col] = "X";
      if(this.winningMove(row, col, "X")){
        alert("Player1 won");
      }
    }else{
      this.board[row][col] = "O";
      if(this.winningMove(row, col, "O")){
        alert("Player2 won");
      }
    }
    this.player1 = !this.player1;
  }

  winningMove(row:number, col:number, mark:string){
    if(row==1 && col==1){
      if(this.board[0][0]==this.board[1][1] && this.board[2][2]==this.board[1][1]) return true;
      if(this.board[0][2]==this.board[1][1] && this.board[2][0]==this.board[1][1]) return true;
    }
    const isMatch = (current:string)=>current === mark;
    const rowWin = this.board[row].every(isMatch);
    if(rowWin) return rowWin;
    const colums = [this.board[0][col], this.board[1][col],this.board[2][col]];
    const colWin = colums.every(isMatch);
    if(colWin) return colWin;
    return false;
  }
}
