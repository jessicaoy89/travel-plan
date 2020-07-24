import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        className: 'drag-visible',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [
    {
        name: 'place1',
        address: 'New York No. 1 Lake Park',
        index: 0,
    },
    {
        name: 'place2',
        address: 'London No. 1 Lake Park',
        index: 1,
    },
    {
        name: 'place3',
        address: 'Sidney No. 1 Lake Park',
        index: 2,
    },
];

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const DragableBodyRow = ({ index, className, style, ...restProps }) => (
    <SortableItem index={restProps['data-row-key']} {...restProps} />
);

export default class SortableTable extends React.Component {
    state = {
        dataSource: data,
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            this.setState({ dataSource: newData });
        }
    };

    render() {
        const { dataSource } = this.state;
        const DraggableContainer = props => (
            <SortableContainer
                useDragHandle
                helperClass="row-dragging"
                onSortEnd={this.onSortEnd}
                {...props}
            />
        );
        return (
            <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                rowKey="index"
                components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DragableBodyRow,
                    },
                }}
            />
        );
    }
}