import React, {FC} from "react";
import {testIds} from "../../shared/testIds";
import {useMagicGame} from "./useMagicGame";
import {Button, message, Popconfirm, PopconfirmProps} from 'antd';
import {motion} from "motion/react"

export const MagicExitButton: FC = () => {
    const {onBackButtonClick} = useMagicGame();

    const [messageApi, holder] = message.useMessage();

    const cancel: PopconfirmProps['onCancel'] = (_) => {
        messageApi.error('Click on No').then(_ => {
        });
    };

    return (
        <>
            {holder}
            <Popconfirm
                title="Exit game"
                description="Are you sure you want to exit the game?"
                onConfirm={onBackButtonClick}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <motion.div whileHover={{scale: 1.1}}>
                    <Button style={{
                        padding: 0,
                        background: "none",
                        width: "5rem",
                        height: "3rem"
                    }} data-testid={testIds.exitButton}
                            icon={<img src="/exit.png" alt="/exit.png-alt" style={{
                                width: "5rem",
                                height: "3.5rem",
                            }}/>}>
                    </Button>
                </motion.div>
            </Popconfirm>
        </>
    );
}