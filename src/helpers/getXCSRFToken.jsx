export const getXCSRFToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('XCSRF-TOKEN='))?.split('=')[1];
};