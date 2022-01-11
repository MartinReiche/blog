import * as React from "react";
import GridGallery from "./gridGallery";
import StepperGallery from "./stepperGallery";

export const CombinedGallery = ({images, options}: GalleryProps) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleImageClick = (index: number) => {
        setActiveStep(index);
    }

    const handleCloseStepper = () => {
        console.log("Close Stepper")
    }


    return (
        <React.Fragment>
            <GridGallery images={images} options={options} onClick={handleImageClick}/>
            <StepperGallery
                images={images}
                imageIndex={activeStep}
                onClose={handleCloseStepper}
            />
        </React.Fragment>
    )
}

export * from './gridGallery';
export * from './stepperGallery';

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