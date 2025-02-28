"use client"
import { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "success" | "error";

interface Notification {
  title: string;
  message?: string;
  redirect?: string;
  type: NotificationType;
  state: boolean;
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (title: string, type: NotificationType, state: boolean, message?: string, redirect?: string) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = ( title: string, type: NotificationType, state: boolean, message?: string, redirect?: string) => {
    setNotification({ title, message, state, redirect, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
