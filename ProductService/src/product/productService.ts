import { Product } from './productModel'; // Assuming the product model is defined in productModel.ts

export class ProductService {
  async create(data: { name: string; price: number }) {
    const product = new Product({
      name: data.name,
      price: data.price,
    });
    return await product.save();
  }

  async getAll() {
    return await Product.find();
  }

  async getById(id: string) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async update(id: string, data: { name: string; price: number }) {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name: data.name, price: data.price },
      { new: true } // Return the updated product
    );
    if (!updatedProduct) throw new Error('Product not found');
    return updatedProduct;
  }

  async delete(id: string) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new Error('Product not found');
  }
}
