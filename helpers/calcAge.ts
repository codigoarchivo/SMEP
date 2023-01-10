
export const calcAge = (data: number) => {
    let age = 0;
    switch (data) {
        case 1:
            age = 12;
            break;
        case 2:
            age = 24;
            break;
        case 3:
            age = 36;
            break;
        default:
            age = 0;
            break;
    }
    return age
}
