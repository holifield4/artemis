import "@/component/card/Card.css";

interface InfoCardProps {
  subtotal: number;
  serviceTax: number;
}

const InfoCard = ({subtotal, serviceTax}: InfoCardProps) => {
  return (
    <>
      <div className="infoCard">
        <div className="infos">
          <span>Subtotal</span>
          <span>RM {subtotal}</span>
        </div>
        <div className="infos">
          <span>Service Tax</span>
          <span>RM {serviceTax}</span>
        </div>
        <div className="infos">
          <span>Voucher Applied</span>
          <span>RM 0.00</span>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
