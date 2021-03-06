import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  mainBoard = [["", "", ""],["", "", ""],["","", ""]];
  board = JSON.parse(JSON.stringify(this.mainBoard))
  player1 = true;
  win = false;
  @ViewChild('snackbarRef') snackbar!:ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  playerMove(row:number, col:number){
    if(this.board[row][col] != ""){
      alert("You cannot select, already selected cell.");
      return
    }
    if(this.player1){
      this.board[row][col] = "X";
      if(this.winningMove(row, col, "X")){
        setTimeout(()=>{
          // alert("Player1 won");
          this.displaySnackbar("Player 1 Won!");
          this.resetGame();
        },0)
      }
    }else{
      this.board[row][col] = "O";
      if(this.winningMove(row, col, "O")){
        setTimeout(()=>{
          // alert("Player2 won");
          this.displaySnackbar("Player 2 won!");
          this.resetGame();
        },0)
      }
    }
    this.player1 = !this.player1;
  }

  winningMove(row:number, col:number, mark:string){
    if((row==col || row-col==0) && this.diagonalCheck(row, col,mark)){
      return true;
    }
    const isMatch = (current:string)=>current === mark;
    const rowWin = this.board[row].every(isMatch);
    if(rowWin) return rowWin;
    const colums = [this.board[0][col], this.board[1][col],this.board[2][col]];
    const colWin = colums.every(isMatch);
    if(colWin) return colWin;
    if(this.checkBoardFilled()){
      this.displaySnackbar("Match Draw!");
    }
    return false;
  }

  diagonalCheck(row:number, col:number, mark:string){
    const leadDia = [this.board[0][0], this.board[1][1], this.board[2][2]];
    const secDia = [this.board[0][2],this.board[1][1], this.board[2][0]];
    const isMatch = (current:string)=>current === mark;
    if(leadDia.every(isMatch, mark)) return true;
    if(secDia.every(isMatch, mark)) return true;
    return false;
  }

  resetGame(){
    this.board = JSON.parse(JSON.stringify(this.mainBoard));
    this.player1 = true;
  }

  displaySnackbar(message:string){
    this.snackbar.nativeElement.setAttribute('style', 'display:block;');
    this.snackbar.nativeElement.innerText = message;
    setTimeout(()=>{
      this.snackbar.nativeElement.setAttribute('style','display:none;');
    },2000);
  }

  checkBoardFilled(){
    let count = 0;
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(this.board[i][j]!=="") count++;
      }
    }
    return count===9;
  }
}
