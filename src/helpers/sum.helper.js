function sum(a, b) {
    return a + b;
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject(new Error('Negative numbers not allowed'));
            }
            resolve(a + b);
        }, 2000);
    })
}

module.exports = { sum, add };


