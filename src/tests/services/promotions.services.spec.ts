import { PromotionsService } from '../../services/promotions.service';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(() => {
    service = new PromotionsService();
  });

  describe('create', () => {
    it('should validate time format HH:mm', async () => {
      const promotion = {
        product_id: 1,
        description_promotion: 'Test',
        price: 10,
        week_days: 'mon,tue',
        start_time: 'invalid',
        end_time: '18:00',
      };

      await expect(service.create(promotion)).rejects.toThrow('Invalid time format');
    });

    it('should require minimum 15 minutes interval', async () => {
      const promotion = {
        product_id: 1,
        description_promotion: 'Test',
        price: 10,
        week_days: 'mon,tue',
        start_time: '18:00',
        end_time: '18:10',
      };

      await expect(service.create(promotion)).rejects.toThrow(
        'Interval must be at least 15 minutes',
      );
    });
  });
});
