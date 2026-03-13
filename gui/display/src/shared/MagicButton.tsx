import React, {FC} from "react";
import {Button, Tooltip} from "antd";
import {motion} from "motion/react"

interface MagicButtonProps {
    src?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    testId?: string;
    text?: string;
    tooltipText?: string;
}

export const MagicButton: FC<MagicButtonProps> = ({src, onClick, disabled, testId, text, tooltipText}) => {
    return (
        <motion.div whileHover={{scale: 1.1}}>
            <Tooltip title={tooltipText}>
                <Button style={{
                    padding: 0,
                    width: "4rem",
                    height: "3rem",
                }} onClick={onClick} disabled={disabled} data-testid={testId}
                        icon={src === undefined || disabled ? undefined : <img src={src} alt={`${src}-alt`} style={{
                            width: "4rem",
                            height: "3rem",
                            borderRadius: "0.5rem"
                        }}/>}>{text}</Button>
            </Tooltip>
        </motion.div>
    );
}