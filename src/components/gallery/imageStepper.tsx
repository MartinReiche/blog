import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
// @ts-ignore
import {autoPlay} from 'react-swipeable-views-utils';
import { GatsbyImage } from "gatsby-plugin-image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageStepper = ({images, imageIndex, onClose}: ImageStepperProps) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    // sets the active step when changed from outside
    React.useEffect(() => {
        console.log("set active step")
        setActiveStep(imageIndex);
    }, [imageIndex]);

    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Box sx={{ flexGrow: 1}}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        bgcolor: 'background.default',
                    }}
                >
                    <Typography>{images[activeStep].title}</Typography>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                >
                                    <GatsbyImage alt={step.title} image={step.src} />
                                </Box>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft/>
                            ) : (
                                <KeyboardArrowRight/>
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight/>
                            ) : (
                                <KeyboardArrowLeft/>
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </ClickAwayListener>
    );
}

export default ImageStepper;

type ImageStepperProps = {
    images: {
        title: string
        src: any
    }[]
    imageIndex: number
    onClose: () => void
}