/*  fuck_wldog.js  *
*     25/12/07     *
*     V1.0.0.0     *
* Fuck WuLiaoDog!! */

(function() {
    // 配置参数
    const CLICK_THRESHOLD = 5;    // 触发条件：5次点击
    const TIME_WINDOW = 1500;     // 时间窗口：1.5秒内
    const SEARCH_DURATION = 20000; // 查找时长：20秒
    const SEARCH_INTERVAL = 500;  // 查找间隔：500毫秒一次

    // 存储已绑定的元素，避免重复绑定
    const boundElements = new Set();
    let searchTimer = null;

    // 快速点击检测核心逻辑
    function bindFastClick(element) {
        if (boundElements.has(element)) return;
        boundElements.add(element);

        let clickTimes = [];

        // 设置元素可点击样式
        element.style.userSelect = 'none';
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';

        // 绑定点击事件
        element.addEventListener('click', () => {
            const now = Date.now();
            clickTimes.push(now);
            // 过滤超出时间窗口的点击记录
            clickTimes = clickTimes.filter(time => now - time <= TIME_WINDOW);

            // 达到点击次数触发特效
            if (clickTimes.length >= CLICK_THRESHOLD) {
                triggerEasterEgg(element);
                clickTimes = []; // 重置队列，可重复触发
            }
        });

        console.log('[无聊哥检测] 已为元素绑定快速点击功能:', element);
    }

    // 触发彩蛋特效
    function triggerEasterEgg(element) {
        // 临时修改元素文本
        const originalText = element.textContent;
        element.textContent = '🎉 你触发了隐藏彩蛋！';
        element.style.color = '#e53e3e';
        element.style.fontWeight = 'bold';

        // 1秒后恢复原样
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
            element.style.fontWeight = '';
        }, 1000);

        // 控制台输出对某人的“赞美”
        console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');

        // 弹窗提示
        alert('您目前点击的是 犬中之der 变异驴 Boring Dog.');
    }

    // 查找页面中包含"无聊哥"字样的元素
    function searchForTargetElements() {
        // 递归查找所有文本节点包含"无聊哥"的元素
        function findElementsWithText(node) {
            const result = [];
            if (!node || node.nodeType === 3) { // 文本节点
                if (node && node.textContent.includes('无聊哥')) {
                    const parent = node.parentElement;
                    if (parent && !boundElements.has(parent)) {
                        result.push(parent);
                    }
                }
                return result;
            }

            // 遍历子节点
            node.childNodes.forEach(child => {
                result.push(...findElementsWithText(child));
            });
            return result;
        }

        // 执行查找
        const targetElements = findElementsWithText(document.body);
        targetElements.forEach(element => {
            bindFastClick(element);
        });

        return targetElements.length > 0;
    }

    // 控制台检测功能
    function initConsoleDetection() {
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;
        let consoleOpened = false;

        // 监听窗口尺寸变化
        window.addEventListener('resize', () => {
            const widthDiff = Math.abs(window.innerWidth - lastWidth);
            const heightDiff = Math.abs(window.innerHeight - lastHeight);
            
            if ((widthDiff > 100 || heightDiff > 100) && !consoleOpened) {
                consoleOpened = true;
                outputConsoleText();
            } else if (widthDiff < 50 && heightDiff < 50 && consoleOpened) {
                consoleOpened = false;
            }
            
            lastWidth = window.innerWidth;
            lastHeight = window.innerHeight;
        });

        // 检测console.log调用
        const originalLog = console.log;
        console.log = function(...args) {
            if (!consoleOpened) {
                consoleOpened = true;
                outputConsoleText();
            }
            originalLog.apply(console, args);
        };

        // 控制台输出文本
        function outputConsoleText() {
            console.log('%c🎉 欢迎！', 'color: #4CAF50; font-size: 18px; font-weight: bold;');
            console.log('%c⚠️  注意：请勿在此控制台执行未知代码，谨防安全风险', 'color: #ff6b6b; font-size: 14px;');
            console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
        }
    }

    // 初始化程序
    function init() {
        console.log('[无聊哥检测] 程序启动，开始查找目标元素...');
        
        // 立即执行一次查找
        searchForTargetElements();

        // 定时重复查找，持续20秒
        let elapsedTime = 0;
        searchTimer = setInterval(() => {
            elapsedTime += SEARCH_INTERVAL;
            
            // 查找目标元素
            const found = searchForTargetElements();

            // 超时停止查找
            if (elapsedTime >= SEARCH_DURATION) {
                clearInterval(searchTimer);
                console.log(`[无聊哥检测] 查找结束，共绑定 ${boundElements.size} 个元素`);
            } else if (found) {
                console.log(`[无聊哥检测] 持续查找中（已查找 ${elapsedTime/1000} 秒）...`);
            }
        }, SEARCH_INTERVAL);

        // 初始化控制台检测
        initConsoleDetection();
    }

    // 页面加载完成后启动（兼容动态加载的页面）
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
		console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();