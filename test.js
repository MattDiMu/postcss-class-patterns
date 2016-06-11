import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

/* eslint-disable max-len */

test('class-starts-with', t => {
    return run(t, ':class-starts-with(button-){color:blue;}',
        '[class^="button-"],[class*=" button-"],[class*="\abutton-"],[class*="\cbutton-"],[class*="\dbutton-"],[class*="\9button-"]{color:blue;}',
    { });
});

test(':class-ends-with', t => {
    return run(t, ':class-ends-with(--red){border-left-color:red;}',
        '[class$="--red"],[class*="--red "],[class*="--red\a"],[class*="--red\c"],[class*="--red\d"],[class*="--red\9"]{border-left-color:red;}',
    { });
});

test('a:class-contains', t => {
    return run(t, 'a:class-contains(active){border-left-color:red;}', 'a[class*="active"]{border-left-color:red;}', { });
});

test('nested ends-with', t => {
    return run(t, '.someClass:class-ends-with(abc) a:class-ends-with(--red){border-left-color:red;}',
        '.someClass[class$="abc"] a[class$="--red"],' +
        '.someClass[class*="abc "] a[class*="--red "],' +
        '.someClass[class*="abc\a"] a[class*="--red\a"],' +
        '.someClass[class*="abc\c"] a[class*="--red\c"],' +
        '.someClass[class*="abc\d"] a[class*="--red\d"],' +
        '.someClass[class*="abc\9"] a[class*="--red\9"]' +
        '{border-left-color:red;}',
    { });
});
/* eslint-enable max-len */
