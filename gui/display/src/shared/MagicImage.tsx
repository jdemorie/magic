import {FC} from "react";

interface ImageProps {
    src?: string,
    alt?: string,
}

export const MagicImage: FC<ImageProps> = ({src, alt}) => {
    return (
        <div>
            <img src={src} alt={alt} style={{width: '100%', height: '100%'}}/>
        </div>
    );
}