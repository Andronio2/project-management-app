import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SortColumnsTasksPipe } from './pipes/sort-columns-tasks.pipe';

const MaterialComponents = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatSlideToggleModule,
];
@NgModule({
  declarations: [SortColumnsTasksPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialComponents],
  exports: [FormsModule, ReactiveFormsModule, ...MaterialComponents, SortColumnsTasksPipe],
})
export class ShareModule {}
