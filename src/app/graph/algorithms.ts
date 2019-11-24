let path: any[];
let visited: boolean[];

export const bfs = (graph, startVertex): string[] => {
	const queue = [startVertex];
	const visited$: boolean[] = [];
	const path$ = [];

	visited$[startVertex] = true;
	path$.push(`${startVertex}`);

	while (queue.length > 0) {
		const vertex = queue.pop();

		graph[vertex].forEach(neighbor => {
			if (!visited$[neighbor]) {
				queue.unshift(neighbor);
				path$.push(`${vertex}-${neighbor}`);
				path$.push(`${neighbor}`);
				visited$[neighbor] = true;
			}
		});
	}

	return path$;
};

export const dfs = (graph, startVertex): string[] => {
	path = [];
	visited = [];

	dfsUtility(graph, startVertex, null);

	return path;
};

function dfsUtility(graph, startVertex, previousVertex) {
	if (visited[startVertex]) {
		return;
	}

	visited[startVertex] = true;
	if (previousVertex) {
		path.push(`${previousVertex}-${startVertex}`);
	}
	path.push(`${startVertex}`);

	graph[startVertex].forEach(neighbor => {
		dfsUtility(graph, neighbor, startVertex);
	});
}

export const kruskal = (vertexCount, edges): string[] => {
	edges.sort((a, b) => b.weight - a.weight);

	return [];
};
