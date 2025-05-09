import type React from 'react';

const tools = [
  { title: 'Custom Logos', iconUrl: 'https://via.placeholder.com/80' },
  { title: 'Product Design', iconUrl: 'https://via.placeholder.com/80' },
  { title: 'Custom Business Websites', iconUrl: 'https://via.placeholder.com/80' },
  { title: 'Social Media', iconUrl: 'https://via.placeholder.com/80' },
  { title: 'Wholesale Print Program', iconUrl: 'https://via.placeholder.com/80' },
  { title: 'VistaPrint Corporate Services', iconUrl: 'https://via.placeholder.com/80' },
];

const ToolsSection: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Tools to help build your business</h2>
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {tools.map(tool => (
        <li key={tool.title} className="flex flex-col items-center text-center">
          <img src={tool.iconUrl} alt={tool.title} className="w-16 h-16 mb-2" />
          <span className="text-sm text-gray-800">{tool.title}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default ToolsSection;
