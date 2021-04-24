import PouchDB from 'pouchdb';
import warning from 'warning';

import { Record } from '../types/utils';

class Database {
    constructor(dbname, options) {
        warning(dbname && dbname.length, 'Dbname is required value.');
        this.dbname = dbname;
        if (!this.pouch) {
            this.pouch = new PouchDB(dbname, options);
        }
    }

    getPouch() {
        return this.pouch;
    }

    save(doc, options){
        return this.pouch.get(doc._id, { attachments: false }).then(() => {
            return this.update(doc, options);
        }).catch(() => {
            return this.create(doc, options);
        });
    }

    async create(doc, options) {
        try {
            return this.pouch.put(doc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(doc, options) {
        try {
            const findDoc = await this.pouch.get(doc._id);
            const mergedDoc = Object.assign({}, findDoc, doc);
            return this.pouch.put(mergedDoc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id, options) {
        try {
            const findDoc = await this.pouch.get(id);
            return this.pouch.remove({ _id: findDoc._id, _rev: findDoc._rev }, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return this.pouch.get(id, { attachments: true, binary: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async saveBlob(id, attachmentId, attachment, type) {
        try {
            const findDoc = await this.pouch.get(id, { attachments: true });
            if (!findDoc._attachments) {
                findDoc._attachments = {};
            }
            Object.assign(findDoc._attachments, {
                [attachmentId]: {
                    content_type: type,
                    data: attachment,
                },
            });
            return this.pouch.put(findDoc, { force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkBlobs(doc) {
        try {
            const findDoc = await this.pouch.get(doc._id, { attachments: true });
            if (!findDoc._attachments) {
                findDoc._attachments = {};
            }
            Object.assign(findDoc._attachments, doc._attachments);
            return this.pouch.put(findDoc, { force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkDocs(docs, options) {
        try {
            return this.pouch.bulkDocs(docs, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getBlob(id, attachmentId, rev) {
        try {
            return this.pouch.getAttachment(id, attachmentId, { rev });
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkGet(options){
        try {
            return this.pouch.bulkGet(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async allDocs() {
        try {
            return this.pouch.allDocs({
                attachments: true,
                binary: true,
                include_docs: true,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    clear(){
        this.pouch.destroy().then(() => {
            this.pouch = new PouchDB(this.dbname);
        });
    }

}

export default Database;
