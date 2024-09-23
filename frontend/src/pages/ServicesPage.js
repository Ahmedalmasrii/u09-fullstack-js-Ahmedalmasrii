
import React, { useState } from 'react';
import './ServicesPage.css'; 

function ServicesPage() {
  const [activeService, setActiveService] = useState(null); // Hanterar den aktiva tjänsten

  const services = [
    {
      id: 1,
      title: 'Residential Cleaning',
      shortDescription: 'Deep and regular cleaning for your home.',
      fullDescription: 'Our residential cleaning includes a comprehensive cleaning service for every room in your house. From dusting and vacuuming to disinfecting surfaces, we cover it all.',
    },
    {
      id: 2,
      title: 'Commercial Cleaning',
      shortDescription: 'Cleaning services for your office or workplace.',
      fullDescription: 'Our commercial cleaning services ensure a clean and healthy work environment. We offer flexible schedules to minimize disruption to your business operations.',
    },
    {
      id: 3,
      title: 'Window Cleaning',
      shortDescription: 'Professional window cleaning services.',
      fullDescription: 'We use specialized equipment and eco-friendly products to clean your windows inside and out, leaving them spotless and streak-free.',
    },
    {
      id: 4,
      title: 'Carpet Cleaning',
      shortDescription: 'Deep carpet cleaning services.',
      fullDescription: 'Our carpet cleaning services use steam cleaning technology to remove dirt, stains, and allergens, extending the life of your carpet.',
    },
    {
      id: 5,
      title: 'Post-Construction Cleaning',
      shortDescription: 'Cleaning after construction or renovation.',
      fullDescription: 'We provide a thorough cleaning service to remove dust, debris, and construction waste, making your space ready for occupancy.',
    },
  ];

  const toggleService = (id) => {
    if (activeService === id) {
      setActiveService(null); // Stäng om samma tjänst klickas igen
    } else {
      setActiveService(id); // Öppna den valda tjänsten
    }
  };

  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Our Cleaning Services</h1>
        <p>Explore our wide range of professional cleaning services tailored to meet your needs.</p>
      </header>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-item ${activeService === service.id ? 'active' : ''}`}
            onClick={() => toggleService(service.id)}
          >
            <h2>{service.title}</h2>
            <p>{service.shortDescription}</p>
            {activeService === service.id && (
              <div className="service-details">
                <p>{service.fullDescription}</p>
                <button className="request-button">Request a Quote</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
