webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _http = __webpack_require__(1);
	
	var _angular2InMemoryWebApi = __webpack_require__(255);
	
	var _inMemoryData = __webpack_require__(267);
	
	var _platformBrowserDynamic = __webpack_require__(268);
	
	var _core = __webpack_require__(4);
	
	var _router = __webpack_require__(362);
	
	var _app = __webpack_require__(413);
	
	var _app2 = __webpack_require__(425);
	
	__webpack_require__(428);
	
	(0, _platformBrowserDynamic.bootstrap)(_app2.AppComponent, [_app.APP_ROUTER_PROVIDERS, _http.HTTP_PROVIDERS, { provide: _http.XHRBackend, useClass: _angular2InMemoryWebApi.InMemoryBackendService }, { provide: _angular2InMemoryWebApi.SEED_DATA, useClass: _inMemoryData.InMemoryDataService }, (0, _core.provide)(_core.PLATFORM_DIRECTIVES, { useValue: [_router.ROUTER_DIRECTIVES], multi: true })]);

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(256));
	__export(__webpack_require__(266));
	//# sourceMappingURL=index.js.map

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(1);
	var Observable_1 = __webpack_require__(37);
	__webpack_require__(257);
	var http_status_codes_1 = __webpack_require__(266);
	/**
	* Seed data for in-memory database
	* Must implement InMemoryDbService.
	*/
	exports.SEED_DATA = new core_1.OpaqueToken('seedData');
	/**
	*  InMemoryBackendService configuration options
	*  Usage:
	*    provide(InMemoryBackendConfig, {useValue: {delay:600}}),
	*/
	var InMemoryBackendConfig = (function () {
	    function InMemoryBackendConfig(config) {
	        if (config === void 0) { config = {}; }
	        Object.assign(this, {
	            defaultResponseOptions: new http_1.BaseResponseOptions(),
	            delay: 500,
	            delete404: false
	        }, config);
	    }
	    return InMemoryBackendConfig;
	}());
	exports.InMemoryBackendConfig = InMemoryBackendConfig;
	exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
	/**
	 * Simulate the behavior of a RESTy web api
	 * backed by the simple in-memory data store provided by the injected InMemoryDataService service.
	 * Conforms mostly to behavior described here:
	 * http://www.restapitutorial.com/lessons/httpmethods.html
	 *
	 * ### Usage
	 *
	 * Create InMemoryDataService class the implements InMemoryDataService.
	 * Register both this service and the seed data as in:
	 * ```
	 * // other imports
	 * import { HTTPPROVIDERS, XHRBackend } from 'angular2/http';
	 * import { InMemoryBackendConfig, InMemoryBackendService, SEEDDATA } from '../in-memory-backend/in-memory-backend.service';
	 * import { InMemoryStoryService } from '../api/in-memory-story.service';
	 *
	 * @Component({
	 *   selector: ...,
	 *   templateUrl: ...,
	 *   providers: [
	 *     HTTPPROVIDERS,
	 *     provide(XHRBackend, { useClass: InMemoryBackendService }),
	 *     provide(SEEDDATA, { useClass: InMemoryStoryService }),
	 *     provide(InMemoryBackendConfig, { useValue: { delay: 600 } }),
	 *   ]
	 * })
	 * export class AppComponent { ... }
	 * ```
	 */
	var InMemoryBackendService = (function () {
	    function InMemoryBackendService(seedData, config) {
	        this.seedData = seedData;
	        this.config = new InMemoryBackendConfig();
	        this.resetDb();
	        var loc = this.getLocation('./');
	        this.config.host = loc.host;
	        this.config.rootPath = loc.pathname;
	        Object.assign(this.config, config);
	    }
	    InMemoryBackendService.prototype.createConnection = function (req) {
	        var res = this.handleRequest(req);
	        var response = new Observable_1.Observable(function (responseObserver) {
	            if (exports.isSuccess(res.status)) {
	                responseObserver.next(res);
	                responseObserver.complete();
	            }
	            else {
	                responseObserver.error(res);
	            }
	            return function () { }; // unsubscribe function
	        });
	        response = response.delay(this.config.delay || 500);
	        return {
	            readyState: http_1.ReadyState.Done,
	            request: req,
	            response: response
	        };
	    };
	    ////  protected /////
	    /**
	     * Process Request and return an Http Response object
	     * in the manner of a RESTy web api.
	     *
	     * Expect URI pattern in the form :base/:collectionName/:id?
	     * Examples:
	     *   // for store with a 'characters' collection
	     *   GET api/characters          // all characters
	     *   GET api/characters/42       // the character with id=42
	     *   GET api/characters?name=^j  // 'j' is a regex; returns characters whose name contains 'j' or 'J'
	     *   GET api/characters.json/42  // ignores the ".json"
	     *
	     *   POST commands/resetDb  // resets the "database"
	     */
	    InMemoryBackendService.prototype.handleRequest = function (req) {
	        var _a = this.parseUrl(req.url), base = _a.base, collectionName = _a.collectionName, id = _a.id, resourceUrl = _a.resourceUrl, query = _a.query;
	        var collection = this.db[collectionName];
	        var reqInfo = {
	            req: req,
	            base: base,
	            collection: collection,
	            collectionName: collectionName,
	            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
	            id: this.parseId(collection, id),
	            query: query,
	            resourceUrl: resourceUrl
	        };
	        var options;
	        try {
	            if ('commands' === reqInfo.base.toLowerCase()) {
	                options = this.commands(reqInfo);
	            }
	            else if (reqInfo.collection) {
	                switch (req.method) {
	                    case http_1.RequestMethod.Get:
	                        options = this.get(reqInfo);
	                        break;
	                    case http_1.RequestMethod.Post:
	                        options = this.post(reqInfo);
	                        break;
	                    case http_1.RequestMethod.Put:
	                        options = this.put(reqInfo);
	                        break;
	                    case http_1.RequestMethod.Delete:
	                        options = this.delete(reqInfo);
	                        break;
	                    default:
	                        options = this.createErrorResponse(http_status_codes_1.STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
	                        break;
	                }
	            }
	            else {
	                options = this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Collection '" + collectionName + "' not found");
	            }
	        }
	        catch (error) {
	            var err = error.message || error;
	            options = this.createErrorResponse(http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, "" + err);
	        }
	        options = this.setStatusText(options);
	        if (this.config.defaultResponseOptions) {
	            options = this.config.defaultResponseOptions.merge(options);
	        }
	        return new http_1.Response(options);
	    };
	    /**
	     * Apply query/search parameters as a filter over the collection
	     * This impl only supports RegExp queries on string properties of the collection
	     * ANDs the conditions together
	     */
	    InMemoryBackendService.prototype.applyQuery = function (collection, query) {
	        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
	        var conditions = [];
	        query.paramsMap.forEach(function (value, name) {
	            value.forEach(function (v) { return conditions.push({ name: name, rx: new RegExp(decodeURI(v), 'i') }); });
	        });
	        var len = conditions.length;
	        if (!len) {
	            return collection;
	        }
	        // AND the RegExp conditions
	        return collection.filter(function (row) {
	            var ok = true;
	            var i = len;
	            while (ok && i) {
	                i -= 1;
	                var cond = conditions[i];
	                ok = cond.rx.test(row[cond.name]);
	            }
	            return ok;
	        });
	    };
	    InMemoryBackendService.prototype.clone = function (data) {
	        return JSON.parse(JSON.stringify(data));
	    };
	    /**
	     * When the `base`="commands", the `collectionName` is the command
	     * Example URLs:
	     *   commands/resetdb   // Reset the "database" to its original state
	     *   commands/config (GET) // Return this service's config object
	     *   commands/config (!GET) // Update the config (e.g. delay)
	     *
	     * Usage:
	     *   http.post('commands/resetdb', null);
	     *   http.get('commands/config');
	     *   http.post('commands/config', '{"delay":1000}');
	     */
	    InMemoryBackendService.prototype.commands = function (reqInfo) {
	        var command = reqInfo.collectionName.toLowerCase();
	        var method = reqInfo.req.method;
	        var options;
	        switch (command) {
	            case 'resetdb':
	                this.resetDb();
	                options = new http_1.ResponseOptions({ status: http_status_codes_1.STATUS.OK });
	                break;
	            case 'config':
	                if (method === http_1.RequestMethod.Get) {
	                    options = new http_1.ResponseOptions({
	                        body: this.clone(this.config),
	                        status: http_status_codes_1.STATUS.OK
	                    });
	                }
	                else {
	                    // Be nice ... any other method is a config update
	                    var body = JSON.parse(reqInfo.req.text() || '{}');
	                    Object.assign(this.config, body);
	                    options = new http_1.ResponseOptions({ status: http_status_codes_1.STATUS.NO_CONTENT });
	                }
	                break;
	            default:
	                options = this.createErrorResponse(http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, "Unknown command \"" + command + "\"");
	        }
	        return options;
	    };
	    InMemoryBackendService.prototype.createErrorResponse = function (status, message) {
	        return new http_1.ResponseOptions({
	            body: { 'error': "" + message },
	            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
	            status: status
	        });
	    };
	    InMemoryBackendService.prototype.delete = function (_a) {
	        var id = _a.id, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers;
	        if (!id) {
	            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Missing \"" + collectionName + "\" id");
	        }
	        var exists = this.removeById(collection, id);
	        return new http_1.ResponseOptions({
	            headers: headers,
	            status: (exists || !this.config.delete404) ? http_status_codes_1.STATUS.NO_CONTENT : http_status_codes_1.STATUS.NOT_FOUND
	        });
	    };
	    InMemoryBackendService.prototype.findById = function (collection, id) {
	        return collection.find(function (item) { return item.id === id; });
	    };
	    InMemoryBackendService.prototype.genId = function (collection) {
	        // assumes numeric ids
	        var maxId = 0;
	        collection.reduce(function (prev, item) {
	            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
	        }, null);
	        return maxId + 1;
	    };
	    InMemoryBackendService.prototype.get = function (_a) {
	        var id = _a.id, query = _a.query, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers;
	        var data = collection;
	        if (id) {
	            data = this.findById(collection, id);
	        }
	        else if (query) {
	            data = this.applyQuery(collection, query);
	        }
	        if (!data) {
	            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "'" + collectionName + "' with id='" + id + "' not found");
	        }
	        return new http_1.ResponseOptions({
	            body: { data: this.clone(data) },
	            headers: headers,
	            status: http_status_codes_1.STATUS.OK
	        });
	    };
	    InMemoryBackendService.prototype.getLocation = function (href) {
	        var l = document.createElement('a');
	        l.href = href;
	        return l;
	    };
	    ;
	    InMemoryBackendService.prototype.indexOf = function (collection, id) {
	        return collection.findIndex(function (item) { return item.id === id; });
	    };
	    // tries to parse id as number if collection item.id is a number.
	    // returns the original param id otherwise.
	    InMemoryBackendService.prototype.parseId = function (collection, id) {
	        if (!id) {
	            return null;
	        }
	        var isNumberId = collection[0] && typeof collection[0].id === 'number';
	        if (isNumberId) {
	            var idNum = parseFloat(id);
	            return isNaN(idNum) ? id : idNum;
	        }
	        return id;
	    };
	    InMemoryBackendService.prototype.parseUrl = function (url) {
	        try {
	            var loc = this.getLocation(url);
	            var drop = this.config.rootPath.length;
	            var urlRoot = '';
	            if (loc.host !== this.config.host) {
	                // url for a server on a different host!
	                // assume it's collection is actually here too.
	                drop = 1; // the leading slash
	                urlRoot = loc.protocol + '//' + loc.host + '/';
	            }
	            var path = loc.pathname.substring(drop);
	            var _a = path.split('/'), base = _a[0], collectionName = _a[1], id = _a[2];
	            var resourceUrl = urlRoot + base + '/' + collectionName + '/';
	            collectionName = collectionName.split('.')[0]; // ignore anything after the '.', e.g., '.json'
	            var query = loc.search && new http_1.URLSearchParams(loc.search.substr(1));
	            return { base: base, id: id, collectionName: collectionName, resourceUrl: resourceUrl, query: query };
	        }
	        catch (err) {
	            var msg = "unable to parse url '" + url + "'; original error: " + err.message;
	            throw new Error(msg);
	        }
	    };
	    InMemoryBackendService.prototype.post = function (_a) {
	        var collection = _a.collection, headers = _a.headers, id = _a.id, req = _a.req, resourceUrl = _a.resourceUrl;
	        var item = JSON.parse(req.text());
	        if (!item.id) {
	            item.id = id || this.genId(collection);
	        }
	        // ignore the request id, if any. Alternatively,
	        // could reject request if id differs from item.id
	        id = item.id;
	        var existingIx = this.indexOf(collection, id);
	        if (existingIx > -1) {
	            collection[existingIx] = item;
	            return new http_1.ResponseOptions({
	                headers: headers,
	                status: http_status_codes_1.STATUS.NO_CONTENT
	            });
	        }
	        else {
	            collection.push(item);
	            headers.set('Location', resourceUrl + '/' + id);
	            return new http_1.ResponseOptions({
	                headers: headers,
	                body: { data: this.clone(item) },
	                status: http_status_codes_1.STATUS.CREATED
	            });
	        }
	    };
	    InMemoryBackendService.prototype.put = function (_a) {
	        var id = _a.id, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, req = _a.req;
	        var item = JSON.parse(req.text());
	        if (!id) {
	            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Missing '" + collectionName + "' id");
	        }
	        if (id !== item.id) {
	            return this.createErrorResponse(http_status_codes_1.STATUS.BAD_REQUEST, "\"" + collectionName + "\" id does not match item.id");
	        }
	        var existingIx = this.indexOf(collection, id);
	        if (existingIx > -1) {
	            collection[existingIx] = item;
	            return new http_1.ResponseOptions({
	                headers: headers,
	                status: http_status_codes_1.STATUS.NO_CONTENT // successful; no content
	            });
	        }
	        else {
	            collection.push(item);
	            return new http_1.ResponseOptions({
	                body: { data: this.clone(item) },
	                headers: headers,
	                status: http_status_codes_1.STATUS.CREATED
	            });
	        }
	    };
	    InMemoryBackendService.prototype.removeById = function (collection, id) {
	        var ix = this.indexOf(collection, id);
	        if (ix > -1) {
	            collection.splice(ix, 1);
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Reset the "database" to its original state
	     */
	    InMemoryBackendService.prototype.resetDb = function () {
	        this.db = this.seedData.createDb();
	    };
	    InMemoryBackendService.prototype.setStatusText = function (options) {
	        try {
	            var statusCode = http_status_codes_1.STATUS_CODE_INFO[options.status];
	            options['statusText'] = statusCode ? statusCode.text : 'Unknown Status';
	            return options;
	        }
	        catch (err) {
	            return new http_1.ResponseOptions({
	                status: http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR,
	                statusText: 'Invalid Server Operation'
	            });
	        }
	    };
	    InMemoryBackendService = __decorate([
	        __param(0, core_1.Inject(exports.SEED_DATA)),
	        __param(1, core_1.Inject(InMemoryBackendConfig)),
	        __param(1, core_1.Optional()), 
	        __metadata('design:paramtypes', [Object, Object])
	    ], InMemoryBackendService);
	    return InMemoryBackendService;
	}());
	exports.InMemoryBackendService = InMemoryBackendService;
	//# sourceMappingURL=in-memory-backend.service.js.map

/***/ },

/***/ 266:
/***/ function(module, exports) {

	"use strict";
	exports.STATUS = {
	    CONTINUE: 100,
	    SWITCHING_PROTOCOLS: 101,
	    OK: 200,
	    CREATED: 201,
	    ACCEPTED: 202,
	    NON_AUTHORITATIVE_INFORMATION: 203,
	    NO_CONTENT: 204,
	    RESET_CONTENT: 205,
	    PARTIAL_CONTENT: 206,
	    MULTIPLE_CHOICES: 300,
	    MOVED_PERMANTENTLY: 301,
	    FOUND: 302,
	    SEE_OTHER: 303,
	    NOT_MODIFIED: 304,
	    USE_PROXY: 305,
	    TEMPORARY_REDIRECT: 307,
	    BAD_REQUEST: 400,
	    UNAUTHORIZED: 401,
	    PAYMENT_REQUIRED: 402,
	    FORBIDDEN: 403,
	    NOT_FOUND: 404,
	    METHOD_NOT_ALLOWED: 405,
	    NOT_ACCEPTABLE: 406,
	    PROXY_AUTHENTICATION_REQUIRED: 407,
	    REQUEST_TIMEOUT: 408,
	    CONFLICT: 409,
	    GONE: 410,
	    LENGTH_REQUIRED: 411,
	    PRECONDITION_FAILED: 412,
	    PAYLOAD_TO_LARGE: 413,
	    URI_TOO_LONG: 414,
	    UNSUPPORTED_MEDIA_TYPE: 415,
	    RANGE_NOT_SATISFIABLE: 416,
	    EXPECTATION_FAILED: 417,
	    IM_A_TEAPOT: 418,
	    UPGRADE_REQUIRED: 426,
	    INTERNAL_SERVER_ERROR: 500,
	    NOT_IMPLEMENTED: 501,
	    BAD_GATEWAY: 502,
	    SERVICE_UNAVAILABLE: 503,
	    GATEWAY_TIMEOUT: 504,
	    HTTP_VERSION_NOT_SUPPORTED: 505,
	    PROCESSING: 102,
	    MULTI_STATUS: 207,
	    IM_USED: 226,
	    PERMANENT_REDIRECT: 308,
	    UNPROCESSABLE_ENTRY: 422,
	    LOCKED: 423,
	    FAILED_DEPENDENCY: 424,
	    PRECONDITION_REQUIRED: 428,
	    TOO_MANY_REQUESTS: 429,
	    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	    VARIANT_ALSO_NEGOTIATES: 506,
	    INSUFFICIENT_STORAGE: 507,
	    NETWORK_AUTHENTICATION_REQUIRED: 511
	};
	/*tslint:disable:quotemark max-line-length one-line */
	exports.STATUS_CODE_INFO = {
	    "100": {
	        "code": 100,
	        "text": "Continue",
	        "description": "\"The initial part of a request has been received and has not yet been rejected by the server.\"",
	        "spec_title": "RFC7231#6.2.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.2.1"
	    },
	    "101": {
	        "code": 101,
	        "text": "Switching Protocols",
	        "description": "\"The server understands and is willing to comply with the client's request, via the Upgrade header field, for a change in the application protocol being used on this connection.\"",
	        "spec_title": "RFC7231#6.2.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.2.2"
	    },
	    "200": {
	        "code": 200,
	        "text": "OK",
	        "description": "\"The request has succeeded.\"",
	        "spec_title": "RFC7231#6.3.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.1"
	    },
	    "201": {
	        "code": 201,
	        "text": "Created",
	        "description": "\"The request has been fulfilled and has resulted in one or more new resources being created.\"",
	        "spec_title": "RFC7231#6.3.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
	    },
	    "202": {
	        "code": 202,
	        "text": "Accepted",
	        "description": "\"The request has been accepted for processing, but the processing has not been completed.\"",
	        "spec_title": "RFC7231#6.3.3",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.3"
	    },
	    "203": {
	        "code": 203,
	        "text": "Non-Authoritative Information",
	        "description": "\"The request was successful but the enclosed payload has been modified from that of the origin server's 200 (OK) response by a transforming proxy.\"",
	        "spec_title": "RFC7231#6.3.4",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.4"
	    },
	    "204": {
	        "code": 204,
	        "text": "No Content",
	        "description": "\"The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.\"",
	        "spec_title": "RFC7231#6.3.5",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.5"
	    },
	    "205": {
	        "code": 205,
	        "text": "Reset Content",
	        "description": "\"The server has fulfilled the request and desires that the user agent reset the \"document view\", which caused the request to be sent, to its original state as received from the origin server.\"",
	        "spec_title": "RFC7231#6.3.6",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.6"
	    },
	    "206": {
	        "code": 206,
	        "text": "Partial Content",
	        "description": "\"The server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests's Range header field.\"",
	        "spec_title": "RFC7233#4.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7233#section-4.1"
	    },
	    "300": {
	        "code": 300,
	        "text": "Multiple Choices",
	        "description": "\"The target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.\"",
	        "spec_title": "RFC7231#6.4.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.1"
	    },
	    "301": {
	        "code": 301,
	        "text": "Moved Permanently",
	        "description": "\"The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.\"",
	        "spec_title": "RFC7231#6.4.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.2"
	    },
	    "302": {
	        "code": 302,
	        "text": "Found",
	        "description": "\"The target resource resides temporarily under a different URI.\"",
	        "spec_title": "RFC7231#6.4.3",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.3"
	    },
	    "303": {
	        "code": 303,
	        "text": "See Other",
	        "description": "\"The server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.\"",
	        "spec_title": "RFC7231#6.4.4",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.4"
	    },
	    "304": {
	        "code": 304,
	        "text": "Not Modified",
	        "description": "\"A conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.\"",
	        "spec_title": "RFC7232#4.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7232#section-4.1"
	    },
	    "305": {
	        "code": 305,
	        "text": "Use Proxy",
	        "description": "*deprecated*",
	        "spec_title": "RFC7231#6.4.5",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.5"
	    },
	    "307": {
	        "code": 307,
	        "text": "Temporary Redirect",
	        "description": "\"The target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.\"",
	        "spec_title": "RFC7231#6.4.7",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.7"
	    },
	    "400": {
	        "code": 400,
	        "text": "Bad Request",
	        "description": "\"The server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.\"",
	        "spec_title": "RFC7231#6.5.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.1"
	    },
	    "401": {
	        "code": 401,
	        "text": "Unauthorized",
	        "description": "\"The request has not been applied because it lacks valid authentication credentials for the target resource.\"",
	        "spec_title": "RFC7235#6.3.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7235#section-3.1"
	    },
	    "402": {
	        "code": 402,
	        "text": "Payment Required",
	        "description": "*reserved*",
	        "spec_title": "RFC7231#6.5.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.2"
	    },
	    "403": {
	        "code": 403,
	        "text": "Forbidden",
	        "description": "\"The server understood the request but refuses to authorize it.\"",
	        "spec_title": "RFC7231#6.5.3",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.3"
	    },
	    "404": {
	        "code": 404,
	        "text": "Not Found",
	        "description": "\"The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.\"",
	        "spec_title": "RFC7231#6.5.4",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.4"
	    },
	    "405": {
	        "code": 405,
	        "text": "Method Not Allowed",
	        "description": "\"The method specified in the request-line is known by the origin server but not supported by the target resource.\"",
	        "spec_title": "RFC7231#6.5.5",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.5"
	    },
	    "406": {
	        "code": 406,
	        "text": "Not Acceptable",
	        "description": "\"The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.\"",
	        "spec_title": "RFC7231#6.5.6",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.6"
	    },
	    "407": {
	        "code": 407,
	        "text": "Proxy Authentication Required",
	        "description": "\"The client needs to authenticate itself in order to use a proxy.\"",
	        "spec_title": "RFC7231#6.3.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
	    },
	    "408": {
	        "code": 408,
	        "text": "Request Timeout",
	        "description": "\"The server did not receive a complete request message within the time that it was prepared to wait.\"",
	        "spec_title": "RFC7231#6.5.7",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.7"
	    },
	    "409": {
	        "code": 409,
	        "text": "Conflict",
	        "description": "\"The request could not be completed due to a conflict with the current state of the resource.\"",
	        "spec_title": "RFC7231#6.5.8",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.8"
	    },
	    "410": {
	        "code": 410,
	        "text": "Gone",
	        "description": "\"Access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.\"",
	        "spec_title": "RFC7231#6.5.9",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.9"
	    },
	    "411": {
	        "code": 411,
	        "text": "Length Required",
	        "description": "\"The server refuses to accept the request without a defined Content-Length.\"",
	        "spec_title": "RFC7231#6.5.10",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.10"
	    },
	    "412": {
	        "code": 412,
	        "text": "Precondition Failed",
	        "description": "\"One or more preconditions given in the request header fields evaluated to false when tested on the server.\"",
	        "spec_title": "RFC7232#4.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7232#section-4.2"
	    },
	    "413": {
	        "code": 413,
	        "text": "Payload Too Large",
	        "description": "\"The server is refusing to process a request because the request payload is larger than the server is willing or able to process.\"",
	        "spec_title": "RFC7231#6.5.11",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.11"
	    },
	    "414": {
	        "code": 414,
	        "text": "URI Too Long",
	        "description": "\"The server is refusing to service the request because the request-target is longer than the server is willing to interpret.\"",
	        "spec_title": "RFC7231#6.5.12",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.12"
	    },
	    "415": {
	        "code": 415,
	        "text": "Unsupported Media Type",
	        "description": "\"The origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.\"",
	        "spec_title": "RFC7231#6.5.13",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.13"
	    },
	    "416": {
	        "code": 416,
	        "text": "Range Not Satisfiable",
	        "description": "\"None of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.\"",
	        "spec_title": "RFC7233#4.4",
	        "spec_href": "http://tools.ietf.org/html/rfc7233#section-4.4"
	    },
	    "417": {
	        "code": 417,
	        "text": "Expectation Failed",
	        "description": "\"The expectation given in the request's Expect header field could not be met by at least one of the inbound servers.\"",
	        "spec_title": "RFC7231#6.5.14",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.14"
	    },
	    "418": {
	        "code": 418,
	        "text": "I'm a teapot",
	        "description": "\"1988 April Fools Joke. Returned by tea pots requested to brew coffee.\"",
	        "spec_title": "RFC 2324",
	        "spec_href": "https://tools.ietf.org/html/rfc2324"
	    },
	    "426": {
	        "code": 426,
	        "text": "Upgrade Required",
	        "description": "\"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.\"",
	        "spec_title": "RFC7231#6.5.15",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.15"
	    },
	    "500": {
	        "code": 500,
	        "text": "Internal Server Error",
	        "description": "\"The server encountered an unexpected condition that prevented it from fulfilling the request.\"",
	        "spec_title": "RFC7231#6.6.1",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.1"
	    },
	    "501": {
	        "code": 501,
	        "text": "Not Implemented",
	        "description": "\"The server does not support the functionality required to fulfill the request.\"",
	        "spec_title": "RFC7231#6.6.2",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.2"
	    },
	    "502": {
	        "code": 502,
	        "text": "Bad Gateway",
	        "description": "\"The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.\"",
	        "spec_title": "RFC7231#6.6.3",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.3"
	    },
	    "503": {
	        "code": 503,
	        "text": "Service Unavailable",
	        "description": "\"The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.\"",
	        "spec_title": "RFC7231#6.6.4",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.4"
	    },
	    "504": {
	        "code": 504,
	        "text": "Gateway Time-out",
	        "description": "\"The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.\"",
	        "spec_title": "RFC7231#6.6.5",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.5"
	    },
	    "505": {
	        "code": 505,
	        "text": "HTTP Version Not Supported",
	        "description": "\"The server does not support, or refuses to support, the protocol version that was used in the request message.\"",
	        "spec_title": "RFC7231#6.6.6",
	        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.6"
	    },
	    "102": {
	        "code": 102,
	        "text": "Processing",
	        "description": "\"An interim response to inform the client that the server has accepted the complete request, but has not yet completed it.\"",
	        "spec_title": "RFC5218#10.1",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.1"
	    },
	    "207": {
	        "code": 207,
	        "text": "Multi-Status",
	        "description": "\"Status for multiple independent operations.\"",
	        "spec_title": "RFC5218#10.2",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.2"
	    },
	    "226": {
	        "code": 226,
	        "text": "IM Used",
	        "description": "\"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.\"",
	        "spec_title": "RFC3229#10.4.1",
	        "spec_href": "http://tools.ietf.org/html/rfc3229#section-10.4.1"
	    },
	    "308": {
	        "code": 308,
	        "text": "Permanent Redirect",
	        "description": "\"The target resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.\"",
	        "spec_title": "RFC7238",
	        "spec_href": "http://tools.ietf.org/html/rfc7238"
	    },
	    "422": {
	        "code": 422,
	        "text": "Unprocessable Entity",
	        "description": "\"The server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.\"",
	        "spec_title": "RFC5218#10.3",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.3"
	    },
	    "423": {
	        "code": 423,
	        "text": "Locked",
	        "description": "\"The source or destination resource of a method is locked.\"",
	        "spec_title": "RFC5218#10.4",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.4"
	    },
	    "424": {
	        "code": 424,
	        "text": "Failed Dependency",
	        "description": "\"The method could not be performed on the resource because the requested action depended on another action and that action failed.\"",
	        "spec_title": "RFC5218#10.5",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.5"
	    },
	    "428": {
	        "code": 428,
	        "text": "Precondition Required",
	        "description": "\"The origin server requires the request to be conditional.\"",
	        "spec_title": "RFC6585#3",
	        "spec_href": "http://tools.ietf.org/html/rfc6585#section-3"
	    },
	    "429": {
	        "code": 429,
	        "text": "Too Many Requests",
	        "description": "\"The user has sent too many requests in a given amount of time (\"rate limiting\").\"",
	        "spec_title": "RFC6585#4",
	        "spec_href": "http://tools.ietf.org/html/rfc6585#section-4"
	    },
	    "431": {
	        "code": 431,
	        "text": "Request Header Fields Too Large",
	        "description": "\"The server is unwilling to process the request because its header fields are too large.\"",
	        "spec_title": "RFC6585#5",
	        "spec_href": "http://tools.ietf.org/html/rfc6585#section-5"
	    },
	    "451": {
	        "code": 451,
	        "text": "Unavailable For Legal Reasons",
	        "description": "\"The server is denying access to the resource in response to a legal demand.\"",
	        "spec_title": "draft-ietf-httpbis-legally-restricted-status",
	        "spec_href": "http://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status"
	    },
	    "506": {
	        "code": 506,
	        "text": "Variant Also Negotiates",
	        "description": "\"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.\"",
	        "spec_title": "RFC2295#8.1",
	        "spec_href": "http://tools.ietf.org/html/rfc2295#section-8.1"
	    },
	    "507": {
	        "code": 507,
	        "text": "Insufficient Storage",
	        "description": "\The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.\"",
	        "spec_title": "RFC5218#10.6",
	        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.6"
	    },
	    "511": {
	        "code": 511,
	        "text": "Network Authentication Required",
	        "description": "\"The client needs to authenticate to gain network access.\"",
	        "spec_title": "RFC6585#6",
	        "spec_href": "http://tools.ietf.org/html/rfc6585#section-6"
	    }
	};
	//# sourceMappingURL=http-status-codes.js.map

/***/ },

/***/ 267:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InMemoryDataService = exports.InMemoryDataService = function () {
	    function InMemoryDataService() {
	        _classCallCheck(this, InMemoryDataService);
	    }
	
	    _createClass(InMemoryDataService, [{
	        key: 'createDb',
	        value: function createDb() {
	            var heroes = [{ id: 11, name: 'Mr. Nice' }, { id: 12, name: 'Narco' }, { id: 13, name: 'Bombasto' }, { id: 14, name: 'Celeritas' }, { id: 15, name: 'Magneta' }, { id: 16, name: 'RubberMan' }, { id: 17, name: 'Dynama' }, { id: 18, name: 'Dr IQ' }, { id: 19, name: 'Magma' }, { id: 20, name: 'Tornado' }];
	            return { heroes: heroes };
	        }
	    }]);

	    return InMemoryDataService;
	}();

/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.APP_ROUTER_PROVIDERS = undefined;
	
	var _router = __webpack_require__(362);
	
	var _heroes = __webpack_require__(414);
	
	var _heroDetail = __webpack_require__(415);
	
	var _dashboard = __webpack_require__(422);
	
	var routes = [{
	    path: '',
	    redirectTo: '/dashboard',
	    pathMatch: 'full'
	}, {
	    path: 'dashboard',
	    component: _dashboard.DashboardComponent
	}, {
	    path: 'detail/:id',
	    component: _heroDetail.HeroDetailComponent
	}, {
	    path: 'heroes',
	    component: _heroes.HeroesComponent
	}];
	var APP_ROUTER_PROVIDERS = exports.APP_ROUTER_PROVIDERS = [(0, _router.provideRouter)(routes)];

/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeroesComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _core = __webpack_require__(4);
	
	var _router = __webpack_require__(362);
	
	var _heroDetail = __webpack_require__(415);
	
	var _hero = __webpack_require__(416);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	
	//
	var HeroesComponent = exports.HeroesComponent = function () {
	    function HeroesComponent(router, heroService) {
	        _classCallCheck(this, HeroesComponent);
	
	        this.router = router;
	        this.heroService = heroService;
	    }
	
	    _createClass(HeroesComponent, [{
	        key: "ngOnInit",
	        value: function ngOnInit() {
	            this.getHeroes();
	        }
	    }, {
	        key: "getHeroes",
	        value: function getHeroes() {
	            var _this = this;
	
	            this.heroService.getHeroes().then(function (heroes) {
	                return _this.heroes = heroes;
	            });
	        }
	    }, {
	        key: "onSelect",
	        value: function onSelect(hero) {
	            this.selectedHero = hero;
	        }
	    }, {
	        key: "gotoDetail",
	        value: function gotoDetail() {
	            this.router.navigate(['/detail', this.selectedHero.id]);
	        }
	    }, {
	        key: "addHero",
	        value: function addHero() {
	            this.addingHero = true;
	            this.selectedHero = null;
	        }
	    }, {
	        key: "close",
	        value: function close(savedHero) {
	            this.addingHero = false;
	            if (savedHero) {
	                this.getHeroes();
	            }
	        }
	    }, {
	        key: "deleteHero",
	        value: function deleteHero(hero, event) {
	            var _this2 = this;
	
	            event.stopPropagation();
	            this.heroService.delete(hero).then(function (res) {
	                // removes the deleted hero from our displayed hero list
	                // without making an additional request to the server
	                _this2.heroes = _this2.heroes.filter(function (h) {
	                    return h !== hero;
	                });
	                // Resets the selectedHero if it's the one we've deleted
	                if (_this2.selectedHero === hero) {
	                    _this2.selectedHero = null;
	                }
	            }).catch(function (error) {
	                return _this2.error = error;
	            });
	        }
	    }]);
	
	    return HeroesComponent;
	}();
	exports.HeroesComponent = HeroesComponent = __decorate([(0, _core.Component)({
	    selector: "my-heroes",
	    template: __webpack_require__(420),
	    // require syntax enables us to keep a relative file path w/ no errors
	    styles: [__webpack_require__(421)],
	    // reintegrating the details component again to add new heroes
	    directives: [_heroDetail.HeroDetailComponent]
	}), __metadata('design:paramtypes', [_router.Router, _hero.HeroService])], HeroesComponent);
	// // 6. Routing part 2
	//
	// import { Component, OnInit } from '@angular/core';
	// import { Router } from '@angular/router';
	// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
	// import { HeroService } from '../../services/hero/hero.service';
	// import { Hero } from '../../models/hero';
	//
	//
	// @Component({
	//   selector:  `my-heroes`,
	//   // we remove the directives property because we navigate to it, instead
	//   // of including it as a child component
	//   // directives: [HeroDetailComponent],
	//   // replacing or template property with a templateUrl,
	//   // keeping our component object clean and modular.
	//   // Doing similar for the css styles
	//   templateUrl: 'src/app/components/heroes/heroes.component.html',
	//   // The styleUrls takes an array of stylesheets
	//   styleUrls: ['src/app/components/heroes/heroes.component.css']
	// })
	//
	// export class HeroesComponent implements OnInit {
	//
	//   public heroes: Hero[];
	//   public selectedHero: Hero;
	//
	//   constructor(private router: Router, private heroService: HeroService) {
	//
	//   }
	//
	//   ngOnInit() {
	//     this.getHeroes();
	//   }
	//
	//   getHeroes() {
	//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	//   }
	//
	//   onSelect(hero: Hero) {
	//     this.selectedHero = hero;
	//   }
	//
	//   // New method to handle navigating to the details
	//   gotoDetail() {
	//     this.router.navigate(['/detail', this.selectedHero.id]);
	//   }
	//
	// }
	// // 6. Routing part 1
	//
	// import { Component, OnInit } from '@angular/core';
	// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
	// import { HeroService } from '../../services/hero/hero.service';
	// import { Hero } from '../../models/hero';
	//
	//
	// @Component({
	//   selector:  `my-heroes`,
	//   directives: [HeroDetailComponent],
	//   // When we moved this code from the app.component to heroes.component,
	//   // this component receives the heroes from the parent component instead
	//   // of directly from the service.
	//   // providers: [HeroService],
	//   template:
	//     `<h2>My Heroes</h2>
	//      <ul class="heroes">
	//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
	//          <span class="badge">{{hero.id}}</span> {{hero.name}}
	//        </li>
	//      </ul>
	//      <!-- So why are we controlling this hero from a parent
	//      component? Simple. Because our click actions that decide
	//      what this hero is are controlled by the parent, not the
	//      child component-->
	//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
	//   styles:
	//     [`
	//       .selected {
	//         background-color: #CFD8DC !important;
	//         color: white;
	//       }
	//       .heroes {
	//         margin: 0 0 2em 0;
	//         list-style-type: none;
	//         padding: 0;
	//         width: 15em;
	//       }
	//       .heroes li {
	//         cursor: pointer;
	//         position: relative;
	//         left: 0;
	//         background-color: #EEE;
	//         margin: .5em;
	//         padding: .3em 0;
	//         height: 1.6em;
	//         border-radius: 4px;
	//       }
	//       .heroes li.selected:hover {
	//         background-color: #BBD8DC !important;
	//         color: white;
	//       }
	//       .heroes li:hover {
	//         color: #607D8B;
	//         background-color: #DDD;
	//         left: .1em;
	//       }
	//       .heroes .text {
	//         position: relative;
	//         top: -3px;
	//       }
	//       .heroes .badge {
	//         display: inline-block;
	//         font-size: small;
	//         color: white;
	//         padding: 0.8em 0.7em 0 0.7em;
	//         background-color: #607D8B;
	//         line-height: 1em;
	//         position: relative;
	//         left: -1px;
	//         top: -4px;
	//         height: 1.8em;
	//         margin-right: .8em;
	//         border-radius: 4px 0 0 4px;
	//       }
	//     `]
	//
	// })
	//
	// export class HeroesComponent implements OnInit {
	//
	//   public heroes: Hero[];
	//   public selectedHero: Hero;
	//
	//   // What might seem strange about this is that instead
	//   // of handling the service in the appComponent and
	//   // passing the array into the heroesComponent with a
	//   // bracket bind, like we did with the details, we
	//   // instead passed the service down. From what I can
	//   // tell, we're doing this to avoid app-wide information,
	//   // like we used to have in Angular 1 and the "app
	//   // controller"
	//   constructor(private heroService: HeroService) {
	//
	//   }
	//
	//   ngOnInit() {
	//     this.getHeroes();
	//   }
	//
	//   getHeroes() {
	//     //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
	//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	//   }
	//
	//   onSelect(hero: Hero) {
	//     this.selectedHero = hero;
	//   }
	//
	// }

/***/ },

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeroDetailComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _core = __webpack_require__(4);
	
	var _router = __webpack_require__(362);
	
	var _hero = __webpack_require__(416);
	
	var _hero2 = __webpack_require__(417);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var HeroDetailComponent = exports.HeroDetailComponent = function () {
	    function HeroDetailComponent(heroService, route) {
	        _classCallCheck(this, HeroDetailComponent);
	
	        this.heroService = heroService;
	        this.route = route;
	        this.close = new _core.EventEmitter();
	        this.navigated = false;
	    }
	
	    _createClass(HeroDetailComponent, [{
	        key: "ngOnInit",
	        value: function ngOnInit() {
	            var _this = this;
	
	            this.sub = this.route.params.subscribe(function (params) {
	                if (params['id'] !== undefined) {
	                    var id = +params['id'];
	                    _this.navigated = true;
	                    _this.heroService.getHero(id).then(function (hero) {
	                        return _this.hero = hero;
	                    });
	                } else {
	                    _this.navigated = false;
	                    _this.hero = new _hero2.Hero();
	                }
	            });
	        }
	    }, {
	        key: "ngOnDestroy",
	        value: function ngOnDestroy() {
	            this.sub.unsubscribe();
	        }
	    }, {
	        key: "save",
	        value: function save() {
	            var _this2 = this;
	
	            this.heroService.save(this.hero).then(function (hero) {
	                _this2.hero = hero; // saved hero, w/ id if new
	                _this2.goBack(hero);
	            }).catch(function (error) {
	                return _this2.error = error;
	            }); // TODO: Display error message
	        }
	    }, {
	        key: "goBack",
	        value: function goBack() {
	            var savedHero = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	            // Need more information on this
	            this.close.emit(savedHero);
	            if (this.navigated) {
	                window.history.back();
	            }
	        }
	    }]);
	
	    return HeroDetailComponent;
	}();
	__decorate([(0, _core.Input)(), __metadata('design:type', _hero2.Hero)], HeroDetailComponent.prototype, "hero", void 0);
	__decorate([(0, _core.Output)(), __metadata('design:type', Object)], HeroDetailComponent.prototype, "close", void 0);
	exports.HeroDetailComponent = HeroDetailComponent = __decorate([(0, _core.Component)({
	    selector: 'my-hero-detail',
	    template: __webpack_require__(418),
	    // require syntax enables us to keep a relative file path w/ no errors
	    styles: [__webpack_require__(419)]
	}), __metadata('design:paramtypes', [_hero.HeroService, _router.ActivatedRoute])], HeroDetailComponent);
	// // 6. Routing part 2
	//
	// // We won't need our Input decorator anymore, since we'll
	// // receive infomation directly from the service, not bracket notation
	// // on the parent component
	// import { Component, OnInit, OnDestroy } from '@angular/core';
	// import { ActivatedRoute } from '@angular/router';
	// // We're going to get the heroes direct from the service now,
	// // decoupling the details component from the heroes component
	// import { HeroService } from '../../services/hero/hero.service';
	// import { Hero } from '../../models/hero';
	//
	// @Component({
	//   selector: 'my-hero-detail',
	//   // replacing or template property with a templateUrl,
	//   // keeping our component object clean and modular
	//   templateUrl: 'src/app/components/hero-detail/hero-detail.component.html',
	//   // we're also going to add a styleUrls property
	//   styleUrls: ['src/app/components/hero-detail/hero-detail.component.css']
	// })
	//
	// // Adding these lifecycle hooks for the class to override
	// export class HeroDetailComponent implements OnInit, OnDestroy {
	//   // decorator removed
	//   //@Input()
	//   public hero: Hero;
	//   public sub: any;
	//
	//   // We're creating a constructor function here for almost the sole
	//   // purpose of receiving injected dependancies as parameters
	//   constructor(private heroService: HeroService, private route: ActivatedRoute) {
	//
	//   }
	//
	//   // Just like in the heroes component, we use ngOnInit to retrieve
	//   // service data, avoiding complex logic in the constructor
	//   ngOnInit() {
	//     // the params object on the route is an Observable,
	//     // so we subscribe to it, the callback being what we
	//     // do to params (think event array) when the event is triggered
	//     this.sub = this.route.params.subscribe(params => {
	//       console.log(params['id']);
	//       console.log(+params['id']);
	//       // Route parameters are always strings, so we're using
	//       // type coersion to convert the string into a number with
	//       // the (+) operator
	//       let id = +params['id'];
	//       this.heroService.getHero(id)
	//         .then(hero => this.hero = hero);
	//     });
	//   }
	//
	//   // Disconnects the Observable stream we're listening to for data events
	//   ngOnDestroy() {
	//     this.sub.unsubscribe();
	//   }
	//
	//   // Back button: notice we have automatic access to the window object
	//   goBack() {
	//     window.history.back();
	//   }
	//
	//
	// }
	// // 4. Multiple Components
	//
	// import { Component, Input } from '@angular/core';
	// import Hero from './hero';
	//
	//
	// // We took this template from the template in
	// // app.component.ts
	// @Component({
	//   selector: 'my-hero-detail',
	//   template: `<div *ngIf="hero">
	//                <h2>{{ hero.name }} details!</h2>
	//                <div><label>id: </label>{{ hero.id }}</div>
	//                <div>
	//                  <label>name: </label>
	//                  <input [(ngModel)]="hero.name" placeholder="name">
	//                </div>
	//              </div>`
	//
	// })  // Remember that we CANT have a semicolon here. The decorator has to have
	//     // an unblocked path to the Component class it's decorating
	//
	// export class HeroDetailComponent {
	//   // Needed for properties brought in through
	//   // bracket notation on the component
	//   @Input()
	//   public hero: Hero;
	// }

/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeroService = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _core = __webpack_require__(4);
	
	__webpack_require__(406);
	
	var _http = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	
	// We're replacing this mock data with our http request
	//import { HEROES } from '../../mocks/mock-heroes';
	var HeroService = exports.HeroService = function () {
	    function HeroService(http) {
	        _classCallCheck(this, HeroService);
	
	        this.http = http;
	        this.heroesUrl = 'app/heroes';
	    }
	    // We've rewritten getHeroes to use http
	
	
	    _createClass(HeroService, [{
	        key: "getHeroes",
	        value: function getHeroes() {
	            // We're going to receive an observable, then convert it to a promise
	            return this.http.get(this.heroesUrl).toPromise().then(function (response) {
	                return response.json().data;
	            }).catch(this.handleError);
	        }
	        // getHeroes() {
	        //    return new Promise<Hero[]>(resolve =>
	        //      setTimeout(() => resolve(HEROES), 2000)
	        //    );
	        // }
	
	    }, {
	        key: "getHero",
	        value: function getHero(id) {
	            return this.getHeroes().then(function (heroes) {
	                return heroes.find(function (hero) {
	                    return hero.id === id;
	                });
	            });
	        }
	    }, {
	        key: "save",
	        value: function save(hero) {
	            if (hero.id) {
	                return this.put(hero);
	            }
	            return this.post(hero);
	        }
	    }, {
	        key: "delete",
	        value: function _delete(hero) {
	            var headers = new _http.Headers();
	            headers.append('Content-Type', 'application/json');
	            var url = this.heroesUrl + "/" + hero.id;
	            return this.http.delete(url, headers).toPromise().catch(this.handleError);
	        }
	        // Add new Hero
	
	    }, {
	        key: "post",
	        value: function post(hero) {
	            var headers = new _http.Headers({ 'Content-Type': 'application/json' });
	            return this.http.post(this.heroesUrl, JSON.stringify(hero), { headers: headers }).toPromise().then(function (res) {
	                return res.json().data;
	            }).catch(this.handleError);
	        }
	        // Update existing Hero
	
	    }, {
	        key: "put",
	        value: function put(hero) {
	            var headers = new _http.Headers();
	            headers.append('Content-Type', 'application/json');
	            var url = this.heroesUrl + "/" + hero.id;
	            return this.http.put(url, JSON.stringify(hero), { headers: headers }).toPromise().then(function () {
	                return hero;
	            }).catch(this.handleError);
	        }
	        // Handles any http response error: doesn't need to be public method
	
	    }, {
	        key: "handleError",
	        value: function handleError(error) {
	            console.error('An error occurred', error);
	            return Promise.reject(error.message || error);
	        }
	    }]);
	
	    return HeroService;
	}();
	exports.HeroService = HeroService = __decorate([(0, _core.Injectable)(), __metadata('design:paramtypes', [_http.Http])], HeroService);
	// // 5. Services
	//
	// import { Injectable } from '@angular/core';
	// import Hero from './hero';
	// import { HEROES } from './mock-heroes';
	//
	// // Injectable is the decorator for services
	// // Always remember the parentheses for this decorator
	// @Injectable()
	// export class HeroService {
	//
	//
	//   // getHeroesSlowly() {
	//   //   return new Promise<Hero[]>(resolve =>
	//   //     setTimeout(() => resolve(HEROES), 2000) // 2 seconds
	//   //   );
	//   // }
	//
	//   getHeroes() {
	//     return Promise.resolve(HEROES);
	//   }
	// }

/***/ },

/***/ 417:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Hero = exports.Hero = function Hero() {
	  _classCallCheck(this, Hero);
	};
	// // 4. Multiple Components
	// // We separated this typescript class definition
	// // in order to use it in two different files  lksdc
	//
	// export class Hero {
	//   id: Number;
	//   name: String;
	// }

/***/ },

/***/ 418:
/***/ function(module, exports) {

	module.exports = "<div *ngIf=\"hero\">\n  <h2>{{ hero.name }} details!</h2>\n  <div><label>id: </label>{{ hero.id }}</div>\n    <div>\n    <label>name: </label>\n    <input [(ngModel)]=\"hero.name\" placeholder=\"name\">\n  </div>\n  <!-- we added this back button to take us out of the details-->\n  <button (click)=\"goBack()\">Back</button>\n  <button (click)=\"save()\">Save</button>\n</div>\n";

/***/ },

/***/ 419:
/***/ function(module, exports) {

	module.exports = "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n"

/***/ },

/***/ 420:
/***/ function(module, exports) {

	module.exports = "<h2>My Heroes</h2>\n<ul class=\"heroes\">\n  <li *ngFor=\"let hero of heroes\" [class.selected]=\"hero === selectedHero\" (click)=\"onSelect(hero)\">\n   <span class=\"badge\">{{hero.id}}</span> {{hero.name}}\n   <button class=\"delete-button\" (click)=\"deleteHero(hero, $event)\">Delete</button>\n  </li>\n</ul>\n<!-- added in section 7 to display errors and add heroes -->\n<div class=\"error\" *ngIf=\"error\">{{error}}</div>\n<button (click)=\"addHero()\">Add New Hero</button>\n<div *ngIf=\"addingHero\">\n  <my-hero-detail (close)=\"close($event)\"></my-hero-detail>\n</div>\n<!-- in routing part 2, we remove the actual details\n     and replace it with a mini-details -->\n<!-- <my-hero-detail [hero]=\"selectedHero\"></my-hero-detail> -->\n<div *ngIf=\"selectedHero\">\n  <h2>\n    {{selectedHero.name | uppercase}} is my hero\n  </h2>\n  <button (click)=\"gotoDetail()\">View Details</button>\n</div>\n";

/***/ },

/***/ 421:
/***/ function(module, exports) {

	module.exports = ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.heroes {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.heroes li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.heroes li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.heroes li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.heroes .text {\n  position: relative;\n  top: -3px;\n}\n.heroes .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n"

/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DashboardComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _core = __webpack_require__(4);
	
	var _router = __webpack_require__(362);
	
	var _hero = __webpack_require__(416);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var DashboardComponent = exports.DashboardComponent = function () {
	    function DashboardComponent(router, heroService) {
	        _classCallCheck(this, DashboardComponent);
	
	        this.router = router;
	        this.heroService = heroService;
	        this.heroes = [];
	    }
	
	    _createClass(DashboardComponent, [{
	        key: "ngOnInit",
	        value: function ngOnInit() {
	            var _this = this;
	
	            this.heroService.getHeroes().then(function (heroes) {
	                return _this.heroes = heroes.slice(1, 5);
	            });
	        }
	    }, {
	        key: "gotoDetail",
	        value: function gotoDetail(hero) {
	            var link = ['/detail', hero.id];
	            this.router.navigate(link);
	        }
	    }]);
	
	    return DashboardComponent;
	}();
	exports.DashboardComponent = DashboardComponent = __decorate([(0, _core.Component)({
	    selector: 'my-dashboard',
	    template: __webpack_require__(423),
	    // require syntax enables us to keep a relative file path w/ no errors
	    styles: [__webpack_require__(424)]
	}), __metadata('design:paramtypes', [_router.Router, _hero.HeroService])], DashboardComponent);
	// // 6. routing part 2
	//
	// import { Component } from '@angular/core';
	// import { Router } from '@angular/router';
	// import { HeroService } from '../../services/hero/hero.service';
	//
	// // Imported for type defs only
	// import { OnInit } from '@angular/core';
	// import { Hero } from '../../models/hero';
	//
	// @Component({
	//   selector: 'my-dashboard',
	//   templateUrl: 'src/app/components/dashboard/dashboard.component.html',
	//   // we're also going to add a styleUrls property
	//   styleUrls: ['src/app/components/dashboard/dashboard.component.css']
	// })
	//
	// export class DashboardComponent implements OnInit {
	//   public heroes: Hero[] = [];
	//
	//   constructor(private router: Router, private heroService: HeroService) {}
	//
	//   ngOnInit() {
	//     this.heroService.getHeroes()
	//         .then(heroes => this.heroes = heroes.slice(1, 5));
	//   }
	//
	//   gotoDetail(hero: Hero) {
	//     // This is a link parameters array (LPA)
	//     // and maps to the route '/detail/:id'
	//     let link = ['/detail', hero.id];
	//     this.router.navigate(link); // the navigate method on the router takes a LPA
	//   }
	// }

/***/ },

/***/ 423:
/***/ function(module, exports) {

	module.exports = "<h3>Top Heroes</h3>\n<div class=\"grid grid-pad\">\n  <div *ngFor=\"let hero of heroes\" (click)=\"gotoDetail(hero)\" class=\"col-1-4\">\n    <div class=\"module hero\">\n      <h4>{{hero.name}}</h4>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 424:
/***/ function(module, exports) {

	module.exports = "[class*='col-'] {\n  float: left;\n}\n*, *:after, *:before {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\nh3 {\n  text-align: center; margin-bottom: 0;\n}\n[class*='col-'] {\n  padding-right: 20px;\n  padding-bottom: 20px;\n}\n[class*='col-']:last-of-type {\n  padding-right: 0;\n}\n.grid {\n  margin: 0;\n}\n.col-1-4 {\n  width: 25%;\n}\n.module {\n    padding: 20px;\n    text-align: center;\n    color: #eee;\n    max-height: 120px;\n    min-width: 120px;\n    background-color: #607D8B;\n    border-radius: 2px;\n}\nh4 {\n  position: relative;\n}\n.module:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  color: #607d8b;\n}\n.grid-pad {\n  padding: 10px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px;\n}\n@media (max-width: 600px) {\n    .module {\n      font-size: 10px;\n      max-height: 75px; }\n}\n@media (max-width: 1024px) {\n    .grid {\n      margin: 0;\n    }\n    .module {\n      min-width: 60px;\n    }\n}\n"

/***/ },

/***/ 425:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppComponent = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _core = __webpack_require__(4);
	
	var _router = __webpack_require__(362);
	
	var _hero = __webpack_require__(416);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var AppComponent = exports.AppComponent = function AppComponent() {
	    _classCallCheck(this, AppComponent);
	
	    this.title = 'Tour of Heroes';
	};
	exports.AppComponent = AppComponent = __decorate([(0, _core.Component)({
	    selector: "my-app",
	    directives: [_router.ROUTER_DIRECTIVES],
	    providers: [_hero.HeroService],
	    template: __webpack_require__(426),
	    // require syntax enables us to keep a relative file path w/ no errors
	    styles: [__webpack_require__(427)]
	}), __metadata('design:paramtypes', [])], AppComponent);
	// // 6. Routing part 2: Adding a dashboard and on
	//
	// import { Component } from '@angular/core';
	// import { ROUTER_DIRECTIVES } from '@angular/router';
	// import { HeroService } from '../../services/hero/hero.service';
	//
	// @Component({
	//   selector:  `my-app`,
	//   directives: [ROUTER_DIRECTIVES],
	//   providers: [HeroService],
	//   templateUrl: 'src/app/components/app/app.component.html',
	//   // we're also going to add a styleUrls property
	//   styleUrls: ['src/app/components/app/app.component.css']
	// })
	//
	// export class AppComponent {
	//
	//   public title: String = 'Tour of Heroes';
	//
	// }
	// // 6. Routing part 1
	//
	// import { Component } from '@angular/core';
	// import { HeroService } from './hero.service';
	// import { ROUTER_DIRECTIVES } from '@angular/router';
	// //import { HeroesComponent } from './heroes.component';
	//
	// // we can remove this now
	// // import Hero from './hero';
	//
	//
	// @Component({
	//   selector:  `my-app`,
	//   directives: [ROUTER_DIRECTIVES],
	//   // This is not included in the documentation, but shows up as a
	//   // warning in the console, as it will be required for future versions of
	//   // the router:
	//   // http://stackoverflow.com/questions/38144547/in-angular2-rc4-how-do-i-add-components-to-the-precompile-array
	//   // Update: this seemed to be worked out in the 3.0.0-beta2 version of the router
	//   // precompile: [HeroesComponent],
	//   providers: [HeroService],
	//   template:
	//     `<h1>{{title}}</h1>
	//      <!-- notice the link parameters array assigned to the routerLink-->
	//      <a [routerLink]="['/heroes']">Heroes</a>
	//      <router-outlet></router-outlet>`
	// })
	//
	// export class AppComponent {
	//
	//   public title: String = 'Tour of Heroes';
	//
	//   // This all has been moved down into the heroes.component.ts file
	//   // as that component is handling the service we pass it now. The same thing
	//   // can be said for the styles property on the component decorator object
	//   //
	//   // public heroes: Hero[];
	//   // public selectedHero: Hero;
	//
	//   // constructor(private heroService: HeroService) {
	//   //
	//   // }
	//   //
	//   // ngOnInit() {
	//   //   this.getHeroes();
	//   // }
	//   //
	//   // getHeroes() {
	//   //   //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
	//   //   this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	//   // }
	//
	// }
	// // 5. Services
	//
	// import { Component, OnInit } from '@angular/core';
	// import HeroDetailComponent from './hero-detail.component';
	// import { HeroService } from './hero.service';
	// import Hero from './hero';
	//
	//
	// @Component({
	//   selector:  `my-app`,
	//   directives: [HeroDetailComponent],
	//   // The providers array tells Angular to create a fresh instance of
	//   // the HeroService when it creates a new AppComponent.
	//   // The AppComponent can use that service to get heroes and so can
	//   // every child component of its component tree.
	//   providers: [HeroService], // This is required when including a service in the component
	//   template:
	//     `<h1>{{title}}</h1>
	//      <h2>My Heroes</h2>
	//      <ul class="heroes">
	//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
	//          <span class="badge">{{hero.id}}</span> {{hero.name}}
	//        </li>
	//      </ul>
	//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
	//
	//   styles:
	//     [`
	//       .selected {
	//         background-color: #CFD8DC !important;
	//         color: white;
	//       }
	//       .heroes {
	//         margin: 0 0 2em 0;
	//         list-style-type: none;
	//         padding: 0;
	//         width: 15em;
	//       }
	//       .heroes li {
	//         cursor: pointer;
	//         position: relative;
	//         left: 0;
	//         background-color: #EEE;
	//         margin: .5em;
	//         padding: .3em 0;
	//         height: 1.6em;
	//         border-radius: 4px;
	//       }
	//       .heroes li.selected:hover {
	//         background-color: #BBD8DC !important;
	//         color: white;
	//       }
	//       .heroes li:hover {
	//         color: #607D8B;
	//         background-color: #DDD;
	//         left: .1em;
	//       }
	//       .heroes .text {
	//         position: relative;
	//         top: -3px;
	//       }
	//       .heroes .badge {
	//         display: inline-block;
	//         font-size: small;
	//         color: white;
	//         padding: 0.8em 0.7em 0 0.7em;
	//         background-color: #607D8B;
	//         line-height: 1em;
	//         position: relative;
	//         left: -1px;
	//         top: -4px;
	//         height: 1.8em;
	//         margin-right: .8em;
	//         border-radius: 4px 0 0 4px;
	//       }
	//     `]
	//
	// })
	//
	// // your component class has to inherit from OnInit to use the hook
	// export class AppComponent implements OnInit {
	//
	//   public title: String = 'Tour of Heroes';
	//   public heroes: Hero[];
	//   public selectedHero: Hero;
	//
	//   // The constructor will receive any services
	//   // the component needs as private arguments
	//   // DO NOT PUT COMPLEX LOGIC IN THE CONSTRUCTOR
	//   constructor(private heroService: HeroService) {
	//
	//   }
	//
	//   // Anything in the ngOnInit method is ran at the beginning
	//   // of the component lifecycle in order to initialize things
	//   ngOnInit() {
	//     this.getHeroes();
	//   }
	//
	//   getHeroes() {
	//     //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
	//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	//   }
	//
	//   onSelect(hero: Hero) {
	//     this.selectedHero = hero;
	//   }
	//
	// }
	// 4. Multiple Components
	//
	// import { Component } from '@angular/core';
	// import HeroDetailComponent from './hero-detail.component';
	// import Hero from './hero';
	//
	//
	// const HEROES: Hero[] = [
	//   { id: 11, name: 'Mr. Nice' },
	//   { id: 12, name: 'Narco' },
	//   { id: 13, name: 'Bombasto' },
	//   { id: 14, name: 'Celeritas' },
	//   { id: 15, name: 'Magneta' },
	//   { id: 16, name: 'RubberMan' },
	//   { id: 17, name: 'Dynama' },
	//   { id: 18, name: 'Dr IQ' },
	//   { id: 19, name: 'Magma' },
	//   { id: 20, name: 'Tornado' }
	// ];
	//
	// @Component({
	//   selector:  `my-app`,
	//   directives: [HeroDetailComponent], // An array of Components used inside this one
	//   template:
	//     `<h1>{{title}}</h1>
	//      <h2>My Heroes</h2>
	//      <ul class="heroes">
	//        <!-- *ngFor is a shortcut for the template element tag -->
	//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
	//          <span class="badge">{{hero.id}}</span> {{hero.name}}
	//        </li>
	//      </ul>
	//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
	//
	//   styles: // These styles are only applied to this component
	//     [`
	//       .selected {
	//         background-color: #CFD8DC !important;
	//         color: white;
	//       }
	//       .heroes {
	//         margin: 0 0 2em 0;
	//         list-style-type: none;
	//         padding: 0;
	//         width: 15em;
	//       }
	//       .heroes li {
	//         cursor: pointer;
	//         position: relative;
	//         left: 0;
	//         background-color: #EEE;
	//         margin: .5em;
	//         padding: .3em 0;
	//         height: 1.6em;
	//         border-radius: 4px;
	//       }
	//       .heroes li.selected:hover {
	//         background-color: #BBD8DC !important;
	//         color: white;
	//       }
	//       .heroes li:hover {
	//         color: #607D8B;
	//         background-color: #DDD;
	//         left: .1em;
	//       }
	//       .heroes .text {
	//         position: relative;
	//         top: -3px;
	//       }
	//       .heroes .badge {
	//         display: inline-block;
	//         font-size: small;
	//         color: white;
	//         padding: 0.8em 0.7em 0 0.7em;
	//         background-color: #607D8B;
	//         line-height: 1em;
	//         position: relative;
	//         left: -1px;
	//         top: -4px;
	//         height: 1.8em;
	//         margin-right: .8em;
	//         border-radius: 4px 0 0 4px;
	//       }
	//     `]
	//
	// })
	//
	//
	// export class AppComponent {
	//
	//   public title: String = 'Tour of Heroes';
	//   public heroes: Hero[] = HEROES;
	//   public selectedHero: Hero;
	//
	//   public onSelect(hero: Hero) {
	//     this.selectedHero = hero;
	//   }
	//
	// }
	// 3. Master/Detail
	//
	// import { Component } from '@angular/core';
	//
	// // This class is for the convenience of typescript type resolutions
	// // Although the program will throw a lot of errors, it will
	// // run without this
	// export class Hero {
	//   id: Number;
	//   name: String;
	// }
	//
	// const HEROES: Hero[] = [
	//   { id: 11, name: 'Mr. Nice' },
	//   { id: 12, name: 'Narco' },
	//   { id: 13, name: 'Bombasto' },
	//   { id: 14, name: 'Celeritas' },
	//   { id: 15, name: 'Magneta' },
	//   { id: 16, name: 'RubberMan' },
	//   { id: 17, name: 'Dynama' },
	//   { id: 18, name: 'Dr IQ' },
	//   { id: 19, name: 'Magma' },
	//   { id: 20, name: 'Tornado' }
	// ];
	//
	//
	// // Component is an es6 decorator:
	// // https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.i8zo845dq
	// // http://blog.developsuperpowers.com/eli5-ecmascript-7-decorators/
	// // *ngFor is a shortcut for the HTML5 template element tag
	// // and could be written as:
	// // <template ngFor let-hero [ngForOf]="heroes">
	// //   <span class="badge">{{hero.id}}</span> {{hero.name}}
	// // </template>
	//
	// @Component({
	//   selector:  `my-app`,
	//   //templateUrl: `can/be/used/to/pull/template/from/separate/file`,
	//   template:
	//     `<h1>{{title}}</h1>
	//      <h2>My Heroes</h2>
	//      <ul class="heroes">
	//        <!-- *ngFor is a shortcut for the template element tag -->
	//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
	//          <span class="badge">{{hero.id}}</span> {{hero.name}}
	//        </li>
	//
	//      </ul>
	//      <div *ngIf="selectedHero">
	//        <h2>{{ selectedHero.name }} details!</h2>
	//        <div><label>id: </label>{{ selectedHero.id }}</div>
	//        <div>
	//          <label>name: </label>
	//          <input [(ngModel)]="selectedHero.name" placeholder="name">
	//        </div>
	//      </div>`,
	//
	//   styles: // These styles are only applied to this component
	//     [`
	//       .selected {
	//         background-color: #CFD8DC !important;
	//         color: white;
	//       }
	//       .heroes {
	//         margin: 0 0 2em 0;
	//         list-style-type: none;
	//         padding: 0;
	//         width: 15em;
	//       }
	//       .heroes li {
	//         cursor: pointer;
	//         position: relative;
	//         left: 0;
	//         background-color: #EEE;
	//         margin: .5em;
	//         padding: .3em 0;
	//         height: 1.6em;
	//         border-radius: 4px;
	//       }
	//       .heroes li.selected:hover {
	//         background-color: #BBD8DC !important;
	//         color: white;
	//       }
	//       .heroes li:hover {
	//         color: #607D8B;
	//         background-color: #DDD;
	//         left: .1em;
	//       }
	//       .heroes .text {
	//         position: relative;
	//         top: -3px;
	//       }
	//       .heroes .badge {
	//         display: inline-block;
	//         font-size: small;
	//         color: white;
	//         padding: 0.8em 0.7em 0 0.7em;
	//         background-color: #607D8B;
	//         line-height: 1em;
	//         position: relative;
	//         left: -1px;
	//         top: -4px;
	//         height: 1.8em;
	//         margin-right: .8em;
	//         border-radius: 4px 0 0 4px;
	//       }
	//     `]
	//
	// })
	// // This class is basically a controller decorated with
	// // additional info to make it a component. In Angular 1, you can
	// // achieve the same thing by assigning a directive it's own
	// // privately scoped controller. In fact, you can still write
	// // decorator style directive, they just don't have templates.
	// // Public is a typescript syntax, like java's public, private, or protected
	// // it's also a much shorter, declarative syntax for a constructor
	// export class AppComponent {
	//
	//   public title: String = 'Tour of Heroes';
	//   public heroes: Hero[] = HEROES;
	//   public selectedHero: Hero;
	//
	//   public onSelect(hero: Hero) {
	//     this.selectedHero = hero;
	//   }
	//
	// }
	// export class AppComponent {
	//   // Without public, private, and protected syntax, we'd just define the type
	//   // at the top of the class
	//   title: String;
	//   heroes: Hero[];
	//   hero: Hero;
	//
	//   constructor() {
	//     this.title = 'Tour of Heroes';
	//     this.heroes = HEROES;
	//     this.hero = {
	//       id: 1,
	//       name: 'Windstorm'
	//     };
	//   }
	// }
	// 2. The Hero Editor
	//
	// import { Component } from '@angular/core';
	//
	// export class Hero {
	//   id: number;
	//   name: string;
	// }
	//
	// @Component({
	//   selector:  `my-app`,
	//   template:  `<h1>{{title}}</h1>
	//               <h2>{{hero.name}} details!</h2>
	//               <div><label>id: </label>{{hero.id}}</div>
	//               <div>
	//                 <label>name: </label>
	//                 <input [(ngModel)]="hero.name" placeholder="name">
	//               </div>`
	// })
	// export class AppComponent {
	//   public title = 'Tour of Heroes';
	//   public hero: Hero = {
	//     id: 1,
	//     name: 'Windstorm'
	//   };
	// }
	// export class AppComponent {
	//   title = 'Tour of Heroes';
	//   hero = 'Windstorm';
	// }

/***/ },

/***/ 426:
/***/ function(module, exports) {

	module.exports = "<h1>{{title}}</h1>\n<!-- We added a navigation here, with a link to the dashboard -->\n<nav>\n  <!-- these router links are link parameters arrays -->\n  <a [routerLink]=\"['/dashboard']\" routerLinkActive=\"active\">Dashboard</a>\n  <a [routerLink]=\"['/heroes']\" routerLinkActive=\"active\">Heroes</a>\n</nav>\n<router-outlet></router-outlet>\n";

/***/ },

/***/ 427:
/***/ function(module, exports) {

	module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0;\n}\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\nnav a:visited, a:link {\n  color: #607D8B;\n}\nnav a:hover {\n  color: #039be5;\n  background-color: #CFD8DC;\n}\nnav a.active {\n  color: #039be5;\n}\n"

/***/ },

/***/ 428:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.map.js