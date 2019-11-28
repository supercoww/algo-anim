export const bfs = (graph, startVertex): string[] => {
	const queue = [startVertex];
	const visited: boolean[] = [];
	const path = [];

	visited[startVertex] = true;
	path.push(`${startVertex}`);

	while (queue.length > 0) {
		const vertex = queue.pop();

		graph[vertex].forEach(neighbor => {
			if (!visited[neighbor]) {
				queue.unshift(neighbor);
				path.push(`${vertex}-${neighbor}`);
				path.push(`${neighbor}`);
				visited[neighbor] = true;
			}
		});
	}

	return path;
};

export const dfs = (graph, startVertex): string[] => {
	const path = [];
	const visited: boolean[] = [];

	function dfsUtility(currentVertex, previousVertex) {
		if (visited[currentVertex]) {
			return;
		}

		visited[currentVertex] = true;
		if (previousVertex) {
			path.push(`${previousVertex}-${currentVertex}`);
		}
		path.push(`${currentVertex}`);

		graph[currentVertex].forEach(neighbor => {
			dfsUtility(neighbor, currentVertex);
		});
	}

	dfsUtility(startVertex, null);

	return path;
};

export const kruskal = (vertexCount, edges): string[] => {
	const sequence = [];
	let count = 0;

	const disjointSet = {
		parents: [],
		find: vertex => {
			while (disjointSet.parents[vertex] !== -1) {
				if (!disjointSet.parents[vertex]) {
					throw new Error('Invalid vertex');
				}
				vertex = disjointSet.parents[vertex];
			}
			return vertex;
		},
		union: (x, y) => {
			disjointSet.parents[disjointSet.find(x)] = disjointSet.find(y);
		}
	};

	for (let i = 1; i <= vertexCount; i++) {
		disjointSet.parents[i] = -1;
	}

	edges.sort((a, b) => a.weight - b.weight);

	for (const edge of edges) {
		if (disjointSet.find(edge.source) === disjointSet.find(edge.target)) {
			continue;
		}
		disjointSet.union(edge.source, edge.target);

		sequence.push(`${edge.source}`);
		sequence.push(`${edge.source}-${edge.target}`);
		sequence.push(`${edge.target}`);

		count++;
		if (count >= vertexCount - 1) {
			break;
		}
	}

	return sequence;
};
