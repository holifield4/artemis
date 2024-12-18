import "./Card.css";

export interface CardProps {
  data: CardData[];
}

export interface CardData {
  title: string;
  content: string;
  description: string;
}

const Card = ({ data }: CardProps) => {
  return (
    <>
      {data.map((item, itemIndex) => {
        return (
          <div key={itemIndex} className="card">
            <span className="title">{item.title}</span>
            <span className="content">{item.content}</span>
            <span className="description">{item.description}</span>
          </div>
        );
      })}
    </>
  );
};

export default Card;
