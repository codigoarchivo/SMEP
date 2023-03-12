export const calcAge = () => {
    let d = new Date();
    const c = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    return c
}

export const calcDays = (d: Date) => {
    let days = [];
    let i = new Date();
    for (i; i <= d; i.setDate(i.getDate() + 1)) days.push(new Date(i));
    if (days.length <= 0) return;
    return days.length;
}

export const limite = (d: number | Date) => {
    let words = ''
    if (d === undefined) return words = 'se agoto el tiempo';
    if (d >= 15 && d <= 20) return words = '20 dias para la renovación';
    if (d >= 10 && d <= 15) return words = '15 dias para la renovación';
    if (d >= 5 && d <= 10) return words = '10 dias para la renovación';
    if (d >= 1 && d <= 5) return words = `${d} dias para la renovación`;
    if (d) return words = `${calcAge().toLocaleDateString()}`;
}
