
import { ProductsRepository } from '../../repositories/products.repository';
import { PromotionsRepository } from '../../repositories/promotions.repository';
import { Product } from '../../entities/products.entity';
import { Promotions } from '../../entities/promotions.entity';
import { MenuService } from '../../services/menu.service';

// Cria mocks dos repositórios
const mockProductsRepository = {
  findAll: jest.fn(),
};

const mockPromotionsRepository = {
  findActive: jest.fn(),
};

describe('MenuService', () => {
  let menuService: MenuService;

  beforeEach(() => {
    jest.clearAllMocks();
    menuService = new MenuService(
      mockProductsRepository as unknown as ProductsRepository,
      mockPromotionsRepository as unknown as PromotionsRepository
    );
  });

  it('deve retornar apenas produtos visíveis sem promoções', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Burger', category: 'Lanches', visibility: true, price: 25.0 },
    ];
    mockProductsRepository.findAll.mockResolvedValue(mockProducts);
    mockPromotionsRepository.findActive.mockResolvedValue([]);

    const result = await menuService.getMenu();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Burger');
    expect(result[0].promotion).toBeNull();
  });

  it('deve anexar promoções ativas aos produtos correspondentes', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Pizza', category: 'Massas', visibility: true, price: 40.0 },
      { id: 2, name: 'Suco', category: 'Bebidas', visibility: true, price: 10.0 },
    ];
    const mockPromotions: Promotions[] = [
      {
        id: 1,
        product_id: 1,
        description_promotion: 'Pizza em dobro',
        price: 35.0,
        week_days: 'fri',
        start_time: '18:00',
        end_time: '23:00',
      },
    ];

    mockProductsRepository.findAll.mockResolvedValue(mockProducts);
    mockPromotionsRepository.findActive.mockResolvedValue(mockPromotions);

    const result = await menuService.getMenu();

    expect(result).toHaveLength(2);
    expect(result[0].promotion?.description).toBe('Pizza em dobro');
    expect(result[1].promotion).toBeNull();
  });

  it('deve retornar lista vazia se não houver produtos', async () => {
    mockProductsRepository.findAll.mockResolvedValue([]);
    mockPromotionsRepository.findActive.mockResolvedValue([]);

    const result = await menuService.getMenu();

    expect(result).toEqual([]);
    expect(mockProductsRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockPromotionsRepository.findActive).toHaveBeenCalledTimes(1);
  });
});
