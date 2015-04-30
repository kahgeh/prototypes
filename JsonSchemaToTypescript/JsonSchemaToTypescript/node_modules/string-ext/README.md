# string-ext
Useful extensions for the String prototype, for Node and Browserify.  Will not override methods natively supported by the browser.

## API Documentation
### endsWith(substr)
Polyfill for String.prototype.endsWith().

### startsWith(substr)
Polyfill for String.prototype.startsWith().

### capitalize()
Converts only the first character to upper case.

### uncapitalize()
Converts only the first character to lower case.

### trim()

### trimLeft()

### trimRight()

### format(object)
Yet another templating function.  Sorry, but it was a great idea 10 years ago.  The associated String is a
template using either ${key} or {key} for placeholders.  Takes an object, key/value pairs, as input.  If a key
matches a key in a placeholder, the associated value replaces the placeholder.

```javascript
var pattern = "The {team} will win the {contest} in the {season} season.";
var str = pattern.format({ team: 'Texas Rangers', contest: 'World Series', season: 2010});  
// str equals "The Texas Rangers will win the World Series in the 2010 season.".

```

### toCamelCase()
Requires spaces between intended syllables

### contains(substr)
Returns true/false for whether the specified string exists within the current string.

### equalsIgnoreCase(str)
Case insensitive string comparison.   Returns true/false for whether the associated string's 
content matches the specified string's content.

### toBoolean()

### isEmpty()
Returns true if the associated String is empty or contains only whitespace. 

### notEmpty()
Returns true if the associated String contains any characters other than whitespace.  Returns false for empty strings
and strings containing only whitespace.

### isUpperCase()
Returns true/false for whether the associated String is upper case.

### justify(spaces)
Adds the specified number of spaces (padding) before the string

### rightJustify(spaces)
Adds the specified number of spaces (padding) after the string


