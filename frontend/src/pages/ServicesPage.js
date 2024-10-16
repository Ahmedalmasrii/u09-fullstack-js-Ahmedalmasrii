import { useParams, useNavigate } from "react-router-dom";
import "./ServicesPage.css";

const servicesData = [
  {
    id: "residential",
    title: "Residential Cleaning",
    shortDescription: "Deep and regular cleaning for your home.",
    fullDescription: `Our residential cleaning includes a comprehensive cleaning service for every room in your house. 
    We ensure a spotless home with a focus on hygiene and comfort. Our trained cleaners use eco-friendly products, 
    advanced techniques, and pay close attention to detail. Whether it's weekly, bi-weekly, or monthly cleaning, 
    you can count on us for consistent, high-quality service.`,
    image: "/images/Recidental-cleaning.jpg",
    guarantee: "We guarantee 100% satisfaction or your next cleaning is free!",
    offers: [
      "All rooms: vacuuming, dusting, and mopping.",
      "Kitchen and bathroom: deep cleaning and disinfection.",
      "Bedroom: changing bed linens and organizing.",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Cleaning",
    shortDescription: "Cleaning services for your office or workplace.",
    fullDescription: `We offer professional commercial cleaning services tailored to your office or workspace needs. 
    Our flexible scheduling ensures minimal disruption to your daily operations. We provide expert cleaning solutions 
    for offices, restaurants, retail spaces, and more. Whether it's daily maintenance or a deep clean, we've got you covered.`,
    image: "/images/commercial-cleaning.jpg",
    guarantee:
      "Our cleaning ensures a healthy and hygienic workspace or your next clean is free!",
    offers: [
      "Desk and surface cleaning.",
      "Restroom sanitization.",
      "Floor maintenance and waste management.",
    ],
  },
  {
    id: "window",
    title: "Window Cleaning",
    shortDescription: "Professional window cleaning services.",
    fullDescription: `Our window cleaning service ensures streak-free windows both inside and outside. We use 
    specialized tools to reach even the hardest places and make your windows shine. Whether it’s for your home 
    or your business, you’ll see the world through crystal clear glass with our professional services.`,
    image: "/images/window-cleaning.jpg",
    guarantee: "We guarantee spotless, streak-free windows or your money back!",
    offers: [
      "Interior and exterior window cleaning.",
      "Eco-friendly, streak-free solutions.",
      "Hard-to-reach windows handled with professional tools.",
    ],
  },
  {
    id: "carpet",
    title: "Carpet Cleaning",
    shortDescription: "Deep carpet cleaning services.",
    fullDescription: `Our deep carpet cleaning services remove dirt, stains, and allergens from your carpets. 
    We use advanced steam cleaning technology that penetrates deep into the carpet fibers, ensuring a fresher, 
    cleaner environment. Regular carpet cleaning can extend the life of your carpets and improve air quality in your home or office.`,
    image: "/images/carpet-cleaning.jpg",
    guarantee: "We guarantee stain removal or we’ll come back for free!",
    offers: [
      "Steam cleaning technology.",
      "Stain and odor removal.",
      "Quick drying and anti-allergen treatments.",
    ],
  },
  {
    id: "post-construction",
    title: "Post-Construction Cleaning",
    shortDescription: "Cleaning after construction or renovation.",
    fullDescription: `Our post-construction cleaning services ensure that your newly renovated or constructed space is 
    spotless and ready for use. We handle the removal of dust, debris, and any construction waste, leaving your space 
    clean, polished, and looking its best. This service is essential after any renovation or building project.`,
    image: "/images/post-construction-cleaning.jpg",
    guarantee:
      "We ensure your space is move-in ready or we’ll return to finish the job!",
    offers: [
      "Dust and debris removal.",
      "Detailed surface cleaning.",
      "Waste removal and polishing.",
    ],
  },
];

function ServicesPage() {
  const { serviceId } = useParams(); // Hämta tjänst-ID från URL
  const navigate = useNavigate();

  // Hitta rätt tjänst baserat på serviceId från URL
  const service = servicesData.find((service) => service.id === serviceId);

  if (!service) {
    return <div>Service not found</div>; // Om ingen tjänst hittas
  }

  const handleBookNow = () => {
    // Navigera till bokningssidan och skicka med tjänstens namn
    navigate("/booking", { state: { selectedService: service.title } });
  };

  return (
    <div className="service-details-page">
      <header className="service-header">
        <h1>{service.title}</h1>
        <p>{service.shortDescription}</p>
      </header>

      <div className="service-content">
        <div className="service-image-container">
          <img
            src={service.image}
            alt={service.title}
            className="service-image"
          />
        </div>
        <div className="service-text-content">
          <h2>Why Choose Us?</h2>
          <p>{service.fullDescription}</p>

          <h3>What We Offer</h3>
          <ul>
            {service.offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>

          <h3>Our Guarantee</h3>
          <p>{service.guarantee}</p>

          <button className="book-now-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
