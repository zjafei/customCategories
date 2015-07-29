/**
 * User: Eric Ma
 * Email: zjafei@gmail.com
 * Date: 2015/5/30
 * Time: 15:09
 */
define(function (require, exports, module) {
    var cateAry = [],
        manuallySelectCategoryBox = $('#manuallySelectCategoryBox');
    //删除某级别后的类别列表
    function delSomeCateList(level) {
        var b = true;
        while (b) {
            var list = $('#categoryList' + level);
            if (list.length !== 0) {
                list.remove();//删除level级别的列表
                level++;
            } else {
                b = false;
            }
        }
    }

    //获取列表内容
    function getCateList(level, id) {
        var cateList = '';
        $.ajax({
            type: 'post',
            url: top.APP_PATH + '/Usercenter/Goods/getusercate',
            //url: '/2.html',
            async: false,
            data: 'pid=' + id,
            dataType: 'json',
            success: function (data) {
                var html = '';
                $.each(data, function () {
                    html += '<span class="js-sel-cate" l="' + level + '" i="' + this.id + '">' + this.title + '</span>';
                });
                cateList = html;
            },
            error: function () {
                alert('网络错误');
            }
        });
        return cateList;
    }

    //插入某个级别的列表
    function createCateList(level, id) {
        if (level >= top._CUSTOMCATEGORIES.setUp.maxLevel) {
            //createCateAry();
        } else {
            var list = getCateList(level, id);
            manuallySelectCategoryBox.append('<div class="col-1-' + top._CUSTOMCATEGORIES.setUp.maxLevel + '" id="categoryList' + level + '"><div class="search-select-category-list">' + list + '</div></div>');
        }

    }

    //生成分类数对象
    function createCateObj(id, name) {
        return {
            'id': id,
            'name': name
        };
    }


    //输出分类对象数组
    function createCateAry() {
        var cateAry = [],
            curList = manuallySelectCategoryBox.find('.cur');
        for (var i = 0; i < curList.length; i++) {
            var t = curList.eq(i);
            cateAry.push(createCateObj(t.attr('i'), t.text()));
        }
        top._CUSTOMCATEGORIES.setUp.callback(cateAry);
        top._CUSTOMCATEGORIES.remove();
    }

    function onLoading() {
        var id = 0,
            level = 0;
        delSomeCateList(level);
        createCateList(level, id);
    }

    $('body').on('click', '.js-sel-cate', function () {
        var myThis = $(this);
        var id = myThis.attr('i'),
            level = parseInt(myThis.attr('l'));
        myThis.parent().parent().find('.js-sel-cate').removeClass('cur');
        myThis.addClass('cur');
        delSomeCateList(level + 1);
        createCateList(level + 1, id);
    });

    $('#customCategoriesClose').click(function () {
        top._CUSTOMCATEGORIES.remove();
    });

    $('#customCategoriesSubmit').click(function () {
        createCateAry();
        top._CUSTOMCATEGORIES.remove();
    });
    onLoading();
    $();
    $('#savecate').attr('href', top.APP_PATH + '/Usercenter/Goods/goodsadd');
    if (!top._CUSTOMCATEGORIES.setUp.showTools) {
        $('#tools').addClass('hide');
    }
});