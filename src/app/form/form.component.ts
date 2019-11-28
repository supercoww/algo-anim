import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	graphForm: FormGroup;
	matrixSize = 2;

	constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {}

	ngOnInit() {
		const graph = this.dataService.getData();
		this.graphForm = this.fb.group({
			animationType: graph.animationType,
			startVertex: graph.startVertex,
			vertexCount: graph.vertexCount,
			edgeList: this.fb.array(
				graph.edges.map(edge => {
					return this.fb.group(edge);
				})
			)
		});
	}

	public get edgeForms(): FormArray {
		return this.graphForm.get('edgeList') as FormArray;
	}

	addRow() {
		const edge = this.fb.group({
			source: '',
			target: '',
			weight: ''
		});
		this.edgeForms.push(edge);
	}

	deleteRow(index: number) {
		this.edgeForms.removeAt(index);
	}

	onSubmit() {
		const formData = this.graphForm.getRawValue();

		this.dataService.setGraph(formData);
		this.router.navigateByUrl('/');
	}
}
