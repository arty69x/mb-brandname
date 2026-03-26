import { ShopPage } from '@/components/ShopPage';

export default function AccessoriesPage() {
  return <ShopPage title="Accessories" filter={(item) => item.category === 'Accessories'} />;
}
