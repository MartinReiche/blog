import * as React from "react";
import PropTypes, {InferProps} from "prop-types";
import GridGallery from "./gridGallery";
import StepperGallery from "./stepperGallery";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";

export function CombinedGallery({images, config, options}: InferProps<typeof CombinedGallery.propTypes>) {
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
            <GridGallery images={images} config={config} options={options} onClick={handleImageClick}/>
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

CombinedGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.any.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired
    ),
    options: PropTypes.shape({
        cols: PropTypes.number,
        rowHeight: PropTypes.number
    }).isRequired,
    config: configValidator,
}

export function configValidator(props: any, propName: string, componentName: string) {
    if (props.images.length !== props[propName].length) {
        return Error(
            `Array passed to config in ${componentName} must be of same length as array passed to images.`
        );
    }
    props[propName].map((item: number[]) => {
        if (item.length !== 2) {
            return Error(
                `Array passed to config in ${componentName} must consist of two element arrays with`
                + `numbers for rows and columns.`
            );
        }
        if (!item.every(element => typeof element === 'number')) {
            return Error(
                `Elements in array passed to config in ${componentName} be numeric.`
            );
        }
    })
}

export * from './gridGallery';
export * from './stepperGallery';
