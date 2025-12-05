'use strict';

const path = require('path');
const util = require('../util/util');
const http = require('../util/httpResponse');
const userModel = require('./UserModel');

const PROPS_FILE = path.join(__dirname, '..', 'data', 'properties.json');

// safe load
function safeLoad(filePath) {
    const content = util.readJsonSync?.(filePath);
    return Array.isArray(content) ? content : [];
}

// in-memory state
let properties = safeLoad(PROPS_FILE);

// helpers
async function persistProperties() {
    return await util.writeFile(properties, PROPS_FILE);
}

function ok(data, message = 'Action executed successfully.') {
    return { data, responseCode: http.STATUS?.OK ?? http.OK, message };
}

function bad(message, data = null, code = http.STATUS?.BAD_REQUEST ?? http.BAD_REQUEST) {
    return { data, responseCode: code, message };
}

// simple property id generator
function generatePropertyId() {
    return 'prop-' + Date.now();   // example: prop-1733359999999
}

// list properties with optional filters
function listProperties(filters = {}) {
    const {
        action = null,
        type = null,
        minPrice = null,
        maxPrice = null,
        text = null,
        ownerId = null,
        province = null
    } = filters;

    const q = (text || '').trim().toLowerCase();

    const data = properties
        .filter(p => action == null || p.Action === action)
        .filter(p => type == null || p.Type === type)
        .filter(p => minPrice == null || Number(p.Price) >= Number(minPrice))
        .filter(p => maxPrice == null || Number(p.Price) <= Number(maxPrice))
        .filter(p => ownerId == null || p.OwnerId === ownerId)
        .filter(p => province == null || p.Location?.Province === province)
        .filter(p => {
            if (!q) return true;
            const fields = [
                p.Title,
                p.Description,
                p.Location?.Address,
                p.Location?.City
            ].map(s => String(s || '').toLowerCase());

            return fields.some(s => s.includes(q));
        })
        .sort((a, b) => Number(b.UpdatedAt || 0) - Number(a.UpdatedAt || 0));

    return ok(data);
}

function getPropertyById(propertyId) {
    const found = properties.filter(
        p => String(p.Id) === String(propertyId)
    );
    return found.length ? ok(found) : bad('The property does not exist.', []);
}

async function addProperty(property) {
    if (!property || JSON.stringify(property) === '{}')
        return bad('Body JSON is required.');

    // validate that OwnerId is provided
    if (!property.OwnerId) {
        return bad('OwnerId is required to create the property.');
    }

    // validate that the owner exists in users.json
    const ownerResult = userModel.getUserById(property.OwnerId);
    if (!ownerResult || ownerResult.responseCode !== (http.STATUS?.OK ?? http.OK)) {
        return bad('Owner user does not exist.', null);
    }

    // generate id if it does not come from the client
    if (!property.Id) {
        property.Id = generatePropertyId();
    }

    // check duplicate by id
    const dup = properties.find(
        p => String(p.Id) === String(property.Id)
    );
    if (dup) return bad('Duplicate property is not allowed.');

    const now = Date.now();
    property.CreatedAt = property.CreatedAt ?? now;
    property.UpdatedAt = now;

    properties.push(property);
    await persistProperties();
    return ok(property, 'Property inserted successfully.');
}

async function updateProperty(property) {
    if (!property || JSON.stringify(property) === '{}')
        return bad('Body JSON is required.');

    const idx = properties.findIndex(
        p => String(p.Id) === String(property.Id)
    );
    if (idx === -1)
        return bad('Property not found to be updated.');

    const now = Date.now();
    properties[idx] = { ...properties[idx], ...property, UpdatedAt: now };

    await persistProperties();
    return ok(properties[idx], 'Property updated successfully.');
}

async function deletePropertyIfOwner(propertyId, requesterId) {
    
    // verify requesterId is provided
    if (!requesterId) {
        return bad('Owner id is required to delete the property.');
    }

    // find the property
    const p = properties.find(
        x => String(x.Id) === String(propertyId)
    );
    if (!p) return bad('Property not found.');

    // verify that the user exists in users.json
    const userResult = userModel.getUserById(requesterId);
    if (!userResult || userResult.responseCode !== (http.STATUS?.OK ?? http.OK)) {
        return bad('Owner user does not exist.', null);
    }

    // verify that the owner matches
    if (String(p.OwnerId) !== String(requesterId)) {
        return bad('Not owned by requester.');
    }

    // delete property
    properties = properties.filter(
        x => String(x.Id) !== String(propertyId)
    );

    await persistProperties();
    return ok({ Id: propertyId }, 'Property removed properly.');
}

module.exports = {
    listProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    deletePropertyIfOwner
};
