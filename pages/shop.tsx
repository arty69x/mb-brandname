import { ShopPage } from '@/components/ShopPage';

export default function ShopMainPage() {
  return <ShopPage title="The Shop" filter={(item) => !!item} />;
}
