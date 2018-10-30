import React from 'react';

var MyAwardPop = React.createClass({


    getInitialState : function(){
        return {
            list : null,
            page : 1,
            pagerCount : null
        }
    },
    
    componentDidMount : function(){
        this.setState({
            loading : false,
            list : response.data.prizeList,
            page : 1,
            pagerCount : Math.ceil(response.data.prizeList.length / response.data.perPage)
        })
    },

    render : function(){
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">奖品详情列表</h3>
                
                <ul className="awardList-list">
                {
                    data.list.map(item => <li>{item}</li>)
                }
                </ul>
            </div>
        )
    }
})

module.exports =  MyAward;