import { Injectable } from '@angular/core';

const defaultGraph = {
	edgeList: [
		{ source: 1, target: 2, weight: 10 },
		{ source: 1, target: 3, weight: 10 },
		{ source: 2, target: 4, weight: 10 },
		{ source: 2, target: 5, weight: 10 },
		{ source: 3, target: 6, weight: 10 },
		{ source: 3, target: 7, weight: 10 }
	],
	vertexCount: 7,
	animationType: 'bfs',
	startVertex: 1
};

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private elements = [];
	private edges = [];
	private adjacencyList = {};
	private startVertex = 1;
	private animationType = 'bfs';

	constructor() {
		this.setGraph(defaultGraph);
	}

	setGraph({ edgeList, vertexCount, animationType, startVertex }) {
		this.animationType = animationType;
		this.startVertex = startVertex;

		this.elements = [];
		this.edges = edgeList;
		this.adjacencyList = {};

		for (let i = 1; i <= vertexCount; i++) {
			this.elements.push({ data: { id: `${i}` } });
			this.adjacencyList[i] = [];
		}

		edgeList.forEach(edge => {
			this.elements.push({
				data: {
					id: `${edge.source}-${edge.target}`,
					source: `${edge.source}`,
					target: `${edge.target}`,
					weight: `${edge.weight}`
				}
			});

			this.adjacencyList[edge.source].push(edge.target);
		});
	}

	getElements() {
		return this.elements;
	}

	getAdjacencyList() {
		return this.adjacencyList;
	}

	getAnimationType(): string {
		return this.animationType;
	}
}
