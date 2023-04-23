import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { GameDataService } from './game-data.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    GameDataService
  ],
  exports: [
    GameComponent
  ],
  bootstrap: [GameComponent]
})
export class GameModule { }
