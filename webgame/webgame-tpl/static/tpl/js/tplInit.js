
/**
 * 定义各模块
 * @type {{}}
 */
window.MODULE = {
    /**
     * 初始化公用
     */
    base : function(){
        ue.lazyimg({
            target : $("body"),
            type : "scroll"
        });
    },
    /**
     * 初始化轮播图模块
     */
    slide : function(){
        ue.slide({
            hovertarget: ".mod-silde",//鼠标hover停止切换的对象
            target: '.mod-silde .slide-list',//滚动对象 一般为 ul
            items: '.mod-silde .slide-list li', //滚动的详细列表
            gotobtn: ".mod-silde .slide-dot li",
            nextbtn: "",
            prevbtn: "",
            delay: 3000,//切换间隔时间
            speed: 500,//切换速度
            trigger: "mouseover",
            maxzIndex: 2,
            currentclass: "cur",
            autoplay: true,//是否自动播放
            beforeSlide: function (index, next) {
                var src = this.items.eq(next).find("img").attr("data-src");

                if (src) {
                    this.items.eq(next).find("img").attr("src", src);
                }
                //$('.gw-silde .slide-tit li').eq(next).show().siblings().hide();
            }
        });
        $('.mod-silde .slide-list li').eq(0).css('opacity', 1);
        $(".mod-silde .slide-dot li").eq(0).trigger("click").addClass('cur');
    },
    /**
     * 搜索模块
     */
    search : function(){
        $(".search-hot a").bind("click", function(){
            if($(".search-wrap").find("input[name='tagid']").length){
                window.open("http://my.4399.com/forums/search?keyword=" + $(this).text() + "&tagid=" + $(".search-wrap").find("input[name=tagid]").val())
            }else{
                window.open(config._appUrl + "info-search?keyword=" + $(this).text())
            }
        })
    },

    /**
     * 职业介绍模块
     */
    role : function(){

        var floor = 0;

        while ($(".zyjs-tab-bd-" + floor).find(".zyjs-tab-hds").length > 0){

            $(".zyjs-tab-hds-" + (floor + 1) + " .zyjs-tab-hd-" + (floor + 1) + "").bind("click",(function (floor){
                return function () {

                    $(this).addClass("cur").siblings().removeClass("cur");

                    var index = $(this).index();

                    var $parent = $(this).closest(".zyjs-tab-bd-" + floor);

                    $parent.find(".zyjs-tab-bds-" + (floor + 1) + " .zyjs-tab-bd-" + (floor + 1) + "").eq(index).show().siblings().hide();

                }
            }(floor)));
            floor += 1;
        }
        $(".zyjs-tab-bd").hide();
        $(".zyjs-tab-hds").find(".zyjs-tab-hd:eq(0)").trigger("click");


        /*$('.j-zyjs-more').bind('click',function () {
            $('html,body').animate({
                'scrollTop' : $('.mod-bzdq').offset().top
            },500)
        })*/
    },
    /**
     * 客服充值模块
     */
    service : function(){
        var $target = $("#j-select2"),
            $select = $target.find(".m_selectlist");
        if ($select.length > 0) {
            ue.select({
                target: $select,
                trigger: "mouseover",
                currentClass: "cur",
                defaultClass: "m_selectlist",
                selected: $select.find(".select_txt"),
                title: $select.find(".m_selected"),
                list: $select.find(".m_select_cont"),
                content: $select.find(".m_select_cont .selectlist"),//包含内容的容器
                items: $select.find(".selectlist li"),
                maxHeight: 230,
                scrollbar: {
                    scroll_per: 23,//每次滚动滑轮，滚动条移动24像素
                    scrollbarbg: $select.find(".v_scrollbar_bg"),//滚动条背景
                    scrollbar: $select.find(".v_scrollbar"),//滚动条容器
                    btn: $select.find(".v_scrollbar_btn")//滚动条按钮
                },
                onSelected: function (target, index) {
                    $('#j-select2 .select_txt').attr('serv-id', $(target).attr('serv-id'));
                    this.hide();
                    return false;
                }
            });
        }

    },
    /**
     * 玩家交流模块
     */
    commu : function(){
        if(pageInfo.dataWjjl){
            var _html = "";
            var items = pageInfo.dataWjjl;
            for(var i = 0;i < items.length;i++){
                _html += "<tr>"+
                    "        <td class=\"td-tit\">"+
                    "            <div class=\"td-wid\"> <a href=\"" + items[i]._url_ + "\" title=\"" + items[i]._txt_ + "\" target=\"_blank\">" + items[i]._txt_ + " (" + items[i]._view_ + "/" + items[i]._reply_ + ")</a></div>"+
                    "        </td>"+
                    "    </tr>";
            }
            $(".comu-table tbody").html(_html);
        }else{
            $(".comu-table").html('<div class="wjjl-empty">暂无数据</div>');
        }
        $('.comu-table tbody tr').hover(function(){
            $(this).addClass('hover').siblings()
                .removeClass('hover');
        },function(){
            $(this)
                .removeClass('hover');
        });
    },

    summary : function () {

        var itemCountsPerRow = 4;
        var rowCountsShow = 2;
        var hasOriginBtn = false;

        function layout($pics){
            $pics.each(function(index){
                var lis = $(this).find("li"),
                    len = lis.length;

                if(parseInt(len) > rowCountsShow * itemCountsPerRow){
                    $(this).siblings(".bzdq-btns").append("<a href=\"javascript:;\" class=\"bzdq-more j-get-more\"></a>");
                    $(this).css('height',rowCountsShow * lis.outerHeight(true));
                }else{
                    $(this).css('height','auto');
                }
            });
        }
        function search(val){
            if(!val){
                alert("不为空");
                return
            }

            var items = $(".bzdq-wrap[data-ref=tab] .bzdq-list li");
            var test,
                resultList = [],
                backupList = [];
            for(var i = 0;i < items.length;i++){
                test = items.eq(i).attr("data-name");
                if(test.indexOf(val) != -1){
                    var isRepeat = false;
                    for(var j = 0;j < backupList.length;j++){
                        if(backupList[j] == test){
                            isRepeat = true;
                            break;
                        }
                    }
                    if(!isRepeat){
                        backupList.push(test);
                        resultList.push(items[i]);
                    }
                }
            }

            if(resultList.length == 0){
                alert("无结果");
                return false
            }

            $(".bzdq-wrap[data-ref=search]").remove();

            var _str = "";
            for(var j = 0;j < resultList.length;j++){
                _str += resultList[j].outerHTML;
            }

            var btnOrigin = hasOriginBtn ? "<a href=\"javascript:;\" class=\"bzdq-origin j-back-origin\"></a>" : "";

            var $wrapSearch = $("<div class='bzdq-wrap' data-ref='search'><div class='bzdq-cont'><ul class='bzdq-list clearfix'>" + _str + "</ul></div><div class='bzdq-btns'>" + btnOrigin + "</div></div>");
            $(".leafs.show").append($wrapSearch);
            $(".bzdq-wrap[data-ref=tab]").hide();
            $(".mod-bzdq").removeClass("s-tab").addClass("s-search");

            /*$(".bzdq-wrap[data-ref=tab]").hide();
            renderCont($(".leafs.show"),result,"search");*/

            layout($(".bzdq-wrap[data-ref=search] .bzdq-cont"));
        }



        layout($(".bzdq-wrap[data-ref=\"tab\"] .bzdq-cont"));


        $(".mod-bzdq .tab-hd").find(".tab-hd-item:eq(0)").addClass("cur");
        $(".mod-bzdq .tab-bd").find(".tab-bd-item:eq(0)").addClass("show");
        $(".bzdq-wrap").parent().addClass("leafs");


        $(document).on('click',".tab-hd-item",function () {
            if($(this).hasClass('cur')){
                return
            }
            if($(".bzdq-wrap[data-ref=search]").length > 0){
                $(".bzdq-wrap[data-ref=search]").remove();
            }
            $(".bzdq-wrap[data-ref=tab]").show();


            var index = $(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            $(this).parent().next().children(".tab-bd-item").eq(index).addClass('show').siblings().removeClass("show");
            $(".mod-bzdq").removeClass("s-search").addClass("s-tab");
        });
        $(document).on('click',".j-get-more", function(){
            $(this).closest(".bzdq-btns").siblings('.bzdq-cont').css('height','auto');
            $(this).hide();
        });
        $(document).on("click",".j-back-origin",function () {
            $(".bzdq-wrap[data-ref=search]").siblings(".bzdq-wrap").show();
            $(".bzdq-wrap[data-ref=search]").remove();
            $(".mod-bzdq").removeClass("s-search").addClass("s-tab");
        });
        $(document).on('click',"#j-search-bzdq",function () {
            var val = $.trim($("#j-input-bzdq").val());
            search(val);
        });
        $(document).on('keypress',"#j-input-bzdq",function (event) {
            if(event.keyCode == 13){
                var val = $.trim($("#j-input-bzdq").val());
                console.log(val);
                search(val);
            }
        });

    }

};



/**
 * DOM加载完毕
 */
$(function () {
    /*初始化官网*/
    for(var key in MODULE){
        if(MODULE.hasOwnProperty(key)){
            MODULE[key]();
        }
    }

});


