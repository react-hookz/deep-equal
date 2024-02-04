export const simple = [
    {
        name: 'mixed (equal)',
        data: [
            {
                prop1: 'value1',
                prop2: 'value2',
                prop3: 'value3',
                prop4: {
                    subProp1: 'sub value1',
                    subProp2: {
                        subSubProp1: 'sub sub value1',
                        subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                },
                prop5: 1000,
                prop6: new Date(2016, 2, 10),
            },
            {
                prop5: 1000,
                prop3: 'value3',
                prop1: 'value1',
                prop2: 'value2',
                prop6: new Date('2016/03/10'),
                prop4: {
                    subProp2: {
                        subSubProp1: 'sub sub value1',
                        subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                    subProp1: 'sub value1',
                },
            },
        ],
    },
    {
        name: 'mixed (unequal)',
        data: [
            {
                prop1: 'value1',
                prop2: 'value2',
                prop3: 'value3',
                prop4: {
                    subProp1: 'sub value1',
                    subProp2: {
                        subSubProp1: 'sub sub value1',
                        subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                },
                prop5: 1000,
                prop6: new Date(2016, 2, 10),
            },
            {
                prop5: 1000,
                prop3: 'value3',
                prop1: 'value1',
                prop2: 'value2',
                prop6: new Date('2016/03/10'),
                prop4: {
                    subProp2: {
                        subSubProp1: 'sub sub value1',
                        subSubProp2: [1, 2, { prop2: 1, prop: 4 }, 4, 5],
                    },
                    subProp1: 'sub value1',
                },
            },
        ],
    },
    {
        name: 'arrays (equal)',
        data: [
            [1, ['foo', 'bar'], 'a'],
            [1, ['foo', 'bar'], 'a'],
        ],
    },
    {
        name: 'arrays (unequal)',
        data: [
            [1, ['foo', 'bar'], 'a'],
            [1, ['foo', 'baz'], 'a'],
        ],
    },
    {
        name: 'objects (equal)',
        data: [
            { a: 1, foo: 'bar', bax: 'qux' },
            { a: 1, bax: 'qux', foo: 'bar' },
        ],
    },
    {
        name: 'objects (unequal)',
        data: [
            { a: 1, foo: 'bar', bax: 'qux' },
            { a: 1, bax: 'qux', foo: 2 },
        ],
    },
    {
        name: 'dates (equal)',
        data: [new Date('2021-01-01'), new Date('2021-01-01')],
    },
    {
        name: 'dates (unequal)',
        data: [new Date('2021-01-01'), new Date('2021-01-02')],
    },
    {
        name: 'regexps (equal)',
        data: [/[a-c]+/, /[a-c]+/],
    },
    {
        name: 'regexps (unequal)',
        data: [/[a-c]+/, /[a-d]+/],
    },
];
export const complex = [
    {
        name: 'mixed (equal)',
        data: [
            {
                foo: 'value1',
                bar: new Set([1, 2, 3]),
                baz: /foo/i,
                bat: {
                    hello: new Map([['hello', 'world']]),
                    world: {
                        aaa: new Map([['foobar', 'sub sub value1']]),
                        bbb: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                },
                qut: new Date(2016, 2, 10),
                qar: new Uint8Array([1, 2, 3, 4, 5]),
            },
            {
                baz: /foo/i,
                foo: 'value1',
                bar: new Set([1, 2, 3]),
                qar: new Uint8Array([1, 2, 3, 4, 5]),
                qut: new Date('2016/03/10'),
                bat: {
                    world: {
                        aaa: new Map([['foobar', 'sub sub value1']]),
                        bbb: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                    hello: new Map([['hello', 'world']]),
                },
            },
        ],
    },
    {
        name: 'mixed (unequal)',
        data: [
            {
                foo: 'value1',
                bar: new Set([1, 2, 3]),
                baz: /foo/i,
                bat: {
                    hello: new Map([['hello', 'world']]),
                    world: {
                        aaa: new Map([['foobar', 'sub sub value1']]),
                        bbb: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
                    },
                },
                qut: new Date(2016, 2, 10),
                qar: new Uint8Array([1, 2, 3, 4, 5]),
            },
            {
                baz: /foo/i,
                foo: 'value1',
                bar: new Set([1, 2, 3]),
                qar: new Uint8Array([1, 2, 3, 4, 5]),
                qut: new Date('2016/03/10'),
                bat: {
                    world: {
                        aaa: new Map([['foobar', 'sub sub value1']]),
                        bbb: [1, 2, { prop2: 1, prop: 2 }, 4, 8],
                    },
                    hello: new Map([['hello', 'world']]),
                },
            },
        ],
    },
    {
        name: 'maps (equal)',
        data: [
            new Map([
                [1, 'a'],
                ['foo', 'bar'],
                ['baz', 'qux'],
            ]),
            new Map([
                [1, 'a'],
                ['foo', 'bar'],
                ['baz', 'qux'],
            ]),
        ],
    },
    {
        name: 'maps (unequal)',
        data: [
            new Map([
                [1, 'a'],
                ['foo', 'bar'],
                ['baz', 'qux'],
            ]),
            new Map([
                [1, 'a'],
                ['foo', 'bax'],
                ['baz', 'qux'],
            ]),
        ],
    },
    {
        name: 'sets (equal)',
        data: [new Set(['foo', 'bar', 'qux']), new Set(['foo', 'bar', 'qux'])],
    },
    {
        name: 'sets (unequal)',
        data: [new Set(['foo', 'bar', 'qux']), new Set(['foo', 'bax', 'qux'])],
    },
    {
        name: 'array buffers (equal)',
        data: [new Uint16Array([1, 2, 3]), new Uint16Array([1, 2, 3])],
    },
    {
        name: 'array buffers (unequal)',
        data: [new Uint16Array([1, 2, 3]), new Uint16Array([1, 3, 3])],
    },
];
