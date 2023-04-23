import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { attempt, range } from 'lodash';
import { AppComponent } from '../app.component';
import { GameDataService } from './game-data.service';
import { GameComponent } from './game.component';
import { GameModule } from './game.module';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let service: GameDataService;
  let compiled;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [
        ReactiveFormsModule,
        GameModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GameDataService);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render game header', () => {
    
    const app = fixture.componentInstance;
    expect(compiled.querySelector('#header').textContent).toEqual('Wordle');
  });

  it('should render a text box for each word attempt', () => {
    const maxAttempts = service.getMaxAttempts();
    const attempts = compiled.querySelectorAll('input.wordle-attempt');

    expect(attempts.length).toEqual(maxAttempts);

    const expectedIds = range(1, attempts.length -1);
    let attemptEl: any;

    expectedIds.forEach((attemptNumber: number) => {
      attemptEl = compiled.querySelector('#attempt-'+attemptNumber);
      expect(attemptEl).toBeTruthy();
    });
  });

  it('should add game data when a guess is entered', () => {
    const expected: any = 'Kingpin';
    const firstAttemptEl = (<FormArray>component.wordForm.controls['attempts']).at(0) as FormArray;
    firstAttemptEl.setValue(expected);
    component.attempts.setValue(expected);
    const lastGuess = service.getLastGuessFromData();
    expect(expected).toEqual(lastGuess);
  });
});
