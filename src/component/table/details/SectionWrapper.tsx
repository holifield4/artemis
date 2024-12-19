import "@/component/table/details/SectionStyling.css";
import Button from "@/component/button/Button";
import Loading from "@/component/loading/Loading";
import { ReactNode } from "react";

interface SectionWrapperProps {
  isVisible?: boolean;
  onClick?: () => void;
  isLoading: boolean;
  children: ReactNode;
}

export const SectionWrapper = ({
  isVisible,
  onClick,
  isLoading,
  children,
}: SectionWrapperProps) => {
  return (
    <>
      {isVisible === true && (
        <div className="sectionWrapper">
          <div className="sectionHeader">
            <div>
              <Button label="Close" onClick={onClick} />
            </div>
          </div>
          <div className="sectionBody">
            {isLoading === true ? <Loading /> : <>{children}</>}
          </div>
        </div>
      )}
    </>
  );
};
