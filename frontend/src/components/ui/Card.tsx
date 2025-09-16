import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card = ({
  children,
  className = "",
  hover = true,
  glow = false,
}: CardProps) => {
  return (
    <div
      className={`glass rounded-xl p-6 ${hover ? "hover-lift cursor-pointer" : ""} ${glow ? "animate-glow" : ""} ${className} `}
    >
      {children}
    </div>
  );
};

export default Card;
