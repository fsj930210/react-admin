import { useRef } from 'react';

function useFixAntdStyle() {
  const domStylesRef = useRef<Map<Element, string | null>>(new Map());
  function fixAntdStyle() {
    function fixStyle(className: string) {
      const doms = document.querySelectorAll(className);
      doms.forEach((dom) => {
        if (dom) {
          const originalStyle = dom.getAttribute('style');
          const existed = domStylesRef.current.has(dom);
          if (!existed) {
            domStylesRef.current.set(dom, originalStyle);
          }
          dom.setAttribute('style', 'opacity: 0');
        }
      });
    }

    // 现象： 当 Suspense 和 ant design 的Select Datepicker DropDown Popover Tooltip 组件一起使用时，
    // 打开这些组件一次后 切换路由在切换回来时会闪烁，顾此用这个方法修复，后续有更好的方案再修改
    fixStyle('.ant-select-dropdown');
    fixStyle('.ant-picker-dropdown');
    fixStyle('.ant-popover');
    fixStyle('.ant-tooltip');
    fixStyle('.ant-dropdown');
    fixStyle('.ant-drawer');
    fixStyle('.ant-modal-root');
    fixStyle('.ant-color-picker');
  }

  function revertAntdStyle() {
    function revertStyle(className: string) {
      const doms = document.querySelectorAll(className);
      doms.forEach((dom) => {
        const existedStyle = domStylesRef.current.get(dom);
        dom.setAttribute('style', existedStyle || '');
      });
    }
    setTimeout(() => {
      revertStyle('.ant-select-dropdown');
      revertStyle('.ant-picker-dropdown');
      revertStyle('.ant-popover');
      revertStyle('.ant-tooltip');
      revertStyle('.ant-dropdown');
      revertStyle('.ant-drawer');
      revertStyle('.ant-modal-root');
      revertStyle('.ant-color-picker');
    }, 320);
  }
  return {
    fixAntdStyle,
    revertAntdStyle,
  };
}

export default useFixAntdStyle;
