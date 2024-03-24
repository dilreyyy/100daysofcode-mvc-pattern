const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const db = require('../data/database');

class Post {
    constructor(title, content, id){
        this.title = title;
        this.content = content;

        if(id){
            this.id = new ObjectId(id);
        }
        
    }
    
    // constructor(id){
    //     this.id = id;
    // }

    static async fetchAll(){
        return await db.getDb().collection('posts').find().toArray();
    }

    async fetch(){
        if(!this.id){
            return;
        }

        const postDocument = await db.getDb().collection('posts').findOne({ _id: this.id });
        this.title = postDocument.title;
        this.content = postDocument.content;
    }

    async save(){
        let result;
        if(this.id){
            result = await db
            .getDb()
            .collection('posts')
            .updateOne(
            { _id: this.id },
            { $set: { title: this.title, content: this.content } }
            );
        }else {
            result = await db.getDb().collection('posts').insertOne({
                title: this.title,
                content: this.content,
            });
        }
        return result;
    }

    async delete(){
        return await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }

    
    

}

module.exports = Post;