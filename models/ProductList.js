import mongoose from "mongoose";

const Schema = mongoose.Schema;



const ProductList = new Schema({
    productName: {
        type: String,
        required: true
    },
    altNames: [
        {
            altName1:{
                type: String,
                required: true     
            },
            altName2: {
                type: String,
                required: true
            }
        }
    ],
    labeledPrice: {
        type: Number,
        required: true
    },
    lastPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [
        {
            image1: {
                type: String,
                required: true
            }    
        }
    ],
    offerEnding: {
        type: Date
    },
    variedBy:[
        {
            name: {
               type: String,
               required: true 
            },
            values: [
                {
                    name: {
                    type: String
                    },
                    icon: {
                    type: String
                    } 
                }
            ],
            iconType: {
                type: String,
                required: true
            }
        } 
    ],
    variants:[
        {
            filters: [
                {
                    color: {
                        type: String,
                        required: true
                    },
                    size: {
                        type: String,
                        required: true
                    },
                    storage: {
                        type: String,
                        required: true
                    }
                }
            ],
            images: [
                {
                    image1: {
                        type: String,
                        required: true
                    } 
                } 
            ],
            labeledPrice: {
                type: Number,
                required: true
            },
            lastPrice: {
                type: Number,
                required: true
            },
            stock: {
                type: Number
            }
        }
    ]
    
});



export default ProductList;