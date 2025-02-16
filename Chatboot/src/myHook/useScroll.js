import React, { useState, useEffect } from 'react';

const useScroll = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        setScrollTop(scrollTop);
        setClientHeight(clientHeight);
        setScrollHeight(scrollHeight);

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            console.log('已滚动到底部');
            element.scrollTop = element.scrollHeight;
            // 在这里触发加载更多数据的逻辑
        }
    }
};