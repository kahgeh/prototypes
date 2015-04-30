/**
 *
 * @author Philip Ford
 */
var _ = require("underscore"),
    methods;

methods = {
    /**
     * Returns true/false for whether the associated string ends with the specified substring.
     * @param c
     */
    endsWith: function (c) {
        var start = this.length - c.length;
        return (c === this.substr(start, c.length));
    },

    /**
     * Returns true/false for whether the associated string starts with the specified substring.
     * @param c
     */
    startsWith: function(c) {
        return (c === this.substr(0, c.length));
    },

    /**
     * Capitalizes the first letter of the associated string.
     */
    capitalize: function() {
        var str = this.toLowerCase();
        return str.charAt(0).toUpperCase() + str.substring(1);
    },

    /**
     * Converts the first letter of the associated string to lower case.
     */
    uncapitalize: function() {
        return this.charAt(0).toLowerCase() + this.substring(1);
    },

    /**
     * Polyfill for String.prototype.trim
     */
    trim: function() {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    /**
     * Trims the left side of the associated string.
     *
     * @returns {void|XML|string}
     */
    trimLeft: function() {
        return this.replace(/^\s+/g, "");
    },
    /**
     * Trims the right side of the associated string.
     *
     * @returns {void|XML|string}
     */
    trimRight: function() {
        return this.replace(/\s+$/g, "");
    },


    /**
     * Yet another templating function.  Sorry, but it was a great idea 10 years ago when I wrote this.
     *
     * @param args
     */
    format: function(args) {
        if (args == null) return;
        var str = this + "", re, i;
        for (i in args) {
            re = new RegExp("\\$?\\{" + i + "\\}", "gi");
            if (args.hasOwnProperty(i)) {
                str = str.replace(re, args[i]);
            }
        }
        return str;
    },

    /**
     * Requires spaces between intended syllables
     */
    toCamelCase: function() {
        var i, len, s, result = [], instance = this, syllables = instance.split(/\s+/);
        for (i = 0, len = syllables.length; i < len; ++i) {
            if (i > 0) s = syllables[i].capitalize();
            else s = syllables[i].toLowerCase();
            result.push(s);
        }
        return result.join("");
    },

    /**
     * Returns true/false for whether the specified string exists within the current string.
     *
     * @param str
     */
    contains: function (str) {
        return this.indexOf(str) != -1;
    },


    /**
     * Returns true if the Strings have equal content, regardless of case.
     *
     * @param value
     * @return {Boolean}
     */
    equalsIgnoreCase: function(value) {
        if (!_.isString(value)) return false;
        return this.toLowerCase() == value.toLowerCase();
    },

    /**
     * Converts the string to a boolean <strong>if and only if</strong> the string is eother "true" or "false."
     * Anything else is return as-is.
     *
     * @return {Boolean | String}
     */
    toBoolean: function() {
        if (this.trim() === "true") return true;
        else if (this.trim() === "false") return false;
        else return this;
    },


    /**
     * Returns true if the String has no content, contains only whitespace.
     *
     * @return {Boolean}
     */
    isEmpty: function() {
        return this.trim() === "";
    },

    /**
     * Returns true if the String contains any content other than whitespace.
     * @return {Boolean}
     */
    notEmpty: function() {
        return !this.isEmpty();
    },


    /**
     * Returns true/false for whether the String is all uppercase.
     * @return {Boolean}
     */
    isUpperCase: function() {
        return this.toUpperCase() == this;
    },


    /**
     * Adds padding before the string
     *
     * @param {Integer} len The number of spaces to add before the string
     * @return {String} The padded string.
     */
    justify: function(len) {
        var str = [];
        len = parseInt(len);
        while (len-- > 0) {
            str.push(" ");
        }
        str.push(this);
        return str.join("");
    },


    /**
     * Adds padding after the string
     *
     * @param {Integer} len The number of spaces to add before the string
     * @return {String} The padded string.
     */
    rightJustify: function(len) {
        var str = [this];
        len = parseInt(len);
        while (len-- > 0) {
            str.push(" ");
        }
        return str.join("");
    }

};

_.extend(String.prototype, _.pick(methods, function(value, key){
    return String.prototype[key] == null;
}));
