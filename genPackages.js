//generate packages

import { rm, mkdir, writeFile, readFile, cp } from 'node:fs/promises';
import libPack from './packages-src/lib.js';
import comPack from './packages-src/com.js';
import compPack from './packages-src/comp.js';
import domPack from './packages-src/dom.js';
import debugPack from './packages-src/debug.js';
import cliPack from './packages-src/cli.js';
import encodePack from './packages-src/encode.js';

var packages = [
	libPack,
	comPack,
	compPack,
	cliPack,
	domPack,
	debugPack,
	encodePack
];

//extract package.json
var { version, description, author, license, homepage, bugs, repository } = JSON.parse(await readFile('./package.json'));

//create packages folder
await rm('./packages', { recursive: true, force: true })

packages.forEach(async pack => {
	console.log('generated: ' + pack.name);
	
	//create package folder
	await mkdir('./packages/' + pack.name, { recursive: true });
	
	//create package.js
	writeFile('./packages/' + pack.name + '/package.json', JSON.stringify({
		name: '@simplyjs/' + pack.name,
		version, description, author, license, homepage, bugs, repository,
		type: 'module',
		...pack.package
	}));
	
	//copy files and folders
	pack.files.forEach(file => cp(file[0], './packages/' + pack.name + '/' + file[1]));
	pack.folders.forEach(folder => cp(folder[0], './packages/' + pack.name + '/' + folder[1], { recursive: true }));
})