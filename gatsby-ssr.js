// ./src/wrap-root-element.js
import React from 'react'
import MDXProvider from "./src/components/mdx-provider"

// This is needed for gatsby-plugin-feed to work with MDX Components
export const wrapRootElement = ({ element }) => (
  <MDXProvider>{element}</MDXProvider>
)