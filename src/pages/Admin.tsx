import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Loader2, Bike, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  notes: string | null;
  delivery_address: string | null;
  created_at: string;
}

const statusOptions = [
  { value: 'pending', label: 'Menunggu', icon: Clock, color: 'text-amber-600' },
  { value: 'processing', label: 'Diproses', icon: Package, color: 'text-blue-600' },
  { value: 'on_delivery', label: 'Dalam Pengiriman', icon: Bike, color: 'text-purple-600' },
  { value: 'completed', label: 'Selesai', icon: CheckCircle, color: 'text-green-600' },
  { value: 'cancelled', label: 'Dibatalkan', icon: XCircle, color: 'text-red-600' },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (!adminLoading && !isAdmin && user) {
      toast({
        title: 'Akses Ditolak',
        description: 'Anda tidak memiliki akses ke halaman admin.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchOrders();
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const parsedOrders = (data || []).map(order => ({
        ...order,
        items: order.items as unknown as OrderItem[],
      }));

      setOrders(parsedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat pesanan.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: 'Status Diperbarui',
        description: `Pesanan #${orderId.slice(0, 8).toUpperCase()} telah diperbarui ke ${statusOptions.find(s => s.value === newStatus)?.label}.`,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'Error',
        description: 'Gagal memperbarui status pesanan.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground text-sm">Kelola semua pesanan</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={fetchOrders}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Belum Ada Pesanan</h3>
              <p className="text-muted-foreground text-sm">
                Belum ada pesanan yang masuk.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const currentStatus = statusOptions.find(s => s.value === order.status) || statusOptions[0];
                const StatusIcon = currentStatus.icon;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-mono text-sm font-medium">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.created_at), 'dd MMM yyyy, HH:mm', { locale: idLocale })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${currentStatus.color}`} />
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                            disabled={updatingOrderId === order.id}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  <div className="flex items-center gap-2">
                                    <status.icon className={`w-4 h-4 ${status.color}`} />
                                    {status.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center text-sm">
                          <span>{item.title} x{item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
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
                        <p className="text-xs text-muted-foreground">Alamat:</p>
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

export default Admin;
