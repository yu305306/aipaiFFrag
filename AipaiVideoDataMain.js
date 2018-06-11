/**
 * Created by PC-275 on 2017/5/24.
 */
import trakBox from "./src/demuxer/TrakBox.js";
import Fmp4Remuxer from "./src/fmp4-remuxer/Fmp4-remuxer.js";
import MediaInfo from "./src/MediaInfo.js";


var _mediaSource;
var _mediaElement;
var videoLength;
var loadEnd = false;
var element = document.getElementsByName('videoElement')[0];

var videoRemoveRange = document.getElementById('videoRemoveRange');
var seekText = document.getElementById('seekText');
videoRemoveRange.onclick = function () {
    // var sb = _sourceBuffers["video"];
    var seekT = parseInt(seekText.value);
    let buffered = _mediaElement.buffered;
    var start = 0
    var end = 0;
    _mediaElement.pause();
    for (let i = 0; i < buffered.length; i++) {
        start = buffered.start(i);
        end = buffered.end(i);
    }
    bolBuffer = true;
    if (seekT >= start && seekT <= end) {
        _mediaElement.currentTime = seekT;
        bolBuffer = false;
    } else {
        for (var type in _sourceBuffers) {
            let sb = _sourceBuffers[type];
            if (end - start > 0)
                sb.remove(start, end);
        }
        let videoDataObj = trackObj["vide"].keyOffsetValue(seekT);
        let audioDataObj = trackObj["soun"].keyOffsetValue(seekT);
        let smallObj = videoDataObj.keyNum < audioDataObj.keyNum ? videoDataObj : audioDataObj;
        keyDataNum.audio = keyDataNum.video = smallObj.keyNum
        keyMaxNum = smallObj.keyNum + 10;
        _mediaElement.currentTime = smallObj.tNum;
        bolBuffer = false;
    }
}
attachMediaElement(element);
var _mimeTypes = {
    video: null,
    audio: null
};
var _sourceBuffers = {
    video: null,
    audio: null
};
var _pendingSegments = {
    video: [],
    audio: []
};
var appendBufferBol = {
    video: true,
    audio: true
}

var videoInvertNum = -1;
var audioInvertNum = -1;

var keyMaxNum = 30;
var keyDataNum = {
    "video": 0,
    "audio": 0
}

var durationTime = 0;
var trackObj = {};

var bufferLen = 0;
var boxOffset = 32;
var nextBoxSize = 0;
var boxMdatBol = false;
var boxdemuxer = false;
var bufferArr = [];
var SourceBufferUpdateEndBol = true;

var mp4Remuxer = new Fmp4Remuxer();
// mp4Remuxer.onInitSegment=appendInitSegment;
mp4Remuxer.doAppendSegments = doAppendSegments.bind(this);
var headers = new Headers();
// headers.append("Content-Type", "application/octet-stream");
// headers.append("Access-Control-Allow-Origin", "*");
// var videoUrl = "http://nb4057-hc36.aipai.com/user/20/22790020/7101861/card/45974609/card.mp4";//?start=300
var videoUrl = "./card.mp4";//?start=300
self.fetch(videoUrl, {
// self.fetch('card_1080.mp4', {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default',
    redirect: "follow",
}).then(function (res) {
    if (res.ok && (res.status >= 200 && res.status <= 299)) {
        let lengthHeader = res.headers.get('Content-Length');
        if (lengthHeader != null) {
            videoLength = parseInt(lengthHeader);
            MediaInfo.getInstance().videoLength = videoLength;
        }
        return pump.call(res, res.body.getReader());
    } else {
        // logger(res.redirect(res.status,res.url));
        // followFetch.call(res.redirect());
        return res;
    }

}).then(function (res) {
    logger(res);
}).catch(function (error) {
    console.log("error" + error);
});

function followFetch(res) {
    return res().then((resoult)=> {
        return followFetch(resoult);
    });
}

var num = 0;
function pump(reader) {
    return reader.read().then((result)=> {
        if (!result.done) {
            // if (bol) {
            //     return reader.cancel();
            // }
            // num++;
            // if (num > 50)
            //     return reader.cancel();
            chunkData(result.value.buffer);
            return pump(reader);
        }
    })
    //     .catch((e)=> {
    //     log("pump erre: " + e);
    // });
}

function chunkData(chunkBuffer) {

    // var buffer = new Uint8Array(chunkBuffer);
    bufferArr.push(chunkBuffer);
    bufferLen += (chunkBuffer.byteLength);
    if (!boxdemuxer) {
        var offset = boxOffset;
        var bufferNum = bufferLen
        if (!boxMdatBol && offset + 8 + nextBoxSize <= bufferNum) {
            boxdemuxer = true;
            var boxBuffer = getBoxBuffer(offset, bufferNum - offset);
            var boxoff = 0;
            while (offset <= bufferNum) {
                nextBoxSize = getBoxSize(boxBuffer, boxoff);
                var boxName = getBoxName(boxBuffer, boxoff);
                // log(offset + nextBoxSize + "   ***    " + bufferNum);
                if (boxName == "moov") {
                    if (offset + nextBoxSize <= bufferNum) {
                        moovBox(boxBuffer, boxoff);
                    }
                }

                if (boxName == "mdat") {
                    boxMdatBol = true;
                    break;
                } else {
                    offset = boxOffset + nextBoxSize;
                    boxoff += nextBoxSize;
                    if (offset <= bufferNum) {
                        boxOffset = offset;
                    } else {
                        boxdemuxer = false;
                        return;
                    }
                }
            }
        }
        // boxdemuxer = false;
    }
}

function demuxerVideoMdat() {
    if (boxMdatBol) {
        if (keyDataNum.video < keyMaxNum) {
            var objData = trackObj["vide"].keyDataLen(bufferLen, keyDataNum.video);
            if (objData.bol) {
                var mdatBufferLen = objData.chunkLen;
                var mdatStartOffset = objData.beginOff;
                var boxBuffer = getBoxBuffer(mdatStartOffset, mdatBufferLen);
                trackObj["vide"].mixKeyTrackData(boxBuffer, objData);
                keyDataNum.video++;
            }
        }
    }
}
function demuxerAudioMdat() {
    if (keyDataNum.audio < keyMaxNum) {
        var objSoundData = trackObj["soun"].keyDataLen(bufferLen, keyDataNum.audio);
        if (objSoundData.bol) {
            keyDataNum.audio++;
            var mdatBufferLen = objSoundData.chunkLen;
            var mdatStartOffset = objSoundData.beginOff;
            var boxBuffer = getBoxBuffer(mdatStartOffset, mdatBufferLen);
            trackObj["soun"].mixKeyTrackData(boxBuffer, objSoundData);
        }
    }
}

function getBoxBuffer(startOffset, length) {
    var bArr = bufferArr;
    var len = 0;
    var offset = 0;
    var starOffset = 0;
    var uArr = new Uint8Array(length);
    for (var i = 0; i < bArr.length; i++) {
        var bLen = bArr[i].byteLength;
        var l = length - offset;
        var starOffsetBol = false;
        len += bLen;
        if (len >= startOffset && starOffset == 0) {
            starOffset = bLen - ( len - startOffset);
            starOffsetBol = true;
        }
        if (l <= 0)
            break;
        if (l > bLen) {
            l = bLen;
            if (starOffsetBol) {
                l = l - starOffset;
            }
        }
        if (len > startOffset + offset) {
            var cutUintArr = null;
            if (starOffsetBol) {
                cutUintArr = new Uint8Array(bArr[i], starOffset, l);
            }
            else {
                cutUintArr = new Uint8Array(bArr[i], 0, l);
            }
            uArr.set(cutUintArr, offset);
            offset += cutUintArr.length;
        }
    }
    return uArr.buffer;
}

function moovBox(arrayBuffer, offset) {
    var boxOffset = getBoxSize(arrayBuffer, offset);
    var moovOffset = offset + 8;
    var offNum = 0;
    while (moovOffset < boxOffset) {
        var moovBoxSize = getBoxSize(arrayBuffer, moovOffset);
        var moovBoxName = getBoxName(arrayBuffer, moovOffset)
        if (moovBoxName === "mvhd") {
            mvhdBox(arrayBuffer, moovOffset);
        }
        if (moovBoxName === "trak") {
            var trakB = new trakBox();

            // trakBox(arrayBuffer, moovOffset);
            mp4Remuxer.trakBind(trakB);
            trakB.onInitSegment = appendInitSegment.bind(this);
            trakB.starDemuxer(arrayBuffer, moovOffset);
            trackObj[trakB.typeName] = trakB;
        }
        offNum = offNum + moovBoxSize;
        moovOffset = moovOffset + moovBoxSize;
    }
}

/**0000006c
 6d766864
 00 000000  版本+flags
 7c25b080
 7c25b080
 000003e8   时间单位
 0001cc96   总时长
 00010000   播放速率
 0100       声音*/
function mvhdBox(arrayBuffer, offset) {
    var timerScaleNum = getBoxSize(arrayBuffer, offset + 20);
    var durationNum = getBoxSize(arrayBuffer, offset + 24);
    durationTime = durationNum / timerScaleNum;
}

function getBoxName(arrayBuffer, offset, length = 8) {
    var dataV = new DataView(arrayBuffer, offset, length);
    var strName = String.fromCharCode(dataV.getUint8(4)) + String.fromCharCode(dataV.getUint8(5)) + String.fromCharCode(dataV.getUint8(6)) + String.fromCharCode(dataV.getUint8(7));
    // log(dataV.getUint8(4), dataV.getUint8(5), dataV.getUint8(6), dataV.getUint8(7), "  boxName", strName, "offset:", offset)
    return strName;
}

function getBoxSize(arrayBuffer, offset, lenght = 4) {
    var dataV = new DataView(arrayBuffer, offset);
    var lenStr = "";
    for (var i = 0; i < lenght; i++) {
        lenStr = lenStr + toString16(dataV.getUint8(i));
    }
    // var lenStr = toString16(dataV.getUint8(i)) + toString16(dataV.getUint8(1)) + toString16(dataV.getUint8(2)) + toString16(dataV.getUint8(3))
    var len = parseInt("0x" + lenStr);
    // log(lenStr, "lenStr string16");
    // log(dataV.getUint8(0), dataV.getUint8(1), dataV.getUint8(2), dataV.getUint8(3))
    return len;
}

function toString16(num) {
    var str = num.toString(16);
    if (str.length == 1)
        str = "0" + str;
    return str;
}

function log() {
    var str = "";
    for (let i = 0; i < arguments.length; i++) {
        str += arguments[i] + "  ";
    }
    console.log(str);
}
function logger(str) {
    console.log(str);
}

function appendInitSegment(type, initSegment) {
    let is = initSegment;
    let mimeType = `${is.container}`;
    if (is.codec && is.codec.length > 0) {
        mimeType += `;codecs=${is.codec}`;
    }
    if (mimeType !== _mimeTypes[is.type]) {
        if (_mimeTypes[is.type] == null) {
            try {
                let sb = _sourceBuffers[is.type] = _mediaSource.addSourceBuffer(mimeType);
                sb.name = is.type;
                sb.addEventListener('error', onSourceBufferError);
                sb.addEventListener('updateend', onSourceBufferUpdateEnd);
                sb.addEventListener('sourceopen', onSourceBufferSourceOpen);
                sb.addEventListener('sourceclose', onSourceBufferSourceClose);
                sb.addEventListener('updatestart', onSourceBufferUpdateStart);
            } catch (error) {
                logger("addSourceBuffer creat Faile " + error.message);
                return;
            }
        }
        _mimeTypes[is.type] = mimeType;
    }
    if (true) {
        // deferred means this InitSegment has been pushed to pendingSegments queue
        _pendingSegments[is.type].push(is);
        appendSegments();
    }
}

function doAppendSegments(type, mediaSegment) {
    let ms = mediaSegment;
    _pendingSegments[ms.type].push(ms);
    let sb = _sourceBuffers[ms.type];
    if (sb != null && !sb.updating) {
        appendSegments();
    }
}
// var jumpNum = 0;
var bolBuffer = false;

function appendSegments() {
    // jumpNum++;
    // if (jumpNum >= 5)return;
    if (bolBuffer)return;
    let pendingSegments = _pendingSegments;
    for (let type in pendingSegments) {
        if (!_sourceBuffers[type] || _sourceBuffers[type].updating || !appendBufferBol[type]) {
            continue;
        }
        let sb = _sourceBuffers[type];
        if (sb != null && sb.updating) {
            continue;
        }
        if (pendingSegments[type].length > 0) {
            let segment = pendingSegments[type].shift();
            try {
                // logger("*********logger(segment)********" + type);
                _sourceBuffers[type].appendBuffer(segment.data);
            } catch (error) {
                // appendBufferBol[type] = false;
                pendingSegments[type].unshift(segment);
                logger("appendSegments erro --------" + type);
                logger(error.code);
                bolBuffer = true;
            }
        }
    }
}


function attachMediaElement(mediaElement) {
    let ms = _mediaSource = new window.MediaSource();
    ms.addEventListener('sourceopen', onSourceOpen);
    ms.addEventListener('sourceended', onSourceEnded);
    ms.addEventListener('sourceclose', onSourceClose);
    ms.addEventListener('canplay', onCanPlay);
    ms.addEventListener('stalled', onvStalled);
    _mediaElement = mediaElement;
    _mediaElement.ontimeupdate = onSourceBufferUpdate;
    mediaElement.src = window.URL.createObjectURL(_mediaSource);
    // _mediaElement.addEventListener('update', onSourceBufferUpdate);
    // mediaElement.src = _mediaSourceObjectURL;
}

function onSourceBufferError(e) {
    logger("onSourceBufferError");
    logger(e);
}

function onSourceBufferUpdate(e) {
    let buffered = _mediaElement.buffered;
    for (let i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);
        log("_mediaElement.buffer : ", start, "   ", end);
        // log("_mediaElement.currentTime : ", _mediaElement.currentTime);
        if (end - _mediaElement.currentTime < 60) {
            if (keyMaxNum - keyDataNum.video <= 10) {
                keyMaxNum = keyDataNum.video + 10;
                log("keyMaxNum", keyMaxNum);
            }
        }
    }
}

function onSourceBufferUpdateEnd(e) {
    // logger("------onSourceBufferUpdateEnd----");
    appendSegments();
}

function onSourceOpen(e) {
    logger("onSourceOpen");
    logger(e);
}

function onSourceEnded(e) {
    logger("onSourceEnded");
    logger(e);
}
function onSourceClose(e) {
    logger("onSourceClose");
    logger(e);
}

function onCanPlay(e) {
    logger("onCanPlay");
    logger(e);
}

function onSourceBufferSourceOpen(e) {
    log("onSourceBufferSourceOpen :", e.currentTarget);
}
function onSourceBufferSourceClose(e) {
    log("onSourceBufferSourceClose :", e.currentTarget);
}
function onSourceBufferUpdateStart(e) {
    // log("onSourceBufferUpdateStart :", e.currentTarget.name);
    // demuxerMdat();
    if (e.currentTarget.name == "video" && videoInvertNum == -1) {
        videoInvertNum = setInterval(demuxerVideoMdat, 500);
        // demuxerVideoMdat();
    } else if (e.currentTarget.name == "audio" && audioInvertNum == -1) {
        audioInvertNum = setInterval(demuxerAudioMdat, 500);
    }
}

function onvStalled(e) {
    logger("onvStalled");
    let media = _mediaElement;
    let buffered = media.buffered;
    _mediaElement.currentTime = buffered.start(0);
}
