const Cast = require('../../util/cast');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
// var dgram = require("dgram");
//感谢Arkos开源的扩展代码，作为参照编写框架
//欸，别把作者忘了。Danny欸
class DannyDev_Sock {
    constructor(runtime) {
        this.runtime = runtime
        this._formatMessage = runtime.getFormatMessage({
            'zh-cn': {
                'DannyDev.extensionName': 'DannyDEVのnetwork',
                'DannyDev.http_get': 'GET',
                'DannyDev.http_POST': 'POST',
                'DannyDev.http': 'HTTP以[g_way]方式访问[site]发送[body]',
                'DannyDev.sock_WS': 'WS',
                'DannyDev.sock_WSS': 'WSS',
                'DannyDev.socket_create': '创建websocket,协议[yi],并返回id',
                'DannyDev.socket_connect': 'id[id]socket连接[host]',
                'DannyDev.socket_send': '发送id[id]数据[text]',
                'DannyDev.socket_recv': '接收数据id[id]',
                'DannyDev.socket_conclose': '连接关闭id[id]',
                'DannyDev.socket_close': '销毁socket id[id]',
                'DannyDev.code_RC4': 'code.RC4加解密 密钥[KEY] 文本[TEXT]',
                'DannyDev.code_base64_en': 'code.base64编码文本[TEXT]',
                'DannyDev.code_base64_de': 'code.base64解码文本[TEXT]',
                'DannyDev.help': '使用帮助',
            },
            en: {
                'DannyDev.extensionName': 'DannyDEVのnetwork',
                'DannyDev.http_get': 'GET',
                'DannyDev.http_POST': 'POST',
                'DannyDev.http': 'http access[g_way]to[site]send[body]',
                'DannyDev.sock_WS': 'WS',
                'DannyDev.sock_WSS': 'WSS',
                'DannyDev.socket_create': 'create websocket,protocol', 'DannyDev.socket_connect': 'id[id]websocket connect[host]',
                'DannyDev.socket_send': 'send id[id] data[text]',
                'DannyDev.socket_recv': 'recv id [id]',
                'DannyDev.socket_conclose': 'When connection closed id[id]',
                'DannyDev.socket_close': 'destroy socket id[id]',
                'DannyDev.code_RC4': 'code.RC4 KEY[KEY] TEXT[TEXT]',
                'DannyDev.code_base64_en': 'code.base64 encoding[TEXT]',
                'DannyDev.code_base64_de': 'code.base64 decoding[TEXT]',
                'DannyDev.help': 'help',
            },
        })
        this.sock = []
        window.wsrecv_ = []
        window.wsnotalive_ = []
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
            name: this.formatMessage('DannyDev.extensionName'), // 拓展名
            color1: '#FF8383',
            // menuIconURI: icon,
            // blockIconURI: icon,
            blocks: [
                {
                    opcode: 'get',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.http_get'),
                },
                {
                    opcode: 'POST',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.http_POST'),
                },
                {
                    opcode: 'http',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.http'),
                    arguments: {
                        g_way: {
                            type: 'string',
                            defaultValue: 'GET'
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
                    opcode: 'WS',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.sock_WS'),

                },
                {
                    opcode: 'WSS',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.sock_WSS'),

                },
                {
                    opcode: 'cre_sock',
                    blockType: 'reporter',
                    text: this.formatMessage('DannyDev.socket_create'),
                    arguments: {
                        yi: {
                            type: 'string',
                            defaultValue: 'WS'
                        },
                    }
                },
                {
                    opcode: 'conn_sock',
                    blockType: 'Boolean',
                    text: this.formatMessage('DannyDev.socket_connect'),
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
                    opcode: 'recv',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('DannyDev.socket_recv'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'close',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('DannyDev.socket_conclose'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'destroy',
                    blockType: BlockType.COMMAND,
                    text: this.formatMessage('DannyDev.socket_close'),
                    arguments: {
                        id: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    },
                },
                {
                    opcode: 'send',
                    blockType: BlockType.BOOLEAN,
                    text: this.formatMessage('DannyDev.socket_send'),
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
                {
                    opcode: 'RC4_coding',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('DannyDev.code_RC4'),
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
                    text: this.formatMessage('DannyDev.code_base64_en'),
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
                    text: this.formatMessage('DannyDev.code_base64_de'),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RGFubnk='
                        },
                    },

                },
                {
                    opcode: 'help',
                    blockType: BlockType.REPORTER,
                    text: this.formatMessage('DannyDev.help'),
                },

            ],
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
    get(args) {
        return "GET"
    }
    POST(args) {
        return "POST"
    }
    http(args) {
        const { g_way, site, body } = args
        return this.httpGet(site, body, g_way);
    }
    WS(args) {
        return "WS"
    }
    WSS(args) {
        return "WSS"
    }
    cre_sock(args) {
        const { yi } = args
        if (yi == 'WS') {
            id = Date.now()
            this.sock.push({ 'id': String(id), 'ip': null, 'port': null, 'obj': null, 'way': 'WS' })
            return String(id)
        }
        if (yi == 'WSS') {
            id = Date.now()
            this.sock.push({ 'id': String(id), 'ip': null, 'port': null, 'obj': null, 'way': 'WSS' })
            return String(id)
        }
        return '未知协议'
    }
    conn_sock(args) {
        const { id, host } = args
        for (let i = 0, len = this.sock.length; i < len; i++) {
            if (String(id) == this.sock[i]["id"]) {
                for (let i = 0, len = window.wsrecv_.length; i < len; i++) {
                    if (String(id) == window.wsrecv_[i]["id"]) {
                        delete window.wsnotalive_[String(id)]
                    }
                }
                try {
                    this.sock[i]['obj'] = new WebSocket(this.sock[i]["way"] + '://' + host)
                    this.sock[i]['obj'].onmessage = function (evt) {
                        alert(evt.data)
                        window.wsrecv_.push({ 'id': this.sock[i]['id'], 'nr': evt.data })
                    }
                    this.sock[i]['obj'].onclose = function (evt) {
                        window.wsnotalive_.push(this.sock[i]['id'])
                    }
                    return true
                }
                catch (error) {
                    alert(error)
                    return false
                }
            }
        }
        return false
    }
    recv(args) {
        const { id } = args
        for (let i = 0, len = window.wsrecv_.length; i < len; i++) {
            if (String(id) == window.wsrecv_[i]["id"]) {
                try {
                    var a = String(window.wsrecv_[i]["nr"])
                    window.wsrecv_.splice(i, 1);
                    return a
                }
                catch (error) {
                    alert(error)
                    return ''
                }
            }
        }
        return false
    }
    close(args) {
        const { id } = args
        for (let i = 0, len = window.wsrecv_.length; i < len; i++) {
            if (String(id) == window.wsrecv_[i]["id"]) {
                window.wsnotalive_.splice(i, 1)
                return true
            }
        }
        return false
    }
    destroy(args) {
        const { id } = args
        for (let i = 0, len = this.sock.length; i < len; i++) {
            console.log(this.sock[i])
            if (String(id) == this.sock[i]["id"]) {
                try {
                    if (this.sock[i]["obj"] == null) { }
                    else { this.sock[i]["obj"].close() }
                    this.sock.splice(i, 1);
                    alert(this.sock)
                    return ''
                }
                catch (error) { console.log(error) }
            }
        }
    }
    send(args) {
        const { id, text } = args
        for (let i = 0, len = this.sock.length; i < len; i++) {
            if (String(id) == this.sock[i]["id"]) {
                for (let i = 0, len = window.wsrecv_.length; i < len; i++) {
                    if (String(id) == window.wsrecv_[i]["id"]) {
                        try {
                            if (window.wsrecv_[i]["obj"] == null) { return false } else { window.wsrecv_[i]["obj"].send(text); return true }
                        }
                        catch (error) {
                            return false
                        }
                    }
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
    b64encoding(args){
        const{TEXT}=args
        return window.btoa(encodeURIComponent(String(TEXT))); // 编码
    }
    b64decoding(args){
        const{TEXT}=args
        return decodeURIComponent(window.atob(String(TEXT))); // 解码

    }

}
module.exports = DannyDev_Sock;

