import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { PictureComponent } from "./picture/picture.component";
import { CallbackComponent } from "./callback/callback.component";
import { NavComponent } from "./nav/nav.component";
import { ButtonComponent } from "./button/button.component";
import { ContainerComponent } from "./container/container.component";
import { ErrorComponent } from "./error/error.component";

const appRoutes: Routes = [
  { path: "callback", component: CallbackComponent },
  { path: "**", component: PictureComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PictureComponent,
    CallbackComponent,
    NavComponent,
    ButtonComponent,
    ContainerComponent,
    ErrorComponent
  ],
  imports: [RouterModule.forRoot(appRoutes), BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
