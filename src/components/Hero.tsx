export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-dark to-[#2A2F6B] text-white">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/f30d3077-4e3d-4847-8515-d5ea6446044b.png')] opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            What's the Generous Sum Coming Your Way?
          </h1>
          <p className="text-lg md:text-xl font-montserrat mb-8 text-gray-200">
            Make it rain with Party Currency!
          </p>
          <button className="bg-accent hover:bg-accent-light text-primary font-montserrat font-semibold px-8 py-3 rounded-md transition-colors">
            Get Party Currency
          </button>
        </div>
      </div>
    </div>
  );
};