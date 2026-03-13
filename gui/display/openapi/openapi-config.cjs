const config = {
    schemaFile: 'openapi.yaml',
    apiFile: '../src/openapi/empty.ts',
    apiImport: 'projectApi',
    outputFile: '../src/openapi/api.ts',
    exportName: 'projectApi',
    hooks: true,
};

module.exports = config;
