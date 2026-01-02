import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Loader2, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  notes: string | null;
  delivery_address: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { 
    label: 'Menunggu', 
    icon: <Clock className="w-4 h-4" />, 
    color: 'text-amber-600 bg-amber-100' 
  },
  processing: { 
    label: 'Diproses', 
    icon: <Package className="w-4 h-4" />, 
    color: 'text-blue-600 bg-blue-100' 
  },
  completed: { 
    label: 'Selesai', 
    icon: <CheckCircle className="w-4 h-4" />, 
    color: 'text-green-600 bg-green-100' 
  },
  cancelled: { 
    label: 'Dibatalkan', 
    icon: <XCircle className="w-4 h-4" />, 
    color: 'text-red-600 bg-red-100' 
  },
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Parse items from JSON
      const parsedOrders = (data || []).map(order => ({
        ...order,
        items: order.items as unknown as OrderItem[],
      }));

      setOrders(parsedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
              <p className="text-muted-foreground text-sm">Lihat semua pesanan Anda</p>
            </div>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-8 text-center"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Belum Ada Pesanan</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Anda belum membuat pesanan apapun.
              </p>
              <Link to="/#menu">
                <Button>Lihat Menu</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), 'dd MMMM yyyy, HH:mm', { locale: idLocale })}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                          </div>
                          <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="px-4 py-3 bg-secondary/30 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-bold text-primary">{formatPrice(order.total_amount)}</span>
                    </div>

                    {/* Delivery Address */}
                    {order.delivery_address && (
                      <div className="px-4 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">Alamat Pengiriman:</p>
                        <p className="text-sm">{order.delivery_address}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderHistory;
