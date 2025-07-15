const Testimonial = () => {

  const testimonialData = [
    {
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
        name: 'John Doe',
        title: 'Marketing Director',
        content: 'Artifinity.ai has completely transformed the way we handle visuals and writing. From removing backgrounds to generating compelling blog posts, it’s like having a full creative team in one tool.',
        rating: 4,
    },
    {
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
        name: 'Jane Smith',
        title: 'Content Creator',
        content: 'Thanks to Artifinity.ai, our design and content process is now 3x faster. The AI-generated images are spot-on, and the article suggestions are incredibly relevant and polished.',
        rating: 5,
    },
    {
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
        name: 'David Lee',
        title: 'Content Writer',
        content: 'We started using Artifinity.ai for quick tasks, but now it’s at the center of our content and media production. It’s accurate, intuitive, and a major time-saver for our team.',
        rating: 4,
    },
  ]



    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {testimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-primary' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 .587l3.668 7.568 8.332 1.214-6.042 5.885 1.428 8.32L12 18.896l-7.386 3.868 1.428-8.32L.001 9.369l8.332-1.214L12 .587z" />
                                </svg>
                            ))}
                        </div>
                        <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial;