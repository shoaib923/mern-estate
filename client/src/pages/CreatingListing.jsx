import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

const storeImageBackend = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/image/upload-image', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  const data = await res.json();

  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Image upload failed');
  }

  return data.url; // <-- Use this in formData.imageUrls
};

const handleImageSubmit = async () => {
  if (files.length === 0 || files.length + formData.imageUrls.length > 6) {
    setImageUploadError('You can only upload 6 images per listing');
    return;
  }

  setUploading(true);
  setImageUploadError(false);

  try {
    const urls = [];
    for (const file of files) {
      const url = await storeImageBackend(file);
      urls.push(url);
    }
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ...urls],
    });
  } catch (err) {
    setImageUploadError(err.message || 'Image upload failed');
  } finally {
    setUploading(false);
  }
};


  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
      return;
    }

    if (['parking', 'furnished', 'offer'].includes(e.target.id)) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
      return;
    }

    if (['text', 'number', 'textarea'].includes(e.target.type)) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');

      setLoading(true);
      setError(false);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) setError(data.message);
      else navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        {/* Left Side: Listing details */}
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            id='name'
            className='border p-3 rounded-lg'
            maxLength='62'
            minLength='10'
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder='Description'
            id='description'
            className='border p-3 rounded-lg'
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            className='border p-3 rounded-lg'
            required
            value={formData.address}
            onChange={handleChange}
          />

          {/* Checkboxes */}
          <div className='flex gap-6 flex-wrap'>
            {['sale', 'rent', 'parking', 'furnished', 'offer'].map((item) => (
              <div key={item} className='flex gap-2'>
                <input
                  type='checkbox'
                  id={item}
                  className='w-5'
                  onChange={handleChange}
                  checked={
                    item === 'sale'
                      ? formData.type === 'sale'
                      : item === 'rent'
                      ? formData.type === 'rent'
                      : formData[item]
                  }
                />
                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              </div>
            ))}
          </div>

          {/* Number inputs */}
          <div className='flex flex-wrap gap-6'>
            {['bedrooms', 'bathrooms', 'regularPrice'].map((field) => (
              <div key={field} className='flex items-center gap-2'>
                <input
                  type='number'
                  id={field}
                  min={field === 'regularPrice' ? 50 : 1}
                  max={field === 'regularPrice' ? 10000000 : 10}
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  value={formData[field]}
                  onChange={handleChange}
                />
                <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
              </div>
            ))}

            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  value={formData.discountPrice}
                  onChange={handleChange}
                />
                <p>Discounted price</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Images */}
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border border-gray-300 rounded w-full'
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              disabled={uploading}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {imageUploadError && <p className='text-red-700 text-sm'>{imageUploadError}</p>}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt='listing' className='w-20 h-20 object-contain rounded-lg' />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            type='submit'
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
