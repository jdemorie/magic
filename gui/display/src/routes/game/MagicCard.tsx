import {Card} from "antd";
import {MagicImage} from "../../shared/MagicImage";
import {FC} from "react";

interface MagicCardProps {
    src?: string,
}

const {Meta} = Card;

export const MagicCard: FC<MagicCardProps> = ({src}) => {
    return (
        <div style={{
            width: '150px',
            height: '200px'
        }}>
            <Card hoverable>
                <MagicImage src={src} alt={`${src}-alt`}/>
                <Meta title="10 mana" />
            </Card>
        </div>
    );
}