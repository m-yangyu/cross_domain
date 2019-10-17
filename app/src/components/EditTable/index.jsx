import React from 'react';
import Styles from './index.scss';
import {Icon} from 'antd';

let columnsMap = [], changeValueFunc = {};
class EditTable extends React.Component{

    constructor(props){
        super(props);
    }

    headerRender = () => {

        const {columns} = this.props;
        columnsMap = [];
        return columns.map(item=>{
            
            columnsMap.push(item.dataIndex);
            return <div key={item.key}>{item.title}</div>

        })

    }

    contentRender = () => {

        const {dataSource , columns} = this.props;
        return dataSource.map(
            ( item , index ) => <div 
                        key={item.key}
                        className={Styles.contentTr}
                    >
                        {
                            columnsMap.map(citem=><div 
                                    key={citem} 
                                    className={Styles.contentTd} 
                                    onClick={(e)=>{citem === 'operation' ? '' :this.cellClick(index , citem , e)}}
                                    style={ item[citem] === '' ? {color: '#e1e1e1'} : {} }
                                    title={item[citem]}
                                >
                                    {
                                        citem === 'operation' ? 
                                        <Icon type="delete" onClick={(e)=>{this.props.deleteCell(index,e)}}/>:
                                        item[citem] === '' ? item.placeholder : item[citem]
                                    }
                                </div>)
                        }
                    </div>)
    }

    cellClick = ( trDataIndex , cellIndex , e ) => {

        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        // 如果存在就先删除原先的input框
        if( document.getElementById('changeValue') ){
            const tempInput = document.getElementById('changeValue');
            tempInput.parentNode.removeChild(tempInput);
        }

        // 生成input输入框，并聚焦
        const input = document.createElement('input');
        input.setAttribute('id','changeValue');
        input.value = this.props.dataSource[trDataIndex][cellIndex];
        e.target.append(input);
        input.focus();

        // input change事件
        input.addEventListener('change',(event)=>{
            this.props.tableCellChange(trDataIndex , cellIndex , event.target.value);
        })

        // 框外点击事件，关闭input输入框
        changeValueFunc = (event) => {

            document.removeEventListener('click',changeValueFunc);
            const changeInput = document.getElementById('changeValue');
            if( changeInput ){
                changeInput.parentNode.removeChild(changeInput);
            }
        }

        document.addEventListener('click',changeValueFunc);

    }

    render(){

        return (
            
            <div>
                <div className={Styles.tableHeader}>
                    { this.headerRender() }
                </div>
                <div className={Styles.tableContent}>
                    {this.contentRender()}
                </div>
            </div>

        )       
    }

}

export default EditTable;