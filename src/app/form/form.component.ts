import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
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
		this.graphForm = this.fb.group({
			animationType: 'bfs',
			startVertex: '',
			vertexCount: '',
			edgeList: this.fb.array([])
		});
		this.addRow();
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
