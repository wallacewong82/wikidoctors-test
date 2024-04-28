import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch as products
// @route GET /api/screening
// @access Public
const getProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.json(products);
})

// @desc Fetch as single products
// @route GET /api/screening/:id
// @access Public
const getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product); 
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
})

// @desc create product
// @route POST /api/screening
// @access Public
const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image:'/images/pexels1.jpg',
        description: 'Sample description',
        SKU:"00001",
        estimatedTime: 0,
        category: "Normal",
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// @desc Update a product
// @route PUT /api/screening/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res)=>{
    const {name, price, description, image, SKU, category, estimatedTime } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.SKU = SKU;
        product.category = category;
        product.estimatedTime = estimatedTime;
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
})

// @desc Delete a product
// @route DEELETE /api/screening/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id: product._id});
        res.status(200).json({message:'Product deleted'});
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
})
export {getProductById, getProducts, createProduct, updateProduct, deleteProduct};