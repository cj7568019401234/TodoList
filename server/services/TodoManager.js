const TodoRepository = require('../DataAccess/TodoDB');
const assert = require('assert');
const todoRepository = new TodoRepository();

class TodoManager {
    /**
    * 查询所有的待办事项
    */
    listTodos() {
        return new Promise((resolve, reject) => {
            todoRepository
                .findTodos()
                .then(todoList => resolve(todoList))
                .catch(error => reject(error));
        });
    }

    addNote(title, content, tags) {

        assert(title, 'Title is required');
        assert(content, 'Content is required');

        const note = createNewNote(title, content, tags);

        return new Promise((resolve, reject) => {
            todoRepository
                .addNote(note)
                .then(result => resolve(result.id))
                .catch(error => reject(error));
        });
    }

    findNoteById(id) {

        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .findNoteById(id)
                .then(note => resolve(mapToNoteDto(note)))
                .catch(error => reject(error));
        });
    }

    findNotesByTag(tag) {

        assert(tag, 'Tag is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .findNotesByTag(tag)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }

    findNotesByTitle(title) {

        assert(title, 'Title is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .findNotesByTitle(title)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }
    
    removeNote(id) {
        assert(id, 'Id is required');

        return new Promise((resolve, reject) => {
            todoRepository
                .removeNote(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    tagNote(id, tags) {

        assert(id, 'Id is required');
        assert(tags, 'Tags are required');

        var exp = new RegExp(/^([\w]+[,]?)*$/);
        assert(exp.test(tags), 'Invalid list of tags specified');

        const uniqueTags = tags ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) : [];

        return new Promise((resolve, reject) => {
            todoRepository
                .tagNote(id, uniqueTags)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    updateNote(id, title, content, tags) {
        assert(id, 'Id is required');
        assert(title, 'Title is required');
        assert(content, 'Content is required');

        const note = createUpdatedNote(title, content, tags);

        return new Promise((resolve, reject) => {
            todoRepository
                .updateNote(id, note)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

module.exports = TodoManager;