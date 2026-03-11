import {FC} from "react";

interface ImageProps {
    src?: string,
    alt?: string,
}

export const Image: FC<ImageProps> = ({src, alt}) => {
    return (
        <div>
            <img src={src} alt={alt} style={{width: '100%', height: 'auto'}}/>
        </div>
    );
}