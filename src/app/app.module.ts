import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { FormComponent } from './form/form.component';

@NgModule({
	declarations: [AppComponent, GraphComponent, FormComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
