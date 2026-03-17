import React, {FC} from "react";
import {Avatar, Badge} from "antd";

interface MagicAvatarProps {
    src: string,
    shape?: 'circle' | 'square',
    value?: number,
    color?: string,
    testId: string,
}

export const MagicAvatar: FC<MagicAvatarProps> = ({src, shape, value, color, testId}) => {
    return (
        <Badge count={value} showZero style={{
            backgroundColor: color,
        }} data-testid={testId}>
            <Avatar size={64} shape={shape} icon={<img src={src} alt={`${src}-alt`} style={{width: '100%', height: '100%'}}/>}/>
        </Badge>
    );
}