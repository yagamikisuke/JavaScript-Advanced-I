'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, version, stores, dbName, connection, _close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            version = 3;
            stores = ['negociacoes'];
            dbName = 'aluraframe';
            connection = null;
            _close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('A classe ConnectionFactory não pode ser instanciada');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {

                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(dbName, version);

                            openRequest.onupgradeneeded = function (e) {

                                ConnectionFactory._createStores(e.target.result);
                            };

                            openRequest.onsuccess = function (e) {

                                if (!connection) {
                                    connection = e.target.result;
                                    _close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Não é possível chamar o método close a partir da conexão');
                                    };
                                }
                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {

                                console.log(e.target.error);
                                reject("e.target.error.name");
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {

                        stores.forEach(function (store) {

                            if (e.target.result.objectStoreNames.contains(store)) e.target.result.deleteObjectStore(store);

                            e.target.result.createObjectStore(store);
                        });
                    }
                }, {
                    key: 'close',
                    value: function close() {

                        _close();
                        connection = null;
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map