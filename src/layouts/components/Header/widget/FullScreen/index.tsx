import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
const FullScreen = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  return (
    <span onClick={toggleFullscreen} className="cursor-pointer">
      {isFullscreen ? (
        <FullscreenExitOutlined title="退出全屏" />
      ) : (
        <FullscreenOutlined title="全屏" />
      )}
    </span>
  );
};

export default FullScreen;
