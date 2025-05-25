import type { ReactNode } from "react";

import { Splitter } from 'antd';

import type { SplitterProps } from "antd/lib";
import type { PanelProps } from "antd/lib/splitter/interface";

const { Panel } = Splitter;
type TableListContainerProps = {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  resizable?: boolean | {
    left?: boolean;
    main?: boolean;
    right?: boolean
  };
  splitterProps?: SplitterProps;
  panelProps?: {
    left?: PanelProps;
    main?: PanelProps;
    right?: PanelProps;
  };
}
const TableListContainer = ({
  left,
  children,
  right,
  resizable,
  splitterProps,
  panelProps,
}: TableListContainerProps) => {
  const leftResizable = typeof resizable === 'boolean' ? resizable : resizable?.left || false;
  const rightResizable = typeof resizable === 'boolean' ? resizable : resizable?.right || false;
  const mainResizable = typeof resizable === 'boolean' ? resizable : resizable?.main || false;
  return (
    <div className="ra-page-container">
      <Splitter
        {...splitterProps}
        className="flex"
      >
        {
          left ? (
            <Panel
              {...panelProps?.left}
              resizable={leftResizable}
              defaultSize={256}
            >
              {left}
            </Panel>
          ) : null
        }
        <Panel
          {...panelProps?.main}
          resizable={mainResizable}
          className="flex-1"
        >
          {children}
        </Panel>
        {
          right ? (
            <Panel
              {...panelProps?.right}
              resizable={rightResizable}
            >
              {right}
            </Panel>
          ) : null
        }
      </Splitter>
    </div>
  )
}

export default TableListContainer;