const signUp = require('./main')

// truthy cases
test('login function first truthy case', () => {
    expect(signUp('kirill@mail.ru', 'qwaszx12')).toBeTruthy();
})
test('login function second truthy case', () => {
    expect(signUp('kkhlevnyy@mail.com', 'qskjnce2')).toBeTruthy();
})
test('login function third truthy case', () => {
    expect(signUp('test@test', 'cnkiue32')).toBeTruthy();
})

// falsy cases
test('login function first falsy case', () => {
    expect(signUp('khl@mail', 'qwaszx12')).toBeFalsy();
})
test('login function second falsy case', () => {
    expect(signUp('khle@mail.ru', 'qw')).toBeFalsy();
})
test('login function third falsy case', () => {
    expect(signUp('kirick.ru', 'dnckjwje')).toBeFalsy();
})

