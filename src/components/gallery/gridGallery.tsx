import * as React from 'react';
import PropTypes, {InferProps} from "prop-types";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {configValidator} from "./index";

export function GridGallery({images, config, options, onClick}: InferProps<typeof GridGallery.propTypes>) {

    // this is here because of gatsby-plugin-feed
    if (!images) return null;
    if (images.length !== config.length) return null;

    return (
        <ImageList
            variant="quilted"
            cols={options.cols || 1}
            rowHeight={options.rowHeight || undefined}
        >
            {images.map((item, index) => {
                return (
                    <ImageListItem
                        key={index}
                        rows={config[index][0] || 1}
                        cols={config[index][1] || 1}
                        onClick={() => {
                            if (onClick) onClick(index)
                        }}
                        sx={{cursor: onClick ? 'pointer' : 'default'}}
                    >
                        <GatsbyImage alt={item.title} image={getImage(item.src) as IGatsbyImageData}/>
                    </ImageListItem>
                )
            })}
        </ImageList>
    );
}

GridGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.any.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired
    ),
    config: configValidator,
    options: PropTypes.shape({
        cols: PropTypes.number,
        rowHeight: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func
}

export default GridGallery;
