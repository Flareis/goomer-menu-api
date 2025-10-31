import { Product } from "../entities/products.entity";
import { Promotions } from "../entities/promotions.entity";
import { ProductsRepository } from '../repositories/products.repository';
import { PromotionsRepository } from '../repositories/promotions.repository';

export class MenuService {
  constructor(
    private productsRepository: ProductsRepository,
    private promotionsRepository: PromotionsRepository
  ) {}

  async getMenu() {
    // Busca todos os produtos visíveis
    const products = await this.productsRepository.findAll();

    // Busca todas as promoções ativas neste momento
    const activePromotions = await this.promotionsRepository.findActive();

    // Anexa promoções aos produtos correspondentes
    const menu = products.map(product => {
      const promotion = activePromotions.find(
        promo => promo.product_id === product.id
      );
      return {
        ...product,
        promotion: promotion ? {
          description: promotion.description_promotion,
          price: promotion.price,
          week_days: promotion.week_days,
          start_time: promotion.start_time,
          end_time: promotion.end_time
        } : null
      };
    });
    return menu;
  }
}
