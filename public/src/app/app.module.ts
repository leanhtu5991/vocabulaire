//bibliotheque
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, 
  MatSelectModule, MatCardModule, MatListModule, MatRadioModule, MatDividerModule, MatProgressBarModule } from '@angular/material';

//Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MainPageUserComponent } from './components/main-page-user/main-page-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NewWordComponent } from './components/functions/new-word/new-word.component';
import { QuizzComponent } from './components/functions/quizz/quizz.component';
import { NoteBookComponent } from './components/functions/note-book/note-book.component';
import { WordDetailComponent } from './components/functions/word-detail/word-detail.component';
import { ConfirmationComponent } from './components/pop-up/confirmation/confirmation.component';
import { QuizzDetailComponent } from './components/functions/quizz/quizz-detail/quizz-detail.component';
import { QuizzResultComponent } from './components/pop-up/quizz-result/quizz-result.component';

//Pipe
import { BoxformatPipe } from './pipes/boxformat.pipe';
import { WordTypePipe } from './pipes/word-type.pipe';
//Service
import { WordService } from './services/word.service';
import { QuizzService } from './services/quizz.service';
import { AuthenticationService } from './services/auth.service';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AboutUsComponent,
    MainPageUserComponent,
    UserInfoComponent,
    NewWordComponent,
    QuizzComponent,
    NoteBookComponent,
    WordDetailComponent,
    ConfirmationComponent,
    BoxformatPipe,
    WordTypePipe,
    ConfirmationComponent,
    QuizzDetailComponent,
    QuizzResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          skipWhenExpired: true
      }
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  
  providers: [
    DatePipe,
    WordService,
    QuizzService,
    AuthenticationService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [ 
    ConfirmationComponent,
    QuizzResultComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }