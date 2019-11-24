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
			list: this.fb.array([this.newRow()])
		});
	}

	public get listRows(): FormArray {
		return this.graphForm.get('list') as FormArray;
	}

	newRow() {
		return this.fb.group({
			id: '',
			neighbors: ''
		});
	}

	addRow() {
		this.listRows.push(this.newRow());
	}

	deleteRow(index: number) {
		this.listRows.removeAt(index);
	}

	newItem(): FormControl {
		return this.fb.control('');
	}

	onSubmit() {
		const formData = this.graphForm.getRawValue();

		this.dataService.setGraph(formData);
		this.router.navigateByUrl('/');
	}
}
