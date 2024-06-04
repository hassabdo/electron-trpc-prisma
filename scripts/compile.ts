import builder from "electron-builder";
import os from "os";
import packageFile from "../package.json" assert { type: "json" };

console.log(process.env.APP_VERSION);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { name, version, author } = packageFile;

const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";
const isLinux = os.platform() === "linux";

const now = new Date();

const config: builder.Configuration = {
  directories: {
    output: "electron_dist",
    buildResources: "buildResources",
  },
  files: ["main/dist/**", "preload/dist/**", "app/dist/**"],
  extraMetadata: {
    version: process.env.APP_VERSION ?? version as string,
  },
  productName: process.env.APP_NAME ?? name as string,
  copyright: `Copyright © ${now.getFullYear()} ${author as string}`,
  executableName: process.env.APP_NAME ?? name as string,
  extraResources: [
    "buildResources/db.sqlite",
    "node_modules/.prisma/**/*",
    "node_modules/@prisma/client/**/*",
  ],
  win: {
    target: "zip"
  },
  linux: {
    target: "appimage"
  }
};

builder
  .build({
    config,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
