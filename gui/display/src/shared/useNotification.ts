import {notification} from "antd";
import {NotificationPlacement} from "antd/lib/notification/interface";

export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string, placement: NotificationPlacement) => {
        api.info({
            title: message,
            type: 'error',
            placement,
        });
    };

    return [openNotification, contextHolder] as const;
}