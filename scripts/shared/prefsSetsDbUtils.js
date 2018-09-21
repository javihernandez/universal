/*!
Copyright 2018 Raising the Floor US

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/universal/blob/master/LICENSE.txt
*/

/**
 * This file contains utilities that are useful to generate prefsSets data that
 * can be inserted into a CouchDB.
 *
 * Actually, these utils are used in:
 *   * convertPrefs.js
 *   * loadEmptyPrefsSets.js 
 */

"use strict";

var fluid = require("infusion"),
    gpii = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.prefsSetsDbUtils");

/**
 * This is an empty preferences set.
 */
gpii.prefsSetsDbUtils.emptyPrefsSetBlock = {
    "flat": {
        "contexts": {
            "gpii-default": {
                "name": "Default preferences",
                "preferences": {}
            }
        }
    }
};

/**
 * Generate the data for a prefsSet creation.
 *
 * @param  {String} gpiiKey - The identifier of the prefsSet (usually, a uuid).
 * @param  {Object} preferences - The preferences to include in the prefsSet.
 * @return {Object} A JSON object containing the documents ready to be inserted into DB.
 */
gpii.prefsSetsDbUtils.generatePrefsSet = function (gpiiKey, preferences) {
    var currentTime = new Date().toISOString();
    var prefsSafeId = "prefsSafe-" + gpiiKey;

    var newGpiiKey = {
        "_id": gpiiKey,
        "type": "gpiiKey",
        "schemaVersion": "0.1",
        "prefsSafeId": prefsSafeId,
        "prefsSetId": "gpii-default",
        "revoked": false,
        "revokedReason": null,
        "timestampCreated": currentTime,
        "timestampUpdated": null
    };

    var newPrefsSafe = {
        "_id": prefsSafeId,
        "type": "prefsSafe",
        "schemaVersion": "0.1",
        "prefsSafeType": "user",
        "name": gpiiKey,
        "password": null,
        "email": null,
        "preferences": preferences,
        "timestampCreated": currentTime,
        "timestampUpdated": null
    };

    return { key: newGpiiKey, prefsSafe: newPrefsSafe };
};