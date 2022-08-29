"use strict";

let SVCNAME = "com.roonlabs.audioinput:1";

/**
 * Roon API Audio Input Service
 * @class RoonApiAudioInput
 * @param {Core} core - The Core providing the service
 */
function RoonApiAudioInput(core) {
    this.core = core;
}

RoonApiAudioInput.services = [ { name: SVCNAME } ];

RoonApiAudioInput.prototype.begin_session = function(options, cb) {
    let ret = {
        session_id: null,
        end_session(cb) {
            if (this.session_id)
                self.send_request(SVCNAME + "/end_session", { session_id: this.session_id }, cb);
        }
    };
    this.core.moo.send_request(SVCNAME + "/begin_session", options,
        function (msg, body) {
            if (!msg) return;
            if (msg.name == "SessionBegan")
                ret.session_id = body.session_id;
            cb(msg.name, body);
        });
    return ret;
};

RoonApiAudioInput.prototype.play = function(options, cb) {
    this.core.moo.send_request(SVCNAME + "/play", options, cb);
};

RoonApiAudioInput.prototype.clear = function(options, cb) {
    this.core.moo.send_request(SVCNAME + "/clear", options, cb);
};

RoonApiAudioInput.prototype.update_track_info = function(options, cb) {
    this.core.moo.send_request(SVCNAME + "/update_track_info", options, cb);
};

RoonApiAudioInput.prototype.update_transport_controls = function(options, cb) {
    this.core.moo.send_request(SVCNAME + "/update_transport_controls", options, cb);
};

module.exports = RoonApiAudioInput;

