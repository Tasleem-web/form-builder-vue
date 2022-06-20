let exports = {};
exports.deepCopy = (value) => JSON.parse(JSON.stringify(value));
export default exports;
