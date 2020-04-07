const path = require('path');
const express = require('express');
const xss = require('xss');
const FolderService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serialzeFolder = folder => ({
    id: folder.id,
    name: xss(folder.name)
});

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        FolderService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serialzeFolder));
            })
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                error: {
                    message: 'name not provided in request body'
                }
            });
        }
        const newFolder = {
            name
        };

        FolderService.insertFolder(knexInstance, newFolder).then(folder =>
            res
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${folder.id}`))
                .json(serialzeFolder(folder))
        );

    });

foldersRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db');
        FolderService.getById(knexInstance, req.params.folder_id)
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: {
                            message: `Folder does not exist`
                        }
                    });
                }
                res.folder = folder;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serialzeFolder(res.folder));
    })
    .delete((req, res, next) => {
        FolderService.deleteFolder(req.app.get('db'), req.params.folder_id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const knextInstance = req.app.get('db');
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                error: {
                    message: `Your request body must contain a name`
                }
            });
        }
        FolderService.updateFolder(knextInstance, req.params.folder_id, { name })
            .then(rowsModified => {
                res.status(204).end();
            })
            .catch(next)
    });

module.exports = foldersRouter;