import SPSParser from "./sps-parser.js";
import MediaInfo from "../MediaInfo.js";

class TrakBox {
    constructor() {
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

        this.mediaInfo = MediaInfo.getInstance();

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

    starDemuxer(arrayBuffer, offset) {
        this.trakBox(arrayBuffer, offset);
    }

    trakBox(arrayBuffer, offset) {
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

    edtsBox(arrayBuffer, offset) {
        // this.segmentDuration = this.getBoxSize(arrayBuffer, offset + 16);
        this.mediaTime = this.getBoxSize(arrayBuffer, offset + 20);
    }

    mdiaBox(arrayBuffer, offset) {
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

    mdhdBox(arrayBuffer, offset) {
        this.timeScale = this.getBoxSize(arrayBuffer, offset + 5 * 4);
        this.timeDuration = this.getBoxSize(arrayBuffer, offset + 6 * 4);
        this.log("timeScale", this.timeScale);
        this.log("timeDuration", this.timeDuration);
    }

    hdlrBox(arrayBuffer, offset) {
        this.typeName = this.getBoxName(arrayBuffer, offset + 3 * 4);
        // this.log(this.typeName, "trakBoxTypename");
    }

    minfBox(arrayBuffer, offset) {
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

    stblBox(arrayBuffer, offset) {
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

    stsdBox(arrayBuffer, offset) {
        var boxOffset = this.getBoxSize(arrayBuffer, offset);
        if (this.typeName == "vide") {
            var boxName = this.getBoxName(arrayBuffer, offset + 16);
            if (boxName == "avc1") {
                this.parseAvc1AvcCData(arrayBuffer, offset + 16 + 16 * 4 + 6 + 8 * 2, boxOffset - 16 + 16 * 4 + 6 + 8 * 2);
            } else {
                this.logger('stsdBox ' + this.typeName + " is not avc1 :" + boxName)
            }
        }
        if (this.typeName == "soun") {
            this.mediaInfo.audioStsdUintArrayData = new Uint8Array(arrayBuffer, offset, boxOffset);
        }
    }

    sttsBox(arrayBuffer, offset) {
        let num = this.getBoxSize(arrayBuffer, offset + 12);
        this.sample_count = this.getBoxSize(arrayBuffer, offset + 16);
        this.sample_delta = this.getBoxSize(arrayBuffer, offset + 20);
        // this.log("sample_count: ", this.sample_count);
        // this.log("sample_delta: ", this.sample_delta);
    }

    stssBox(arrayBuffer, offset) {
        let videoKeyNum = this.getBoxSize(arrayBuffer, offset + 12);
        this.videoSeekPointsArr = [];
        for (var i = 0; i < videoKeyNum; i++) {
            let point = this.getBoxSize(arrayBuffer, offset + 16 + i * 4);
            this.videoSeekPointsArr.push(point);
            this.mediaInfo.videoKeyPointTimeArr.push((point - 1) / (this.timeScale / this.sample_delta));
        }
        this.mediaInfo.keyPointArr = this.videoSeekPointsArr;
        // this.logger("videoSeekPointsArr:" + this.videoSeekPointsArr);
    }

    stscBox(arrayBuffer, offset) {
        let num = this.getBoxSize(arrayBuffer, offset + 12);
        if (this.stscBoxDic == null) {
            this.stscBoxDic = {};
        }
        for (var i = 0; i < num; i++) {
            let firstChunkNum = this.getBoxSize(arrayBuffer, offset + 16 + i * 12);
            let samplesPerChunkNum = this.getBoxSize(arrayBuffer, offset + 16 + i * 12 + 4);
            let samplesDescriptionIndex = this.getBoxSize(arrayBuffer, offset + 16 + i * 12 + 8);
            this.stscBoxDic[firstChunkNum] = samplesPerChunkNum;
        }
        // this.logger("**********stscBox*********");
        // this.logger(this.stscBoxDic);
        // this.log("firstChunkArr:", this.firstChunkArr);
        // this.log("samplesPerChunkArr:", this.samplesPerChunkArr);
        // this.log("samplesDescriptionIndexArr:", this.samplesDescriptionIndexArr);
    }

    stszBox(arrayBuffer, offset) {
        if (!Array.isArray(this.sampleSize))
            this.sampleSize = [];
        let num = this.getBoxSize(arrayBuffer, offset + 12);
        if (num === 0) {
            let sizeNum = this.getBoxSize(arrayBuffer, offset + 16);
            // this.log(arrayBuffer.byteLength + "   " + sizeNum);
            for (var i = 0; i < sizeNum; i++) {
                var boxSize = this.getBoxSize(arrayBuffer, offset + 20 + i * 4);
                // this.log("---:" + (offset + 20 + i * 4) + "***" + boxSize);
                this.sampleSize.push(boxSize);
            }

        }
        // this.log("sampleSize:", this.sampleSize);
    }

    stcoBox(arrayBuffer, offset) {
        if (!Array.isArray(this.chunkOffset))
            this.chunkOffset = [];
        let num = this.getBoxSize(arrayBuffer, offset + 12);
        for (var i = 0; i < num; i++) {
            this.chunkOffset.push(this.getBoxSize(arrayBuffer, offset + 16 + i * 4));
        }
        // this.log("chunkOffset:", this.chunkOffset);
    }

    cttsBox(arrayBuffer, offset) {
        //占时没有用
        var cttsLen = this.getBoxSize(arrayBuffer, offset);
        var offNum = 16;
        this.ctsbArr = [];
        let samlpCountNum = 0;
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

    parseAvc1AvcCData(arrayBuffer, offset, boxLength) {
        let boxName = this.getBoxName(arrayBuffer, offset);
        let boxSize = this.getBoxSize(arrayBuffer, offset);
        let boxOffset = offset + 9;
        if (boxName != "avcC") {
            this.logger("avcC box is worng data");
            return;
        }
        let dataV = new DataView(arrayBuffer, boxOffset);
        let AVCProfileIndication = dataV.getUint8(0);
        let profile_compatibility = dataV.getUint8(1);
        let AVCLevelIndication = dataV.getUint8(2);
        let reserved = dataV.getUint8(3);
        let naluLengthSize = dataV.getUint8(3) & 3;
        if (naluLengthSize !== 3 && (reserved >> 2) !== 63) {
            this.log(" Strange NaluLengthSizeMinusOne:" + naluLengthSize);
            return;
        }
        reserved = dataV.getUint8(4);
        let numOfSequenceParameterSets = dataV.getUint8(4) & 31;
        if ((reserved >> 5) !== 7 && numOfSequenceParameterSets !== 1) {
            this.log(" Strange numOfSequenceParameterSets:" + numOfSequenceParameterSets);
            return;
        }
        boxOffset = boxOffset + 5;
        let spsLen = this.getBoxSize(arrayBuffer, offset + 14, 2);
        boxOffset = boxOffset + 2;
        let spsBuffer = new Uint8Array(arrayBuffer, boxOffset, spsLen);
        this.config = SPSParser.parseSPS(spsBuffer);
        // this.logger("config:");
        // this.logger(this.config);
        this.sps = spsBuffer;
        let codecArray = this.sps.subarray(1, 4);
        let codecString = 'avc1.';
        for (let j = 0; j < 3; j++) {
            let h = codecArray[j].toString(16);
            if (h.length < 2) {
                h = '0' + h;
            }
            codecString += h;
        }
        this.mediaInfo.videoCodec = codecString;
        // this.logger("codecString:" + codecString);
        // this.logger("sps:" + spsBuffer + "  spsLen:" + spsLen);

        boxOffset = boxOffset + spsLen + 1;
        let ppsLen = this.getBoxSize(arrayBuffer, boxOffset, 2);
        boxOffset = boxOffset + 2;
        let ppsBuffer = new Uint8Array(arrayBuffer, boxOffset, ppsLen);
        this.pps = ppsBuffer;
        //------------------PPS---------------------------
        let audioObjectType = 0;
        let samplingIndex = 0;
        // 5 bits
        audioObjectType = this.pps[0] >>> 3;
        // 4 bits
        samplingIndex = ((this.pps[0] & 0x07) << 1) | (this.pps[1] >>> 7);

        let userAgent = self.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf('firefox') !== -1) {
            // firefox: use SBR (HE-AAC) if freq less than 24kHz
            if (samplingIndex >= 6) {
                audioObjectType = 5;
            } else {  // use LC-AAC
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

    pushSoundMetaData() {
        let meta = this._soundMetadata;
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

    pushVideoMetaData() {
        let meta = this._videoMetadata;
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

    mixKeyTrackData(arrayBuffer, obj) {
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
            let i = chunkNumArr[k];
            let units = [];
            let sampleLen = this.sampleSize[i + this.stscSamplesOffset];
            let chunkStart = this.chunkOffset[i];
            var keyframe = k == 0;
            let dts = 0;
            let cts = 0;
            if (chunkBeginOff == 0)
                chunkBeginOff = chunkStart;
            chunkOffset = chunkStart - chunkBeginOff;
            dts = ((i+1 + this.stscSamplesOffset) * this.sample_delta+this.mediaTime);
            if (this.stscBoxDic[(i + 1)] != undefined) {
                let chunkOffsetNum = this.stscBoxDic[(i + 1)];
                if (chunkOffsetNum > 1) {
                    for (var chunkI = 1; chunkI < chunkOffsetNum; chunkI++) {
                        sampleLen += this.sampleSize[i + this.stscSamplesOffset + chunkI]
                    }
                }
                this.stscSamplesOffset += (chunkOffsetNum - 1);
            }
            
            // if (this.typeName == "vide") {

            // }
            if (this.ctsbArr != null && this.ctsbArr.length > 0) {
                let stsbLen = this.ctsbArr.length;
                let samlpCount = 0;
                let ctsObj = null;
                if (this.stscBoxDic[(i + 1)] != undefined) {
                    let stscSamplesPerChunkNum = this.stscBoxDic[(i + 1)];
                    for (var m = 0; m < stsbLen; m++) {
                        ctsObj = this.ctsbArr[m];
                        samlpCount += ctsObj.samlpCount;
                        if (samlpCount >= (i + 1)) {
                            for (var s = 0; s < stscSamplesPerChunkNum; s++) {
                                let cttsO = this.ctsbArr[m + s + this.stscToCttsOffset];
                                cts += cttsO.samlpOffset;
                            }
                            break;
                        }
                        // (i + this.stscToCttsOffset + stscSamplesPerChunkNum)
                    }
                    this.stscToCttsOffset += (stscSamplesPerChunkNum - 1);
                } else {
                    for (var j = 0; j < stsbLen; j++) {
                        ctsObj = this.ctsbArr[j];
                        samlpCount += ctsObj.samlpCount;
                        // cts += ctsObj.samlpOffset;
                        // if (this.stscSamplesOffset <= j)

                        if (samlpCount >= (i + 1 + this.stscToCttsOffset)) {
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
            let unit = {
                "chunkStart": chunkStart,
                "sampleLen": sampleLen,
                "data": mdatBuf
            };
            units.push(unit);
            let avcSample = {
                units: units,
                length: sampleLen,
                isKeyframe: keyframe,
                dts: dts,
                cts: cts,// data 第2个字节
                pts: (dts + cts)
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

    creatBuffer(arrayBuffer, chunkOffset, sampleLen) {
        var buf = null;
        try {
            buf = new Uint8Array(arrayBuffer, chunkOffset, sampleLen);
        } catch (e) {
            console.log("creatBuffer ----:" + chunkOffset + "  **   " + sampleLen);
            buf = this.creatBuffer(arrayBuffer, chunkOffset, sampleLen);
        }
        return buf;
    }

    keyOffsetData() {
        // if (this.sampleSize.length == this.chunkOffset.length) {
        let len = this.chunkOffset.length;
        let dtsKey = 0;
        let startDts = 0;
        let keyOff = 0;
        let keyNumT = this.mediaInfo.videoKeyPointTimeArr[keyOff + 1];
        let endDts = keyNumT
        let beginOff = 0;
        let chunkNumArr = [];

        for (var i = 0; i < len; i++) {
            let sampleLen = this.sampleSize[i + this.stscSamplesOffset];
            let chunkStart = this.chunkOffset[i];
            if (beginOff == 0) {
                beginOff = chunkStart;
            }
            dtsKey = ((i + this.stscSamplesOffset + 1) * this.sample_delta) / this.timeScale;
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

    SamplesPerChunkNum(i) {
        let sampleLen = 0;
        if (this.stscBoxDic[(i + 1)] != undefined) {
            let chunkOffsetNum = this.stscBoxDic[(i + 1)];
            if (chunkOffsetNum > 1) {
                for (var chunkI = 1; chunkI < chunkOffsetNum; chunkI++) {
                    sampleLen += this.sampleSize[i + this.stscSamplesOffset + chunkI]
                }
            }
            this.stscSamplesOffset += (chunkOffsetNum - 1);
        }
        return sampleLen;
    }


    keyDataLen(len, i) {
        // let keyL = this.keyOffset.length;
        // for (var i = 0; i < keyL; i++) {
        if (len >= this.keyOffset[i].chunkMaxLen) {
            if (!this.keyOffset[i].loadLenBol) {
                // this.keyOffset[i].loadLenBol = true;
                return this.keyOffset[i];
            }
        } else {
            return {"bol": false};
        }
        // }
        return {"bol": false};
    }

    keyOffsetValue(timeNum) {
        let keyL = this.keyOffset.length;
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

    stscSamplesOffsetSeek(obj) {
        this.stscSamplesOffset = 0;
        let num = obj.chunkNumArr[0];
        for (var i = 0; i < num; i++) {
            this.SamplesPerChunkNum(i);
        }
    }

    /**
     * 属性 type   id   sequenceNumber   samples   length
     * */
    get videoTrack() {
        return this._videoTrack;
    }

    get audioTrack() {
        return this._audioTrack;
    }

    get typeName() {
        return this.trakBoxTypename;
    }

    get metaData() {
        return this._metaData;
    }

    set metaData(value) {
        this._metaData = value;
    }

    get onInitSegment() {
        return this._onInitSegment;
    }

    set onInitSegment(value) {
        this._onInitSegment = value;
    }

    set onDataAvailable(value) {
        this._onDataAvailable = value;
    }

    set typeName(name) {
        this.trakBoxTypename = name;
    }

    getBoxName(arrayBuffer, offset, length = 8) {
        let dataV = new DataView(arrayBuffer, offset, length);
        let strName = String.fromCharCode(dataV.getUint8(4)) + String.fromCharCode(dataV.getUint8(5)) + String.fromCharCode(dataV.getUint8(6)) + String.fromCharCode(dataV.getUint8(7));
        // this.log(dataV.getUint8(4), dataV.getUint8(5), dataV.getUint8(6), dataV.getUint8(7), "  boxName", strName, "offset:", offset)
        return strName;
    }


    getBoxSize(arrayBuffer, offset, lenght = 4) {
        let dataV = new DataView(arrayBuffer, offset);
        let lenStr = "";
        for (var i = 0; i < lenght; i++) {
            lenStr = lenStr + this.toString16(dataV.getUint8(i));
        }
        // var lenStr = toString16(dataV.getUint8(i)) + toString16(dataV.getUint8(1)) + toString16(dataV.getUint8(2)) + toString16(dataV.getUint8(3))
        var len = parseInt("0x" + lenStr);
        // log(lenStr, "lenStr string16");
        // log(dataV.getUint8(0), dataV.getUint8(1), dataV.getUint8(2), dataV.getUint8(3))
        return len;
    }

    toString16(num) {
        let str = num.toString(16);
        if (str.length == 1)
            str = "0" + str;
        return str;
    }

    log() {
        let str = "";
        for (let i = 0; i < arguments.length; i++) {
            str += arguments[i] + "  ";
        }
        console.log(str);
    }

    logger(str) {
        console.log(str);
    }

    isOwnEmpty(obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    }
}

export default TrakBox;