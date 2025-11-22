import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'

// ✅ Placeholder categories with unique images
const placeholderCategories = [
  { _id: "1", name: "Fruits", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffruit&psig=AOvVaw3cXXMbJS1tmqmQvfgG-VJe&ust=1763622595264000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCAjqXU_ZADFQAAAAAdAAAAABAE" },
  { _id: "2", name: "Vegetables", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffruit&psig=AOvVaw3cXXMbJS1tmqmQvfgG-VJe&ust=1763622595264000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCAjqXU_ZADFQAAAAAdAAAAABAE" },
  { _id: "3", name: "Dairy", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fdairy-products&psig=AOvVaw3FserTaqZb7EG4cKVe4feK&ust=1763622689436000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOipsNHU_ZADFQAAAAAdAAAAABAE" },
  { _id: "4", name: "Snacks", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fsnacks&psig=AOvVaw2HMWUMxorPlnC9U4V-NROq&ust=1763622713970000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDa193U_ZADFQAAAAAdAAAAABAg" },
  { _id: "5", name: "Beverages", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnawon.com.vn%2Ftypes-of-drinks-alcoholic-and-non-alcoholic-beverage%2F&psig=AOvVaw1EVuRz5tsmtqFnAN-q9TvI&ust=1763622751885000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLiHuu_U_ZADFQAAAAAdAAAAABAE" },
]

// ✅ Placeholder products (same list shown under each category)
const placeholderProducts = [
  { id: "p1", name: "Sample Product 1", price: "₹100", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiablooms.com%2Ffinance%2Ffmcg-brand-rasna-enters-the-health-and-wellness-products-sector-with-new-sub-brand%2Fdetails&psig=AOvVaw1dOKpOTvKA571i0N4uHSPF&ust=1763622795685000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjK54TV_ZADFQAAAAAdAAAAABAE" },
  { id: "p2", name: "Sample Product 2", price: "₹150", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiablooms.com%2Ffinance%2Ffmcg-brand-rasna-enters-the-health-and-wellness-products-sector-with-new-sub-brand%2Fdetails&psig=AOvVaw1dOKpOTvKA571i0N4uHSPF&ust=1763622795685000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjK54TV_ZADFQAAAAAdAAAAABAE" },
  { id: "p3", name: "Sample Product 3", price: "₹200", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiablooms.com%2Ffinance%2Ffmcg-brand-rasna-enters-the-health-and-wellness-products-sector-with-new-sub-brand%2Fdetails&psig=AOvVaw1dOKpOTvKA571i0N4uHSPF&ust=1763622795685000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjK54TV_ZADFQAAAAAdAAAAABAE" },
  { id: "p4", name: "Sample Product 4", price: "₹250", image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiablooms.com%2Ffinance%2Ffmcg-brand-rasna-enters-the-health-and-wellness-products-sector-with-new-sub-brand%2Fdetails&psig=AOvVaw1dOKpOTvKA571i0N4uHSPF&ust=1763622795685000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjK54TV_ZADFQAAAAAdAAAAABAE" },
]

const Home = () => {
  return (
   <section className='bg-white'>
      {/* Banner */}
      <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48 bg-blue-100 rounded`}>
              <img
                src={banner}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
      </div>
      
      {/* Category Grid */}
      <div className='container mx-auto px-4 my-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4'>
        {placeholderCategories.map(cat => (
          <div key={cat._id} className='bg-white rounded p-2 shadow cursor-pointer text-center'>
            <img src={cat.image} alt={cat.name} className='w-20 h-20 object-cover mx-auto rounded'/>
            <p className='mt-2 text-sm font-medium'>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Category Wise Product Display */}
      <div className='container mx-auto px-4 my-6 space-y-8'>
        {placeholderCategories.map(cat => (
          <div key={cat._id}>
            <h2 className='text-lg font-semibold mb-3'>{cat.name}</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {placeholderProducts.map(product => (
                <div key={product.id} className='bg-white rounded shadow p-3 hover:shadow-md'>
                  <img src={product.image} alt={product.name} className='w-full h-32 object-cover rounded'/>
                  <p className='mt-2 font-medium text-sm'>{product.name}</p>
                  <p className='text-gray-600 text-sm'>{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
   </section>
  )
}

export default Home
