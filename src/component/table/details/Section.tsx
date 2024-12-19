import "@/component/table/details/SectionStyling.css";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="section">
      <h5>{title}</h5>
      <div className="sectionContent">{children}</div>
    </div>
  );
};
