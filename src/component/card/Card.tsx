import './Card.css';

interface CardProps {
    title: string;
    content: string;
    description: string;
}

const Card = ({title, content, description}: CardProps) => {
    return (
        <>
            <div className="card">
                <span className='title'>{title}</span>
                <span className='content'>{content}</span>
                <span className='description'>{description}</span>
            </div>
        </>
    )
}

export default Card;