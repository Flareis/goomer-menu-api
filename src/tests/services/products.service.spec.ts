import { ProductsService } from '../../services/product.service';
import { ProductsRepository } from '../../repositories/products.repository';

jest.mock('../../repositories/products.repository');

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<ProductsRepository>;

  beforeEach(() => {
    repository = new ProductsRepository() as jest.Mocked<ProductsRepository>;
    service = new ProductsService(repository);
  });

  describe('create', () => {
    it('should create a product with default visibility true', async () => {
      const productData = {
        name: 'X-Burger',
        price: 25.9,
        category: 'Lanches',
        visibility: true,
      };

      repository.create.mockResolvedValue({
        id: 1,
        ...productData,
      });

      const result = await service.create(productData);

      expect(result.visibility).toBe(true);
      expect(repository.create).toHaveBeenCalledWith({
        ...productData,
        visibility: true,
      });
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [
        {
          id: 1,
          name: 'X-Burger',
          price: 25.9,
          category: 'Lanches',
          visibility: true,
        },
        {
          id: 2,
          name: 'Coca-Cola',
          price: 8.0,
          category: 'Bebidas',
          visibility: false,
        },
      ];

      repository.findAll.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return product when found', async () => {
      const product = {
        id: 1,
        name: 'X-Burger',
        price: 25.9,
        category: 'Lanches',
        visibility: true,
      };

      repository.findById.mockResolvedValue(product);

      const result = await service.findById(1);

      expect(result).toEqual(product);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null when product not found', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update product when found', async () => {
      const updateData = {
        name: 'Super X-Burger',
        price: 29.9,
      };

      const updatedProduct = {
        id: 1,
        ...updateData,
        category: 'Lanches',
        visibility: true,
      };

      repository.update.mockResolvedValue(updatedProduct);

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedProduct);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should return null when product not found', async () => {
      repository.update.mockResolvedValue(null);

      const result = await service.update(999, { name: 'Test' });

      expect(result).toBeNull();
      expect(repository.update).toHaveBeenCalledWith(999, { name: 'Test' });
    });

    it('should update product visibility', async () => {
      const updateData = {
        visibility: false,
      };

      const updatedProduct = {
        id: 1,
        name: 'X-Burger',
        price: 25.9,
        category: 'Lanches',
        visibility: false,
      };

      repository.update.mockResolvedValue(updatedProduct);

      const result = await service.update(1, updateData);

      expect(result?.visibility).toBe(false);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('delete', () => {
    it('should delete product successfully', async () => {
      repository.delete.mockResolvedValue();

      await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
