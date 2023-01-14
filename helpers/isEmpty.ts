export const isEmpty = (empty: object | FileList | null) => {
    for (const key in empty) return false;
    return true;
}
