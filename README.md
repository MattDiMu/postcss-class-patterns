# PostCSS Class Patterns [![Build Status][ci-img]][ci]

[PostCSS] plugin to match class patterns (prefix, suffix, contains) in a SAFE way. This is achieved by combining different attribute selectors with all possible class delimiters (spaces, tabs, line feed, form feed, carriage return). This plugin is inspired by [this post](http://stackoverflow.com/a/37646760/3815374)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-class-patterns.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-class-patterns

Supports the pseudo-classes `:class-starts-with()`, `:class-ends-with()` and `:class-contains()`.

```css
/* input */
:class-starts-with(button-) {

}
/* output */
[class^="button-"],
[class*=" button-"],
[class*="\abutton-"],
[class*="\cbutton-"],
[class*="\dbutton-"],
[class*="\9button-"] {
    color:blue;
}',
```
which matches
```html
<div class="button-blue">matched</div>
<div class="some other classes button-blue">matched</div>
<div class="some-button-blue">not matched</div>
```


```css
/* input */
a:class-ends-with(-active) {
    color: red;
}
/* output */
a[class$="-active"],
a[class*="-active "],
a[class*="-active\a"],
a[class*="-active\c"],
a[class*="-active\d"],
a[class*="-active\9"] {
    color:red;
}',
```

```css
/* input */
a:class-contains(abc) {
    color: green;
}
/* output */
a[class*="abc"] {
    color: green;
}
```

## Usage

```js
postcss([ require('postcss-class-patterns') ])
```

See [PostCSS] docs for examples for your environment.
