import React, {FC} from "react";
import {MagicImage} from "../../shared/MagicImage";
import {Avatar, Badge} from "antd";

interface MagicAvatarProps {
    src: string,
    value: number,
    color?: string,
    testId: string,
}

export const MagicAvatar: FC<MagicAvatarProps> = ({src, value, color, testId}) => {
    return (
        <Badge count={value} showZero style={{
            backgroundColor: color,
        }} data-testid={testId}>
            <Avatar size={64} icon={<MagicImage src={src} alt={`${src}-alt`}/>}/>
        </Badge>
    );
}