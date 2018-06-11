/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by PC-275 on 2017/5/12.
 */
var headers = new Headers();headers.append("Access-Control-Expose-Headers", "Accept-Ranges");
var url = "http://nb4057-hc36.aipai.com/user/20/22790020/7101861/card/45974609/card.mp4?123";
var obj = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    Ranges: 'bytes=1086114-',
    redirect: 'follow',
    cache: 'default'
};
fetch(url, obj).then(function (res) {
    console.log(res.headers.get('Content-Length'));
    return pump.call(res, res.body.getReader());
});

function pump(reader) {
    return reader.read().then(function (result) {

        console.log(new Uint8Array(result.value.buffer));
        if (!result.done) {
            return pump(reader);
        }
    });
}
var instance = null;

var MediaInfo = function () {
    // static instance = null;

    function MediaInfo() {
        _classCallCheck(this, MediaInfo);

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
        this.videoLength = 0;
    }

    _createClass(MediaInfo, null, [{
        key: "getInstance",
        value: function getInstance() {
            if (!instance) instance = new MediaInfo();
            return instance;
        }
    }]);

    return MediaInfo;
}();

exports.default = MediaInfo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spsParser = __webpack_require__(5);

var _spsParser2 = _interopRequireDefault(_spsParser);

var _MediaInfo = __webpack_require__(0);

var _MediaInfo2 = _interopRequireDefault(_MediaInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrakBox = function () {
    function TrakBox() {
        _classCallCheck(this, TrakBox);

        this.trakBoxTypename = null;

        this.timeScale = null;
        this.timeDuration = null;
        /**elstBoxTime*/
        this.mediaTime = 0;
        /**sttsBox*/
        this.sample_count = this.sample_delta = null;
        /**stssBox*/
        this.videoSeekPointsArr = null;
        /**stscBox*/
        this.stscBoxDic = null;
        this.stscSamplesOffset = 0;

        this.stscToCttsOffset = 0;

        /**stszBox*/
        this.sampleSize = null;
        /**stcoBox*/
        this.chunkOffset = null;
        this.config = null;

        this.sps = null;
        this.pps = null;

        this.ctsbArr = null;

        this.trakId = null;
        this._videoMetadata = null;
        this._soundMetadata = null;

        this._metaData = null;

        this.mediaInfo = _MediaInfo2.default.getInstance();

        this.audioKeyArr = [];

        this._videoTrack = {
            type: 'video',
            id: 1,
            sequenceNumber: 0,
            samples: [],
            length: 0
        };
        this._audioTrack = {
            type: 'audio',
            id: 2,
            sequenceNumber: 0,
            samples: [],
            length: 0
        };

        this.keyOffset = [];

        this.chunkArr = [];

        this.runOnce = 0;
    }

    _createClass(TrakBox, [{
        key: "starDemuxer",
        value: function starDemuxer(arrayBuffer, offset) {
            this.trakBox(arrayBuffer, offset);
        }
    }, {
        key: "trakBox",
        value: function trakBox(arrayBuffer, offset) {
            var boxOffset = this.getBoxSize(arrayBuffer, offset);
            var moovOffset = offset + 8;
            var offNum = 0;
            while (offNum < boxOffset) {
                var moovBoxSize = this.getBoxSize(arrayBuffer, moovOffset);
                var moovBoxName = this.getBoxName(arrayBuffer, moovOffset);
                if (moovBoxName == "tkhd") {
                    this.trakId = this.getBoxSize(arrayBuffer, moovOffset + 20);
                }
                if (moovBoxName == "edts") {
                    this.edtsBox(arrayBuffer, moovOffset + 8);
                }
                if (moovBoxName == "mdia") {
                    this.mdiaBox(arrayBuffer, moovOffset);
                }
                offNum = offNum + moovBoxSize;
                moovOffset = moovOffset + moovBoxSize;
            }
        }
    }, {
        key: "edtsBox",
        value: function edtsBox(arrayBuffer, offset) {
            // this.segmentDuration = this.getBoxSize(arrayBuffer, offset + 16);
            this.mediaTime = this.getBoxSize(arrayBuffer, offset + 20);
        }
    }, {
        key: "mdiaBox",
        value: function mdiaBox(arrayBuffer, offset) {
            var boxOffset = this.getBoxSize(arrayBuffer, offset);
            var moovOffset = offset + 8;
            var offNum = 0;
            while (offNum < boxOffset) {
                var moovBoxSize = this.getBoxSize(arrayBuffer, moovOffset);
                var moovBoxName = this.getBoxName(arrayBuffer, moovOffset);
                if (moovBoxName == "mdhd") {
                    this.mdhdBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "hdlr") {
                    this.hdlrBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "minf") {
                    this.minfBox(arrayBuffer, moovOffset);
                }
                offNum = offNum + moovBoxSize;
                moovOffset = moovOffset + moovBoxSize;
            }
        }
    }, {
        key: "mdhdBox",
        value: function mdhdBox(arrayBuffer, offset) {
            this.timeScale = this.getBoxSize(arrayBuffer, offset + 5 * 4);
            this.timeDuration = this.getBoxSize(arrayBuffer, offset + 6 * 4);
            this.log("timeScale", this.timeScale);
            this.log("timeDuration", this.timeDuration);
        }
    }, {
        key: "hdlrBox",
        value: function hdlrBox(arrayBuffer, offset) {
            this.typeName = this.getBoxName(arrayBuffer, offset + 3 * 4);
            // this.log(this.typeName, "trakBoxTypename");
        }
    }, {
        key: "minfBox",
        value: function minfBox(arrayBuffer, offset) {
            var boxOffset = this.getBoxSize(arrayBuffer, offset);
            var moovOffset = offset + 8;
            var offNum = 0;
            while (offNum < boxOffset) {
                var moovBoxSize = this.getBoxSize(arrayBuffer, moovOffset);
                var moovBoxName = this.getBoxName(arrayBuffer, moovOffset);
                // this.logger(moovBoxName);
                if (moovBoxName == "stbl") {
                    this.stblBox(arrayBuffer, moovOffset);
                }
                offNum = offNum + moovBoxSize;
                moovOffset = moovOffset + moovBoxSize;
            }
        }
    }, {
        key: "stblBox",
        value: function stblBox(arrayBuffer, offset) {
            var boxOffset = this.getBoxSize(arrayBuffer, offset);
            var moovOffset = offset + 8;
            var offNum = 0;
            while (offNum < boxOffset) {
                var moovBoxSize = this.getBoxSize(arrayBuffer, moovOffset);
                var moovBoxName = this.getBoxName(arrayBuffer, moovOffset);
                // this.log("stblBoxName:", moovBoxName);
                if (moovBoxName == "stsd") {
                    this.stsdBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "stts") {
                    this.sttsBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "stss") {
                    this.stssBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "stsc") {
                    this.stscBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "stsz") {
                    this.stszBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "stco") {
                    this.stcoBox(arrayBuffer, moovOffset);
                }
                if (moovBoxName == "ctts") {
                    this.cttsBox(arrayBuffer, moovOffset);
                }
                offNum = offNum + moovBoxSize;
                moovOffset = moovOffset + moovBoxSize;
            }

            if (this.typeName == "soun") {
                this.keyOffsetData();
                this.pushSoundMetaData();
                // this.pushVideoFFmp4Data(arrayBuffer);
            }
            if (this.typeName == "vide") {
                this.keyOffsetData();
                this.pushVideoMetaData();
            }
        }
    }, {
        key: "stsdBox",
        value: function stsdBox(arrayBuffer, offset) {
            var boxOffset = this.getBoxSize(arrayBuffer, offset);
            if (this.typeName == "vide") {
                var boxName = this.getBoxName(arrayBuffer, offset + 16);
                if (boxName == "avc1") {
                    this.parseAvc1AvcCData(arrayBuffer, offset + 16 + 16 * 4 + 6 + 8 * 2, boxOffset - 16 + 16 * 4 + 6 + 8 * 2);
                } else {
                    this.logger('stsdBox ' + this.typeName + " is not avc1 :" + boxName);
                }
            }
            if (this.typeName == "soun") {
                this.mediaInfo.audioStsdUintArrayData = new Uint8Array(arrayBuffer, offset, boxOffset);
            }
        }
    }, {
        key: "sttsBox",
        value: function sttsBox(arrayBuffer, offset) {
            var num = this.getBoxSize(arrayBuffer, offset + 12);
            this.sample_count = this.getBoxSize(arrayBuffer, offset + 16);
            this.sample_delta = this.getBoxSize(arrayBuffer, offset + 20);
            // this.log("sample_count: ", this.sample_count);
            // this.log("sample_delta: ", this.sample_delta);
        }
    }, {
        key: "stssBox",
        value: function stssBox(arrayBuffer, offset) {
            var videoKeyNum = this.getBoxSize(arrayBuffer, offset + 12);
            this.videoSeekPointsArr = [];
            for (var i = 0; i < videoKeyNum; i++) {
                var point = this.getBoxSize(arrayBuffer, offset + 16 + i * 4);
                this.videoSeekPointsArr.push(point);
                this.mediaInfo.videoKeyPointTimeArr.push((point - 1) / (this.timeScale / this.sample_delta));
            }
            this.mediaInfo.keyPointArr = this.videoSeekPointsArr;
            // this.logger("videoSeekPointsArr:" + this.videoSeekPointsArr);
        }
    }, {
        key: "stscBox",
        value: function stscBox(arrayBuffer, offset) {
            var num = this.getBoxSize(arrayBuffer, offset + 12);
            if (this.stscBoxDic == null) {
                this.stscBoxDic = {};
            }
            for (var i = 0; i < num; i++) {
                var firstChunkNum = this.getBoxSize(arrayBuffer, offset + 16 + i * 12);
                var samplesPerChunkNum = this.getBoxSize(arrayBuffer, offset + 16 + i * 12 + 4);
                var samplesDescriptionIndex = this.getBoxSize(arrayBuffer, offset + 16 + i * 12 + 8);
                this.stscBoxDic[firstChunkNum] = samplesPerChunkNum;
            }
            // this.logger("**********stscBox*********");
            // this.logger(this.stscBoxDic);
            // this.log("firstChunkArr:", this.firstChunkArr);
            // this.log("samplesPerChunkArr:", this.samplesPerChunkArr);
            // this.log("samplesDescriptionIndexArr:", this.samplesDescriptionIndexArr);
        }
    }, {
        key: "stszBox",
        value: function stszBox(arrayBuffer, offset) {
            if (!Array.isArray(this.sampleSize)) this.sampleSize = [];
            var num = this.getBoxSize(arrayBuffer, offset + 12);
            if (num === 0) {
                var sizeNum = this.getBoxSize(arrayBuffer, offset + 16);
                // this.log(arrayBuffer.byteLength + "   " + sizeNum);
                for (var i = 0; i < sizeNum; i++) {
                    var boxSize = this.getBoxSize(arrayBuffer, offset + 20 + i * 4);
                    // this.log("---:" + (offset + 20 + i * 4) + "***" + boxSize);
                    this.sampleSize.push(boxSize);
                }
            }
            // this.log("sampleSize:", this.sampleSize);
        }
    }, {
        key: "stcoBox",
        value: function stcoBox(arrayBuffer, offset) {
            if (!Array.isArray(this.chunkOffset)) this.chunkOffset = [];
            var num = this.getBoxSize(arrayBuffer, offset + 12);
            for (var i = 0; i < num; i++) {
                this.chunkOffset.push(this.getBoxSize(arrayBuffer, offset + 16 + i * 4));
            }
            // this.log("chunkOffset:", this.chunkOffset);
        }
    }, {
        key: "cttsBox",
        value: function cttsBox(arrayBuffer, offset) {
            //占时没有用
            var cttsLen = this.getBoxSize(arrayBuffer, offset);
            var offNum = 16;
            this.ctsbArr = [];
            var samlpCountNum = 0;
            while (offNum < cttsLen) {
                var samlpCount = this.getBoxSize(arrayBuffer, offset + offNum);
                var samlpOffset = this.getBoxSize(arrayBuffer, offset + offNum + 4);
                offNum = offNum + 8;
                samlpCountNum += samlpCount;
                this.ctsbArr.push({
                    "samlpCount": samlpCount,
                    "samlpOffset": samlpOffset
                });
            }
            // console.log(" samlpCountNum***** : " + samlpCountNum);
        }
    }, {
        key: "parseAvc1AvcCData",
        value: function parseAvc1AvcCData(arrayBuffer, offset, boxLength) {
            var boxName = this.getBoxName(arrayBuffer, offset);
            var boxSize = this.getBoxSize(arrayBuffer, offset);
            var boxOffset = offset + 9;
            if (boxName != "avcC") {
                this.logger("avcC box is worng data");
                return;
            }
            var dataV = new DataView(arrayBuffer, boxOffset);
            var AVCProfileIndication = dataV.getUint8(0);
            var profile_compatibility = dataV.getUint8(1);
            var AVCLevelIndication = dataV.getUint8(2);
            var reserved = dataV.getUint8(3);
            var naluLengthSize = dataV.getUint8(3) & 3;
            if (naluLengthSize !== 3 && reserved >> 2 !== 63) {
                this.log(" Strange NaluLengthSizeMinusOne:" + naluLengthSize);
                return;
            }
            reserved = dataV.getUint8(4);
            var numOfSequenceParameterSets = dataV.getUint8(4) & 31;
            if (reserved >> 5 !== 7 && numOfSequenceParameterSets !== 1) {
                this.log(" Strange numOfSequenceParameterSets:" + numOfSequenceParameterSets);
                return;
            }
            boxOffset = boxOffset + 5;
            var spsLen = this.getBoxSize(arrayBuffer, offset + 14, 2);
            boxOffset = boxOffset + 2;
            var spsBuffer = new Uint8Array(arrayBuffer, boxOffset, spsLen);
            this.config = _spsParser2.default.parseSPS(spsBuffer);
            // this.logger("config:");
            // this.logger(this.config);
            this.sps = spsBuffer;
            var codecArray = this.sps.subarray(1, 4);
            var codecString = 'avc1.';
            for (var j = 0; j < 3; j++) {
                var h = codecArray[j].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                codecString += h;
            }
            this.mediaInfo.videoCodec = codecString;
            // this.logger("codecString:" + codecString);
            // this.logger("sps:" + spsBuffer + "  spsLen:" + spsLen);

            boxOffset = boxOffset + spsLen + 1;
            var ppsLen = this.getBoxSize(arrayBuffer, boxOffset, 2);
            boxOffset = boxOffset + 2;
            var ppsBuffer = new Uint8Array(arrayBuffer, boxOffset, ppsLen);
            this.pps = ppsBuffer;
            //------------------PPS---------------------------
            var audioObjectType = 0;
            var samplingIndex = 0;
            // 5 bits
            audioObjectType = this.pps[0] >>> 3;
            // 4 bits
            samplingIndex = (this.pps[0] & 0x07) << 1 | this.pps[1] >>> 7;

            var userAgent = self.navigator.userAgent.toLowerCase();

            if (userAgent.indexOf('firefox') !== -1) {
                // firefox: use SBR (HE-AAC) if freq less than 24kHz
                if (samplingIndex >= 6) {
                    audioObjectType = 5;
                } else {
                    // use LC-AAC
                    audioObjectType = 2;
                }
            } else if (userAgent.indexOf('android') !== -1) {
                // android: always use LC-AAC
                audioObjectType = 2;
            } else {
                // for other browsers, e.g. chrome...
                // Always use HE-AAC to make it easier to switch aac codec profile
                audioObjectType = 5;
            }
            this.mediaInfo.audioCodec = 'mp4a.40.' + audioObjectType;
            this.mediaInfo.avcc = new Uint8Array(arrayBuffer, offset + 8, boxSize - 8);
            this.logger('mp4a.40.' + audioObjectType);
            this.logger("pps:" + ppsBuffer + "  ppsLen:" + ppsLen);
        }
    }, {
        key: "pushSoundMetaData",
        value: function pushSoundMetaData() {
            var meta = this._soundMetadata;
            if (!meta) {
                meta = this._audioMetadata = {};
                meta.type = 'audio';
                meta.id = this.trakId;
                meta.timescale = this.timeScale;
                meta.duration = this.timeDuration;
                meta.codec = this.mediaInfo.audioCodec;
                meta.audioStsd = this.mediaInfo.audioStsdUintArrayData;
                // meta.audioSampleRate = soundRate;
                // meta.channelCount = (soundType === 0 ? 1 : 2);
            }
            this.onInitSegment(meta.type, this.metaData(meta.type, meta));
        }
    }, {
        key: "pushVideoMetaData",
        value: function pushVideoMetaData() {
            var meta = this._videoMetadata;
            if (!meta) {
                meta = this._videoMetadata = {};
                meta.type = 'video';
                meta.id = this.trakId;
                meta.timescale = this.timeScale;
                meta.duration = this.timeDuration;
                meta.codec = this.mediaInfo.videoCodec;
                meta.avcc = this.mediaInfo.avcc;
                meta.presentWidth = this;
                meta.codecWidth = this.config.codec_size.width;
                meta.codecHeight = this.config.codec_size.height;
                meta.presentWidth = this.config.present_size.width;
                meta.presentHeight = this.config.present_size.height;
            }
            this.onInitSegment(meta.type, this.metaData(meta.type, meta));
        }
    }, {
        key: "mixKeyTrackData",
        value: function mixKeyTrackData(arrayBuffer, obj) {
            var chunkNumArr = obj.chunkNumArr;
            var chunkLen = chunkNumArr.length;
            var chunkBeginOff = 0;
            var chunkOffset = 0;
            var track = null;
            if (this.typeName == "vide") {
                track = this.videoTrack;
            } else {
                track = this.audioTrack;
            }
            for (var k = 0; k < chunkLen; k++) {
                var i = chunkNumArr[k];
                var units = [];
                var sampleLen = this.sampleSize[i + this.stscSamplesOffset];
                var chunkStart = this.chunkOffset[i];
                var keyframe = k == 0;
                var dts = 0;
                var cts = 0;
                if (chunkBeginOff == 0) chunkBeginOff = chunkStart;
                chunkOffset = chunkStart - chunkBeginOff;
                dts = (i + 1 + this.stscSamplesOffset) * this.sample_delta + this.mediaTime;
                if (this.stscBoxDic[i + 1] != undefined) {
                    var chunkOffsetNum = this.stscBoxDic[i + 1];
                    if (chunkOffsetNum > 1) {
                        for (var chunkI = 1; chunkI < chunkOffsetNum; chunkI++) {
                            sampleLen += this.sampleSize[i + this.stscSamplesOffset + chunkI];
                        }
                    }
                    this.stscSamplesOffset += chunkOffsetNum - 1;
                }

                // if (this.typeName == "vide") {

                // }
                if (this.ctsbArr != null && this.ctsbArr.length > 0) {
                    var stsbLen = this.ctsbArr.length;
                    var samlpCount = 0;
                    var ctsObj = null;
                    if (this.stscBoxDic[i + 1] != undefined) {
                        var stscSamplesPerChunkNum = this.stscBoxDic[i + 1];
                        for (var m = 0; m < stsbLen; m++) {
                            ctsObj = this.ctsbArr[m];
                            samlpCount += ctsObj.samlpCount;
                            if (samlpCount >= i + 1) {
                                for (var s = 0; s < stscSamplesPerChunkNum; s++) {
                                    var cttsO = this.ctsbArr[m + s + this.stscToCttsOffset];
                                    cts += cttsO.samlpOffset;
                                }
                                break;
                            }
                            // (i + this.stscToCttsOffset + stscSamplesPerChunkNum)
                        }
                        this.stscToCttsOffset += stscSamplesPerChunkNum - 1;
                    } else {
                        for (var j = 0; j < stsbLen; j++) {
                            ctsObj = this.ctsbArr[j];
                            samlpCount += ctsObj.samlpCount;
                            // cts += ctsObj.samlpOffset;
                            // if (this.stscSamplesOffset <= j)

                            if (samlpCount >= i + 1 + this.stscToCttsOffset) {
                                cts = ctsObj.samlpOffset;
                                break;
                            }
                        }
                    }
                }
                // var mdatBuf = this.creatBuffer(arrayBuffer, chunkOffset, sampleLen);
                try {
                    var mdatBuf = new Uint8Array(arrayBuffer, chunkOffset, sampleLen);
                } catch (e) {
                    this.log(arrayBuffer.byteLength, chunkOffset, sampleLen, "    *** mixKeyTrackData UintArr8Error***   ", i, this.typeName);
                    return;
                }
                var unit = {
                    "chunkStart": chunkStart,
                    "sampleLen": sampleLen,
                    "data": mdatBuf
                };
                units.push(unit);
                var avcSample = {
                    units: units,
                    length: sampleLen,
                    isKeyframe: keyframe,
                    dts: dts,
                    cts: cts, // data 第2个字节
                    pts: dts + cts
                };
                track.samples.push(avcSample);
                track.length += sampleLen;
            }
            // console.log("-*g*g*g*g*g*g*g*g*g*g*g*g*g*g*g*g*g*-");
            // this.log(track);
            if (this.typeName == "soun") {
                this._onDataAvailable(track, null);
            } else {
                // if (this.numV >= 2)return;
                this._onDataAvailable(null, track);
            }
        }
    }, {
        key: "creatBuffer",
        value: function creatBuffer(arrayBuffer, chunkOffset, sampleLen) {
            var buf = null;
            try {
                buf = new Uint8Array(arrayBuffer, chunkOffset, sampleLen);
            } catch (e) {
                console.log("creatBuffer ----:" + chunkOffset + "  **   " + sampleLen);
                buf = this.creatBuffer(arrayBuffer, chunkOffset, sampleLen);
            }
            return buf;
        }
    }, {
        key: "keyOffsetData",
        value: function keyOffsetData() {
            // if (this.sampleSize.length == this.chunkOffset.length) {
            var len = this.chunkOffset.length;
            var dtsKey = 0;
            var startDts = 0;
            var keyOff = 0;
            var keyNumT = this.mediaInfo.videoKeyPointTimeArr[keyOff + 1];
            var endDts = keyNumT;
            var beginOff = 0;
            var chunkNumArr = [];

            for (var i = 0; i < len; i++) {
                var sampleLen = this.sampleSize[i + this.stscSamplesOffset];
                var chunkStart = this.chunkOffset[i];
                if (beginOff == 0) {
                    beginOff = chunkStart;
                }
                dtsKey = (i + this.stscSamplesOffset + 1) * this.sample_delta / this.timeScale;
                sampleLen += this.SamplesPerChunkNum(i);

                // if (dtsKey > keyNumT)
                //     for (let k = 0; k < this.mediaInfo.videoKeyPointTimeArr.length; k++) {
                if (keyNumT == 'undefined' || keyNumT == undefined) {
                    if (i == len - 1) {
                        endDts = dtsKey;
                        this.keyOffset.push({
                            "startDts": startDts,
                            "endDts": endDts,
                            "beginOff": beginOff,
                            "chunkStart": chunkStart,
                            "sampleLen": sampleLen,
                            "chunkLen": chunkStart - beginOff + sampleLen,
                            "chunkMaxLen": chunkStart + sampleLen,
                            "chunkNumArr": chunkNumArr,
                            "loadLenBol": false,
                            "bol": true
                        });
                        this.stscSamplesOffset = 0;
                        return;
                    }
                } else if (dtsKey >= keyNumT) {

                    this.keyOffset.push({
                        "startDts": startDts,
                        "endDts": endDts,
                        "beginOff": beginOff,
                        "chunkStart": chunkStart,
                        "sampleLen": sampleLen,
                        "chunkLen": chunkStart - beginOff + sampleLen,
                        "chunkMaxLen": chunkStart + sampleLen,
                        "chunkNumArr": chunkNumArr,
                        "loadLenBol": false,
                        "bol": true
                    });
                    chunkNumArr = [];
                    beginOff = this.chunkOffset[i];
                    keyOff += 1;
                    startDts = dtsKey;
                    endDts = keyNumT = this.mediaInfo.videoKeyPointTimeArr[keyOff + 1];
                }
                chunkNumArr.push(i);
                // }
            }
            // }
        }
    }, {
        key: "SamplesPerChunkNum",
        value: function SamplesPerChunkNum(i) {
            var sampleLen = 0;
            if (this.stscBoxDic[i + 1] != undefined) {
                var chunkOffsetNum = this.stscBoxDic[i + 1];
                if (chunkOffsetNum > 1) {
                    for (var chunkI = 1; chunkI < chunkOffsetNum; chunkI++) {
                        sampleLen += this.sampleSize[i + this.stscSamplesOffset + chunkI];
                    }
                }
                this.stscSamplesOffset += chunkOffsetNum - 1;
            }
            return sampleLen;
        }
    }, {
        key: "keyDataLen",
        value: function keyDataLen(len, i) {
            // let keyL = this.keyOffset.length;
            // for (var i = 0; i < keyL; i++) {
            if (len >= this.keyOffset[i].chunkMaxLen) {
                if (!this.keyOffset[i].loadLenBol) {
                    // this.keyOffset[i].loadLenBol = true;
                    return this.keyOffset[i];
                }
            } else {
                return { "bol": false };
            }
            // }
            return { "bol": false };
        }
    }, {
        key: "keyOffsetValue",
        value: function keyOffsetValue(timeNum) {
            var keyL = this.keyOffset.length;
            for (var i = 0; i < keyL; i++) {
                if (timeNum > this.keyOffset[i].startDts && timeNum <= this.keyOffset[i].endDts) {
                    this.stscSamplesOffsetSeek(this.keyOffset[i]);
                    return {
                        "keyNum": i,
                        "tNum": this.keyOffset[i].startDts
                    };
                }
            }
            return {
                "keyNum": -1,
                "tNum": timeNum
            };
        }
    }, {
        key: "stscSamplesOffsetSeek",
        value: function stscSamplesOffsetSeek(obj) {
            this.stscSamplesOffset = 0;
            var num = obj.chunkNumArr[0];
            for (var i = 0; i < num; i++) {
                this.SamplesPerChunkNum(i);
            }
        }

        /**
         * 属性 type   id   sequenceNumber   samples   length
         * */

    }, {
        key: "getBoxName",
        value: function getBoxName(arrayBuffer, offset) {
            var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;

            var dataV = new DataView(arrayBuffer, offset, length);
            var strName = String.fromCharCode(dataV.getUint8(4)) + String.fromCharCode(dataV.getUint8(5)) + String.fromCharCode(dataV.getUint8(6)) + String.fromCharCode(dataV.getUint8(7));
            // this.log(dataV.getUint8(4), dataV.getUint8(5), dataV.getUint8(6), dataV.getUint8(7), "  boxName", strName, "offset:", offset)
            return strName;
        }
    }, {
        key: "getBoxSize",
        value: function getBoxSize(arrayBuffer, offset) {
            var lenght = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

            var dataV = new DataView(arrayBuffer, offset);
            var lenStr = "";
            for (var i = 0; i < lenght; i++) {
                lenStr = lenStr + this.toString16(dataV.getUint8(i));
            }
            // var lenStr = toString16(dataV.getUint8(i)) + toString16(dataV.getUint8(1)) + toString16(dataV.getUint8(2)) + toString16(dataV.getUint8(3))
            var len = parseInt("0x" + lenStr);
            // log(lenStr, "lenStr string16");
            // log(dataV.getUint8(0), dataV.getUint8(1), dataV.getUint8(2), dataV.getUint8(3))
            return len;
        }
    }, {
        key: "toString16",
        value: function toString16(num) {
            var str = num.toString(16);
            if (str.length == 1) str = "0" + str;
            return str;
        }
    }, {
        key: "log",
        value: function log() {
            var str = "";
            for (var i = 0; i < arguments.length; i++) {
                str += arguments[i] + "  ";
            }
            console.log(str);
        }
    }, {
        key: "logger",
        value: function logger(str) {
            console.log(str);
        }
    }, {
        key: "isOwnEmpty",
        value: function isOwnEmpty(obj) {
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "videoTrack",
        get: function get() {
            return this._videoTrack;
        }
    }, {
        key: "audioTrack",
        get: function get() {
            return this._audioTrack;
        }
    }, {
        key: "typeName",
        get: function get() {
            return this.trakBoxTypename;
        },
        set: function set(name) {
            this.trakBoxTypename = name;
        }
    }, {
        key: "metaData",
        get: function get() {
            return this._metaData;
        },
        set: function set(value) {
            this._metaData = value;
        }
    }, {
        key: "onInitSegment",
        get: function get() {
            return this._onInitSegment;
        },
        set: function set(value) {
            this._onInitSegment = value;
        }
    }, {
        key: "onDataAvailable",
        set: function set(value) {
            this._onDataAvailable = value;
        }
    }]);

    return TrakBox;
}();

exports.default = TrakBox;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by PC-275 on 2017/5/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// import EventEmitter from "../event/EventEmitter.js";


var _Fmp4Box = __webpack_require__(6);

var _Fmp4Box2 = _interopRequireDefault(_Fmp4Box);

var _mediaSegmentInfo = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fmp4Remuxer = function () {
    function Fmp4Remuxer() {
        _classCallCheck(this, Fmp4Remuxer);

        // this._emitter = new EventEmitter();
        this._onInitSegment = null;
        this._audioSegmentInfoList = new _mediaSegmentInfo.MediaSegmentInfoList('audio');
        this._videoSegmentInfoList = new _mediaSegmentInfo.MediaSegmentInfoList('video');
    }

    _createClass(Fmp4Remuxer, [{
        key: "trakBind",
        value: function trakBind(trakB) {
            trakB.metaData = this.metaData.bind(this);
            trakB.onDataAvailable = this.onDataAvailable.bind(this);
        }
    }, {
        key: "metaData",
        value: function metaData(type, _metaData) {
            var metabox = null;
            var container = 'mp4';
            var codec = _metaData.codec;
            if (type === 'audio') {
                this._audioMeta = _metaData;
                if (_metaData.codec === 'mp3' && this._mp3UseMpegAudio) {
                    // 'audio/mpeg' for MP3 audio track
                    container = 'mpeg';
                    codec = '';
                    metabox = new Uint8Array();
                } else {
                    // 'audio/mp4, codecs="codec"'
                    metabox = _Fmp4Box2.default.generateInitSegment(_metaData);
                }
            } else if (type === 'video') {
                this._videoMeta = _metaData;
                metabox = _Fmp4Box2.default.generateInitSegment(_metaData);
            } else {
                return;
            }
            return {
                type: type,
                data: metabox.buffer,
                codec: codec,
                container: type + "/" + container,
                mediaDuration: _metaData.duration // in timescale 1000 (milliseconds)
            };

            this._onInitSegment(type, {
                type: type,
                data: metabox.buffer,
                codec: codec,
                container: type + "/" + container,
                mediaDuration: _metaData.duration // in timescale 1000 (milliseconds)
            });
        }
    }, {
        key: "onDataAvailable",
        value: function onDataAvailable(audioTrack, videoTrack) {
            if (!this._dtsBaseInited) {
                this._calculateDtsBase(audioTrack, videoTrack);
            }
            // console.log(audioTrack, videoTrack);
            if (videoTrack != null) this._remuxVideo(videoTrack);
            if (audioTrack != null) this._remuxAudio(audioTrack);
        }
    }, {
        key: "_calculateDtsBase",
        value: function _calculateDtsBase(audioTrack, videoTrack) {
            if (this._dtsBaseInited) return;
            if (audioTrack != null && audioTrack.samples && audioTrack.samples.length) this._audioDtsBase = audioTrack.samples[0].dts;
            if (videoTrack != null && videoTrack.samples && videoTrack.samples.length) this._videoDtsBase = videoTrack.samples[0].dts;
            // this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
            this._dtsBase = 0;
            this._dtsBaseInited = true;
        }
    }, {
        key: "_remuxAudio",
        value: function _remuxAudio(audioTrack) {
            var track = audioTrack;
            var samples = track.samples;
            var firstDts = -1,
                lastDts = -1,
                lastPts = -1;

            if (!samples || samples.length === 0) {
                return;
            }

            var bytes = 0;
            var offset = 0;
            var mdatbox = null;

            // allocate for fmp4 mdat box
            bytes = 8 + track.length;
            offset = 8; // size + type
            mdatbox = new Uint8Array(bytes);
            // size field
            mdatbox[0] = bytes >>> 24 & 0xFF;
            mdatbox[1] = bytes >>> 16 & 0xFF;
            mdatbox[2] = bytes >>> 8 & 0xFF;
            mdatbox[3] = bytes & 0xFF;
            // type field (fourCC)
            mdatbox.set(_Fmp4Box2.default.types.mdat, 4);

            var mp4Samples = [];

            while (samples.length) {
                var aacSample = samples.shift();
                var unit = aacSample.units;
                var originalDts = aacSample.dts - this._dtsBase;
                var sampleSize = 0;

                var dts = originalDts;
                if (firstDts === -1) {
                    firstDts = dts;
                }

                var sampleDuration = 0;
                if (samples.length >= 1) {
                    var nextDts = samples[0].dts - this._dtsBase;
                    sampleDuration = nextDts - dts;
                } else {
                    if (mp4Samples.length >= 1) {
                        // use second last sample duration
                        sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                    } else {
                        // the only one sample, use reference sample duration
                        sampleDuration = this._audioMeta.refSampleDuration;
                    }
                }
                while (unit.length) {
                    var unitD = unit.shift();
                    var data = unitD.data;
                    mdatbox.set(data, offset);
                    offset += data.byteLength;
                    sampleSize += data.byteLength;
                }
                var mp4Sample = {
                    dts: dts,
                    pts: dts,
                    cts: 0,
                    size: sampleSize,
                    duration: sampleDuration,
                    originalDts: originalDts,
                    flags: {
                        isLeading: 0,
                        dependsOn: 1,
                        isDependedOn: 0,
                        hasRedundancy: 0
                    }
                };
                mp4Samples.push(mp4Sample);
                // offset += unit.byteLength;
            }

            track.samples = mp4Samples;
            track.sequenceNumber++;

            var moofbox = null;

            // Generate moof for fmp4 segment
            moofbox = _Fmp4Box2.default.moof(track, firstDts);

            track.samples = [];
            track.length = 0;
            // let segment = {
            //     type: 'audio',
            //     data: this._mergeBoxes(moofbox, mdatbox).buffer,
            //     sampleCount: mp4Samples.length,
            //     // info: info
            // };

            this._doAppendSegments('audio', {
                type: 'audio',
                data: this._mergeBoxes(moofbox, mdatbox).buffer,
                sampleCount: mp4Samples.length
            });
            // this._onMediaSegment('audio', segment);
        }
    }, {
        key: "_remuxVideo",
        value: function _remuxVideo(videoTrack) {
            // console.log("**console.log(videoTrack);**");
            // console.log(videoTrack);
            var track = videoTrack;
            var samples = track.samples;
            var firstDts = -1,
                lastDts = -1;
            var firstPts = -1,
                lastPts = -1;

            if (!samples || samples.length === 0) {
                return;
            }

            var bytes = 8 + videoTrack.length;
            var mdatbox = new Uint8Array(bytes);
            mdatbox[0] = bytes >>> 24 & 0xFF;
            mdatbox[1] = bytes >>> 16 & 0xFF;
            mdatbox[2] = bytes >>> 8 & 0xFF;
            mdatbox[3] = bytes & 0xFF;
            mdatbox.set(_Fmp4Box2.default.types.mdat, 4);

            var offset = 8;
            var mp4Samples = [];
            var info = new _mediaSegmentInfo.MediaSegmentInfo();

            while (samples.length) {
                var avcSample = samples.shift();
                var keyframe = avcSample.isKeyframe;
                var originalDts = avcSample.dts - this._dtsBase;

                var dts = originalDts;
                var cts = avcSample.cts; // data 第2个字节
                var pts = dts + cts;

                if (firstDts === -1) {
                    firstDts = dts;
                    firstPts = pts;
                }

                // fill mdat box
                var sampleSize = 0;
                while (avcSample.units.length) {
                    var unit = avcSample.units.shift();
                    var data = unit.data;
                    mdatbox.set(data, offset);
                    offset += data.byteLength;
                    sampleSize += data.byteLength;
                }

                var sampleDuration = 0;

                if (samples.length >= 1) {
                    var nextDts = samples[0].dts - this._dtsBase;
                    sampleDuration = nextDts - dts;
                } else {
                    if (mp4Samples.length >= 1) {
                        // lastest sample, use second last duration
                        sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                    } else {
                        // the only one sample, use reference duration
                        sampleDuration = this._videoMeta.refSampleDuration;
                    }
                }
                // if (keyframe) {
                //     let syncPoint = new SampleInfo(dts, pts, sampleDuration, avcSample.dts, true);
                //     syncPoint.fileposition = avcSample.fileposition;//"tagPosition"
                //     info.appendSyncPoint(syncPoint);
                // }

                var mp4Sample = {
                    dts: dts,
                    pts: pts,
                    cts: cts,
                    size: sampleSize,
                    isKeyframe: keyframe,
                    duration: sampleDuration,
                    originalDts: originalDts,
                    flags: {
                        isLeading: 0,
                        dependsOn: keyframe ? 2 : 1,
                        isDependedOn: keyframe ? 1 : 0,
                        hasRedundancy: 0,
                        isNonSync: keyframe ? 0 : 1
                    }
                };

                mp4Samples.push(mp4Sample);
            }
            // let latest = mp4Samples[mp4Samples.length - 1];
            // lastDts = latest.dts + latest.duration;
            // lastPts = latest.pts + latest.duration;
            // this._videoNextDts = lastDts;
            //
            // // fill media segment info & add to info list
            // info.beginDts = firstDts;
            // info.endDts = lastDts;
            // info.beginPts = firstPts;
            // info.endPts = lastPts;
            // info.originalBeginDts = mp4Samples[0].originalDts;
            // info.originalEndDts = latest.originalDts + latest.duration;
            // info.firstSample = new SampleInfo(mp4Samples[0].dts,
            //     mp4Samples[0].pts,
            //     mp4Samples[0].duration,
            //     mp4Samples[0].originalDts,
            //     mp4Samples[0].isKeyframe);
            // info.lastSample = new SampleInfo(latest.dts,
            //     latest.pts,
            //     latest.duration,
            //     latest.originalDts,
            //     latest.isKeyframe);
            // if (!this._isLive) {
            //     this._videoSegmentInfoList.append(info);
            // }
            track.samples = mp4Samples;
            track.sequenceNumber++;

            // workaround for chrome < 50: force first sample as a random access point
            // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
            if (this._forceFirstIDR) {
                var flags = mp4Samples[0].flags;
                flags.dependsOn = 2;
                flags.isNonSync = 0;
            }
            // console.log("--*****-----track.sequenceNumber: " + track.sequenceNumber);
            var moofbox = _Fmp4Box2.default.moof(track, firstDts);
            track.samples = [];
            track.length = 0;
            // console.log("run here -data");
            this._doAppendSegments('video', {
                type: 'video',
                data: this._mergeBoxes(moofbox, mdatbox).buffer,
                sampleCount: mp4Samples.length,
                info: info
            });
        }
    }, {
        key: "_mergeBoxes",
        value: function _mergeBoxes(moof, mdat) {
            var result = new Uint8Array(moof.byteLength + mdat.byteLength);
            result.set(moof, 0);
            result.set(mdat, moof.byteLength);
            return result;
        }
    }, {
        key: "onInitSegment",
        get: function get() {
            this._onInitSegment;
        },
        set: function set(callback) {
            this._onInitSegment = callback;
        }
    }, {
        key: "doAppendSegments",
        set: function set(value) {
            this._doAppendSegments = value;
        }
    }]);

    return Fmp4Remuxer;
}();

exports.default = Fmp4Remuxer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RuntimeException = exports.RuntimeException = function () {
    function RuntimeException(message) {
        _classCallCheck(this, RuntimeException);

        this._message = message;
    }

    _createClass(RuntimeException, [{
        key: 'toString',
        value: function toString() {
            return this.name + ': ' + this.message;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'RuntimeException';
        }
    }, {
        key: 'message',
        get: function get() {
            return this._message;
        }
    }]);

    return RuntimeException;
}();

var IllegalStateException = exports.IllegalStateException = function (_RuntimeException) {
    _inherits(IllegalStateException, _RuntimeException);

    function IllegalStateException(message) {
        _classCallCheck(this, IllegalStateException);

        return _possibleConstructorReturn(this, (IllegalStateException.__proto__ || Object.getPrototypeOf(IllegalStateException)).call(this, message));
    }

    _createClass(IllegalStateException, [{
        key: 'name',
        get: function get() {
            return 'IllegalStateException';
        }
    }]);

    return IllegalStateException;
}(RuntimeException);

var InvalidArgumentException = exports.InvalidArgumentException = function (_RuntimeException2) {
    _inherits(InvalidArgumentException, _RuntimeException2);

    function InvalidArgumentException(message) {
        _classCallCheck(this, InvalidArgumentException);

        return _possibleConstructorReturn(this, (InvalidArgumentException.__proto__ || Object.getPrototypeOf(InvalidArgumentException)).call(this, message));
    }

    _createClass(InvalidArgumentException, [{
        key: 'name',
        get: function get() {
            return 'InvalidArgumentException';
        }
    }]);

    return InvalidArgumentException;
}(RuntimeException);

var NotImplementedException = exports.NotImplementedException = function (_RuntimeException3) {
    _inherits(NotImplementedException, _RuntimeException3);

    function NotImplementedException(message) {
        _classCallCheck(this, NotImplementedException);

        return _possibleConstructorReturn(this, (NotImplementedException.__proto__ || Object.getPrototypeOf(NotImplementedException)).call(this, message));
    }

    _createClass(NotImplementedException, [{
        key: 'name',
        get: function get() {
            return 'NotImplementedException';
        }
    }]);

    return NotImplementedException;
}(RuntimeException);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exception = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Exponential-Golomb buffer decoder
var ExpGolomb = function () {
    // 67 64 00 28 AC D9 40 D8 3D E6 F0 11 00 00 null 00 01 00 00 null 00 3C 0F 18 31 96
    function ExpGolomb(uint8array) {
        _classCallCheck(this, ExpGolomb);

        this.TAG = 'ExpGolomb';

        this._buffer = uint8array;
        this._buffer_index = 0;
        this._total_bytes = uint8array.byteLength;
        this._total_bits = uint8array.byteLength * 8;
        this._current_word = 0;
        this._current_word_bits_left = 0;
    }

    _createClass(ExpGolomb, [{
        key: 'destroy',
        value: function destroy() {
            this._buffer = null;
        }
    }, {
        key: '_fillCurrentWord',
        value: function _fillCurrentWord() {
            var buffer_bytes_left = this._total_bytes - this._buffer_index;
            if (buffer_bytes_left <= 0) throw new _exception.IllegalStateException('ExpGolomb: _fillCurrentWord() but no bytes available');

            var bytes_read = Math.min(4, buffer_bytes_left);
            var word = new Uint8Array(4);
            word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
            this._current_word = new DataView(word.buffer).getUint32(0, false);

            this._buffer_index += bytes_read;
            this._current_word_bits_left = bytes_read * 8;
        }
    }, {
        key: 'readBits',
        value: function readBits(bits) {
            if (bits > 32) throw new _exception.InvalidArgumentException('ExpGolomb: readBits() bits exceeded max 32bits!');
            // _current_word_bits_left=0,_current_word=0
            if (bits <= this._current_word_bits_left) {
                var _result = this._current_word >>> 32 - bits;
                this._current_word <<= bits;
                this._current_word_bits_left -= bits;
                return _result;
            }

            var result = this._current_word_bits_left ? this._current_word : 0;
            result = result >>> 32 - this._current_word_bits_left;
            var bits_need_left = bits - this._current_word_bits_left;
            this._fillCurrentWord();
            var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);

            var result2 = this._current_word >>> 32 - bits_read_next;
            this._current_word <<= bits_read_next;
            this._current_word_bits_left -= bits_read_next;

            result = result << bits_read_next | result2;
            return result;
        }
    }, {
        key: 'readBool',
        value: function readBool() {
            return this.readBits(1) === 1;
        }
    }, {
        key: 'readByte',
        value: function readByte() {
            return this.readBits(8);
        }
    }, {
        key: '_skipLeadingZero',
        value: function _skipLeadingZero() {
            var zero_count = void 0;
            for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
                if (0 !== (this._current_word & 0x80000000 >>> zero_count)) {
                    this._current_word <<= zero_count;
                    this._current_word_bits_left -= zero_count;
                    return zero_count;
                }
            }
            this._fillCurrentWord();
            return zero_count + this._skipLeadingZero();
        }
    }, {
        key: 'readUEG',
        value: function readUEG() {
            // unsigned exponential golomb
            var leading_zeros = this._skipLeadingZero();
            return this.readBits(leading_zeros + 1) - 1;
        }
    }, {
        key: 'readSEG',
        value: function readSEG() {
            // signed exponential golomb
            var value = this.readUEG();
            if (value & 0x01) {
                return value + 1 >>> 1;
            } else {
                return -1 * (value >>> 1);
            }
        }
    }]);

    return ExpGolomb;
}();

exports.default = ExpGolomb;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expGolomb = __webpack_require__(4);

var _expGolomb2 = _interopRequireDefault(_expGolomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SPSParser = function () {
    function SPSParser() {
        _classCallCheck(this, SPSParser);
    }

    _createClass(SPSParser, null, [{
        key: '_ebsp2rbsp',
        value: function _ebsp2rbsp(uint8array) {
            var src = uint8array;
            var src_length = src.byteLength;
            var dst = new Uint8Array(src_length);
            var dst_idx = 0;
            for (var i = 0; i < src_length; i++) {
                if (i >= 2) {
                    if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
                        continue;
                    }
                }
                dst[dst_idx] = src[i];
                dst_idx++;
            }

            return new Uint8Array(dst.buffer, 0, dst_idx);
        }
    }, {
        key: 'parseSPS',
        value: function parseSPS(uint8array) {
            var rbsp = SPSParser._ebsp2rbsp(uint8array);
            var gb = new _expGolomb2.default(rbsp);

            gb.readByte();
            var profile_idc = gb.readByte(); // profile_idc
            gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
            var level_idc = gb.readByte(); // level_idc
            gb.readUEG(); // seq_parameter_set_id

            var profile_string = SPSParser.getProfileString(profile_idc);
            var level_string = SPSParser.getLevelString(level_idc);
            var chroma_format_idc = 1;
            var chroma_format = 420;
            var chroma_format_table = [0, 420, 422, 444];
            var bit_depth = 8;

            if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {

                chroma_format_idc = gb.readUEG();
                if (chroma_format_idc === 3) {
                    gb.readBits(1); // separate_colour_plane_flag
                }
                if (chroma_format_idc <= 3) {
                    chroma_format = chroma_format_table[chroma_format_idc];
                }

                bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8
                gb.readUEG(); // bit_depth_chroma_minus8
                gb.readBits(1); // qpprime_y_zero_transform_bypass_flag
                if (gb.readBool()) {
                    // seq_scaling_matrix_present_flag
                    var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
                    for (var i = 0; i < scaling_list_count; i++) {
                        if (gb.readBool()) {
                            // seq_scaling_list_present_flag
                            if (i < 6) {
                                SPSParser._skipScalingList(gb, 16);
                            } else {
                                SPSParser._skipScalingList(gb, 64);
                            }
                        }
                    }
                }
            }
            gb.readUEG(); // log2_max_frame_num_minus4
            var pic_order_cnt_type = gb.readUEG();
            if (pic_order_cnt_type === 0) {
                gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
            } else if (pic_order_cnt_type === 1) {
                gb.readBits(1); // delta_pic_order_always_zero_flag
                gb.readSEG(); // offset_for_non_ref_pic
                gb.readSEG(); // offset_for_top_to_bottom_field
                var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
                for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
                    gb.readSEG(); // offset_for_ref_frame
                }
            }
            gb.readUEG(); // max_num_ref_frames
            gb.readBits(1); // gaps_in_frame_num_value_allowed_flag

            var pic_width_in_mbs_minus1 = gb.readUEG();
            var pic_height_in_map_units_minus1 = gb.readUEG();

            var frame_mbs_only_flag = gb.readBits(1);
            if (frame_mbs_only_flag === 0) {
                gb.readBits(1); // mb_adaptive_frame_field_flag
            }
            gb.readBits(1); // direct_8x8_inference_flag

            var frame_crop_left_offset = 0;
            var frame_crop_right_offset = 0;
            var frame_crop_top_offset = 0;
            var frame_crop_bottom_offset = 0;

            var frame_cropping_flag = gb.readBool();
            if (frame_cropping_flag) {
                frame_crop_left_offset = gb.readUEG();
                frame_crop_right_offset = gb.readUEG();
                frame_crop_top_offset = gb.readUEG();
                frame_crop_bottom_offset = gb.readUEG();
            }

            var sar_width = 1,
                sar_height = 1;
            var fps = 0,
                fps_fixed = true,
                fps_num = 0,
                fps_den = 0;

            var vui_parameters_present_flag = gb.readBool();
            if (vui_parameters_present_flag) {
                if (gb.readBool()) {
                    // aspect_ratio_info_present_flag
                    var aspect_ratio_idc = gb.readByte();
                    var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
                    var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

                    if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
                        sar_width = sar_w_table[aspect_ratio_idc - 1];
                        sar_height = sar_h_table[aspect_ratio_idc - 1];
                    } else if (aspect_ratio_idc === 255) {
                        sar_width = gb.readByte() << 8 | gb.readByte();
                        sar_height = gb.readByte() << 8 | gb.readByte();
                    }
                }

                if (gb.readBool()) {
                    // overscan_info_present_flag
                    gb.readBool(); // overscan_appropriate_flag
                }
                if (gb.readBool()) {
                    // video_signal_type_present_flag
                    gb.readBits(4); // video_format & video_full_range_flag
                    if (gb.readBool()) {
                        // colour_description_present_flag
                        gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
                    }
                }
                if (gb.readBool()) {
                    // chroma_loc_info_present_flag
                    gb.readUEG(); // chroma_sample_loc_type_top_field
                    gb.readUEG(); // chroma_sample_loc_type_bottom_field
                }
                if (gb.readBool()) {
                    // timing_info_present_flag
                    var num_units_in_tick = gb.readBits(32);
                    var time_scale = gb.readBits(32);
                    fps_fixed = gb.readBool(); // fixed_frame_rate_flag

                    fps_num = time_scale;
                    fps_den = num_units_in_tick * 2;
                    fps = fps_num / fps_den;
                }
            }

            var sarScale = 1;
            if (sar_width !== 1 || sar_height !== 1) {
                sarScale = sar_width / sar_height;
            }

            var crop_unit_x = 0,
                crop_unit_y = 0;
            if (chroma_format_idc === 0) {
                crop_unit_x = 1;
                crop_unit_y = 2 - frame_mbs_only_flag;
            } else {
                var sub_wc = chroma_format_idc === 3 ? 1 : 2;
                var sub_hc = chroma_format_idc === 1 ? 2 : 1;
                crop_unit_x = sub_wc;
                crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
            }

            var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
            var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

            codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
            codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

            var present_width = Math.ceil(codec_width * sarScale);

            gb.destroy();
            gb = null;

            return {
                profile_string: profile_string, // baseline, high, high10, ...
                level_string: level_string, // 3, 3.1, 4, 4.1, 5, 5.1, ...
                bit_depth: bit_depth, // 8bit, 10bit, ...
                chroma_format: chroma_format, // 4:2:0, 4:2:2, ...
                chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

                frame_rate: {
                    fixed: fps_fixed,
                    fps: fps,
                    fps_den: fps_den,
                    fps_num: fps_num
                },

                sar_ratio: {
                    width: sar_width,
                    height: sar_height
                },

                codec_size: {
                    width: codec_width,
                    height: codec_height
                },

                present_size: {
                    width: present_width,
                    height: codec_height
                }
            };
        }
    }, {
        key: '_skipScalingList',
        value: function _skipScalingList(gb, count) {
            var last_scale = 8,
                next_scale = 8;
            var delta_scale = 0;
            for (var i = 0; i < count; i++) {
                if (next_scale !== 0) {
                    delta_scale = gb.readSEG();
                    next_scale = (last_scale + delta_scale + 256) % 256;
                }
                last_scale = next_scale === 0 ? last_scale : next_scale;
            }
        }
    }, {
        key: 'getProfileString',
        value: function getProfileString(profile_idc) {
            switch (profile_idc) {
                case 66:
                    return 'Baseline';
                case 77:
                    return 'Main';
                case 88:
                    return 'Extended';
                case 100:
                    return 'High';
                case 110:
                    return 'High10';
                case 122:
                    return 'High422';
                case 244:
                    return 'High444';
                default:
                    return 'Unknown';
            }
        }
    }, {
        key: 'getLevelString',
        value: function getLevelString(level_idc) {
            return (level_idc / 10).toFixed(1);
        }
    }, {
        key: 'getChromaFormatString',
        value: function getChromaFormatString(chroma) {
            switch (chroma) {
                case 420:
                    return '4:2:0';
                case 422:
                    return '4:2:2';
                case 444:
                    return '4:4:4';
                default:
                    return 'Unknown';
            }
        }
    }]);

    return SPSParser;
}();

exports.default = SPSParser;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  MP4 boxes generator for ISO BMFF (ISO Base Media File Format, defined in ISO/IEC 14496-12)
var MP4 = function () {
    function MP4() {
        _classCallCheck(this, MP4);
    }

    _createClass(MP4, null, [{
        key: 'init',
        value: function init() {
            MP4.types = {
                avc1: [],
                avcC: [],
                btrt: [],
                dinf: [],
                dref: [],
                esds: [],
                ftyp: [],
                hdlr: [],
                mdat: [],
                mdhd: [],
                mdia: [],
                mfhd: [],
                minf: [],
                moof: [],
                moov: [],
                mp4a: [],
                mvex: [],
                mvhd: [],
                sdtp: [],
                stbl: [],
                stco: [],
                stsc: [],
                stsd: [],
                stsz: [],
                stts: [],
                tfdt: [],
                tfhd: [],
                traf: [],
                trak: [],
                trun: [],
                trex: [],
                tkhd: [],
                vmhd: [],
                smhd: [],
                '.mp3': []
            };

            for (var name in MP4.types) {
                if (MP4.types.hasOwnProperty(name)) {
                    MP4.types[name] = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];
                }
            }

            var constants = MP4.constants = {};

            constants.FTYP = new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // major_brand: isom
            0x0, 0x0, 0x0, 0x1, // minor_version: 0x01
            0x69, 0x73, 0x6F, 0x6D, // isom
            0x61, 0x76, 0x63, 0x31 // avc1
            ]);

            constants.STSD_PREFIX = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x01 // entry_count
            ]);

            constants.STTS = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00 // entry_count
            ]);

            constants.STSC = constants.STCO = constants.STTS;

            constants.STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // sample_size
            0x00, 0x00, 0x00, 0x00 // sample_count
            ]);

            constants.HDLR_VIDEO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler
            ]);

            constants.HDLR_AUDIO = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x73, 0x6F, 0x75, 0x6E, // handler_type: 'soun'
            0x00, 0x00, 0x00, 0x00, // reserved: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler
            ]);

            constants.DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x01, // entry_count
            0x00, 0x00, 0x00, 0x0C, // entry_size
            0x75, 0x72, 0x6C, 0x20, // type 'url '
            0x00, 0x00, 0x00, 0x01 // version(0) + flags
            ]);

            // Sound media header
            constants.SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2)
            ]);

            // video media header
            constants.VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, // version(0) + flags
            0x00, 0x00, // graphicsmode: 2 bytes
            0x00, 0x00, 0x00, 0x00, // opcolor: 3 * 2 bytes
            0x00, 0x00]);
        }

        // Generate a box

    }, {
        key: 'box',
        value: function box(type) {
            var size = 8;
            var result = null;
            var datas = Array.prototype.slice.call(arguments, 1);
            var arrayCount = datas.length;
            for (var i = 0; i < arrayCount; i++) {
                size += datas[i].byteLength;
            }

            result = new Uint8Array(size);
            result[0] = size >>> 24 & 0xFF; // size
            result[1] = size >>> 16 & 0xFF;
            result[2] = size >>> 8 & 0xFF;
            result[3] = size & 0xFF;

            result.set(type, 4); // type

            var offset = 8;
            for (var _i = 0; _i < arrayCount; _i++) {
                // data body
                result.set(datas[_i], offset);
                offset += datas[_i].byteLength;
            }

            return result;
        }

        // emit ftyp & moov

    }, {
        key: 'generateInitSegment',
        value: function generateInitSegment(meta) {
            var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
            var moov = MP4.moov(meta);

            var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
            result.set(ftyp, 0);
            result.set(moov, ftyp.byteLength);
            return result;
        }

        // Movie metadata

    }, {
        key: 'moov',
        value: function moov(meta) {
            var mvhd = MP4.mvhd(meta.timescale, meta.duration);
            var trak = MP4.trak(meta);
            var mvex = MP4.mvex(meta);
            return MP4.box(MP4.types.moov, mvhd, trak, mvex);
        }

        // Movie header

    }, {
        key: 'mvhd',
        value: function mvhd(timescale, duration) {
            return MP4.box(MP4.types.mvhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // creation_time
            0x00, 0x00, 0x00, 0x00, // modification_time
            timescale >>> 24 & 0xFF, // timescale: 4 bytes
            timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0
            0x01, 0x00, 0x00, 0x00, // PreferredVolume(1.0, 2bytes) + reserved(2bytes)
            0x00, 0x00, 0x00, 0x00, // reserved: 4 + 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
            0xFF, 0xFF, 0xFF, 0xFF // next_track_ID
            ]));
        }

        // Track

    }, {
        key: 'trak',
        value: function trak(meta) {
            var tkhdBox = MP4.tkhd(meta);
            var mdiaBox = MP4.mdia(meta);
            return MP4.box(MP4.types.trak, tkhdBox, mdiaBox);
        }

        // Track header

    }, {
        key: 'tkhd',
        value: function tkhd(meta) {
            var trackId = meta.id,
                duration = meta.duration;
            var width = meta.presentWidth,
                height = meta.presentHeight;

            return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // creation_time
            0x00, 0x00, 0x00, 0x00, // modification_time
            trackId >>> 24 & 0xFF, // track_ID: 4 bytes
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes
            duration >>> 24 & 0xFF, // duration: 4 bytes
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)
            0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)
            0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            width >>> 8 & 0xFF, // width and height
            width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, height & 0xFF, 0x00, 0x00]));
        }

        // Media Box

    }, {
        key: 'mdia',
        value: function mdia(meta) {
            return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
        }

        // Media header 

    }, {
        key: 'mdhd',
        value: function mdhd(meta) {
            var timescale = meta.timescale;
            var duration = meta.duration;
            return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            0x00, 0x00, 0x00, 0x00, // creation_time
            0x00, 0x00, 0x00, 0x00, // modification_time
            timescale >>> 24 & 0xFF, // timescale: 4 bytes
            timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined)
            0x00, 0x00 // pre_defined = 0
            ]));
        }

        // Media handler reference 

    }, {
        key: 'hdlr',
        value: function hdlr(meta) {
            var data = null;
            if (meta.type === 'audio') {
                data = MP4.constants.HDLR_AUDIO;
            } else {
                data = MP4.constants.HDLR_VIDEO;
            }
            return MP4.box(MP4.types.hdlr, data);
        }

        // Media infomation box

    }, {
        key: 'minf',
        value: function minf(meta) {
            var xmhd = null;
            if (meta.type === 'audio') {
                xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
            } else {
                xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
            }
            return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
        }

        // Data infomation 

    }, {
        key: 'dinf',
        value: function dinf() {
            var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
            return result;
        }

        // Sample table 

    }, {
        key: 'stbl',
        value: function stbl(meta) {
            var result = MP4.box(MP4.types.stbl, // type: stbl
            MP4.stsd(meta), // Sample Description Table
            MP4.box(MP4.types.stts, MP4.constants.STTS), // Time-To-Sample
            MP4.box(MP4.types.stsc, MP4.constants.STSC), // Sample-To-Chunk
            MP4.box(MP4.types.stsz, MP4.constants.STSZ), // Sample size
            MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset
            );
            return result;
        }

        // Sample description

    }, {
        key: 'stsd',
        value: function stsd(meta) {
            console.log(meta);
            if (meta.type === 'audio') {
                if (meta.codec === 'mp3') {
                    return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp3(meta));
                }
                // else: aac -> mp4a
                return meta.audioStsd;
                var mp4aBox = MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
                return mp4aBox;
            } else {
                return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
            }
        }
    }, {
        key: 'mp3',
        value: function mp3(meta) {
            var channelCount = meta.channelCount;
            var sampleRate = meta.audioSampleRate;

            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4)
            0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
            0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, channelCount, // channelCount(2)
            0x00, 0x10, // sampleSize(2)
            0x00, 0x00, 0x00, 0x00, // reserved(4)
            sampleRate >>> 8 & 0xFF, // Audio sample rate
            sampleRate & 0xFF, 0x00, 0x00]);

            return MP4.box(MP4.types['.mp3'], data);
        }
    }, {
        key: 'mp4a',
        value: function mp4a(meta) {
            var channelCount = meta.channelCount;
            var sampleRate = meta.audioSampleRate;

            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4)
            0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
            0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, channelCount, // channelCount(2)
            0x00, 0x10, // sampleSize(2)
            0x00, 0x00, 0x00, 0x00, // reserved(4)
            sampleRate >>> 8 & 0xFF, // Audio sample rate
            sampleRate & 0xFF, 0x00, 0x00]);

            return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
        }
    }, {
        key: 'esds',
        value: function esds(meta) {
            var config = meta.config || [];
            var configSize = config.length;
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version 0 + flags

            0x03, // descriptor_type
            0x17 + configSize, // length3
            0x00, 0x01, // es_id
            0x00, // stream_priority

            0x04, // descriptor_type
            0x0F + configSize, // length
            0x40, // codec: mpeg4_audio
            0x15, // stream_type: Audio
            0x00, 0x00, 0x00, // buffer_size
            0x00, 0x00, 0x00, 0x00, // maxBitrate
            0x00, 0x00, 0x00, 0x00, // avgBitrate

            0x05 // descriptor_type
            ].concat([configSize]).concat(config).concat([0x06, 0x01, 0x02 // GASpecificConfig
            ]));
            return MP4.box(MP4.types.esds, data);
        }
    }, {
        key: 'avc1',
        value: function avc1(meta) {
            var avcc = meta.avcc;
            var width = meta.codecWidth,
                height = meta.codecHeight;
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // reserved(4)
            0x00, 0x00, 0x00, 0x01, // reserved(2) + data_reference_index(2)
            0x00, 0x00, 0x00, 0x00, // pre_defined(2) + reserved(2)
            0x00, 0x00, 0x00, 0x00, // pre_defined: 3 * 4 bytes
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, width >>> 8 & 0xFF, // width: 2 bytes
            width & 0xFF, height >>> 8 & 0xFF, // height: 2 bytes
            height & 0xFF, 0x00, 0x48, 0x00, 0x00, // horizresolution: 4 bytes
            0x00, 0x48, 0x00, 0x00, // vertresolution: 4 bytes
            0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes
            0x00, 0x01, // frame_count
            0x0A, // strlen
            0x78, 0x71, 0x71, 0x2F, // compressorname: 32 bytes
            0x66, 0x6C, 0x76, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, // depth
            0xFF, 0xFF // pre_defined = -1
            ]);
            return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
        }

        // Movie Extends box

    }, {
        key: 'mvex',
        value: function mvex(meta) {
            return MP4.box(MP4.types.mvex, MP4.trex(meta));
        }

        // Track Extends box

    }, {
        key: 'trex',
        value: function trex(meta) {
            var trackId = meta.id;
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags
            trackId >>> 24 & 0xFF, // track_ID
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF, 0x00, 0x00, 0x00, 0x01, // default_sample_description_index
            0x00, 0x00, 0x00, 0x00, // default_sample_duration
            0x00, 0x00, 0x00, 0x00, // default_sample_size
            0x00, 0x01, 0x00, 0x01 // default_sample_flags
            ]);
            return MP4.box(MP4.types.trex, data);
        }

        // Movie fragment box

    }, {
        key: 'moof',
        value: function moof(track, baseMediaDecodeTime) {
            return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
        }
    }, {
        key: 'mfhd',
        value: function mfhd(sequenceNumber) {
            var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, sequenceNumber >>> 24 & 0xFF, // sequence_number: int32
            sequenceNumber >>> 16 & 0xFF, sequenceNumber >>> 8 & 0xFF, sequenceNumber & 0xFF]);
            return MP4.box(MP4.types.mfhd, data);
        }

        // Track fragment box

    }, {
        key: 'traf',
        value: function traf(track, baseMediaDecodeTime) {
            var trackId = track.id;

            // Track fragment header box
            var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
            trackId >>> 24 & 0xFF, // track_ID
            trackId >>> 16 & 0xFF, trackId >>> 8 & 0xFF, trackId & 0xFF]));
            // Track Fragment Decode Time
            var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) & flags
            baseMediaDecodeTime >>> 24 & 0xFF, // baseMediaDecodeTime: int32
            baseMediaDecodeTime >>> 16 & 0xFF, baseMediaDecodeTime >>> 8 & 0xFF, baseMediaDecodeTime & 0xFF]));
            var sdtp = MP4.sdtp(track);
            var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);

            return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
        }

        // Sample Dependency Type box

    }, {
        key: 'sdtp',
        value: function sdtp(track) {
            var samples = track.samples || [];
            var sampleCount = samples.length;
            var data = new Uint8Array(4 + sampleCount);
            // 0~4 bytes: version(0) & flags
            for (var i = 0; i < sampleCount; i++) {
                var flags = samples[i].flags;
                data[i + 4] = flags.isLeading << 6 | // is_leading: 2 (bit)
                flags.dependsOn << 4 // sample_depends_on
                | flags.isDependedOn << 2 // sample_is_depended_on
                | flags.hasRedundancy; // sample_has_redundancy
            }
            return MP4.box(MP4.types.sdtp, data);
        }

        // Track fragment run box

    }, {
        key: 'trun',
        value: function trun(track, offset) {
            var samples = track.samples || [];
            var sampleCount = samples.length;
            var dataSize = 12 + 16 * sampleCount;
            var data = new Uint8Array(dataSize);
            offset += 8 + dataSize;

            data.set([0x00, 0x00, 0x0F, 0x01, // version(0) & flags
            sampleCount >>> 24 & 0xFF, // sample_count
            sampleCount >>> 16 & 0xFF, sampleCount >>> 8 & 0xFF, sampleCount & 0xFF, offset >>> 24 & 0xFF, // data_offset
            offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF], 0);

            for (var i = 0; i < sampleCount; i++) {
                var duration = samples[i].duration;
                var size = samples[i].size;
                var flags = samples[i].flags;
                var cts = samples[i].cts;
                data.set([duration >>> 24 & 0xFF, // sample_duration
                duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, size >>> 24 & 0xFF, // sample_size
                size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, flags.isLeading << 2 | flags.dependsOn, // sample_flags
                flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, // sample_degradation_priority
                cts >>> 24 & 0xFF, // sample_composition_time_offset
                cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF], 12 + 16 * i);
            }
            return MP4.box(MP4.types.trun, data);
        }
    }, {
        key: 'mdat',
        value: function mdat(data) {
            return MP4.box(MP4.types.mdat, data);
        }
    }]);

    return MP4;
}();

MP4.init();

exports.default = MP4;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * lazy_bug
 */

// Represents an media sample (audio / video)
var SampleInfo = exports.SampleInfo = function SampleInfo(dts, pts, duration, originalDts, isSync) {
    _classCallCheck(this, SampleInfo);

    this.dts = dts;
    this.pts = pts;
    this.duration = duration;
    this.originalDts = originalDts;
    this.isSyncPoint = isSync;
    this.fileposition = null;
};

// Media Segment concept is defined in Media Source Extensions spec.
// Particularly in ISO BMFF format, an Media Segment contains a moof box followed by a mdat box.


var MediaSegmentInfo = exports.MediaSegmentInfo = function () {
    function MediaSegmentInfo() {
        _classCallCheck(this, MediaSegmentInfo);

        this.beginDts = 0;
        this.endDts = 0;
        this.beginPts = 0;
        this.endPts = 0;
        this.originalBeginDts = 0;
        this.originalEndDts = 0;
        this.syncPoints = []; // SampleInfo[n], for video IDR frames only
        this.firstSample = null; // SampleInfo
        this.lastSample = null; // SampleInfo
    }

    _createClass(MediaSegmentInfo, [{
        key: "appendSyncPoint",
        value: function appendSyncPoint(sampleInfo) {
            // also called Random Access Point
            sampleInfo.isSyncPoint = true;
            this.syncPoints.push(sampleInfo);
        }
    }]);

    return MediaSegmentInfo;
}();

// Ordered list for recording video IDR frames, sorted by originalDts


var IDRSampleList = exports.IDRSampleList = function () {
    function IDRSampleList() {
        _classCallCheck(this, IDRSampleList);

        this._list = [];
    }

    _createClass(IDRSampleList, [{
        key: "clear",
        value: function clear() {
            this._list = [];
        }
    }, {
        key: "appendArray",
        value: function appendArray(syncPoints) {
            var list = this._list;

            if (syncPoints.length === 0) {
                return;
            }

            if (list.length > 0 && syncPoints[0].originalDts < list[list.length - 1].originalDts) {
                this.clear();
            }

            Array.prototype.push.apply(list, syncPoints);
        }
    }, {
        key: "getLastSyncPointBeforeDts",
        value: function getLastSyncPointBeforeDts(dts) {
            if (this._list.length == 0) {
                return null;
            }

            var list = this._list;
            var idx = 0;
            var last = list.length - 1;
            var mid = 0;
            var lbound = 0;
            var ubound = last;

            if (dts < list[0].dts) {
                idx = 0;
                lbound = ubound + 1;
            }

            while (lbound <= ubound) {
                mid = lbound + Math.floor((ubound - lbound) / 2);
                if (mid === last || dts >= list[mid].dts && dts < list[mid + 1].dts) {
                    idx = mid;
                    break;
                } else if (list[mid].dts < dts) {
                    lbound = mid + 1;
                } else {
                    ubound = mid - 1;
                }
            }
            return this._list[idx];
        }
    }]);

    return IDRSampleList;
}();

// Data structure for recording information of media segments in single track.


var MediaSegmentInfoList = exports.MediaSegmentInfoList = function () {
    function MediaSegmentInfoList(type) {
        _classCallCheck(this, MediaSegmentInfoList);

        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }

    _createClass(MediaSegmentInfoList, [{
        key: "isEmpty",
        value: function isEmpty() {
            return this._list.length === 0;
        }
    }, {
        key: "clear",
        value: function clear() {
            this._list = [];
            this._lastAppendLocation = -1;
        }
    }, {
        key: "_searchNearestSegmentBefore",
        value: function _searchNearestSegmentBefore(originalBeginDts) {
            var list = this._list;
            if (list.length === 0) {
                return -2;
            }
            var last = list.length - 1;
            var mid = 0;
            var lbound = 0;
            var ubound = last;

            var idx = 0;

            if (originalBeginDts < list[0].originalBeginDts) {
                idx = -1;
                return idx;
            }

            while (lbound <= ubound) {
                mid = lbound + Math.floor((ubound - lbound) / 2);
                if (mid === last || originalBeginDts > list[mid].lastSample.originalDts && originalBeginDts < list[mid + 1].originalBeginDts) {
                    idx = mid;
                    break;
                } else if (list[mid].originalBeginDts < originalBeginDts) {
                    lbound = mid + 1;
                } else {
                    ubound = mid - 1;
                }
            }
            return idx;
        }
    }, {
        key: "_searchNearestSegmentAfter",
        value: function _searchNearestSegmentAfter(originalBeginDts) {
            return this._searchNearestSegmentBefore(originalBeginDts) + 1;
        }
    }, {
        key: "append",
        value: function append(mediaSegmentInfo) {
            var list = this._list;
            var msi = mediaSegmentInfo;
            var lastAppendIdx = this._lastAppendLocation;
            var insertIdx = 0;

            if (lastAppendIdx !== -1 && lastAppendIdx < list.length && msi.originalBeginDts >= list[lastAppendIdx].lastSample.originalDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && msi.originalBeginDts < list[lastAppendIdx + 1].originalBeginDts)) {
                insertIdx = lastAppendIdx + 1; // use cached location idx
            } else {
                if (list.length > 0) {
                    insertIdx = this._searchNearestSegmentBefore(msi.originalBeginDts) + 1;
                }
            }

            this._lastAppendLocation = insertIdx;
            this._list.splice(insertIdx, 0, msi);
        }
    }, {
        key: "getLastSegmentBefore",
        value: function getLastSegmentBefore(originalBeginDts) {
            var idx = this._searchNearestSegmentBefore(originalBeginDts);
            if (idx >= 0) {
                return this._list[idx];
            } else {
                // -1
                return null;
            }
        }
    }, {
        key: "getLastSampleBefore",
        value: function getLastSampleBefore(originalBeginDts) {
            var segment = this.getLastSegmentBefore(originalBeginDts);
            if (segment != null) {
                return segment.lastSample;
            } else {
                return null;
            }
        }
    }, {
        key: "getLastSyncPointBefore",
        value: function getLastSyncPointBefore(originalBeginDts) {
            var segmentIdx = this._searchNearestSegmentBefore(originalBeginDts);
            var syncPoints = this._list[segmentIdx].syncPoints;
            while (syncPoints.length === 0 && segmentIdx > 0) {
                segmentIdx--;
                syncPoints = this._list[segmentIdx].syncPoints;
            }
            if (syncPoints.length > 0) {
                return syncPoints[syncPoints.length - 1];
            } else {
                return null;
            }
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "length",
        get: function get() {
            return this._list.length;
        }
    }]);

    return MediaSegmentInfoList;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _TrakBox = __webpack_require__(1);

var _TrakBox2 = _interopRequireDefault(_TrakBox);

var _Fmp4Remuxer = __webpack_require__(2);

var _Fmp4Remuxer2 = _interopRequireDefault(_Fmp4Remuxer);

var _MediaInfo = __webpack_require__(0);

var _MediaInfo2 = _interopRequireDefault(_MediaInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _mediaSource; /**
                   * Created by PC-275 on 2017/5/24.
                   */

var _mediaElement;
var videoLength;
var loadEnd = false;
var element = document.getElementsByName('videoElement')[0];

var videoRemoveRange = document.getElementById('videoRemoveRange');
var seekText = document.getElementById('seekText');
videoRemoveRange.onclick = function () {
    // var sb = _sourceBuffers["video"];
    var seekT = parseInt(seekText.value);
    var buffered = _mediaElement.buffered;
    var start = 0;
    var end = 0;
    _mediaElement.pause();
    for (var i = 0; i < buffered.length; i++) {
        start = buffered.start(i);
        end = buffered.end(i);
    }
    bolBuffer = true;
    if (seekT >= start && seekT <= end) {
        _mediaElement.currentTime = seekT;
        bolBuffer = false;
    } else {
        for (var type in _sourceBuffers) {
            var sb = _sourceBuffers[type];
            if (end - start > 0) sb.remove(start, end);
        }
        var videoDataObj = trackObj["vide"].keyOffsetValue(seekT);
        var audioDataObj = trackObj["soun"].keyOffsetValue(seekT);
        var smallObj = videoDataObj.keyNum < audioDataObj.keyNum ? videoDataObj : audioDataObj;
        keyDataNum.audio = keyDataNum.video = smallObj.keyNum;
        keyMaxNum = smallObj.keyNum + 10;
        _mediaElement.currentTime = smallObj.tNum;
        bolBuffer = false;
    }
};
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
};

var videoInvertNum = -1;
var audioInvertNum = -1;

var keyMaxNum = 30;
var keyDataNum = {
    "video": 0,
    "audio": 0
};

var durationTime = 0;
var trackObj = {};

var bufferLen = 0;
var boxOffset = 32;
var nextBoxSize = 0;
var boxMdatBol = false;
var boxdemuxer = false;
var bufferArr = [];
var SourceBufferUpdateEndBol = true;

var mp4Remuxer = new _Fmp4Remuxer2.default();
// mp4Remuxer.onInitSegment=appendInitSegment;
mp4Remuxer.doAppendSegments = doAppendSegments.bind(undefined);
var headers = new Headers();
// headers.append("Content-Type", "application/octet-stream");
// headers.append("Access-Control-Allow-Origin", "*");
// var videoUrl = "http://nb4057-hc36.aipai.com/user/20/22790020/7101861/card/45974609/card.mp4";//?start=300
var videoUrl = "./card.mp4"; //?start=300
self.fetch(videoUrl, {
    // self.fetch('card_1080.mp4', {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default',
    redirect: "follow"
}).then(function (res) {
    if (res.ok && res.status >= 200 && res.status <= 299) {
        var lengthHeader = res.headers.get('Content-Length');
        if (lengthHeader != null) {
            videoLength = parseInt(lengthHeader);
            _MediaInfo2.default.getInstance().videoLength = videoLength;
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
    return res().then(function (resoult) {
        return followFetch(resoult);
    });
}

var num = 0;
function pump(reader) {
    return reader.read().then(function (result) {
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
    });
    //     .catch((e)=> {
    //     log("pump erre: " + e);
    // });
}

function chunkData(chunkBuffer) {

    // var buffer = new Uint8Array(chunkBuffer);
    bufferArr.push(chunkBuffer);
    bufferLen += chunkBuffer.byteLength;
    if (!boxdemuxer) {
        var offset = boxOffset;
        var bufferNum = bufferLen;
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
            starOffset = bLen - (len - startOffset);
            starOffsetBol = true;
        }
        if (l <= 0) break;
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
            } else {
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
        var moovBoxName = getBoxName(arrayBuffer, moovOffset);
        if (moovBoxName === "mvhd") {
            mvhdBox(arrayBuffer, moovOffset);
        }
        if (moovBoxName === "trak") {
            var trakB = new _TrakBox2.default();

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

function getBoxName(arrayBuffer, offset) {
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;

    var dataV = new DataView(arrayBuffer, offset, length);
    var strName = String.fromCharCode(dataV.getUint8(4)) + String.fromCharCode(dataV.getUint8(5)) + String.fromCharCode(dataV.getUint8(6)) + String.fromCharCode(dataV.getUint8(7));
    // log(dataV.getUint8(4), dataV.getUint8(5), dataV.getUint8(6), dataV.getUint8(7), "  boxName", strName, "offset:", offset)
    return strName;
}

function getBoxSize(arrayBuffer, offset) {
    var lenght = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

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
    if (str.length == 1) str = "0" + str;
    return str;
}

function log() {
    var str = "";
    for (var i = 0; i < arguments.length; i++) {
        str += arguments[i] + "  ";
    }
    console.log(str);
}
function logger(str) {
    console.log(str);
}

function appendInitSegment(type, initSegment) {
    var is = initSegment;
    var mimeType = "" + is.container;
    if (is.codec && is.codec.length > 0) {
        mimeType += ";codecs=" + is.codec;
    }
    if (mimeType !== _mimeTypes[is.type]) {
        if (_mimeTypes[is.type] == null) {
            try {
                var sb = _sourceBuffers[is.type] = _mediaSource.addSourceBuffer(mimeType);
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
    var ms = mediaSegment;
    _pendingSegments[ms.type].push(ms);
    var sb = _sourceBuffers[ms.type];
    if (sb != null && !sb.updating) {
        appendSegments();
    }
}
// var jumpNum = 0;
var bolBuffer = false;

function appendSegments() {
    // jumpNum++;
    // if (jumpNum >= 5)return;
    if (bolBuffer) return;
    var pendingSegments = _pendingSegments;
    for (var type in pendingSegments) {
        if (!_sourceBuffers[type] || _sourceBuffers[type].updating || !appendBufferBol[type]) {
            continue;
        }
        var sb = _sourceBuffers[type];
        if (sb != null && sb.updating) {
            continue;
        }
        if (pendingSegments[type].length > 0) {
            var segment = pendingSegments[type].shift();
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
    var ms = _mediaSource = new window.MediaSource();
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
    var buffered = _mediaElement.buffered;
    for (var i = 0; i < buffered.length; i++) {
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
    var media = _mediaElement;
    var buffered = media.buffered;
    _mediaElement.currentTime = buffered.start(0);
}

/***/ })
/******/ ]);