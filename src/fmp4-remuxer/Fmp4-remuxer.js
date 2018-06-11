/**
 * Created by PC-275 on 2017/5/12.
 */
import MP4 from "./Fmp4-box";
// import EventEmitter from "../event/EventEmitter.js";
import {
    MediaSegmentInfo,
    MediaSegmentInfoList
} from "./media-segment-info.js";

class Fmp4Remuxer {
    constructor() {
        // this._emitter = new EventEmitter();
        this._onInitSegment = null;
        this._audioSegmentInfoList = new MediaSegmentInfoList('audio');
        this._videoSegmentInfoList = new MediaSegmentInfoList('video');
    }

    trakBind(trakB) {
        trakB.metaData = this.metaData.bind(this);
        trakB.onDataAvailable = this.onDataAvailable.bind(this);
    }

    get onInitSegment() {
        this._onInitSegment;
    }

    set onInitSegment(callback) {
        this._onInitSegment = callback;
    }

    metaData(type, metaData) {
        let metabox = null;
        let container = 'mp4';
        let codec = metaData.codec;
        if (type === 'audio') {
            this._audioMeta = metaData;
            if (metaData.codec === 'mp3' && this._mp3UseMpegAudio) {
                // 'audio/mpeg' for MP3 audio track
                container = 'mpeg';
                codec = '';
                metabox = new Uint8Array();
            } else {
                // 'audio/mp4, codecs="codec"'
                metabox = MP4.generateInitSegment(metaData);
            }
        } else if (type === 'video') {
            this._videoMeta = metaData;
            metabox = MP4.generateInitSegment(metaData);
        } else {
            return;
        }
        return {
            type: type,
            data: metabox.buffer,
            codec: codec,
            container: `${type}/${container}`,
            mediaDuration: metaData.duration  // in timescale 1000 (milliseconds)
        };

        this._onInitSegment(type, {
            type: type,
            data: metabox.buffer,
            codec: codec,
            container: `${type}/${container}`,
            mediaDuration: metaData.duration  // in timescale 1000 (milliseconds)
        });
    }

    onDataAvailable(audioTrack, videoTrack) {
        if (!this._dtsBaseInited) {
            this._calculateDtsBase(audioTrack, videoTrack);
        }
        // console.log(audioTrack, videoTrack);
        if (videoTrack != null)
            this._remuxVideo(videoTrack);
        if (audioTrack != null)
            this._remuxAudio(audioTrack);
    }

    _calculateDtsBase(audioTrack, videoTrack) {
        if (this._dtsBaseInited)
            return;
        if (audioTrack != null && audioTrack.samples && audioTrack.samples.length)
            this._audioDtsBase = audioTrack.samples[0].dts;
        if (videoTrack != null && videoTrack.samples && videoTrack.samples.length)
            this._videoDtsBase = videoTrack.samples[0].dts;
        // this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
        this._dtsBase = 0;
        this._dtsBaseInited = true;
    }

    _remuxAudio(audioTrack) {
        let track = audioTrack;
        let samples = track.samples;
        let firstDts = -1, lastDts = -1, lastPts = -1;

        if (!samples || samples.length === 0) {
            return;
        }

        let bytes = 0;
        let offset = 0;
        let mdatbox = null;

        // allocate for fmp4 mdat box
        bytes = 8 + track.length;
        offset = 8;  // size + type
        mdatbox = new Uint8Array(bytes);
        // size field
        mdatbox[0] = (bytes >>> 24) & 0xFF;
        mdatbox[1] = (bytes >>> 16) & 0xFF;
        mdatbox[2] = (bytes >>> 8) & 0xFF;
        mdatbox[3] = (bytes) & 0xFF;
        // type field (fourCC)
        mdatbox.set(MP4.types.mdat, 4);

        let mp4Samples = [];

        while (samples.length) {
            let aacSample = samples.shift();
            let unit = aacSample.units;
            let originalDts = aacSample.dts - this._dtsBase;
            let sampleSize=0;
            
            let dts = originalDts ;
            if (firstDts === -1) {
                firstDts = dts;
            }

            let sampleDuration = 0;
            if (samples.length >= 1) {
                let nextDts = samples[0].dts - this._dtsBase;
                sampleDuration = nextDts - dts;
            } else {
                if (mp4Samples.length >= 1) {  // use second last sample duration
                    sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                } else {  // the only one sample, use reference sample duration
                    sampleDuration = this._audioMeta.refSampleDuration;
                }
            }
            while (unit.length) {
                let unitD = unit.shift();
                let data = unitD.data;
                mdatbox.set(data, offset);
                offset += data.byteLength;
                sampleSize+= data.byteLength;
            }
            let mp4Sample = {
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

        let moofbox = null;

        // Generate moof for fmp4 segment
        moofbox = MP4.moof(track, firstDts);

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
            sampleCount: mp4Samples.length,
            // info: info
        });
        // this._onMediaSegment('audio', segment);
    }

    _remuxVideo(videoTrack) {
        // console.log("**console.log(videoTrack);**");
        // console.log(videoTrack);
        let track = videoTrack;
        let samples = track.samples;
        let firstDts = -1, lastDts = -1;
        let firstPts = -1, lastPts = -1;

        if (!samples || samples.length === 0) {
            return;
        }

        let bytes = 8 + videoTrack.length;
        let mdatbox = new Uint8Array(bytes);
        mdatbox[0] = (bytes >>> 24) & 0xFF;
        mdatbox[1] = (bytes >>> 16) & 0xFF;
        mdatbox[2] = (bytes >>> 8) & 0xFF;
        mdatbox[3] = (bytes) & 0xFF;
        mdatbox.set(MP4.types.mdat, 4);

        let offset = 8;
        let mp4Samples = [];
        let info = new MediaSegmentInfo();

        while (samples.length) {
            let avcSample = samples.shift();
            let keyframe = avcSample.isKeyframe;
            let originalDts = avcSample.dts - this._dtsBase;

            let dts = originalDts;
            let cts = avcSample.cts;// data 第2个字节
            let pts = dts + cts;

            if (firstDts === -1) {
                firstDts = dts;
                firstPts = pts;
            }

            // fill mdat box
            let sampleSize = 0;
            while (avcSample.units.length) {
                let unit = avcSample.units.shift();
                let data = unit.data;
                mdatbox.set(data, offset);
                offset += data.byteLength;
                sampleSize += data.byteLength;
            }

            let sampleDuration = 0;

            if (samples.length >= 1) {
                let nextDts = samples[0].dts - this._dtsBase;
                sampleDuration = nextDts - dts;
            } else {
                if (mp4Samples.length >= 1) {  // lastest sample, use second last duration
                    sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                } else {  // the only one sample, use reference duration
                    sampleDuration = this._videoMeta.refSampleDuration;
                }
            }
            // if (keyframe) {
            //     let syncPoint = new SampleInfo(dts, pts, sampleDuration, avcSample.dts, true);
            //     syncPoint.fileposition = avcSample.fileposition;//"tagPosition"
            //     info.appendSyncPoint(syncPoint);
            // }

            let mp4Sample = {
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
            let flags = mp4Samples[0].flags;
            flags.dependsOn = 2;
            flags.isNonSync = 0;
        }
        // console.log("--*****-----track.sequenceNumber: " + track.sequenceNumber);
        let moofbox = MP4.moof(track, firstDts);
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

    _mergeBoxes(moof, mdat) {
        let result = new Uint8Array(moof.byteLength + mdat.byteLength);
        result.set(moof, 0);
        result.set(mdat, moof.byteLength);
        return result;
    }

    set doAppendSegments(value) {
        this._doAppendSegments = value;
    }


}

export default Fmp4Remuxer;