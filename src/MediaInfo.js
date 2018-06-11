/**
 * Created by PC-275 on 2017/5/12.
 */
var headers = new Headers(); headers.append("Access-Control-Expose-Headers","Accept-Ranges");
var url="http://nb4057-hc36.aipai.com/user/20/22790020/7101861/card/45974609/card.mp4?123";
var obj = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    Ranges:'bytes=1086114-',
    redirect: 'follow',
    cache: 'default'
};
fetch(url, obj).then(function (res) { console.log(res.headers.get('Content-Length'));
    return pump.call(res, res.body.getReader());
})

function pump(reader) {
    return reader.read().then(function (result) {

        console.log(new Uint8Array(result.value.buffer));
        if (!result.done) {
            return pump(reader);
        }
    });
}
let instance = null;
class MediaInfo {
    // static instance = null;

    constructor() {
        this.audioCodec = null;
        this.videoCodec = null;
        this.width = null;
        this.height = null;
        this.type = "MediaInfo";
        this.avcc = null;
        this.codecHeight = null;
        this.codecWidth = null;
        this.presentHeight = null;
        this.presentWidth = null;

        this.videoKeyPointTimeArr = [];

        this.audioStsdUintArrayData = null;

        this.keyPointArr = null;
        this.videoLength=0;
    }

    static getInstance() {
        if (!instance)
            instance = new MediaInfo();
        return instance;
    }
}

export default MediaInfo;