export interface promotions {
  id: number;
  description_promotion: string;
  price: number;
  week_days: Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>;
  start_time: string;
  end_time: string;
}