import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import styles from './NotificationBar.module.css';

export const NotificationBar: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className={styles.container}>
      {notifications.map((notification) => {
        const isError = notification.type === 'error';
        const isSuccess = notification.type === 'success';

        return (
          <div
            key={notification.id}
            className={`${styles.notification} ${
              isError ? styles.error : isSuccess ? styles.success : styles.info
            }`}
          >
            {isError && <AlertCircle size={20} className={styles.errorIcon} />}
            {isSuccess && <CheckCircle2 size={20} className={styles.successIcon} />}
            {!isError && !isSuccess && <Info size={20} className={styles.infoIcon} />}

            <span className={styles.message}>{notification.message}</span>

            <button
              className={styles.closeBtn}
              onClick={() => removeNotification(notification.id)}
              title="Close"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
