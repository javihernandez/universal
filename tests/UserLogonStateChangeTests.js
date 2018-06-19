/*
 * GPII Flow Manager Development Tests
 *
 * Copyright 2013 OCAD University
 *
 * Licensed under the New BSD license. You may not use this file except in
 * compliance with this License.
 *
 * The research leading to these results has received funding from the European Union's
 * Seventh Framework Programme (FP7/2007-2013)
 * under grant agreement no. 289016.
 *
 * You may obtain a copy of the License at
 * https://github.com/GPII/universal/blob/master/LICENSE.txt
 */

/* eslint-env node */
"use strict";

var fluid = require("infusion"),
    gpii = fluid.registerNamespace("gpii");

require("./shared/UserLogonStateChangeTestDefs.js");

gpii.test.bootstrapServer(gpii.tests.userLogonHandling.buildTestDefs(gpii.tests.userLogonHandling.testDefs));
