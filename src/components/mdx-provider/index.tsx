// ./src/components/Provider.js
import React from 'react'
// @ts-ignore
import { MDXProvider as Provider } from '@mdx-js/react'
import {CombinedGallery, GridGallery, StepperGallery} from "../gallery"

const shortcodes = {
    CombinedGallery,
    GridGallery,
    StepperGallery,
};

export const MDXProvider: React.FC = ({ children }) => (
    <Provider components={shortcodes}>{children}</Provider>
);

export default MDXProvider;