import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { GatsbyImage } from "gatsby-plugin-image";

export default function Gallery({images, imageProps, options}: GalleryProps) {

    return (
        <ImageList
            variant="quilted"
            cols={options.cols || 4}
            rowHeight={options.rowHeight || undefined}
        >
            {images.map((item, key) => (
                <ImageListItem key={key} cols={imageProps[key].cols || 1} rows={imageProps[key].rows || 1}>
                    <GatsbyImage alt={imageProps[key].title} image={item.image} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}


type GalleryProps = {
    images: {
      image: any
    }[]
    imageProps: {
        title: string
        rows: number
        cols: number
    }[]
    options: {
        cols: number
        rowHeight: number
    }
}