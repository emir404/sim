import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { NotificationType, Notification, NotificationStore } from './types'
import { getTimestamp } from '@/lib/utils'

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set) => ({
      notifications: [],
      addNotification: (type, message) => {
        const notification: Notification = {
          id: typeof window === 'undefined' ? '1' : crypto.randomUUID(),
          type,
          message,
          timestamp: getTimestamp(),
          isVisible: true,
        }
        set((state) => ({
          notifications: [...state.notifications, notification],
        }))
      },
      hideNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isVisible: false } : n
          ),
        })),
      showNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isVisible: true } : n
          ),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'notification-store' }
  )
)