import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';

import { AppComponent } from './app.component';
import { InputMatrixComponent } from './input-matrix/input-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    InputMatrixComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents(null),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
