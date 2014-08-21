/**
 * General utility functions that can be used in various places
 * througout a project
 * @class Utils
 * @namespace Component
 */
Component.Utils = function($) {

    /**
     * helper function to append new properties onto an object
     * @public
     * @param  {Object} options - the new properties that need to be added
     * @param  {Object} config - the object the new props are being added to
     * @return {Object}         - the combined object
     */
    var extend = function(options, config) {
        if (typeof options !== "undefined") {
            for (prop in options) {
                if (options.hasOwnProperty(prop)) {
                    config[prop] = options[prop];
                }
            }
        }
        return config;
    };

    var getHash = function(key) {
        var match = location.hash.match(new RegExp(key+'=([^&]*)'));
        if (match) {
            return match[1];
        } else {
            return false;
        }
    };

    /**
     * returns the RGB from a HEX
     * @public
     * @param  {String} hex - hexadecimal representation of a color
     * @return {Object}     - R, G and B integer values
     */
    var hex2rgb = function(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }:null;
    };

    var setCookie = function(key, val, exdays) {

        if (typeof exdays === "undefined") {
            exdays = 30;
        }

        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = key + "=" + val + "; " + expires;
    }

    var getCookie = function(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return false;
    }

    return {
        extend: extend,
        hex2rgb: hex2rgb,
        getHash: getHash,
        setCookie: setCookie,
        getCookie: getCookie
    };

}();