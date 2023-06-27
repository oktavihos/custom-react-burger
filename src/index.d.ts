declare module "*.png";
declare module "*.jpg";
declare module "*.webp";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

declare module '*.module.sass' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}