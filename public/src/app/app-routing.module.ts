import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MainPageUserComponent } from './components/main-page-user/main-page-user.component';
import { NewWordComponent } from './components/functions/new-word/new-word.component';
import { NoteBookComponent } from './components/functions/note-book/note-book.component';
import { QuizzComponent } from './components/functions/quizz/quizz.component';
import { QuizzDetailComponent } from './components/functions/quizz/quizz-detail/quizz-detail.component';
import { StatisticComponent } from './components/functions/statistic/statistic.component';
import { TrainingComponent } from './components/functions/training/training.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

const routes: Routes = [
  {path : '',                   component : HeaderComponent,          outlet : "header"},
  {path : '',                   component : MainPageComponent},
  {path : 'user',               component : MainPageUserComponent,
    canActivate: [AuthGuard]
  },
  {path : 'addword',            component : NewWordComponent,
    canActivate: [AuthGuard]
  },
  {path : 'notebook',           component : NoteBookComponent,
    canActivate: [AuthGuard]
  },
  {path : 'statistic',           component : StatisticComponent,
    canActivate: [AuthGuard]
  },
  {path : 'training',           component : TrainingComponent,
    canActivate: [AuthGuard]
  },
  {path : 'login',              component : LoginComponent},
  {path : 'signup',             component : SignupComponent},
  {path : 'aboutus',            component : AboutUsComponent},
  {path : 'userinfo',           component : UserInfoComponent,
    canActivate: [AuthGuard]
  },
  {path : 'quizz',              component : QuizzComponent,
    canActivate: [AuthGuard]
  },
  { path: 'quizzDetail',        component : QuizzDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainPageUserComponent];