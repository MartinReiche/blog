import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";

export const GridGallery = ({images, options, onClick}: ImageGridProps) => {

    // this is here because of gatsby-plugin-feed
    if (!images) return null;

    return (
        <ImageList
            variant="quilted"
            cols={options.cols || 4}
            rowHeight={options.rowHeight || undefined}
        >
            {images.map((item, index) => (

                <ImageListItem
                    key={index}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                    onClick={() => {if (onClick) onClick(index)}}
                    sx={{ cursor: onClick ? 'pointer' : 'default' }}
                >
                    <GatsbyImage alt={item.title} image={getImage(item.src) as IGatsbyImageData}/>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default GridGallery;

type ImageGridProps = {
    images: Image[]
    options: {
        cols?: number
        rowHeight?: number
    }
    onClick?: (index: number) => void
}

type Image = {
    src: any
    title: string
    rows?: number
    cols?: number
}