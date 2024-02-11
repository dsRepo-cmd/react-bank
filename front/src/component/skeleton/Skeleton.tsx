import { CSSProperties, FC, memo } from "react";
import cls from "./Skeleton.module.css";

interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  border?: string;
  marginBottom?: string;
}

const Skeleton: FC<SkeletonProps> = memo((props) => {
  const { height, width, border = "12px", marginBottom } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
    marginBottom,
  };

  return <div className={cls.skeleton} style={styles} />;
});

export default Skeleton;
