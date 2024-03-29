/* tslint:disable */
/* eslint-disable */
/**
 * Todo list
 * Todo list
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ToDoItemApiRequest
 */
export interface ToDoItemApiRequest {
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiRequest
     */
    id?: string;
}

/**
 * Check if a given object implements the ToDoItemApiRequest interface.
 */
export function instanceOfToDoItemApiRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ToDoItemApiRequestFromJSON(json: any): ToDoItemApiRequest {
    return ToDoItemApiRequestFromJSONTyped(json, false);
}

export function ToDoItemApiRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ToDoItemApiRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function ToDoItemApiRequestToJSON(value?: ToDoItemApiRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

