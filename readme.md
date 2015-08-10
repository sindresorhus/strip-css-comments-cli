# strip-css-comments-cli [![Build Status](https://travis-ci.org/sindresorhus/strip-css-comments-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-css-comments-cli)

> Strip comments from CSS


## Install

```
$ npm install --global strip-css-comments-cli
```


## Usage

```
$ strip-css-comments-cli --help

  Usage
    $ strip-css-comments <input-file> > <output-file>
    $ strip-css-comments < <input-string>

  Options
    --preserve=<regex>  Preserve comments matching a regex [Default: ^!]
    --no-preserve       Strip all comments including `/*!`

  Examples
    $ strip-css-comments src/app.css > dist/app.css
    $ strip-css-comments < src/app.css --preserve='^#'
```


## Related

- [strip-css-comments](https://github.com/sindresorhus/strip-css-comments) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
