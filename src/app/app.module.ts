import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ClientService } from "./client.service";
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}
