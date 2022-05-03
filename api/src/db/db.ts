import mongoose from "mongoose";
import Category from "@models/category";
import Product from "@models/product";
import Account from "@models/account";

async function connect(url: string) {
    await mongoose.connect(url);
}

export default {
    connect,
    Category,
    Product,
    Account
}