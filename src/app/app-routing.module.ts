import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{ path: '', component: GraphComponent, data: { animation: 'left' } },
	{ path: 'input', component: FormComponent, data: { animation: 'right' } }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
