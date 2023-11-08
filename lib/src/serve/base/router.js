//router class

import { checkarr, checkfn } from '../check.js';
import { Route } from './route.js';
import { addRoute } from './addRoute.js';
import { handleRoute } from './handleRoute.js';

export class Router {
	constructor (middlewares = []) {
		//handle middlewares
		checkarr(middlewares, 'middlewares');
		middlewares.forEach((middleware, i) => checkfn(middleware, `middleware at index (${i})`));
		this.middlewares = middlewares;
		
		//handle routes
		this.root = new Route()
		
		//handle listner
		this.listener = this.handle.bind(this)
	}
	
	handle (req, res, ctx = {}) {
		handleRoute(this, req, res, ctx)
	}
	
	use (...middlewares) {
		middlewares.forEach((middleware, i) => checkfn(middleware, `middleware at index (${i})`));
		this.middlewares.push(...middlewares)
	}
	
	error (error, status, req, res, ...args) {
		res.writeHead(status);
		res.end()
	}
	
	route (path, handler, opts = {}) {
		return addRoute(path, this.root, this, handler, opts, Route)
	}
	
	all (path, handler) {
		return this.route(path, handler)
	}
	connect (path, handler) {
		return this.route(path).method('connect', handler)
	}
	delete (path, handler) {
		return this.route(path).method('delete', handler)
	}
	get (path, handler) {
		return this.route(path).method('get', handler)
	}
	head (path, handler) {
		return this.route(path).method('head', handler)
	}
	options (path, handler) {
		return this.route(path).method('options', handler)
	}
	patch (path, handler) {
		return this.route(path).method('patch', handler)
	}
	post (path, handler) {
		return this.route(path).method('post', handler)
	}
	put (path, handler) {
		return this.route(path).method('put', handler)
	}
	trace (path, handler) {
		return this.route(path).method('trace', handler)
	}
}