import type React from 'react';

const FiltersSidebar: React.FC = () => (
  <aside className="w-64 p-4 bg-white border rounded">
    <h3 className="font-semibold mb-2">Filters</h3>
    <div className="mb-4">
      <h4 className="font-medium mb-1">Paper Type</h4>
      <ul className="space-y-1">
        <li><label><input type="checkbox" /> Standard</label></li>
        <li><label><input type="checkbox" /> Matte</label></li>
        <li><label><input type="checkbox" /> Glossy</label></li>
        <li><label><input type="checkbox" /> Uncoated</label></li>
      </ul>
    </div>
    <div className="mb-4">
      <h4 className="font-medium mb-1">Finish</h4>
      <ul className="space-y-1">
        <li><label><input type="checkbox" /> Foil Accent</label></li>
        <li><label><input type="checkbox" /> Embossed Gloss</label></li>
        <li><label><input type="checkbox" /> Raised Foil</label></li>
      </ul>
    </div>
  </aside>
);

export default FiltersSidebar;
