var postcss = require('postcss');

function pseudoClassRegex(str) {
    return new RegExp(":" + str + "\\([ '\"]*([^ '\"]*)[ '\"]*\\)", "gi"); // eslint-disable-line quotes,max-len
}

function replaceRegex(rule, pseudoClassDefs) {
    pseudoClassDefs.forEach(function (pseudoClassDef) {

        rule.selectors.forEach(function (sel, index) {
            if (sel.match(pseudoClassDef.regex)) {

                var newSels = [];
                pseudoClassDef.replacedBy.forEach(function (replItem) {
                    newSels.push(sel.replace(pseudoClassDef.regex, replItem));
                });
                var x = rule.selectors.splice(0);
                Array.prototype.splice.apply(x, [index, 1].concat(newSels));
                rule.selector = x.join(',');
                replaceRegex(rule, pseudoClassDefs);
            }
        });
    });
}


module.exports = postcss.plugin('postcss-class-patterns', function (opts) {
    opts = opts || {};

    var pseudoClassDefs = [
        {
            regex: pseudoClassRegex('class-starts-with'),
            replacedBy: [
                '[class^="$1"]',
                '[class*=" $1"]',
                '[class*="\a$1"]',
                '[class*="\c$1"]',
                '[class*="\d$1"]',
                '[class*="\9$1"]'
            ]
        },
        {
            regex: pseudoClassRegex('class-ends-with'),
            replacedBy: [
                '[class$="$1"]',
                '[class*="$1 "]',
                '[class*="$1\a"]',
                '[class*="$1\c"]',
                '[class*="$1\d"]',
                '[class*="$1\9"]'
            ]
        },
        {
            regex: pseudoClassRegex('class-contains'),
            replacedBy: [
                '[class*="$1"]'
            ]
        }
    ];

    return function (css, result) { // eslint-disable-line no-unused-vars

        css.walkRules(function (rule) {

            replaceRegex(rule, pseudoClassDefs);

        });
    };
});
