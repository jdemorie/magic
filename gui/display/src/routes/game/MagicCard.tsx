import {Card} from "antd";
import {MagicImage} from "../../shared/MagicImage";
import {FC, useMemo} from "react";

interface MagicCardProps {
    mana: number,
}

const {Meta} = Card;

export const MagicCard: FC<MagicCardProps> = ({mana}) => {
    const srcIcon = useMemo(() => {
        const value = mana + 1;
        return `/magic-card-${value}.png`;
    }, [mana]);

    return (
        <div style={{
            width: '150px',
            height: '200px'
        }}>
            <Card hoverable>
                <MagicImage src={srcIcon} alt={`${srcIcon}-alt`}/>
                <Meta title={`${mana} mana`}/>
            </Card>
        </div>
    );
}