// action/components/Notification.tsx

import React from "react";

interface NotificationProps {
  message: string;
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

export default Notification;
