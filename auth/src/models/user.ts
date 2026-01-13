import mongoose from "mongoose";
import { Password } from "../services/password.js";

/**
 * INPUT INTERFACE
 * These are the raw properties we need to provide when we want to 
 * create a new user. It acts as the "Requirements List".
 */
interface UserAttrs {
    email: string;
    password: string;
}

/**
 * DOCUMENT INTERFACE (The Result)
 * This describes what a SINGLE user looks like AFTER it is created/saved.
 * By 'extending' mongoose.Document, we tell TypeScript that this object 
 * also has internal Mongoose properties like ._id, .__v, and .save().
 */
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    id: string
}

/**
 * MODEL INTERFACE (The Manager)
 * This describes the 'User' collection itself. 
 * We use this to tell TypeScript that our Model has a custom '.build' method.
 * We pass <UserDoc> so the Model knows it manages documents of that type.
 */
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

/**
 * SCHEMA DEFINITION
 * This is the actual JavaScript logic for MongoDB. 
 * It defines the data types and validation rules at the database level.
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}
    , {
        toJSON: {
            transform(doc, ret) {
                (ret as any).id = ret._id
                delete (ret as any).password
                delete (ret as any)._id
                delete (ret as any).__v

            }
        }
    }
)

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed)
    }
    // done();
});

/**
 * THE BUILD METHOD (The Gatekeeper)
 * We attach a 'static' method to the schema. 
 * This allows us to use User.build() instead of 'new User()'.
 * This is where we bridge the gap between UserAttrs and the Model.
 */
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

/**
 * THE FINAL MODEL CREATION
 * We call the 'model' function and pass our two interfaces as Generics:
 * <UserDoc> is the 'T' (The Document type)
 * <UserModel> is the 'U' (The Model return type)
 * "User" is the name of the collection in MongoDB.
 */
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

/**
 * User.build() creates a new local instance of a User (a Mongoose Document).
 * 1. It lives in memory only at this stage—it is NOT in MongoDB yet.
 * 2. It returns a 'UserDoc' type, which means it has all our user fields 
 * PLUS built-in Mongoose methods like '.save()'.
 * 3. We call 'user.save()' afterward to actually send this data to the 
 * auth-mongo-srv database.
 */

export { User };