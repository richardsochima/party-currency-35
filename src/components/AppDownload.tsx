export const AppDownload = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Join the Celebration!
          </h2>
          <p className="font-montserrat mb-8">
            Experience secure transactions with Party Currency by downloading our mobile app today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
              <img src="/apple-logo.svg" alt="App Store" className="w-6 h-6" />
              App Store
            </button>
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
              <img src="/google-play.svg" alt="Google Play" className="w-6 h-6" />
              Google Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};