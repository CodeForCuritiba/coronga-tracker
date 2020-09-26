
// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
declare module "*.png"

declare module "*.svg " {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
