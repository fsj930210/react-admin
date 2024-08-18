import { Icon } from '@iconify/react';
import { useFullscreen } from 'ahooks';
const FullScreen = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  return (
    <span onClick={toggleFullscreen} className="cursor-pointer">
      {isFullscreen ? (
        <Icon icon="ant-design:fullscreen-outlined" />
      ) : (
        <Icon icon="ant-design:fullscreen-exit-outlined" />
      )}
    </span>
  );
};

export default FullScreen;
