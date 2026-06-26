const PropertyPageSkeleton = () => {
  return (
    <div className="flex items-center justify-center flex-col space-y-4 min-h-[80vh]">
      <h2 className="text-3xl text-primary font-semibold ">Loading property</h2>
      <p className="text-gray-600 text-sm">Please wait...</p>
      <div className="size-7 border-2 border-primary border-t-transparent animate-spin rounded-full " />
    </div>
  );
};

export default PropertyPageSkeleton;
