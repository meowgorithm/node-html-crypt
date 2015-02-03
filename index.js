/*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*

node-html-crypt

Self-decrypting JavaScript for general purpose spam defense

Ported from the excellent HTML_Crypt library by Mike Dransfield and
Christian Weiske first released on September 8, 2002.

http://pear.php.net/package/HTML_Crypt/

Ported by Christian Rocha
On 25 February 2014 00:47 EST
In New York, United States

Usage:

    var crypt = require('html-crypt');
    crypt('<a href="mailto:karl@example.com>Karl Lagerfeld</a>');

The above outputs a script tag that that in turn self-decrypts to the given
string on page load. Believe it or not, this will still deflect most spam-bots.

*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*:._.:*/


var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');


/**
 * Generate some self-decripting JavaScript from a given string
 */
function crypt(text, offset) {
    if(typeof offset === 'undefined') {
        offset = Math.round(Math.random() * 12) % 95;
    }

    return generateScript(cryptText(text, offset), offset);
}


/**
 * Encrypt a string. Only affects ASCII characters of code 128 and lower.
 */
function cryptText(text, offset) {

    var encString = '';
    var currentChar, encChar, num, inter;

    for(i = 0; i < text.length; i++) {
        currentChar = text.charAt(i);
        num = text.charCodeAt(i);

        if(num < 128) {
            inter = num + offset;
            if(inter < 127) {
                inter = (inter - 32) % 95 + 32;
            }
            encChar = String.fromCharCode(inter);
            encString += (encChar === '\\') ? '\\\\' : encChar;
        } else {
            encString += currentChar;
        }

    }

    return encString;
}


/**
 * Generate some self-decrypting JavaScript from a crypted string
 */
function generateScript(cryptString, offset) {
    var rnd = randomString(letters);

    var script = '<script type="text/javascript">'
        + 'var a,s,n;'
        + 'function ' + rnd + '(s){'
            + 'r="";'
            + 'for(i=0;i<s.length;i++){'
                + 'n=s.charCodeAt(i);'
                + 'if(n<128){'
                    + 'n=n-' + offset + ';'
                    + 'if(n<32){'
                        + 'n=127+(n-32);'
                    + '}'
                + '}'
                + 'r+=String.fromCharCode(n);'
            + '}'
            + 'return r;'
        + '}'
        + 'a="' + cryptString.replace('"', '\\"') + '";'
        + 'document.write(' + rnd + '(a));'
    + '</script>';

    return script;
}


/**
 * Scramble the letters of the alphabet at random
 */
function randomString() {
    var str = '';

    // Shuffle array
    letters.sort(function() {
        if(Math.round(Math.random())) {
            return -1;
        } else {
            return 1;
        }
    });

    // Convert array to string
    for(var i in letters) {
        str += letters[i];
    }

    return str;
};


module.exports = crypt;
