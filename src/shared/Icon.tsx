import icons from "../assets/icons.svg";

type IconProps = {
  width: number;
  height: number;
  icon: string;
};

export const Icon = ({ width, height, icon }: IconProps) => {
  return (
    <svg width={width} height={height} aria-hidden="true">
      <use href={`${icons}#${icon}`} />
    </svg>
  );
};
