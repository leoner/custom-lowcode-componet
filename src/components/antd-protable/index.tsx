import * as React from 'react';
import { createElement } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import './index.scss';

export interface AntdProTableProps {
  /**
   * 类型
   */
  type?: "primary" | "secondary" | "normal";
  title?: 'string';
}


const AntdProTable: React.FC<AntdProTableProps> = function AntdProTable(props) {
  const { type, title } = props;


const columns = [
  {
    title: '应用名称',
    width: 80,
    dataIndex: 'title',
  },
  {
    title: '应用状态',
    width: 80,
    dataIndex: 'status',
  },
];

  const actionRef = React.useRef<ActionType>();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        return {
          data: [{title, type, status: 2}]
        }
      }}
      rowKey="title"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle={title}
      toolBarRender={false}
    />
  );
};

AntdProTable.displayName = 'AntdProTable';
export default AntdProTable;


