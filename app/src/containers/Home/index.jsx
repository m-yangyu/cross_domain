import React , { Component } from 'react';
import Styles from './sass/index.scss';
import Action from 'REDUX/module/actions';
import { connect } from 'react-redux';
import MiddleWare from 'REDUX/module/middleWare';
import { Input , Button , message } from 'antd';
import EditTable from 'CMP/EditTable';
import { setConfig } from 'UTILS/server';
const mapStateToProps = ( root ) => ({
    user: root.root.user,
    name: root.root.name,
})

const mapDispthToProps = ( dispatch )=>({

    setUser: () => {
        dispatch( Action.setUser() )
    },
    setName: () => {
        dispatch( MiddleWare.testMiddleWare() );
    }

})

class Home extends Component{

    constructor( props ){

        super( props );
        this.state = {
            dataSource:[],
            columns:[
                {
                  title: '请求头',
                  dataIndex: 'cookieName',
                  key: 'cookieName',
                },
                {
                  title: '请求头内容',
                  dataIndex: 'cookieContent',
                  key: 'cookieContent',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                }
            ],
            hostname: '',
            port: '',
        
        };
    }

    componentDidMount(){

        

    }

    tableCellChange = ( dataSourceIndex , name , value ) => {

        const { dataSource } = this.state;

        dataSource[dataSourceIndex][name] = value;

        this.setState({
            dataSource,
        })

    }

    addDataSource = () => {

        const { dataSource } = this.state;

        const newData = {
            key: dataSource.length,
            cookieName: '',
            cookieContent: '',
            placeholder: '请输入内容',
        }
        dataSource.push(newData);
        this.setState({dataSource});
    }

    deleteCell = (index , e) => {

        e.stopPropagation();
        const {dataSource} = this.state;
        dataSource.splice(index , 1);
        this.setState({dataSource});
    }

    setConfigFunc = () => {

        const { dataSource } = this.state;
        const cookieArr = [];
        const hostNameMatch = this.state.hostname.match(/\./g);
        console.log( hostNameMatch );

        if( !hostNameMatch || hostNameMatch.length !== 3 ){
            message.error('hostname 参数不正确');
            return ;
        }

        dataSource.map( item => {

            cookieArr.push(`${item.cookieName}=${item.cookieContent}`);

        })

        setConfig({
            hostname: this.state.hostname,
            port: this.state.port,
            cookie: cookieArr.join(';')
        }).then( res => {
            const data = res.data;
            if( data.success ){
                message.success(data.msg);
            }
        })

    }

    bandingValue = (name,e) => {
        const state = this.state;
        state[name] = e.target.value;
        this.setState({...state});
    }

    render(){

        const {dataSource , columns} = this.state;

        return (

            <main className={Styles.main}>
                <h2>node配置项内容</h2>
                <div className={Styles.sethost}>
                    <Input placeholder="hostname" onChange={(e)=>{this.bandingValue('hostname',e)}} />
                    <Input placeholder="port" onChange={(e)=>{this.bandingValue('port',e)}}/>
                </div>
                {/* <Input placeholder="cookie" /> */}
                <EditTable 
                    dataSource={dataSource} 
                    columns={columns} 
                    tableCellChange={this.tableCellChange}
                    deleteCell={this.deleteCell}
                />
                <div className={Styles.btnview}>
                    <Button 
                        type="primary"
                        onClick={this.addDataSource}
                    >
                        增加
                    </Button>
                    <Button onClick={()=>{this.setConfigFunc()}}>确定</Button>
                </div>
                
            </main>

        )

    }

}

export default connect(
    mapStateToProps,
    mapDispthToProps
)(Home);