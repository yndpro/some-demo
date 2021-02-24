const proxy = {
    'GET /api/todo': {
        data: [
            {
                id: '111',
                text: '曼彻斯特联',
                complete: false
            },
            {
                id: '222',
                text: '皇家马德里',
                complete: false
            },
            {
                id: '333',
                text: '拜仁慕尼黑',
                complete: false
            }
        ]
    }
};

module.exports = proxy;
