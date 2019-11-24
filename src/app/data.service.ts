import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private adjacencyList;
	private elements = [];
	private animationType = 'bfs';

	constructor() {}

	setGraph({ list: adjacencyList, animationType }) {
		this.adjacencyList = adjacencyList;
		this.animationType = animationType;

		this.elements = [];
		adjacencyList.forEach(vertex => {
			this.elements.push({ data: { id: vertex.id } });

			const neighbors = vertex.neighbors.split(' ');

			neighbors.forEach(neighbor => {
				this.elements.push({
					data: {
						id: `${vertex.id}${neighbor}`,
						source: vertex.id,
						target: neighbor
					}
				});
			});
		});
	}

	getElements() {
		return this.elements;
	}

	getAnimationType(): string {
		return this.animationType;
	}
}
