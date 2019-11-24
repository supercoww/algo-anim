import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private adjacencyList;
	private elements = [];
	private animationType = 'bfs';

	constructor() {}

	setGraph({ edgeList, vertexCount, animationType }) {
		this.animationType = animationType;

		this.elements = [];

		for (let i = 1; i <= vertexCount; i++) {
			this.elements.push({ data: { id: `${i}` } });
		}

		edgeList.forEach(edge => {
			this.elements.push({
				data: {
					id: `${edge.source}-${edge.target}`,
					source: `${edge.source}`,
					target: `${edge.target}`
				}
			});
		});

		console.log(this.elements);
	}

	getElements() {
		return this.elements;
	}

	getAnimationType(): string {
		return this.animationType;
	}
}
