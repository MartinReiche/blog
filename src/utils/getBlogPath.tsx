type FrontMatter = {
    path: string;
    lang: string;
}

export const getBlogPath = (frontMatter: FrontMatter, defaultLang: string) => {
    if (defaultLang === frontMatter.lang) {
        return `/blog/${frontMatter.path}/`;
    } else {
        return `/${frontMatter.lang}/blog/${frontMatter.path}/`;
    }
};