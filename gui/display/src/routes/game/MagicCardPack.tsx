import {FC} from "react";
import {MagicCard} from "./MagicCard";

export const MagicCardPack: FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '1rem',
        }}>
            <MagicCard src="/magic-card-1.png"/>
            <MagicCard src="/magic-card-2.png"/>
            <MagicCard src="/magic-card-3.png"/>
            <MagicCard src="/magic-card-4.png"/>
            <MagicCard src="/magic-card-5.png"/>
            <MagicCard src="/magic-card-6.png"/>
            
        </div>
    );
}