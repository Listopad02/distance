const signUp = require('./main')

test('login function first truthy case', () => {
    expect(signUp('kirill@mail.ru', 'qwaszx12')).toBeTruthy();
})
test('login function second truthy case', () => {
    expect(signUp('kkhlevnyy@mail.com', 'qskjnce2')).toBeTruthy();
})
test('login function third truthy case', () => {
    expect(signUp('test@test.ru', 'cnkiue32')).toBeTruthy();
})

test('login function first falsy case', () => {
    expect(signUp('khl@mail', 'qwaszx12')).toBeFalsy();
})
test('login function second falsy case', () => {
    expect(signUp('khle@mail.ru', 'qweshо')).toBeFalsy();
})
test('login function third falsy case', () => {
    expect(signUp('kirick.ru', 'dnckjwje')).toBeFalsy();
})