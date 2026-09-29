const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const { execSync } = require('child_process');

module.exports = {
  packagerConfig: {
    name: "knoT here",
    appBundleId: "com.kevinshome.knot-here",
    appVersion: "5.0.1",
    buildVersion: "2026.29.09",
    appCopyright: "Copyright © 2026 Sony Music Entertainment",
    icon: 'images/icon',
    osxSign: {
      options: {
        force: true,
        hardenedRuntime: false,
        gatekeeperAssess: false,
      },
    extendInfo: {
      NSCameraUsageDescription: 'This application requires camera access to capture video.',
      NSMicrophoneUsageDescription: 'This application requires microphone access.',
      }
    },
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: 'images/icon.ico'
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: 'images/map.jpg',
        format: 'ULFO',
        title: 'knoT here Installer',
        window: {
          width: 658,
          height: 498
        },
        contents: [
          { x: 160, y: 250, type: 'file', path: 'out/knoT here-darwin-arm64/knoT here.app' },
          { x: 500, y: 250, type: 'link', path: '/Applications' }
        ]
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: "images/icon.png"
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: "images/icon.png"
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    postPackage: async (_a,_b) => {
      if (process.platform === 'darwin') {
        execSync(`codesign --force --deep --sign - "out/knoT here-darwin-arm64/knot here.app"`);
      }
    }
  }
};
