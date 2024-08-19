import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductList = new Schema({
  name: {
    type: String,
    required: true,
  },
  altNames: [
    {
        type: String
    }
  ],
  labeledPrice: {
    type: Number,
    required: true,
  },
  lastPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
        type: String,
        required: true   
    }
  ],
  offerEnding: {
    type: Date,
  },
  variedBy: [
    {
      name: {
        type: String,
        required: true,
      },
      values: [
        {
          name: {
            type: String,
          },
          icon: {
            type: String,
          }
        }
      ],
      iconType: {
        type: String,
        required: true,
      },
    },
  ],
  variants: [
    {
      filters: [
        {
            type: String
        }
      ],
      images: [
        {
            type: String
        }
      ],
      labeledPrice: {
        type: Number,
        required: true,
      },
      lastPrice: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
      },
    },
  ],
});

export default ProductList;
