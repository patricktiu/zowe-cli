/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ITestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { TestEnvironment } from "../../../../../../../__tests__/__src__/environment/TestEnvironment";
import { ITestPropertiesSchema } from "../../../../../../../__tests__/__src__/properties/ITestPropertiesSchema";

// Test Environment populated in the beforeAll();
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;

describe("Create compiler listing Data Set", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "zos_create_listing_dataset",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should display the help", () => {
        const response = runCliScript(__dirname + "/__scripts__/create_listing_pds_help.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    describe("Expected failures", () => {
        it("should fail creating a compiler listing partitioned data set due to missing data set name", () => {
            const response = runCliScript(__dirname + "/__scripts__/command/command_create_listing_fail_missing_dataset_name.sh", TEST_ENVIRONMENT);

            expect(response.stderr.toString()).toContain("Missing Positional Argument");
            expect(response.stderr.toString()).toContain("dataSetName");
            expect(response.status).toBe(1);
        });
    });
});
