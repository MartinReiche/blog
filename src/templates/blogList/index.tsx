import * as React from "react"
import {useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

import Layout from "../../components/layout"
import Seo from "../../components/layout/seo"
import {graphql} from "gatsby";
import BlogCard from "../../components/blog/blogCard";
import Stack from "@mui/material/Stack";
import {PaginationRenderItemParams} from "@mui/material";
import {ImageDataLike} from "gatsby-plugin-image";
import {getI18nPathFromSlug} from "../../utils";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';
import {Link} from "gatsby-theme-material-ui";

type BlogData = {
    data: {
        blog: {
            nodes: {
                id: string,
                timeToRead: number;
                excerpt: string;
                slug: string;
                frontmatter: {
                    date: string;
                    description: string;
                    title: string;
                    title_image: ImageDataLike;
                }
            }[]
        }
    },
    pageContext: {
        numPages: number,
        currentPage: number
    }
}

const BlogListPage: React.FC<BlogData> = ({data, pageContext}) => {
    const {t} = useTranslation();
    const {language} = useI18next();

    const { currentPage, numPages } = pageContext;

    const postData = data.blog.nodes.map(post => {
        const {excerpt, slug} = post;
        return {...post.frontmatter, excerpt, path: getI18nPathFromSlug(slug)}
    });

    const renderPaginationItem = (item: PaginationRenderItemParams) => {
        const slug = item.page > 1 ? `blog/${item.page}/${language}` : `blog/${language}`;
        const path = getI18nPathFromSlug(slug);
        if (item.disabled) return <PaginationItem {...item} />
        else return (
            <Link to={path} underline="none">
                <PaginationItem {...item} />
            </Link>
        )
    };

    return (
        <Layout>
            <Seo title={t('i18n:blog')}/>
            <Stack spacing={4}>

                <Stack spacing={2}>
                    {postData.map((post, i) => (
                        <BlogCard key={i} blogData={post}/>
                    ))}
                </Stack>
                {numPages > 1 && <Box sx={{ display: { xs:'none', sm: 'flex'}, justifyContent: 'center'}}>
                  <Pagination
                    count={numPages}
                    page={currentPage}
                    showFirstButton={numPages > 2}
                    showLastButton={numPages > 2}
                    renderItem={renderPaginationItem}
                    size="large"
                  />
                </Box>}
                {numPages > 1 && <Box sx={{ display: { xs:'flex', sm: 'none'}, justifyContent: 'center'}}>
                  <Pagination
                    count={numPages}
                    page={currentPage}
                    showFirstButton={numPages > 2}
                    showLastButton={numPages > 2}
                    siblingCount={0}
                    renderItem={renderPaginationItem}
                  />
                </Box>}
            </Stack>
        </Layout>
    )
}

export const query = graphql`
  query BlogListQuery($language: String!, $skip: Int!, $limit: Int!, $slugGlobFilter: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {slug: {glob: $slugGlobFilter}},
      limit: $limit,
      skip: $skip
    ) {
    nodes {
      id
      timeToRead
      excerpt(pruneLength: 500)
      slug
      frontmatter {
        date(formatString: "dddd, Do MMMM YYYY", locale: $language)
        title
        description
        title_image {
          title
          src {
            childImageSharp {
              gatsbyImageData(
                width: 900
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
    }
  }
`;


export default BlogListPage
