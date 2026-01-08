export default function BookCard({ title, author, price, image }) {
  return (
<div className="
  bg-white
  rounded-xl
  shadow-sm
  hover:shadow-xl
  hover:-translate-y-1
  transition-all duration-300
  overflow-hidden
">
      
      {/* Book Cover */}
<div
  className="
    h-56
    flex items-center justify-center
    bg-gradient-to-b
    from-[#D6B88A]
    via-[#C49A6C]
    to-[#B08968]
    relative
  "
>
  {/* subtle wood grain texture */}
  <div className="
    absolute inset-0
    opacity-10
    bg-[radial-gradient(#000_1px,transparent_1px)]
    [background-size:6px_6px]
  " />

  {image ? (
    <img
      src={image.replace("http://", "https://")}
      alt={title}
      className="
        h-44
        object-contain
        z-10
        shadow-lg
        rounded
      "
    />
  ) : (
    <span className="text-sm text-white/80 z-10">
      No cover
    </span>
  )}
</div>


      {/* Book Info */}
      <div className="p-4">
  <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900">
    {title}
  </h3>

  <p className="text-xs text-gray-500 line-clamp-1">
    {author}
  </p>

  <p className="mt-2 text-lg font-bold text-indigo-600">
    ₹{price}
  </p>
</div>
</div>
  );
}
