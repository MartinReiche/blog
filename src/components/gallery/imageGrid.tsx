import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {GatsbyImage} from "gatsby-plugin-image";

const ImageGrid = ({images, options, onClick}: ImageGridProps) => {
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
                    onClick={() => {onClick(index)}}
                >
                    <GatsbyImage alt={item.title} image={item.src}/>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default ImageGrid;

type ImageGridProps = {
    images: Image[]
    options: {
        cols?: number
        rowHeight?: number
    }
    onClick: (index: number) => void
}

type Image = {
    src: any
    title: string
    rows?: number
    cols?: number
}