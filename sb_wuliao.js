/*  sb_wuliao.js   *
*     25/12/07     *
*     V1.0.0.0     *
* Fuck WuLiaoDog!! */

(function() {
    // 控制台检测核
    function initConsoleDetection() {
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;
        let consoleOpened = false;

        // 监听窗口尺寸变化（检测控制台打开）
        window.addEventListener('resize', () => {
            const widthDiff = Math.abs(window.innerWidth - lastWidth);
            const heightDiff = Math.abs(window.innerHeight - lastHeight);
            
            // 当窗口尺寸变化超过100px时，判定为控制台打开
            if ((widthDiff > 100 || heightDiff > 100) && !consoleOpened) {
                consoleOpened = true;
                outputConsoleText();
            } else if (widthDiff < 50 && heightDiff < 50 && consoleOpened) {
                consoleOpened = false; // 控制台关闭时重置状态
            }
            
            lastWidth = window.innerWidth;
            lastHeight = window.innerHeight;
        });

        // 检测console.log调用（主动打印时触发）
        const originalLog = console.log;
        console.log = function(...args) {
            if (!consoleOpened) {
                consoleOpened = true;
                outputConsoleText();
            }
            originalLog.apply(console, args); // 保留原生console.log功能
        };

        // 控制台输出自定义样式文本
        function outputConsoleText() {
            console.log('%c🎉 欢迎！', 'color: #4CAF50; font-size: 18px; font-weight: bold;');
            console.log('%c⚠️  注意：请勿在此控制台执行未知代码，谨防安全风险', 'color: #ff6b6b; font-size: 14px;');
            console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
            console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
			console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
		}
    }

    // 初始化程序
    function init() {
        initConsoleDetection(); // 启动控制台检测
		console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
		console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
		console.log('%cFuck WuLiaoge！！！', 'font-size: 25px; background: linear-gradient(to right, red, yellow); color: #000; font-weight: bold; padding: 2px 8px; border-radius: 3px;');
	}

    // 页面加载完成后初始化（兼容动态加载场景）
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();