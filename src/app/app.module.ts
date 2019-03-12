import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdcSelectModule } from '@angular-mdc/web';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddJobComponent } from './add-job/add-job.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AddUserComponent } from './robin/add-user/add-user.component';
import { AddCompanyComponent } from './robin/add-company/add-company.component';
import { RobinManageComponent } from './robin/robin-manage/robin-manage.component';
import { CandidateApplicationsComponent } from './refr/candidate-applications/candidate-applications.component';
import { ManageUsersComponent } from './refr/manage-users/manage-users.component';
import { JobsComponent } from './refr/jobs/jobs.component';
import { InvitationsComponent } from './refr/invitations/invitations.component';
import { LoginResolverService } from './login-resolver.service';
const routes: Routes = [
  { path: '', component: LoginComponent, resolve: { login: LoginResolverService } },
  { path: 'robin', component: FormsComponent,
    children:[
      { path: 'add-user',component:AddUserComponent},
      { path: 'add-company', component: AddCompanyComponent},
      { path: 'manage',component: RobinManageComponent}
    ],
    canActivate:[AuthGuard]
  },
  { path: 'refr', component: AddJobComponent,
    children:[
      { path: 'candidate-applications',component:CandidateApplicationsComponent},
      { path:'users',component: ManageUsersComponent},
      { path:'jobs',component: JobsComponent},
      { path:'invitations',component: InvitationsComponent}
    ],
    canActivate:[AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormsComponent,
    AddJobComponent,
    AddUserComponent,
    AddCompanyComponent,
    RobinManageComponent,
    CandidateApplicationsComponent,
    ManageUsersComponent,
    JobsComponent,
    InvitationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClrFormsNextModule,
    RouterModule.forRoot(routes),
    MdcSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
