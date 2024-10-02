import { useFullscreen } from 'ahooks';

import Icon from '@/components/Icon';
const FullScreen = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  return (
    <span
      onClick={toggleFullscreen}
      className="cursor-pointer leading-none p-[4] rounded-full bg-transparent hover:bg-[var(--ant-color-bg-layout)] transition-all"
    >
      {isFullscreen ? (
        <Icon icon="ant-design:fullscreen-outlined" fontSize={20} />
      ) : (
        <Icon icon="ant-design:fullscreen-exit-outlined" fontSize={20} />
      )}
    </span>
  );
};

export default FullScreen;
