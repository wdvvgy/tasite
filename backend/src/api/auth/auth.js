export const func = async () => {
    let result = '';
    await setTimeout(() => {
        result = 'func';
    }, 1000);
    return result;
};