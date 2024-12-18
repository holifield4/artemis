import Icon from "@/assets/icon/Icon";
import "@/component/table/options/ActionOptions.css";

interface ActionOptionsProps {
  visible: boolean;
  position: { x: number; y: number };
  onViewDetails?: () => void;
  onEditTransaction?: () => void;
  onDelete?: () => void;
}

const ActionOptions = ({ visible, position, onViewDetails, onEditTransaction, onDelete }: ActionOptionsProps) => {
  return (
    <>
      {visible === true && (
        <div className="actionWrapper" style={{ position: "absolute", top: `${position.y-50}px`, left: `${position.x-90}px` }}>
          <div className="options">
            <button className="actionButtons" onClick={onViewDetails}>
              <div className="actionIcon">
                <Icon icon="Eye" />
              </div>
              View Sales Order Details
            </button>
            <button className="actionButtons" onClick={onEditTransaction}>
              <div className="actionIcon">
                <Icon icon="Edit" />
              </div>
              Edit Transaction
            </button>
          </div>
          <div className="optionsDanger">
            <button className="actionButtons" onClick={onDelete}>
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
