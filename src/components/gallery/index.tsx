import * as React from "react";
import GridGallery from "./gridGallery";
import StepperGallery from "./stepperGallery";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";

export const CombinedGallery = ({images, options}: GalleryProps) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepperOpen, setStepperOpen] = React.useState(false);

    const handleImageClick = (index: number) => {
        setStepperOpen(true);
        setActiveStep(index);
    }

    const handleCloseStepper = () => {
        setStepperOpen(false);
    }

    // this is here because of gatsby-plugin-feed
    if (!images) return null;

    return (
        <React.Fragment>
            <GridGallery images={images} options={options} onClick={handleImageClick}/>
            <Modal open={stepperOpen}>
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: 'md',
                        margin: 'auto',
                        padding: 1
                    }}
                >
                    <Box  >
                        <StepperGallery
                            images={images}
                            imageIndex={activeStep}
                            onClose={handleCloseStepper}
                            maxHeight="90vh"
                        />

                    </Box>

                </Box>
            </Modal>
        </React.Fragment>
    )
}

export * from './gridGallery';
export * from './stepperGallery';
export * from './test'

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