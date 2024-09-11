import { Request, Response } from 'express';
import { ProductService } from "./productService";



export class ProductController {
    private productService: ProductService;
  
    constructor() {
      this.productService = new ProductService();
    }
  
    async createProduct(req: Request, res: Response) {
      try {
        const product = await this.productService.create(req.body);
        res.status(201).json(product);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getProducts(req: Request, res: Response) {
      try {
        const products = await this.productService.getAll();
        res.json(products);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getProductById(req: Request, res: Response) {
      try {
        const product = await this.productService.getById(req.params.id);
        res.json(product);
      } catch (error) {
        res.status(404).json({ error: 'Product not found' });
      }
    }
  
    async updateProduct(req: Request, res: Response) {
      try {
        const updatedProduct = await this.productService.update(req.params.id, req.body);
        res.json(updatedProduct);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async deleteProduct(req: Request, res: Response) {
      try {
        await this.productService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(404).json({ error: 'Product not found' });
      }
    }
  }