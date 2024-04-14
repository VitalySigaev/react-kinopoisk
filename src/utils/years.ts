export const getYears = () => {
    let result = [];
    let yearNow = new Date().getFullYear();

    for (let i = yearNow; i >= 1874; i--) {
        result.push(i);
    }
    return result;
}