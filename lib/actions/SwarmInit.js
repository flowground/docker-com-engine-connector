/**
 * Auto-generated action file for "Docker Engine" API.
 *
 * Generated at: 2019-05-07T14:40:15.294Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / docker-com-engine-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'SwarmInit'
 * Endpoint Path: '/swarm/init'
 * Method: 'post'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "AdvertiseAddr": "AdvertiseAddr",
    "DataPathAddr": "DataPathAddr",
    "ForceNewCluster": "ForceNewCluster",
    "ListenAddr": "ListenAddr",
    "ExternalCAs": "ExternalCAs",
    "ForceRotate": "ForceRotate",
    "NodeCertExpiry": "NodeCertExpiry",
    "SigningCACert": "SigningCACert",
    "SigningCAKey": "SigningCAKey",
    "CAConfig": "CAConfig",
    "HeartbeatPeriod": "HeartbeatPeriod",
    "Dispatcher": "Dispatcher",
    "AutoLockManagers": "AutoLockManagers",
    "EncryptionConfig": "EncryptionConfig",
    "Labels": "Labels",
    "Name": "Name",
    "TaskHistoryRetentionLimit": "TaskHistoryRetentionLimit",
    "Orchestration": "Orchestration",
    "ElectionTick": "ElectionTick",
    "HeartbeatTick": "HeartbeatTick",
    "KeepOldSnapshots": "KeepOldSnapshots",
    "LogEntriesForSlowFollowers": "LogEntriesForSlowFollowers",
    "SnapshotInterval": "SnapshotInterval",
    "Raft": "Raft",
    "Options": "Options",
    "LogDriver": "LogDriver",
    "TaskDefaults": "TaskDefaults",
    "Spec": "Spec",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = cfg.body_content_type;

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};

    let callParams = {
        spec: spec,
        operationId: 'SwarmInit',
        pathName: '/swarm/init',
        method: 'post',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}