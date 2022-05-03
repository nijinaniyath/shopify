import bcrypt from "bcrypt";
import { Schema, model, Document } from 'mongoose';

interface IAccount {
    email: string;
    password: string;
}

interface IAccountDocument extends IAccount, Document {
    comparePassword: (password: string) => Promise<boolean>;
}

const accountSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

accountSchema.pre('save', async function (this: IAccount, next: Function) {
    const account = this;
    account.password = await bcrypt.hash(account.password, 10);
    next();
})

accountSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}

const accountModel = model<IAccountDocument>('Accounts', accountSchema);



export default accountModel;
