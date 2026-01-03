import { useEffect, useState } from "react";
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  // 👉 Fetch all categories
  const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data.data || []);
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

  // 👉 Fetch products category-wise
  const fetchProductsByCategory = async (cats) => {
    let results = {};


    for (let cat of cats) {
      const res = await fetch(`http://localhost:5000/api/products?category=${cat._id}&limit=5`);
      const data = await res.json();
      results[cat._id] = data.data || [];
    }

    console.log(results)
    setCategoryProducts(results);
  };

  useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      const cats = data.data || [];
      setCategories(cats);

      // fetch products after categories
      let results = {};
      for (let cat of cats) {
        const res = await fetch(
          `http://localhost:5000/api/products?category=${cat._id}&limit=5`
        );
        const data = await res.json();
        results[cat._id] = data.data || [];
      }
      setCategoryProducts(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // ✅ ALWAYS runs
    }
  };

  loadData();
}, []);


  // second useEffect to fetch category products only after categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      fetchProductsByCategory(categories).then(() => setLoading(false));
    }
  }, [categories]);

  if (loading)
    return <p className="text-center py-10 text-lg font-medium">Loading...</p>;

  return (
    <section className='bg-white'>
      {/* Banner */}
      <div className='container mx-auto'>
        <div className='w-full h-full min-h-48 bg-blue-100 rounded'>
          <img src={banner} className='w-full h-full hidden lg:block' alt='banner'/>
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner'/>
        </div>
      </div>

      {/* Category Grid */}
      <div className='container mx-auto px-4 my-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4'>
        {categories.map(cat => (
          <div key={cat._id} className='bg-white rounded p-2 shadow cursor-pointer text-center'>
            <img src={cat.imageURL} alt={cat.name} className='w-20 h-20 object-cover mx-auto rounded'/>
            <p className='mt-2 text-sm font-medium'>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Category Wise Product Display */}
      <div className='container mx-auto px-4 my-6 space-y-8'>
        {categories.map(cat => (
          <div key={cat._id}>
            <h2 className='text-lg font-semibold mb-3'>{cat.name}</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {categoryProducts[cat._id]?.length > 0 ? (
                categoryProducts[cat._id].map(product => (
                  <div key={product._id} className='bg-white rounded shadow p-3 hover:shadow-md'>
                    <img
                      src={product.imageURL[0]}
                      alt={product.name}
                      className='w-full h-32 object-cover rounded'
                    />
                    <p className='mt-2 font-medium text-sm'>{product.name}</p>
                    <p className='text-gray-600 text-sm'>₹{product.price}</p>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 text-sm'>No products found</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
