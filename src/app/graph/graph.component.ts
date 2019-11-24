import { Component, OnInit, OnDestroy } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { DataService } from '../data.service';

const defaultGraph = [
	// list of graph elements to start with
	{
		// node 1
		data: { id: '1' }
	},
	{
		// node b
		data: { id: '2' }
	},
	{
		// node b
		data: { id: '3' }
	},
	{
		// node b
		data: { id: '4' }
	},
	{
		// node b
		data: { id: '5' }
	},
	{
		// node b
		data: { id: '6' }
	},
	{
		// edge ab
		data: { id: '12', source: '1', target: '2' }
	},
	{
		// edge ab
		data: { id: '24', source: '2', target: '4' }
	},
	{
		// edge ab
		data: { id: '25', source: '2', target: '5' }
	},
	{
		// edge ab
		data: { id: '13', source: '1', target: '3' }
	},
	{
		// edge ab
		data: { id: '36', source: '3', target: '6' }
	}
];

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
	graph = defaultGraph;
	animationType: string;
	cy = null;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		const newGraph = this.dataService.getElements();
		this.animationType = this.dataService.getAnimationType();

		if (newGraph.length > 0) {
			this.graph = newGraph;
		}

		this.cy = cytoscape({
			container: document.getElementById('cy'), // container to render in
			elements: this.graph,
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
				directed: false
			}
		});

		this.startAnimation();
	}

	startAnimation() {
		this.cy.elements().removeClass('highlighted');

		let path = [];
		if (this.animationType === 'bfs') {
			path = this.cy.elements().bfs('#1', () => {}, true).path;
		} else if (this.animationType === 'dfs') {
			path = this.cy.elements().dfs('#1', () => {}, true).path;
		}

		let i = 0;
		const highlightNextEle = () => {
			if (i < path.length) {
				path[i].addClass('highlighted');

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
