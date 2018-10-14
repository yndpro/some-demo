<!-- 提示弹窗 -->
<script type="text/template" id="tipTmpl">
    <div class="dialog dialog--tip">
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont">
                <h3 class="dialog-title"><%= msg %></h3>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<!-- confirmTmpl -->
<script type="text/template" id="confirmTmpl">
    <div class="dialog dialog--confirm">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont">
                <h3 class="dialog-title"><%=title%></h3>
                <% if(typeof(text) !== 'undefined'){ %>
                <p class="dialog-txt"><%=text%></p>
                <% } %>
                <div class="dialog-opt">
                    <% for(var i = 0,item;item = btnList[i],i < btnList.length;i++){%>
                    <% if(item == 'charge'){ %>
                    <a href="<{$__ztInfo._czUrl}>" target="_blank" class="dialog-btn dialog-btn--charge j-confirm">充值中心</a>
                    <% } %>
                    <% if(item == 'intro'){ %>
                    <a href="javascript:;" class="dialog-btn j-intro">查看活动介绍</a>
                    <% } %>
                    <% if(item == 'confirm'){ %>
                    <a href="javascript:;" class="dialog-btn dialog-btn--confirm j-confirm">确定</a>
                    <% } %>
                    <% if(item == 'cancel'){ %>
                    <a href="javascript:;" class="dialog-btn dialog-btn--cancel j-cancel">取消</a>
                    <% } %>
                    <% } %>
                </div>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<!-- 普通奖品弹窗-->
<script type="text/template" id="giftNormalTmpl">
    <div class="dialog dialog--gift_normal">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont clearfix">
                <h3 class="dialog-title">恭喜您获得<span>【<%=prizeName%>】</span></h3>
                <div class="dialog-txt">(获得的积分可在页面底部进行礼包兑换)</div>
                <div class="dialog-opt">
                    <a href="javascript:;" class="dialog-btn dialog-btn--dark j-confirm">确定</a>
                </div>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<!-- 奖品弹窗-->
<script type="text/template" id="giftCodeTmpl">
    <div class="dialog dialog--gift_code">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont clearfix">
                <h3 class="dialog-title">恭喜您，获得<span>【<%=prizeName%>】</span></h3>
                <div class="gift_code-tip">（礼包兑换码有效截止<{$tplCfg.ymnr.exchangeDeadline}>，逾期作废）</div>
                <div class="item--award item--copy">
                    <label class="item-label">礼包激活码：</label>
                    <div class="item-oper">
                        <input class="copy-input" type="text" id="j-copy-code" readonly value="<%= code %>">
                        <a class="copy-btn" href="javascript:;" id="j-copy-btn" data-clipboard-target="#j-copy-code">复制</a>
                    </div>
                </div>
                <div class="dialog-opt">
                    <!--<a href="<{$__ztInfo._appUrl}>" target="_href" class="dialog-btn">立即兑换</a>-->
                    <a href="javascript:;" class="dialog-btn j-confirm">确定</a>
                </div>
                <a href="javascript:;" target="_blank" class="gift_code-link">礼包使用方法》》</a>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<!-- 我的奖品弹窗-->
<script type="text/tmpl" id="myawardTmpl">
<div class="dialog">
    <a class="dialog-close" href="javascript:;">×</a>
    <div class="dialog-hd"></div>
    <div class="dialog-body"><%:= body_tmpl %></div>
    <div class="dialog-fd"></div>
</div>
</script>
<!-- 加载中-->
<script type="text/tmpl" id="loadingTmpl">
<div class="dialog-cont">
    <div class="dialog-title">正在加载中</div>
    <p style="text-align:center;">（查询数据可能存在1~5秒延迟，如果长时间无反应请刷新后重新查询）</p>
</div>
</script>
<!-- 未获得任何奖品-->
<script type="text/tmpl" id="myawardNodataTmpl">
    <div class="dialog-cont">
        <div class="dialog-title">您还未获得任何奖品</div>
        <div class="dialog-txt">请留意下方夺宝规则，获得夺宝次数夺取大奖！</div>
        <div class="dialog-opt">
            <a href="javascript:;" class="dialog-btn j-confirm">确定</a>
        </div>
    </div>
</script>
<!-- 我的奖品-->
<script type="text/html" id="myawardDataTmpl">
    <div class="dialog-cont dialog--myaward">
        <h3 class="dialog-title">已获得奖品</h3>
        <ul class="myaward-list"></ul>
        <div class="dialog-pager pager"></div>
        <div class="dialog-opt">
            <a href="javascript:;" class="dialog-btn j-confirm">确 定</a>
        </div>
    </div>
</script>
<!-- 奖品 -->
<script type="text/html" id="myawardItemTmpl">
    <li class="item--award <% if((kind == AWARD.GIFT) && (typeof(code) !== 'undefined')){ %>item--copy<%}%>" data-id="<%= id %>">
        <div class="item-label"><%= prizeName %></div>
        <div class="item-oper">
            <% if((kind == AWARD.GIFT) && (typeof(code) !== 'undefined')){ %>
            <input class="copy-input" id="j-copy-code<%= id %>" type="text" value="<%= code %>" readonly="readonly">
            <a href="javascript:;" class="copy-btn" id="j-copy-btn<%= id %>" data-clipboard-target="#j-copy-code<%= id %>">复制</a>
            <% } else if(kind == AWARD.NEED_UINFO){%>
            <a href="javascript:;" class="j-myawardWatch">【查看/填写收货地址】</a>
            <% } else if(kind == AWARD.COLLECTIONS){%>
            <a href="javascript:;" class="j-myawardGame">【选择游戏】</a>
            <% } else{ %>
            <div class="item-text">(获得的积分可在页面底部进行礼包兑换)</div>
            <%}%>
        </div>
    </li>
</script>
<!-- 实物表单弹窗-->
<script type="text/html" id="formTmpl">
    <div class="dialog">
        <a class="dialog-close" href="javascript:;">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont dialog-form">
                <% if(typeof(fst) !== "undefined"){ %>
                <div class="dialog-title">恭喜您，获得了：<span><%= prizeName %></span></div>
                <% }else{ %>
                <div class="dialog-title">收件信息</div>
                <% } %>
                <div class="clearfix">
                    <form class="j-form">
                        <% if(!uinfo){ %>
                        <!--<input type="hidden" name="pid" value="<%= pid %>">-->
                        <input type="hidden" name="id" value="<%= id %>">
                        <% } %>

                        <div class="form-item form-item1">
                            <label for="" class="form-label">姓名：</label>
                            <input type="text" name="uname" class="form-input" <% if(uinfo){ %>value="<%= uinfo.uname %>" readonly<% } %>>
                        </div>

                        <div class="form-item form-item2">
                            <label for="" class="form-label">手机号码：</label>
                            <input type="text" name="uphone" class="form-input" <% if(uinfo){ %>value="<%= uinfo.uphone %>" readonly<% } %>>
                        </div>

                        <div class="form-item form-item3">
                            <label for="" class="form-label">详细的住址：</label>
                            <% if(uinfo){ %>
                            <textarea name="uaddress" class="form-textarea" id="" cols="30" rows="3" readonly><%= uinfo.uaddress %></textarea>
                            <% }else{ %>
                            <textarea name="uaddress" class="form-textarea" id="" cols="30" rows="3" placeholder="建议您如实填写详细收货地址。

列如：省、市、城、镇、区、街道（村）名称、门牌号码、楼层和房间
号等信息。"></textarea>
                            <% } %>
                        </div>
                    </form>
                </div>
                <div class="dialog-tips">（注：信息提交后无法修改，请谨慎填写确保送达）</div>
                <div class="dialog-opt">
                    <% if(uinfo){ %>
                    <a href="javascript:;" class="dialog-btn j-confirm">确定</a>
                    <%}else{%>
                    <input type="submit" class="dialog-btn j-submit" value="确定">
                    <%}%>
                </div>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<script type="text/template" id="awardListTmpl">
    <div class="dialog dialog--awardList">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont">
                <h3 class="dialog-title">奖品详情列表</h3>
                <ul class="awardList-list">
                    <%for(var i=0;i < list.length;i++){%>
                    <li><%=list[i]%></li>
                    <%}%>
                </ul>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<script type="text/template" id="probTmpl">
    <div class="dialog dialog--prob">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont">
                <h3 class="dialog-title">概率公示</h3>
                <ul class="prob-list">
                    <{foreach data=$rateInfo item=item}>
                    <li><{$item.tit}> <{$item.rate}></li>
                    <{/foreach}>
                </ul>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<script type="text/template" id="awardTmpl">
    <div class="dialog dialog--award">
        <a href="javascript:;" class="dialog-close">×</a>
        <div class="dialog-hd"></div>
        <div class="dialog-body">
            <div class="dialog-cont">
                <h3 class="dialog-title">奖品详情</h3>
                <ul class="award-list">
                    <{foreach data=$prizeList item=item}>
                    <{if $item.p_group==1}>
                    <li><{$item.p_name}></li>
                    <{/if}>
                    <{/foreach}>
                </ul>
            </div>
        </div>
        <div class="dialog-fd"></div>
    </div>
</script>
<script type="text/html" id="scheduleTmpl">
    <% for(var i=0,item;item = list[i],i < list.length;i++){ %>
    <li class="sclb-item">
        <p class="item-time"><%= item.p1 %></p>
        <p class="item-stage"><%= item.tit %></p>
        <% if(item.status == 1){ %>
        <p class="item-status item-status--live">正在直播</p>
        <% }else if(item.status == 2){ %>
        <p class="item-status item-status--ready">即将开始</p>
        <% }else if(item.status == 3){ %>
        <p class="item-status item-status--over">已结束</p>
        <% }else{ %>
        <p class="item-status item-status--ready">敬请期待</p>
        <%}%>
    </li>
    <%}%>
</script>
<script type="text/html" id="youpaiTmpl">
    <div class="sszb-youpai">
        <% if(yp == ""){ %>
        <img src="<%= cover %>" alt="">
        <% }else{ %>
        <video id="video" class="video-palyer" width="100%" height="100%" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' data-setup="{}" controls="controls" preload="none" style="background-image:url(<%= cover %>);" poster="<{file %cn%/4399cn/xxtjd/xszds3/release/images/video_poster.png}>">
            <source src="<%= yp %>" />
            <span>您的手机版本，网页版暂未能支持！</span>
        </video>
        <% } %>
    </div>
</script>
<script type="text/html" id="videoTmpl">
    <div class="sszb-video">
        <% if(spUrl == ""){ %>
        <img src="<%= spCover %>" alt="">
        <% }else{ %>
        <video id="video" class="video-palyer" width="100%" height="100%" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' data-setup="{}" controls="controls" preload="none" style="background-image:url(<%= spCover %>);" poster="<{file %cn%/4399cn/xxtjd/xszds3/release/images/video_poster.png}>">
            <source src="<%= spUrl %>" />
            <span>您的手机版本，网页版暂未能支持！</span>
        </video>
        <% } %>
    </div>
</script>
<script type="text/html" id="exchangeListTmpl">
    <% for(var i=0,item;item=list[i],i < list.length;i++){ %>
    <li class="lbdh-item">
        <a href="javascript:;" class="item-cover">
            <p class="item-int"><%= /\d{2}/.exec(item.p_name) %>积分</p>
            <img class="item-img" src="<%= item.img %>" alt="">
            <p class="item-more" data-detail="<%= item.detail %>">查看详情</p>
        </a>
        <a href="javascript:;" class="item-dh j-dh-get <% if(item.code){ %>geted<% } %>" <% if(item.code){ %> data-code="<%= item.code %>"<% } %> data-point="<%= /\d{2}/.exec(item.p_name) %>" data-pid="<%= item.pid %>" data-name="<%= item.p_name %>" ></a>
    </li>
    <%}%>
</script>




