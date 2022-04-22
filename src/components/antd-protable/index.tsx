import * as React from 'react';
import { createElement } from 'react';
import {
  Button,
  Tooltip,
  Dropdown,
  Popconfirm,
  notification,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import type { ActionType } from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

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

  const actionRef = React.useRef<ActionType>();
  const tableFormRef = React.useRef<ProFormInstance>();
  const addFormRef = React.useRef<FormInstance>();

  const [addModalVisible, setAddModalVisible] = React.useState<boolean>(false);
  const modifyFormRef = React.useRef<FormInstance>();
  const [modifyModalVisible, setModifyModalVisible] = React.useState<boolean>(false);
  const [selectedRecords, setSelectedRecords] = React.useState<any[]>([]);


  const columns: any[] = [
    {
      title: '支付渠道代码', // title
      dataIndex: 'paycenterId', // name
      disabled: false, // true: 表示不可编辑，false表示可编辑
      required: false, // true 表示必填，false表示非必填
    },
    {
      title: '支付渠道名称',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      valueType: 'select',
    },
    {
      title: 'TA代码',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
    },
    {
      title: 'TA名称',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      valueType: 'select',
    },
    {
      title: '基金代码',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
    },
    {
      title: '基金名称',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      valueType: 'select',
    },
    {
      title: '生效日期',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      fieldProps: {
        format: 'yyyy-MM-dd',
      },
    },
    {
      title: '服务费用',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      fieldProps: {
        format: (val) => `${val}%`,
      },
    },
    {
      title: '销售服务费比例分成',
      dataIndex: 'paycenterId',
      disabled: false,
      required: false,
      fieldProps: {
        format: (val) => `${val}%`,
      },
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        size="small"
        rowKey="appId"
        columnEmptyText={'-'}
        actionRef={actionRef}
        formRef={tableFormRef}
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
        search={{
          defaultCollapsed: true,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button
              {...dom[0]?.props}
              onClick={() => {
                // 手动重置
                if (tableFormRef.current) {
                  tableFormRef.current.resetFields();
                }
              }}
            >
              重置
            </Button>,
            <Button
              type="primary"
              key="submit"
              {...dom[1]?.props}
              // 手动处理查询请求
              onClick={() => () => {}}
            >
              查询
            </Button>,
          ],
        }}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            icon={<PlusOutlined />}
            onClick={() => {
              setAddModalVisible(true);
              addFormRef.current?.resetFields();
            }}
          >
            新建
          </Button>,
          <Popconfirm
            key="batchDelete"
            title="确认要删除这个设置吗？"
            okText="确认"
            cancelText="暂不"
            onConfirm={() => {
              console.info('---batchDelete----', selectedRecords)
              // batchDelete(selectedRecords);
            }}
          >
            <Button type="primary" key="delete" icon={<PlusOutlined />}>
              删除
            </Button>
          </Popconfirm>,
          <Tooltip title="点击「修改」按钮前请先选中页面一条记录">
            <Button
              type="primary"
              key="modify"
              icon={<PlusOutlined />}
              disabled={selectedRecords.length != 1}
              onClick={() => {
                setModifyModalVisible(true);
              }}
            >
              修改
            </Button>
          </Tooltip>,
          <Button type="primary" key="export" icon={<PlusOutlined />} onClick={() => {
            setModifyModalVisible(true);
          }}>
            导出
          </Button>,
        ]}
      />
      <ModalForm
        title="新建表单"
        autoFocusFirstInput
        visible={addModalVisible}
        modalProps={{
          onCancel: () => {
            console.log('run')
            setAddModalVisible(false);
          }
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />

          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            request={async () => [
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
      </ModalForm>
      <DrawerForm
        title="修改表单"
        onVisibleChange={setModifyModalVisible}
        visible={modifyModalVisible}
        formRef={modifyFormRef}
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          // 不返回不会关闭弹框
          return true;
        }}
      >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="md"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
            },
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </DrawerForm>
    </>
  );
};

AntdProTable.displayName = 'AntdProTable';
export default AntdProTable;


