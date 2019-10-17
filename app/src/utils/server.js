import Server from './api';

export const setConfig = (params) => {

    return Server.post('http://localhost:8000/set_config', {...params});

}