export const isEmpty = (empty: object) => {
    for (const key in empty) return false;
    return true;
}
