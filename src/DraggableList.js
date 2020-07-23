import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import Data from './Data'



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
];

const place1 = new Data('1');
const data = [
    {
        name: place1.name,
        // address: 'New York No. 1 Lake Park',
        index: 0,
    },
    {
        name: 'place2',
        // address: 'London No. 1 Lake Park',
        index: 1,
    },
    {
        name: 'place3',
        // address: 'Sidney No. 1 Lake Park',
        index: 2,
    },
];

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const DragableBodyRow = ({ index, className, style, ...restProps }) => (
    <SortableItem index={restProps['data-row-key']} {...restProps} />
);
let isFirstTime = true;
export default class SortableTable extends React.Component {
    state = {
        dataSource: this.generatePlace(),
    };

    generatePlace() {
        const places = this.props.place;
        const newData = []
        for (let i = 0; i < places.length; i++){
            newData.push({
                name: places[i],
                index: i,
            })
        }
        return newData;
    }
    
    
    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            this.setState({ dataSource: newData });
        }
    };

    handleUpdateList = () => {
        let buffer = this.state.dataSource;
        console.log(buffer);
        let arr = [];
        for (let i = 0; i < buffer.length; i++){
            arr.push(buffer[i].name);
        }
        this.props.update(arr);
    }

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
            <div>
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

                <Button type="primary" shape="round"  size="middle" onClick = {() => this.handleUpdateList()}>
                    Update List
                </Button>
            </div>
            
            
        );
    }
}