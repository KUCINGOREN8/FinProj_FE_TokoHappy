import { ArrowRight } from "lucide-react";
import CTA1 from "/CTA1.jpg";
import CTA2 from "/CTA2.jpg";

export default function CTA() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <ul className="grid md:grid-cols-2 gap-12">
          <li>
            <div
              className="cta-card relative bg-cover bg-center text-white text-center p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:z-10"
              style={{ backgroundImage: `url(${CTA1})` }}
            >
              <div className="bg-black p-10 rounded-lg">
                <p className="text-lg font-medium mb-2">New Items</p>
                <h3 className="text-3xl font-bold mb-4">
                  The Summer Sale Off 50%
                </h3>
                <a
                  href="product"
                  className="inline-flex items-center gap-2 text-white font-semibold border-b-2 border-white hover:text-gray-200"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </li>
          <li>
            <div
              className="cta-card relative bg-cover bg-center text-white text-center p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:z-10"
              style={{ backgroundImage: `url(${CTA2})` }}
            >
              <div className="bg-black p-10 rounded-lg">
                <p className="text-lg font-medium mb-2">Nike Jackets</p>
                <h3 className="text-3xl font-bold mb-4">
                  Makes Yourself Keep Sporty
                </h3>
                <a
                  href="product"
                  className="inline-flex items-center gap-2 text-white font-semibold border-b-2 border-white hover:text-gray-200"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
