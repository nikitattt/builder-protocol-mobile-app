const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const nodeLibs = require('node-libs-react-native'); // Import node-libs-react-native for shimming

const projectRoot = path.join(__dirname);
const workspaceRoot = path.join(__dirname, '..', '..');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    projectRoot: projectRoot,
    resolver: {
        unstable_enableSymlinks: true,
        unstable_enablePackageExports: true,
        extraNodeModules: {
            ...nodeLibs, // Add node-libs-react-native to extraNodeModules
            crypto: require.resolve('react-native-crypto'),
            net: require.resolve('react-native-tcp'),
            _stream_transform: require.resolve('readable-stream/transform'),
            _stream_readable: require.resolve('readable-stream/readable'),
            _stream_writable: require.resolve('readable-stream/writable'),
            _stream_duplex: require.resolve('readable-stream/duplex'),
            _stream_passthrough: require.resolve('readable-stream/passthrough'),
            stream: require.resolve('stream-browserify'),
            http: require.resolve('@tradle/react-native-http'),
            https: require.resolve('https-browserify'),
            zlib: require.resolve('browserify-zlib'),
            tls: require.resolve('tls-browserify'),
            fs: require.resolve('react-native-fs'),
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify')
        },
        unstable_conditionNames: [
            'browser',
            'require',
            'react-native',
        ]
    },
    watchFolders: [path.join(workspaceRoot)],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    }
};

module.exports = mergeConfig(defaultConfig, config);