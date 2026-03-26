import { ShopPage } from '@/components/ShopPage';

export default function BagsPage() {
  return <ShopPage title="Bags" filter={(item) => item.category === 'Bags'} />;
}
