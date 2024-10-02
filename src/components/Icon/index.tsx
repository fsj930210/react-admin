import { Icon } from '@iconify/react';

import type { IconProps } from '@iconify/react';

const RaIcon = ({
  wrapClassName,
  ...rest
}: IconProps & { wrapClassName?: string }) => {
  return (
    <span className={`text-[0px] ${wrapClassName ? wrapClassName : ''}`}>
      <Icon inline fontSize={16} {...rest} />
    </span>
  );
};

export default RaIcon;
