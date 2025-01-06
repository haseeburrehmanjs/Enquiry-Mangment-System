// Helper function to generate a response message
const generateResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json(generateResponse('error', 'All fields are required'));
  }

  try {
    const newProduct = new Product({ name, description, price, category });
    await newProduct.save();
    return res.status(201).json(generateResponse('success', 'Product created successfully!', newProduct));
  } catch (error) {
    return res.status(500).json(generateResponse('error', 'Error creating product', error.message));
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(generateResponse('success', 'Products fetched successfully', products));
  } catch (error) {
    return res.status(500).json(generateResponse('error', 'Error fetching products', error.message));
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(generateResponse('error', 'Product not found'));
    }
    return res.status(200).json(generateResponse('success', 'Product fetched successfully', product));
  } catch (error) {
    return res.status(500).json(generateResponse('error', 'Error fetching product', error.message));
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json(generateResponse('error', 'All fields are required'));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json(generateResponse('error', 'Product not found'));
    }
    return res.status(200).json(generateResponse('success', 'Product updated successfully!', updatedProduct));
  } catch (error) {
    return res.status(500).json(generateResponse('error', 'Error updating product', error.message));
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json(generateResponse('error', 'Product not found'));
    }
    return res.status(200).json(generateResponse('success', 'Product deleted successfully!'));
  } catch (error) {
    return res.status(500).json(generateResponse('error', 'Error deleting product', error.message));
  }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
