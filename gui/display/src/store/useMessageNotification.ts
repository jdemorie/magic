import {notification} from "antd";
import {NotificationType, useNotification, useSetNotification} from "./notificationSlice";
import {useCallback} from "react";

export const useMessageNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const notificationState = useNotification();
    const setNotificationState = useSetNotification();

    const sendNotification = useCallback((message?: string, type?: NotificationType) => {
        if (message) {
            switch (type) {
                case NotificationType.Info:
                    api.info({
                        title: message,
                        placement: "bottomLeft"
                    });
                    break;
                case NotificationType.Error:
                    api.error({
                        title: message,
                        placement: "bottomLeft"
                    });
                    break;
                case NotificationType.Success:
                    api.success({
                        title: message,
                        placement: "bottomLeft"
                    });
                    break;
                case NotificationType.Warning:
                    api.warning({
                        title: message,
                        placement: "bottomLeft"
                    });
                    break;
            }
        }
        setNotificationState(undefined, undefined);
    }, [api, setNotificationState]);
    return {
        sendNotification,
        notificationState,
        setNotificationState,
        contextHolder
    }
}