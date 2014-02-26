# Node-HTML-Crypt

Self-decrypting JavaScript for general purpose spam defense.

Because the internet really hasn’t changed that much in the last twelve years.™

Ported from the excellent [HTML_Crypt][1] package by Mike Dransfield and
Christian Weiske which was first released on September 8, 2002.

[1]: http://pear.php.net/package/HTML_Crypt/

## Installation

    npm install html-crypt

## Usage

    var crypt = require('html-crypt');
    crypt('<a href="mailto:karl@example.com>Karl Lagerfeld</a>');

The above outputs a script tag with some gnarly looking JavaScript that
that in turn self-decrypts to the given string on page load. Believe it or not,
this will still thwart most spam-bots.

## With Express 3.x

Adding a Jade helper is easy. Add the following to your Express app…

    app.locals.crypt = require('html-crypt');

…and you'll get a helper function in your Jade templates:

    p!= crypt('<a href="mailto:karl@example.com">Karl Lagerfeld</a>')

## To-Do

Write some tests.
