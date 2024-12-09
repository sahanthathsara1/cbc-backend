    import mongoose from "mongoose";

    const productSchema = mongoose.Schema({
        productID :{
            type : String,
            required : true,
            unique : true 
        },
        productName :{
            type : String,
            required : true
        },
        altNames:[
            {
            type : String
        }
    ],
    images :[{
        type : string
    }],
    
        price :{
            type : Number,
            required : true
        },
        lastPrice :{
            type : Number,
        required : true
        },

        stock :{
            type : Number,
            required : true
        },
        descrption :{
            type : String,
            required : true
        }
        
    })
    
    const Product = mongoose.model("products", productSchema);