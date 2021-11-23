const { sum, add } = require('../helpers/sum.helper');

// test('adding 1 and 2 gives 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1);
//         done();
//     }, 3060);
// })

test(`testing a Promise by adding two numbers`, (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5);
        done()
    }).catch(e => {
        done(e)
    })
})


test(`add two numbers`, async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32);
})