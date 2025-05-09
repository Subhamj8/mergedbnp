import type React from 'react';

export interface InfoCardProps {
  title: string;
  description: string;
  imgUrl: string;
  cta: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, imgUrl, cta }) => (
  <div className="bg-[#f8f7f5] rounded overflow-hidden shadow">
    <img src={imgUrl} alt={title} className="w-full h-32 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <button className="text-blue-600 underline text-sm">{cta}</button>
    </div>
  </div>
);

export default InfoCard;
