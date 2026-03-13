import React, {FC} from "react";
import {Button} from "antd";
import {motion} from "motion/react"

interface MagicButtonProps {
    src?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    testId?: string;
    children?: React.ReactNode;
}

export const MagicButton: FC<MagicButtonProps> = ({src, onClick, disabled, testId, children}) => {
    return (
        <motion.div whileHover={{scale: 1.1}}>
            <Button style={{
                padding: 0,
                width: "4rem",
                height: "3rem",
            }} onClick={onClick} disabled={disabled} data-testid={testId} shape="round" type="primary">{children}</Button>
        </motion.div>
    );
}