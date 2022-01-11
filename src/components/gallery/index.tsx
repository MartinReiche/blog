import * as React from "react";
import ImageGrid from "./imageGrid";
import ImageStepper from "./imageStepper";

export default function Gallery({images, options}: GalleryProps) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleImageClick = (index: number) => {
        console.log(`Clicked Image with Index ${index}`)
        setActiveStep(index);
    }

    const handleCloseStepper = () => {
        console.log("Close Stepper")
    }


    return (
        <React.Fragment>
            <ImageGrid images={images} options={options} onClick={handleImageClick}/>
            <ImageStepper
                images={images.map(image => ({ src: image.src, title: image.title }))}
                imageIndex={activeStep}
                onClose={handleCloseStepper}
            />
        </React.Fragment>
    )
}

type GalleryProps = {
    images: Image[]
    options: {
        cols?: number
        rowHeight?: number
    }
}

type Image = {
    src: any
    title: string
    rows?: number
    cols?: number
}