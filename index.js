const Cast = require('../../util/cast');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
// var dgram = require("dgram");
//感谢Arkos开源的扩展代码，作为参照编写框架
//欸，别把作者忘了。Danny欸
class AuEx_communication {
    constructor(runtime) {
        this.runtime = runtime
        this._formatMessage = runtime.getFormatMessage({
            'zh-cn': {
                'AusCOM.extensionName': 'AUSの通讯模块',
                'AusCOM.tit1': 'sock通讯',
                'AusCOM.tit2': '数据处理',
                'AusCOM.tit3': 'JSON',
                'AusCOM.http': 'HTTP以[g_way]方式访问[site]发送[body]',
                'AusCOM.wsocket_create': 'ws.创建websocket,协议[yi],并返回ccid',
                'AusCOM.wsocket_connect': 'ws.id[id]socket连接[host]',
                'AusCOM.wsocket_send': 'ws.发送id[id]数据[text]',
                'AusCOM.wsocket_recv': 'ws.接收数据id[id]',
                'AusCOM.wsocket_conclose': 'ws.连接关闭id[id]',
                'AusCOM.wsocket_close': 'ws.销毁websocket id[id]',
                'AusCOM.socket_create': 'sock.创建[yi]方式[method]并返回ccid',
                'AusCOM.socket_create_chk': 'sock.创建是否成功[ccid]并返回id',
                'AusCOM.socket_recv': 'sock.收到数据id [id]',
                'AusCOM.socket_send': 'sock.发送数据id [id] ip[ip]数据[TEXT]',
                'AusCOM.socket_conclose': 'sock.断开连接id[id]',
                'AusCOM.socket_connect': 'sock.连接/启动服务 id[id] ip [ip] 接收长度[buff]',
                'AusCOM.socket_breakev': 'sock.断开连接id[id]ip[ip]',
                'AusCOM.socket_close': 'sock.销毁socket对象 id[id]',
                'AusCOM.socket_parse': 'sock.解析返回的数据data[data]属性[type]',
                'AusCOM.socket_opchk': 'sock.操作是否成功[cid]',
                'AusCOM.code_RC4': 'RC4加解密 密钥[KEY] 文本[TEXT]',
                'AusCOM.code_base64_en': 'base64编码文本[TEXT]',
                'AusCOM.code_base64_de': 'base64解码文本[TEXT]',
                'AusCOM.code_base58_en': 'base58编码文本[TEXT]',
                'AusCOM.code_base58_de': 'base58解码码文本[TEXT]',
                'AusCOM.code_base_custom_en': '自定义base加密 字符集[ALPHABET] 文本[TEXT]',
                'AusCOM.code_base_custom_de': '自定义base解密 字符集[ALPHABET] 文本[TEXT]',
                'AusCOM.str': '字符串',
                'AusCOM.int': '整数',
                'AusCOM.float': '浮点数',
                'AusCOM.list': '列表',
                'AusCOM.logic': '逻辑',
                'AusCOM.json_create': '创建json 载入[json_] 并返回id',
                'AusCOM.json_load': '载入json id[id]json[json_]',
                'AusCOM.json_get_all_item': '获取json id[id]中所有属性名',
                'AusCOM.json_add_from_id': '将id[_id]对应的json加入json/改变值 id[id] 属性名[name]',
                'AusCOM.json_add': '加入/改变对象到json id[id]类型[type]属性名[name]内容[TEXT]',
                'AusCOM.json_get_item': '获取json id [id]中某属性名为[name]项的值',
                'AusCOM.json_del_item': '删除json id [id]中某属性名为[name]项的值',
                'AusCOM.json_get': '获取json id[id]',
                'AusCOM.json_destroy': '销毁json id[id]',
                'AusCOM.help': '使用帮助',
            },
            en: {
                'AusCOM.extensionName': 'AUSのcommunication',
                'AusCOM.tit1': 'sock communication',
                'AusCOM.tit2': 'solve data',
                'AusCOM.tit3': 'JSON',
                'AusCOM.http': 'http access[g_way]to[site]send[body]',
                'AusCOM.wsocket_create': 'ws.create websocket,protocol', 'AusCOM.wsocket_connect': 'id[id]websocket connect[host]',
                'AusCOM.wsocket_send': 'ws.send id[id] data[text]',
                'AusCOM.wsocket_recv': 'ws.recv id [id]',
                'AusCOM.wsocket_conclose': 'ws.When connection closed id[id]',
                'AusCOM.wsocket_close': 'ws.destroy socket id[id]',
                'AusCOM.socket_ sreate ': 'sock. Create [yi] method [method] and return ID',
                'AusCOM.socket_create_chk': 'sock.create successfully[ccid]？',
                'AusCOM.socket_ recv': 'sock. Received data ID [id] ',
                'AusCOM.socket_ send': 'sock. Send data ID [id] data [text] ',
                'AusCOM.socket_ close ': 'sock. Connection closing ID [id]',
                'AusCOM.socket_ connect': 'sock. Connect to/start server ID [id] IP [ip] ,buff[buff]',
                'AusCOM.socket_breakev': 'sock.break connection off id[id]ip[ip]',
                'AusCOM.socket_ close': 'sock. Destroy the socket object ID [id] ',
                'AusCOM.socket_ parse ': 'sock. Parse the returned data [data] attribute [type]',
                'AusCOM.socket_opchk': 'sock.run operation successfully[cid]？',
                'AusCOM.code_RC4': 'RC4 KEY[KEY] TEXT[TEXT]',
                'AusCOM.code_base64_en': 'base64 encoding[TEXT]',
                'AusCOM.code_base64_de': 'base64 decoding[TEXT]',
                'AusCOM.code_base58_en': 'base58 encoding[TEXT]',
                'AusCOM.code_base58_de': 'base58 decoding[TEXT]',
                'AusCOM.code_base_custom_en': 'Custom base encryption,ALPHABET[ALPHABET] TEXT[TEXT]',
                'AusCOM.code_base_custom_de': 'Custom base decryption,ALPHABET[ALPHABET] TEXT[TEXT]',
                'AusCOM.str': 'string',
                'AusCOM.int': 'int',
                'AusCOM.float': 'float',
                'AusCOM.list': 'list',
                'AusCOM.logic': 'logic',
                'AusCOM.json_create': 'create json,load[json_] and return id',
                'AusCOM.json_load': ' load json id[id]json[json_]',
                'AusCOM.json_get_all_item': 'get all attribute name of json id[id]',
                'AusCOM.json_add_from_id': 'Add the JSON corresponding to ID [_id] to JSON/change a value ID [id] attribute name [name]',
                'AusCOM.json_add': 'Add object/change a value to JSON ID [id], type [type], attribute name [name], content [TEXT]',
                'AusCOM.json_get_item': 'Get the value of an attribute named [name] in JSON ID [id]',
                'AusCOM.json_del_item': 'Delete the value of an attribute named [name] in JSON ID [ID]',
                'AusCOM.json_get': 'get json id[id]',
                'AusCOM.json_destroy': 'destroy json id[id]',
                'AusCOM.help': 'help',
            },
        })
        this.aulink= new Worker('./aurora_link.js')
        window.AusCOM = { 'wsrecv_': [], 'wsnotalive_': [], 'json_list': [], 'wsock': [] }

    }
    formatMessage(id) {
        return this._formatMessage({
            id,
            default: id,
            description: id,
        })
    }
    getInfo() {
        return {
            id: 'DAdevNet', // 拓展id
            name: this.formatMessage('AusCOM.extensionName'), // 拓展名
            color1: '#FF8383',
            // menuIconURI: icon,
            // blockIconURI: icon,
            blocks: [
                "---" + this.formatMessage("AusCOM.tit1"),
                {
                    opcode: 'http',
                    blockType: 'reporter',
                    text: this.formatMessage('AusCOM.http'),
                    arguments: {
                        g_way: {
                            type: 'string',
                            menu: 'HTTP_method'
                        },
                        site: {
                            type: 'string',
                            defaultValue: '/'
                        },
                        body: {
                            type: 'string',
                            defaultValue: ' '
                        },
                    }
                },

                {
                    opcode: 'ws_cre_sock',
                    blockType: 'reporter',
                    text: this.formatMessage('AusCOM.wsocket_create'),
                    arguments: {
                        yi: {
                            type: 'string',
                            menu: 'ws_method'
                        },
                    }
                },
                {
                    opcode: 'ws_conn_sock',
                    blockType: 'Boolean',
                    text: this.formatMessage('AusCOM.wsocket_connect'),
                    arguments: {
                        id: {
                            type: 'string',
                            defaultValue: '0'
                        },
                        host: {
                            type: 'string',
                            defaultValue: '0.0.0.0:1212/'
                        },
                    }
                },
                {
                    opcode: 'ws_recv',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.wsocket_recv'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'ws_close',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.wsocket_conclose'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'ws_destroy',
                    blockType: BlockType.COMMAND,
                    text: this.formatMessage('AusCOM.wsocket_close'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'ws_send',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.wsocket_send'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        text: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    },
                },
       //         {
         //           opcode: 'sock_cre',
           //         blockType: BlockType.REPORTER,
             //       text: this.formatMessage('AusCOM.socket_create'),
               //     arguments: {
//
  //                      yi: {
    //                        type: ArgumentType.STRING,
      //                      menu: 'sock_yi'
        //                },
//
  //                      method: {
    //                        type: ArgumentType.STRING,
      //                      menu: 'sock_method'
        //                },
          //              buff: {
            //                type: ArgumentType.STRING,
              //              defaultValue: ' '
                //        }
                  //  },
                //},
                "---" + this.formatMessage("AusCOM.tit2"),
                {
                    opcode: 'RC4_coding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_RC4'),
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Danny'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '我来了'
                        }
                    },
                },
                {
                    opcode: 'b64encoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base64_en'),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Danny'
                        },
                    },

                },
                {
                    opcode: 'b64decoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base64_de'),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RGFubnk='
                        },
                    },

                },
                {
                    opcode: 'b58encoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base58_en'),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Danny'
                        },
                    },

                },
                {
                    opcode: 'b58decoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base58_de'),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '8iTbLRE'
                        },
                    },

                },
                {
                    opcode: 'bcostomencoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base_custom_en'),
                    arguments: {
                        ALPHABET: {
                            type: ArgumentType.STRING,
                            defaultValue: '!@#$%^&*()'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Danny'
                        },
                    },

                },
                {
                    opcode: 'bcostomdecoding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.code_base_custom_de'),
                    arguments: {
                        ALPHABET: {
                            type: ArgumentType.STRING,
                            defaultValue: '!@#$%^&*()'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '#)$&)#%!$$#@'
                        },
                    },

                },

                "---" + this.formatMessage("AusCOM.tit3"),
                {
                    opcode: 'json_create',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.json_create'),
                    arguments: {
                        json_: {
                            type: ArgumentType.STRING,
                            defaultValue: '{}'
                        },
                    },
                },
                {
                    opcode: 'json_load',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.json_load'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        json_: {
                            type: ArgumentType.STRING,
                            defaultValue: '{}'
                        },
                    },
                },
                {
                    opcode: 'json_get_all_item',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.json_get_all_item'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                    },
                },
                {
                    opcode: 'json_add_from_id',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.json_add_from_id'),
                    arguments: {
                        _id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                    },
                },
                {
                    opcode: 'json_add',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.json_add'),
                    arguments: {

                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        type: {
                            type: ArgumentType.STRING,
                            menu: 'JSON_add'
                        },
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                    },
                },
                {
                    opcode: 'json_get_item',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.json_get_item'),
                    arguments: {

                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },

                    },
                },
                {
                    opcode: 'json_del_item',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.json_del_item'),
                    arguments: {

                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },

                    },
                },
                {
                    opcode: 'GETjson',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.json_get'),
                    arguments: {

                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                    }
                },
                {
                    opcode: 'DESTROYjson',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('AusCOM.json_destroy'),
                    arguments: {

                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                    },
                },

                {
                    opcode: 'help',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('AusCOM.help') + 'ver 1.00C1',
                },

            ],
            menus: {
                HTTP_method: [
                    {
                        text: 'GET',
                        value: 'GET'
                    },
                    {
                        text: 'POST',
                        value: 'POST'
                    },
                    {
                        text: 'HEAD',
                        value: 'HEAD'
                    },
                    {
                        text: 'PUT',
                        value: 'PUT'
                    },
                    {
                        text: 'DELETE',
                        value: 'DELETE'
                    },
                    {
                        text: 'OPTIONS',
                        value: 'OPTIONS'
                    },
                ],
                ws_method: [
                    {
                        text: 'WS',
                        value: 'WS'
                    },
                    {
                        text: 'WSS',
                        value: 'WSS'
                    },
                ],
                JSON_add: [
                    {
                        text: this.formatMessage('AusCOM.str'),
                        value: '0'
                    },
                    {
                        text: this.formatMessage('AusCOM.int'),
                        value: '1'
                    },
                    {
                        text: this.formatMessage('AusCOM.float'),
                        value: '2'
                    },
                    {
                        text: this.formatMessage('AusCOM.list'),
                        value: '3'
                    },
                    {
                        text: this.formatMessage('AusCOM.logic'),
                        value: '4'
                    },
                ],

                sock_yi: [
                    {
                        text: 'TCP',
                        value: '0'
                    },
                    {
                        text: 'UDP',
                        value: '1'
                    },
                ],
                sock_method: [
                    {
                        text: 'client',
                        value: '0'
                    },
                    {
                        text: 'server',
                        value: '1'
                    },
                ],
            }
        }
    }
    httpGet(theUrl, body, method) {
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open(method, theUrl, false); // false 为同步请求
            xmlHttp.send(body);
            return xmlHttp.responseText;
        }
        catch (error) {
            return error
        }
    }

    http(args) {
        const { g_way, site, body } = args
        return this.httpGet(site, body, g_way);
    }

    ws_cre_sock(args) {
        const { yi } = args
        if (yi == 'WS') {
            id = Date.now()
            window.AusCOM.wsock.push({ 'id': String(id), 'ip': null, 'port': null, 'obj': null, 'way': 'WS' })
            return String(id)
        }
        if (yi == 'WSS') {
            id = Date.now()
            window.AusCOM.wsock.push({ 'id': String(id), 'ip': null, 'port': null, 'obj': null, 'way': 'WSS' })
            return String(id)
        }
        return '未知协议'
    }
    ws_conn_sock(args) {
        const { id, host } = args
        console.log(id, host)
        for (let i = 0, len = window.AusCOM.wsock.length; i < len; i++) {
            if (String(id) == window.AusCOM.wsock[i]["id"]) {
                for (let i = 0, len = window.AusCOM.wsrecv_.length; i < len; i++) {
                    if (String(id) == window.AusCOM.wsrecv_[i]["id"]) {
                        delete window.AusCOM.wsnotalive_[String(id)]
                    }
                }

                try {
                    window.AusCOM.wsock[i]['obj'] = new WebSocket(window.AusCOM.wsock[i]["way"] + '://' + host)
                    console.log(window.AusCOM.wsock)
                    window.AusCOM.wsock[i]['obj'].onmessage = function (evt) {

                        window.abc = evt.data
                        window.AusCOM.wsrecv_.push({ 'id': window.AusCOM.wsock[i]['id'], 'nr': evt.data })
                    }
                    window.AusCOM.wsock[i]['obj'].onclose = function (evt) {
                        window.AusCOM.wsnotalive_.push(window.AusCOM.wsock[i]['id'])
                    }
                    return true
                }
                catch (error) {

                    return false
                }
            }
        }

        return false
    }
    ws_recv(args) {
        const { id } = args
        console.log(window.AusCOM.wsrecv_)
        for (let i = 0, len = window.AusCOM.wsrecv_.length; i < len; i++) {
            if (String(id) == window.AusCOM.wsrecv_[i]["id"]) {
                console.log(window.AusCOM.wsrecv_)
                try {
                    var a = String(window.AusCOM.wsrecv_[i]["nr"])
                    window.AusCOM.wsrecv_.splice(i, 1);
                    return a
                }
                catch (error) {

                    return ''
                }
            }
        }
        return false
    }
    ws_close(args) {
        const { id } = args
        for (let i = 0, len = window.AusCOM.wsrecv_.length; i < len; i++) {
            if (String(id) == window.AusCOM.wsrecv_[i]["id"]) {
                window.AusCOM.wsnotalive_.splice(i, 1)
                return true
            }
        }
        return false
    }
    ws_destroy(args) {
        const { id } = args
        for (let i = 0, len = window.AusCOM.wsock.length; i < len; i++) {
            console.log(window.AusCOM.wsock[i])
            if (String(id) == window.AusCOM.wsock[i]["id"]) {
                try {
                    if (window.AusCOM.wsock[i]["obj"] == null) { }
                    else { window.AusCOM.wsock[i]["obj"].close() }
                    window.AusCOM.wsock.splice(i, 1);
                    // alert(window.AusCOM.wsock)
                    return ''
                }
                catch (error) { console.log(error) }
            }
        }
    }
    ws_send(args) {
        const { id, text } = args
        for (let i = 0, len = window.AusCOM.wsock.length; i < len; i++) {
            if (String(id) == window.AusCOM.wsock[i]["id"]) {
                console.log(window.AusCOM.wsrecv_)
                console.log(window.AusCOM.wsock[i])

                try {
                    if (window.AusCOM.wsock[i]["obj"] == null) { return false } else { window.AusCOM.wsock[i]["obj"].send(text); return true }
                }
                catch (error) {

                    return false
                }
            }

        }

        return false
    }
    help() {
        return "http访问出现fail to load XX可能是域名/ip不存在，也有可能是出现跨域问题，可以联系本站站住修改HTTP协议头或者自行修改浏览器跨域设置。如果ws无法发送数据，请F12打开开发者工具查看是否报错，如果报错则是无法连接，目前浏览器还不支持侦察此类报错。更多帮助请进入 https://gitee.com/ausx/DDEV_scNET"
    }
    RC4_coding(args) {
        var key = ''
        var data = ''
        const { KEY, TEXT } = args
        key = String(KEY)
        data = String(TEXT)//对js不识别字符串进行处理
        var seq = Array(256); //如果有机会编译成离线可执行程序，会考虑支持AVX512
        var das = Array(data.length);
        for (var i = 0; i < 256; i++) {
            seq[i] = i;
            var j = (j + seq[i] + key.charCodeAt(i % key.length)) % 256;
            var temp = seq[i];
            seq[i] = seq[j];
            seq[j] = temp;
        }
        for (var i = 0; i < data.length; i++) {
            das[i] = data.charCodeAt(i)
        }
        for (var x = 0; x < das.length; x++) {
            var i = (i + 1) % 256;
            var j = (j + seq[i]) % 256;
            var temp = seq[i];
            seq[i] = seq[j];
            seq[j] = temp;
            var k = (seq[i] + (seq[j] % 256)) % 256;
            das[x] = String.fromCharCode(das[x] ^ seq[k]);
        }
        return das.join('');
    }
    b64encoding(args) {
        const { TEXT } = args
        return window.btoa(encodeURIComponent(String(TEXT))); // 编码
    }
    b64decoding(args) {
        const { TEXT } = args
        try {
            return decodeURIComponent(window.atob(String(TEXT))); // 解码
        }
        catch (error) {
            return error
        }
    }
    b58encoding(args) {
        const { TEXT } = args
        var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        var ALPHABET_MAP = {};
        var BASE = 58;
        for (var i = 0; i < ALPHABET.length; i++) {
            ALPHABET_MAP[ALPHABET.charAt(i)] = i;
        }
        function ToUTF8(str) {
            var result = new Array();

            var k = 0;
            for (var i = 0; i < str.length; i++) {
                var j = encodeURI(str[i]);
                if (j.length == 1) {
                    // 未转换的字符
                    result[k++] = j.charCodeAt(0);
                } else {
                    // 转换成%XX形式的字符
                    var bytes = j.split("%");
                    for (var l = 1; l < bytes.length; l++) {
                        result[k++] = parseInt("0x" + bytes[l]);
                    }
                }
            }

            return result;
        }


        // 如果有特殊需求，要转成utf16，可以用以下函数
        function ToUTF16(str) {
            var result = new Array();

            var k = 0;
            for (var i = 0; i < str.length; i++) {
                var j = str[i].charCodeAt(0);
                result[k++] = j & 0xFF;
                result[k++] = j >> 8;
            }

            return result;
        }
        // 传进已经转成字节的数组 -->buffer(utf8格式) 
        function encode(buffer) {
            if (buffer.length === 0) return '';
            var i,
                j,
                digits = [0];
            for (i = 0; i < buffer.length; i++) {
                for (j = 0; j < digits.length; j++) {
                    digits[j] <<= 8;
                }
                digits[0] += buffer[i];
                var carry = 0;
                for (j = 0; j < digits.length; ++j) {
                    digits[j] += carry;
                    carry = (digits[j] / BASE) | 0;
                    digits[j] %= BASE;
                }
                while (carry) {
                    digits.push(carry % BASE);
                    carry = (carry / BASE) | 0;
                }
            }
            // deal with leading zeros
            for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0);
            return digits
                .reverse()
                .map(function (digit) {
                    return ALPHABET[digit];
                })
                .join('');
        }


        return encode(ToUTF8(String(TEXT)))
    }
    b58decoding(args) {
        const { TEXT } = args
        var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        var ALPHABET_MAP = {};
        var BASE = 58;
        for (var i = 0; i < ALPHABET.length; i++) {
            ALPHABET_MAP[ALPHABET.charAt(i)] = i;
        }
        function decode(string) {
            if (string.length === 0) return [];
            var i,
                j,
                bytes = [0];
            for (i = 0; i < string.length; i++) {
                var c = string[i];
                // c是不是ALPHABET_MAP的key 
                if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');
                for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;
                bytes[0] += ALPHABET_MAP[c];
                var carry = 0;
                for (j = 0; j < bytes.length; ++j) {
                    bytes[j] += carry;
                    carry = bytes[j] >> 8;
                    // 0xff --> 11111111
                    bytes[j] &= 0xff;
                }
                while (carry) {
                    bytes.push(carry & 0xff);
                    carry >>= 8;
                }
            }
            for (i = 0; string[i] === '1' && i < string.length - 1; i++) bytes.push(0);
            return bytes.reverse();
        }

        function byteToString(arr) {
            if (typeof arr === 'string') {
                return arr;
            }
            var str = '',
                _arr = arr;
            for (var i = 0; i < _arr.length; i++) {
                // 数组中每个数字转为二进制 匹配出开头为1的直到0的字符
                // eg:123-->"1111011"-->{0:"1111",groups: undefined, index: 0, input: "1111011"}
                var one = _arr[i].toString(2),
                    v = one.match(/^1+?(?=0)/);
                if (v && one.length == 8) {
                    var bytesLength = v[0].length;
                    var store = _arr[i].toString(2).slice(7 - bytesLength);
                    for (var st = 1; st < bytesLength; st++) {
                        store += _arr[st + i].toString(2).slice(2);
                    }
                    str += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                } else {
                    str += String.fromCharCode(_arr[i]);
                }
            }
            return str;
        }
        return byteToString(decode(String(TEXT)))
    }
    bcostomencoding(args) {
        const { ALPHABET, TEXT } = args
        var ALPHABET_MAP = {};
        var BASE = ALPHABET.length;
        for (var i = 0; i < ALPHABET.length; i++) {
            ALPHABET_MAP[ALPHABET.charAt(i)] = i;
        }
        function ToUTF8(str) {
            var result = new Array();

            var k = 0;
            for (var i = 0; i < str.length; i++) {
                var j = encodeURI(str[i]);
                if (j.length == 1) {
                    // 未转换的字符
                    result[k++] = j.charCodeAt(0);
                } else {
                    // 转换成%XX形式的字符
                    var bytes = j.split("%");
                    for (var l = 1; l < bytes.length; l++) {
                        result[k++] = parseInt("0x" + bytes[l]);
                    }
                }
            }

            return result;
        }


        // 如果有特殊需求，要转成utf16，可以用以下函数
        function ToUTF16(str) {
            var result = new Array();

            var k = 0;
            for (var i = 0; i < str.length; i++) {
                var j = str[i].charCodeAt(0);
                result[k++] = j & 0xFF;
                result[k++] = j >> 8;
            }

            return result;
        }
        // 传进已经转成字节的数组 -->buffer(utf8格式) 
        function encode(buffer) {
            if (buffer.length === 0) return '';
            var i,
                j,
                digits = [0];
            for (i = 0; i < buffer.length; i++) {
                for (j = 0; j < digits.length; j++) {
                    digits[j] <<= 8;
                }
                digits[0] += buffer[i];
                var carry = 0;
                for (j = 0; j < digits.length; ++j) {
                    digits[j] += carry;
                    carry = (digits[j] / BASE) | 0;
                    digits[j] %= BASE;
                }
                while (carry) {
                    digits.push(carry % BASE);
                    carry = (carry / BASE) | 0;
                }
            }
            // deal with leading zeros
            for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0);
            return digits
                .reverse()
                .map(function (digit) {
                    return ALPHABET[digit];
                })
                .join('');
        }


        return encode(ToUTF8(String(TEXT)))
    }
    bcostomdecoding(args) {
        const { ALPHABET, TEXT } = args
        var ALPHABET_MAP = {};
        var BASE = ALPHABET.length;
        for (var i = 0; i < ALPHABET.length; i++) {
            ALPHABET_MAP[ALPHABET.charAt(i)] = i;
        }
        function decode(string) {
            if (string.length === 0) return [];
            var i,
                j,
                bytes = [0];
            for (i = 0; i < string.length; i++) {
                var c = string[i];
                // c是不是ALPHABET_MAP的key 
                if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');
                for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;
                bytes[0] += ALPHABET_MAP[c];
                var carry = 0;
                for (j = 0; j < bytes.length; ++j) {
                    bytes[j] += carry;
                    carry = bytes[j] >> 8;
                    // 0xff --> 11111111
                    bytes[j] &= 0xff;
                }
                while (carry) {
                    bytes.push(carry & 0xff);
                    carry >>= 8;
                }
            }
            for (i = 0; string[i] === '1' && i < string.length - 1; i++) bytes.push(0);
            return bytes.reverse();
        }

        function byteToString(arr) {
            if (typeof arr === 'string') {
                return arr;
            }
            var str = '',
                _arr = arr;
            for (var i = 0; i < _arr.length; i++) {
                // 数组中每个数字转为二进制 匹配出开头为1的直到0的字符
                // eg:123-->"1111011"-->{0:"1111",groups: undefined, index: 0, input: "1111011"}
                var one = _arr[i].toString(2),
                    v = one.match(/^1+?(?=0)/);
                if (v && one.length == 8) {
                    var bytesLength = v[0].length;
                    var store = _arr[i].toString(2).slice(7 - bytesLength);
                    for (var st = 1; st < bytesLength; st++) {
                        store += _arr[st + i].toString(2).slice(2);
                    }
                    str += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                } else {
                    str += String.fromCharCode(_arr[i]);
                }
            }
            return str;
        }
        return byteToString(decode(String(TEXT)))
    }
    json_create(args) {
        const { json_ } = args
        function create(j) {
            id = Date.now()
            a = {}
            try {
                a = JSON.parse(j)
            }
            catch (error) { }
            window.AusCOM.json_list.push({ 'id': String(id), 'json': a })
            return id
        }
        return create(json_)

    }
    json_load(args) {
        const { id, json_ } = args
        function load(id, j) {
            var a = {}
            try {
                a = JSON.parse(j)
                for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                    if (window.AusCOM.json_list[i]['id'] == String(id)) {
                        window.AusCOM.json_list[i]['json'] = a
                        return true
                    }
                }
            }
            catch (error) { return false }
            return false

        }
        return load(id, json_)
    }
    json_get_all_item(args) {
        const { id } = args
        var b = []
        try {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    b = Object.keys(window.AusCOM.json_list[i]['json'])
                }
            }
        }
        catch (error) { b = [] }
        var d = ''
        for (let c of b) {
            if (c == b[-1]) {
                d += c
            }
            else {
                d += c + ' '
            }
        }

        return d
    }
    check(id) {
        for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
            if (window.AusCOM.json_list[i]['id'] == String(id)) {
                return true
            }
        }
        return false
    }
    getjson(id) {
        for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
            if (window.AusCOM.json_list[i]['id'] == String(id)) {
                return window.AusCOM.json_list[i]['json']
            }
        }
        return {}
    }
    json_add_from_id(args) {
        const { _id, id, name } = args
        function check(id) {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    return true
                }
            }
            return false
        }
        function getjson(id) {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    return window.AusCOM.json_list[i]['json']
                }
            }
            return {}
        }
        function add_item_from_id(id, id1, name) {
            if (check(id) & check(id1)) {
                for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                    if (window.AusCOM.json_list[i]['id'] == String(id)) {
                        window.AusCOM.json_list[i]['json'][name] = getjson(id1)
                        return true
                    }
                }
            }
            else { return false }
            return false
        }
        return add_item_from_id(id, _id, name)
    }
    json_add(args) {
        const { id, type, name, TEXT } = args
        function check(id) {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    return true
                }
            }
            return false
        }
        function getjson(id) {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    return window.AusCOM.json_list[i]['json']
                }
            }
            return {}
        }
        function add_item(id, name, type, content) {
            if (check(id)) {
                for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                    if (window.AusCOM.json_list[i]['id'] == String(id)) {
                        if (type == '0') {//字符串
                            window.AusCOM.json_list[i]['json'][String(name)] = String(content)
                            return true
                        }
                        if (type == '1') {//整数
                            window.AusCOM.json_list[i]['json'][String(name)] = parseInt(content)
                            return true
                        }
                        if (type == '2') {//浮点数
                            window.AusCOM.json_list[i]['json'][String(name)] = parseFloat(content)
                            return true
                        }
                        if (type == '3') {//列表
                            window.AusCOM.json_list[i]['json'][String(name)] = content.split(' ')
                            return true
                        }
                        if (type == '4') {//逻辑
                            if (String(content) == 'true') {
                                window.AusCOM.json_list[i]['json'][String(name)] = true
                                return true
                            }
                            else {
                                window.AusCOM.json_list[i]['json'][String(name)] = false
                                return true
                            }
                        }

                    }
                }

            }
            return false
        }
        return add_item(id, name, type, TEXT)
    }
    GETjson(args) {
        const { id } = args
        for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
            if (window.AusCOM.json_list[i]['id'] == String(id)) {
                return JSON.stringify(window.AusCOM.json_list[i]['json'])
            }
        }
        return ''
    }
    DESTROYjson(args) {
        const { id } = args
        for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
            if (window.AusCOM.json_list[i]['id'] == String(id)) {
                window.AusCOM.json_list.splice(i, 1);
                return true
            }
        }
        return false
    }
    json_get_item(args) { //
        const { id, name } = args
        try {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    if (typeof (window.AusCOM.json_list[i]['json'][name]) == 'string') { //id_0 字符串
                        return window.AusCOM.json_list[i]['json'][name]
                    }
                    if (typeof (window.AusCOM.json_list[i]['json'][name]) == 'number') { //id_1&2 整数&浮点
                        return window.AusCOM.json_list[i]['json'][name]
                    }
                    if (window.AusCOM.json_list[i]['json'][name] instanceof Array) { //id_4列表
                        var a = ''
                        for (let i_ = 0, len = window.AusCOM.json_list[i]['json'][name].length; i_ < len; i_++) {
                            if (i_ == window.AusCOM.json_list[i]['json'][name].length) {
                                a += window.AusCOM.json_list[i]['json'][name][i]
                            }
                            else {
                                a += window.AusCOM.json_list[i]['json'][name][i] + ' '
                            }
                        }
                    }
                    if (typeof (window.AusCOM.json_list[i]['json'][name]) == 'boolean') { // id_4 逻辑
                        return window.AusCOM.json_list[i]['json'][name]
                    }

                }
            }
        } catch { }
        return ''
    }
    json_del_item(args) { //删除项
        const { id, name } = args
        try {
            for (let i = 0, len = window.AusCOM.json_list.length; i < len; i++) {
                if (window.AusCOM.json_list[i]['id'] == String(id)) {
                    Reflect.deleteProperty(window.AusCOM.json_list[i]['json'], String(name))
                    return true
                }
            }
        } catch { }
        return false
    }
    _ws(host, data) {
        id=this.ws_conn_sock({'id':'WS','host':host})
        this.ws_send({'id':id,'text':data})
        recv=this.ws_recv({'id':id})
        for(;;){if(recv!=''){break}}
        return recv
    }

    sock_cre(args) {
        const { yi, method } = args
        j = JSON.parse(this._ws('127.0.0.1:23089/socket/create', JSON.stringify({ 'yi': yi, 'method': method })))
        return j['id']

    }
}
module.exports = AuEx_communication;