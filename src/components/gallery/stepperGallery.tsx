import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
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
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {useTranslation} from "gatsby-plugin-react-i18next";

export function StepperGallery({images, imageIndex = 0, onClose, maxHeight}: InferProps<typeof StepperGallery.propTypes>) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const {t} = useTranslation();

    // sets the active step when changed from outside
    React.useEffect(() => {
        setActiveStep(imageIndex || 0);
    }, [imageIndex]);

    // this is here because of gatsby-plugin-feed
    if (!images) return null;

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
            <Box sx={{flexGrow: 1}}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => {
                        if (!step) return null;
                        return (
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
                                        <GatsbyImage alt={step.title} image={getImage(step.src) as IGatsbyImageData}/>
                                    </Box>
                                ) : null}
                            </div>
                        )
                    })}
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
                            sx={{ pr: 0}}
                        >
                            {t('i18n:next')}
                            <KeyboardArrowRight/>
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{ pl: 0}}
                        >
                            <KeyboardArrowLeft/>
                            {t('i18n:back')}
                        </Button>
                    }
                />
            </Box>
        </ClickAwayListener>
    );
}

export default StepperGallery;

StepperGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.any.isRequired
    })).isRequired,
    imageIndex: PropTypes.number,
    onClose: PropTypes.func,
    maxHeight: PropTypes.string
}

StepperGallery.defaultProps = {
    imageIndex: 0
}