import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {TimelineComponent} from "./timeline/timeline.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {path: '', component: TimelineComponent, canActivate:[AuthGuard]},
  {path: 'sign-in', component: SignInComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
