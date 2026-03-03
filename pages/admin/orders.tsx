import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Order } from '@/data/types';
import { getItem } from '@/lib/storage';
export default function AdminOrdersPage() { const [orders, setOrders] = useState<Order[]>([]); useEffect(()=>{ setOrders(getItem<Order[]>('mb_orders_v1', [])); }, []); return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>{orders.map((o)=><div key={o.id}>{o.id} ${o.total}</div>)}</div></section></main></Layout>; }
