export const ContactForm = () => {
  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">Get In Touch With Us</h2>
            <p className="font-montserrat text-gray-600 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">📞</span>
                </div>
                <div>
                  <p className="font-montserrat font-semibold">Phone</p>
                  <p className="text-gray-600">+1 234 567 890</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">✉️</span>
                </div>
                <div>
                  <p className="font-montserrat font-semibold">Email</p>
                  <p className="text-gray-600">contact@party.currency</p>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-montserrat"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-montserrat"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary font-montserrat"
              ></textarea>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-montserrat font-semibold px-8 py-3 rounded-md transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};