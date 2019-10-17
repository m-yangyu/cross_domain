class menuContext{

    constructor(){

        this.menu = this.createMenu();

    }

    createMenu = () => {
        return [
            {
                label: '文件',
                type: 'submenu',
                submenu: [
                    {
                        label: '保存配置',
                        type: 'normal',
                        click( menuItem , browserWindow , event ){
                            console.log(browserWindow.webContents);
                        }
                    },
                    {
                        label: '打开',
                        type: 'normal',
                        click(){
                            console.log(1111);
                        }
                    },
                    {
                        label: '历史记录',
                        type: 'submenu',
                        submenu:[
                            {
                                label: '123',
                            },
                            {
                                label: '123',
                            },
                            {
                                label: '123',
                            },
                            {
                                label: '123',
                            },
                        ]
                    }
                ]
            },
            {
                label: '页面调试',
                type: 'submenu',
                submenu:[
                    {
                        role: 'toggledevtools'
                    }
                ]
            }
        ];
    }

}

module.exports = {
    menuContext: new menuContext(),
}