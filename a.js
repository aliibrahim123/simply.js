import { readdir, readFile } from 'node:fs/promises';

var i = [];

var getFiles = async (path) => {
	var files = await readdir(path, { withFileTypes: true });
	
	return Promise.all(files.map(file => {
		if (file.name === 'node_modules') return;
		if (file.name === 'dist') return;
		if (file.isDirectory()) return getFiles(path + '/' + file.name);
		if (file.name.includes('.js')) return handleFile(path + '/' + file.name)
	}))
}

var handleFile = async (path) => {
	
	var file = await readFile(path);
	if (file.toString().split('\n').filter(i => i.length > 120).length > 0) i.push(path)
	//.forEach(line => line.length > 120 && console.log(path))
}

await getFiles('.')
console.log(i)