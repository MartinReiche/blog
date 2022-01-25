export const getI18nPathFromSlug = (slug: string, defaultLang='de') => {
    const slugParts = slug.split('/');
    if (slugParts.length == 2) {
        const [type, lang] = slugParts;
        return lang === defaultLang ? `/${type}/` : `/${lang}/${type}/`
    } else {
        const [type, entryId, lang] = slugParts;
         return lang === defaultLang ? `/${type}/${entryId}/` : `/${lang}/${type}/${entryId}/`;
    }
};
