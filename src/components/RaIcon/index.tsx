import { Icon } from '@iconify/react';

import type { IconProps } from '@iconify/react';

const RaIcon = ({
  wrapClassName,
  inline = true,
  ...rest
}: IconProps & { wrapClassName?: string }) => {
  return (
    <span
      className={`text-[0px] leading-none anticon !align-top  ${wrapClassName ? wrapClassName : ''}`}
    >
      <Icon inline={inline} fontSize={14} {...rest} />
    </span>
  );
};

export default RaIcon;
