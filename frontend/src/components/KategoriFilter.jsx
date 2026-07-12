import './KategoriFilter.css';

function KategoriFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="kategori-filter" id="kategori-filter">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`kategori-filter__btn ${activeCategory === cat.value ? 'kategori-filter__btn--active' : ''}`}
          onClick={() => onCategoryChange(cat.value)}
          id={`filter-${cat.value}`}
        >
          {cat.emoji && <span className="kategori-filter__emoji">{cat.emoji}</span>}
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default KategoriFilter;
