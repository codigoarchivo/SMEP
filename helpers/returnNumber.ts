
export const returnNumber = (str: string = '') => {
    const num = str.replace(/[^0-9]/g, "");
    return num === "" ? 0 : parseInt(num, 10);
};