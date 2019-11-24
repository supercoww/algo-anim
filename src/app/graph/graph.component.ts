import { Component, OnInit, OnDestroy } from '@angular/core';
import * as cytoscape from 'cytoscape';

import { DataService } from '../data.service';
import { bfs, dfs, kruskal } from './algorithms';

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
	graph;
	cy = null;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.graph = this.dataService.getData();

		this.cy = cytoscape({
			container: document.getElementById('cy'), // container to render in
			elements: this.graph.elements,
			style: (cytoscape as any)
				.stylesheet()
				.selector('node')
				.style({
					content: 'data(id)'
				})
				.selector('edge')
				.style({
					'curve-style': 'bezier',
					'target-arrow-shape': 'triangle',
					width: 4,
					'line-color': '#ddd',
					'target-arrow-color': '#ddd'
				})
				.selector('edge[weight]')
				.style({
					content: 'data(weight)'
				})
				.selector('.highlighted')
				.style({
					'background-color': '#61bffc',
					'line-color': '#61bffc',
					'target-arrow-color': '#61bffc',
					'transition-property': 'background-color, line-color, target-arrow-color',
					'transition-duration': '0.5s'
				}),

			layout: {
				name: 'breadthfirst',
				roots: '#1',
				directed: false
			}
		});

		this.startAnimation();

		kruskal(this.graph.vertexCount, this.graph.edges);
	}

	startAnimation() {
		this.cy.elements().removeClass('highlighted');
		let path;

		if (this.graph.animationType === 'bfs') {
			path = bfs(this.graph.adjacencyList, this.graph.startVertex);
		} else if (this.graph.animationType === 'dfs') {
			path = dfs(this.graph.adjacencyList, this.graph.startVertex);
		} else if (this.graph.animationType === 'mst') {
			path = this.cy.elements().kruskal();
		}

		let i = 0;
		const highlightNextEle = () => {
			if (i < path.length) {
				this.cy.getElementById(path[i]).addClass('highlighted');

				i++;
				setTimeout(highlightNextEle, 1000);
			}
		};

		// kick off first highlight
		highlightNextEle();
	}

	ngOnDestroy() {
		this.cy.destroy();
	}
}
