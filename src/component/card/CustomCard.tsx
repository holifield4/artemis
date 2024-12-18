import "@/component/card/Card.css";
import { CardData } from "@/component/card/Card";

interface CustomCardProps extends Partial<CardData> {
  variation: "text" | "compact";
  image?: string;
}

const CustomCard = ({ title, description, image, variation, content }: CustomCardProps) => {
  return (
    <div className={`customCard ${variation === "text" ? "text" : "compact"}`}>
      {variation === "text" ? (
        <>
          <p>{title}</p>
          <span>{description}</span>
        </>
      ) : (
        <>
          <span>x1</span>
          <img className="cardImage" src={image}></img>
          <div className="cardDetails">
            <span className="cardTitle">{title}</span>
            <div className="detailWrapper">
              <span className="cardDescription">{description}</span>
              <span>{content}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCard;
