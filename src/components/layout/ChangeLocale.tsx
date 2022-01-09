import {useI18next} from 'gatsby-plugin-react-i18next';
import React from 'react';
import {Button} from "@mui/material";

export const ChangeLocale = () => {
    const {language, changeLanguage} = useI18next();

    const handleLanguageChange = () => {
        const lang = language === 'de' ? 'en' : 'de';
        changeLanguage(lang);
    };

   return (
        <Button
            onClick={handleLanguageChange}
            sx={{ color: 'white '}}
        >
            {language === 'de' ? 'english' : 'deutsch'}
        </Button>
    );
};