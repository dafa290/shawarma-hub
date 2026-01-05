import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  processing: 'Diproses',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

export const useOrderNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const previousStatusRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    // Subscribe to order changes for the current user
    const channel = supabase
      .channel('order-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newOrder = payload.new as { id: string; status: string };
          const oldOrder = payload.old as { id: string; status: string };

          // Only notify if status actually changed
          if (oldOrder.status !== newOrder.status) {
            const statusLabel = statusLabels[newOrder.status] || newOrder.status;
            const orderId = newOrder.id.slice(0, 8).toUpperCase();

            toast({
              title: '📦 Status Pesanan Diperbarui',
              description: `Pesanan #${orderId} sekarang: ${statusLabel}`,
              duration: 5000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);
};
