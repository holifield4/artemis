import Icon from "@/assets/icon/Icon";
import "@/component/table/ActionOptions.css";

interface ActionOptionsProps {
  visible: boolean;
  position: { x: number; y: number };
}

const ActionOptions = ({ visible, position }: ActionOptionsProps) => {
  return (
    <>
      {visible === true && (
        <div className="actionWrapper" style={{ position: "absolute", top: `${position.y}px`, left: `${position.x}px` }}>
          <div className="options">
            <button className="actionButtons">
              <div className="actionIcon">
                <Icon icon="Eye" />
              </div>
              View Sales Order Details
            </button>
            <button className="actionButtons">
              <div className="actionIcon">
                <Icon icon="Eye" />
              </div>
              View Transaction
            </button>
          </div>
          <div className="optionsDanger">
            <button className="actionButtons">
              <div className="actionIcon">
                <Icon icon="TrashBin" />
              </div>
              Delete this Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionOptions;
