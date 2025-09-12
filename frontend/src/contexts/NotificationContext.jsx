import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [medicineReminders, setMedicineReminders] = useState([]);

  useEffect(() => {
    // Simulate loading medicine reminders
    const reminders = [
      {
        id: '1',
        medicine: 'Aspirin',
        dosage: '100mg',
        time: '08:00',
        frequency: 'Daily'
      },
      {
        id: '2',
        medicine: 'Vitamin D',
        dosage: '1000 IU',
        time: '12:00',
        frequency: 'Daily'
      }
    ];
    setMedicineReminders(reminders);

    // Set up medicine reminder notifications
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0');
      
      reminders.forEach(reminder => {
        if (reminder.time === currentTime) {
          toast.success(`Time to take ${reminder.medicine} - ${reminder.dosage}`);
          addNotification({
            type: 'medicine',
            title: 'Medicine Reminder',
            message: `Time to take ${reminder.medicine} - ${reminder.dosage}`,
            timestamp: new Date()
          });
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const addMedicineReminder = (reminder) => {
    const newReminder = {
      ...reminder,
      id: Date.now().toString()
    };
    setMedicineReminders(prev => [...prev, newReminder]);
  };

  const removeMedicineReminder = (id) => {
    setMedicineReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const value = {
    notifications,
    medicineReminders,
    addNotification,
    markAsRead,
    addMedicineReminder,
    removeMedicineReminder
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};