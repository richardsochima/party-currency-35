import { Wallet, Users, Shield, Gift } from 'lucide-react';

const services = [
  {
    icon: Wallet,
    title: 'Fortune Growing',
    description: 'Watch your wealth multiply with our innovative platform'
  },
  {
    icon: Users,
    title: 'Social Celebration',
    description: 'Connect and celebrate with friends across the globe'
  },
  {
    icon: Shield,
    title: 'Trusted & Secure',
    description: 'Your transactions are protected with advanced security'
  },
  {
    icon: Gift,
    title: 'Fun Rewards',
    description: 'Earn exciting rewards while you transact'
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">{service.title}</h3>
              <p className="font-montserrat text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};