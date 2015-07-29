/**
 * User: Eric Ma
 * Email: zjafei@gmail.com
 * Date: 2015/5/30
 * Time: 15:32
 */
define(function (require, exports, module) {
    var dialogPlus = require('dialogPlus');

    module.exports = function (id, callback, maxLevel, showTools) {
        var l = 1,
            s = true,
            cb = function () {
            };
        if (typeof maxLevel === "number") {
            l = maxLevel;
        }
        if (typeof callback === "function") {
            cb = callback;
        }
        if (typeof a === "string" && a !== '') {
            a = align;
        }
        if (typeof showTools === "boolean") {
            s = showTools;
        }
        _CUSTOMCATEGORIES = dialogPlus({
            cssUri: seajs.data.base + 'modules/widget/customCategories/css.css',
            skin:'CUSTOM_CATEGORIES',
            padding: 10,
            url: seajs.data.base + 'modules/widget/customCategories/index.html',
            width: maxLevel * 185,
            quickClose: true,
            fixed: false,
            setUp: {
                callback: cb,
                showTools: s,
                maxLevel: l
            }
        });
        _CUSTOMCATEGORIES.show(document.getElementById(id));
    };
});