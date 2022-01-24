export const getI18nPathFromSlug = (slug: string, defaultLang='de') => {
    const [type, entryId, lang] = slug.split('/');
    if (defaultLang === lang) {
        return `/${type}/${entryId}/`;
    } else {
        return `/${lang}/${type}/${entryId}/`;
    }
};
