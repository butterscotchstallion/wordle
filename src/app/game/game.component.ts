import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GameDataService } from './game-data.service';
import { IGameWordLetter } from './i-game-word-letter.interface';

@Component({
  selector: 'wordle-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  gameData: IGameWordLetter[][] = [];
  wordForm: FormGroup;
  private subscriptions = [];

  constructor(private dataService: GameDataService) { 

  }

  ngOnInit(): void {
    this.wordForm = new FormGroup({
      attempts: new FormArray([])
    });
    this.gameData = this.dataService.startGame();
    this.addAttempts();
    this.subscriptions.push(this.wordForm.valueChanges.subscribe((changes) => {
      this.onFormChange(changes);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  private onFormChange(changes) {
    const attempts = changes['attempts'];

    attempts.forEach((attempt: string, row: number) => {
      this.dataService.setWordAtRow(attempt, row, isInCorrectPosition, isInWord)
    });
  }

  get attempts() {
    return this.wordForm.controls['attempts'] as FormArray;
  }

  addAttempts() {
    /**
     * Each "row" represents an attempt
     */
    this.gameData.forEach((attempt) => {
      this.attempts.push(new FormControl(''));
    });
  }
}
