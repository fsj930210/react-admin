import { Icon } from '@iconify/react';
import { useFullscreen } from 'ahooks';
const FullScreen = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  return (
    <span
      onClick={toggleFullscreen}
      className="text-[20px] cursor-pointer flex-center p-[4] rounded-[100%] bg-tansparent hover:bg-[var(--ant-color-bg-layout)] transition-all"
    >
      {isFullscreen ? (
        <Icon inline icon="ant-design:fullscreen-outlined" />
      ) : (
        <Icon inline icon="ant-design:fullscreen-exit-outlined" />
      )}
    </span>
  );
};

export default FullScreen;
