import { ShopPage } from '@/components/ShopPage';

export default function NewArrivalsPage() {
  return <ShopPage title="New Arrivals" filter={(item) => !!item} />;
}
