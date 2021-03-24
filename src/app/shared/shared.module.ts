import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopHomeComponent } from '../home/desktop-home.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { Ng5SliderModule } from 'ng5-slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryModule } from 'ng-gallery';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirePerformanceModule } from '@angular/fire/performance'
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    DesktopHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    Ng5SliderModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatSelectCountryModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    GalleryModule,
    MatExpansionModule,
    NgxGalleryModule,
    HttpClientModule,
    MatDialogModule,
    ChartsModule,
    NgxDonutChartModule,
    NgxPaginationModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, MatSelectCountryModule, // storage
    AngularFireDatabaseModule, // database
    AngularFirePerformanceModule, // performance
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: []
})
export class SharedModule { }
