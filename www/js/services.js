(function() {
    'use strict';

    angular.module('noteTaker.services', [])

    .factory('UniqueId', function() {

        return {
            new: function() {
                function _p8(s) {
                    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                }
                return _p8() + _p8(true) + _p8(true) + _p8();
            },

            empty: function() {
                return '00000000-0000-0000-0000-000000000000';
            }
        };
    })

    .factory('Note', ["UniqueId", function(UniqueId) {

        function Note(body) {
            this.body = body;
            this.id = UniqueId.new();
            this.updateModifiedDate();
        }

        Note.prototype.updateModifiedDate = function() {
            this.modified_date = new Date().getTime();
        };

        return {
            new: function(body) {
                return new Note(body);
            }
        };
    }])

    .factory('Notes', ["Note", function(Note) {

        var notes = [];

        function generateNotes(count) {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < count; i++) {
                var item = "";
                for (var c = 0; c < 10; c++) {
                    item += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                item = item + " (" + i + ")";
                notes.push(Note.new(item));
            }
        }

        // generateNotes(3000);

        return {
            reset: function() {
                notes.splice(0, notes.length);
                return notes;
            },
            getAll: function() {
                return notes;
            },
            add: function(body) {
                var newNote = Note.new(body);
                notes.push(newNote);
                return newNote;
            },
            remove: function(id) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === id) {
                        notes.splice(i, 1);
                        return true;
                    }
                }
                return false;
            },
            get: function(id) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === id) {
                        return notes[i];
                    }
                }
                return null;
            }
        };
    }]);
})();
