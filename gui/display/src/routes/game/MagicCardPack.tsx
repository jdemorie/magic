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
            <MagicCard mana={0}/>
            <MagicCard mana={0}/>
            <MagicCard mana={1}/>
            <MagicCard mana={1}/>
            <MagicCard mana={2}/>
            <MagicCard mana={2}/>
            <MagicCard mana={2}/>
            <MagicCard mana={3}/>
            <MagicCard mana={3}/>
            <MagicCard mana={3}/>
            <MagicCard mana={3}/>
            <MagicCard mana={4}/>
            <MagicCard mana={4}/>
            <MagicCard mana={4}/>
            <MagicCard mana={5}/>
            <MagicCard mana={5}/>
            <MagicCard mana={6}/>
            <MagicCard mana={6}/>
            <MagicCard mana={7}/>
            <MagicCard mana={8}/>
            
        </div>
    );
}