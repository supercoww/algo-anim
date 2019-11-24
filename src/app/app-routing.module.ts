import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{ path: '', component: GraphComponent },
	{ path: 'input', component: FormComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
