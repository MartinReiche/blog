import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
// @ts-ignore
import { GatsbyImage } from "gatsby-plugin-image";
import {useI18next} from "gatsby-plugin-react-i18next";

export const StepperGallery = ({images, imageIndex = 0, onClose, maxHeight}: ImageStepperProps) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const {t} = useI18next();

    // sets the active step when changed from outside
    React.useEffect(() => {
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

    const handleClickAway = (e: MouseEvent | TouchEvent) => {
        if (onClose) onClose(e)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ flexGrow: 1}}>
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
                                        maxHeight: maxHeight || undefined
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
                            {t('i18n:next')}
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
                            {t('i18n:back')}
                        </Button>
                    }
                />
            </Box>
        </ClickAwayListener>
    );
}

export default StepperGallery;

type ImageStepperProps = {
    images: {
        title: string
        src: any
        rows?: number
        cols?: number
    }[]
    imageIndex?: number
    onClose?: (event: MouseEvent | TouchEvent) => void
    maxHeight?: string
}