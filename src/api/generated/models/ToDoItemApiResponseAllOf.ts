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
 * @interface ToDoItemApiResponseAllOf
 */
export interface ToDoItemApiResponseAllOf {
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiResponseAllOf
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiResponseAllOf
     */
    groupId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiResponseAllOf
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiResponseAllOf
     */
    text?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ToDoItemApiResponseAllOf
     */
    deadline?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof ToDoItemApiResponseAllOf
     */
    isDone?: boolean;
}

/**
 * Check if a given object implements the ToDoItemApiResponseAllOf interface.
 */
export function instanceOfToDoItemApiResponseAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ToDoItemApiResponseAllOfFromJSON(json: any): ToDoItemApiResponseAllOf {
    return ToDoItemApiResponseAllOfFromJSONTyped(json, false);
}

export function ToDoItemApiResponseAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): ToDoItemApiResponseAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'groupId': !exists(json, 'groupId') ? undefined : json['groupId'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'text': !exists(json, 'text') ? undefined : json['text'],
        'deadline': !exists(json, 'deadline') ? undefined : json['deadline'],
        'isDone': !exists(json, 'isDone') ? undefined : json['isDone'],
    };
}

export function ToDoItemApiResponseAllOfToJSON(value?: ToDoItemApiResponseAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'groupId': value.groupId,
        'title': value.title,
        'text': value.text,
        'deadline': value.deadline,
        'isDone': value.isDone,
    };
}

