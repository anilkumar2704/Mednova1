import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const BookingService = () => {
  const location = useLocation();
  const preSelectedNurse = location.state?.selectedNurse;

  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceType: "",
    date: "",
    time: "",
    duration: "1",
    location: "",
    specialRequirements: "",
    nurseId: "",
    urgency: "normal",
  });

  useEffect(() => {
    if (preSelectedNurse) {
      setBookingData((prev) => ({ ...prev, nurseId: preSelectedNurse.id }));
      setBookingStep(2);
    }
  }, [preSelectedNurse]);

  // Services in INR (flat price, not per hour)
  const serviceTypes = [
    { id: "general", name: "General Care", price: 150, description: "Basic healthcare assistance" },
    { id: "wound", name: "Wound Care", price: 200, description: "Specialized wound treatment" },
    { id: "post-op", name: "Op Care", price: 300, description: "Appointment" },
  ];

  // Nurses in INR (flat fee)
  const availableNurses = [
    {
      id: "1",
      name: "Sri Anvitha",
      rating: 4.8,
      experience: "5 years",
      specialty: "General Care",
      price: 3500,
      availability: "Available Now",
      image:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "2",
      name: "Heshmitha",
      rating: 4.9,
      experience: "8 years",
      specialty: "ICU Specialist",
      price: 4800,
      availability: "Available in 15 min",
      image:
        "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  const allAvailableNurses = preSelectedNurse
    ? [preSelectedNurse, ...availableNurses.filter((n) => n.id !== preSelectedNurse.id)]
    : availableNurses;

  const handleServiceSelect = (serviceId) => {
    setBookingData({ ...bookingData, serviceType: serviceId });
    setBookingStep(2);
  };

  const handleNurseSelect = (nurseId) => {
    setBookingData({ ...bookingData, nurseId });
    setBookingStep(3);
  };

  const handleBookingConfirm = () => {
    toast.success("Booking confirmed! Nurse will arrive in 8-15 minutes.");
    setTimeout(() => {
      toast.success("Nurse is on the way! Track in real-time.");
    }, 2000);
  };

  const urgencyStyles = {
    normal: "border-green-500 bg-green-50",
    urgent: "border-amber-500 bg-amber-50",
    emergency: "border-red-500 bg-red-50",
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${bookingStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-1 mx-2 ${bookingStep > step ? "bg-blue-600" : "bg-gray-200"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Select Service Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceTypes.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect(service.id)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">₹{service.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Select Nurse & Schedule</h2>

      {/* Urgency Level */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Urgency Level</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "normal", label: "Normal", time: "15-30 min" },
            { id: "urgent", label: "Urgent", time: "5-15 min" },
            { id: "emergency", label: "Emergency", time: "< 5 min" },
          ].map((urgency) => (
            <button
              key={urgency.id}
              onClick={() => setBookingData({ ...bookingData, urgency: urgency.id })}
              className={`p-4 rounded-lg border-2 transition-all ${bookingData.urgency === urgency.id
                ? urgencyStyles[urgency.id]
                : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="text-center">
                <p className="font-medium">{urgency.label}</p>
                <p className="text-sm text-gray-600">{urgency.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Available Nurses */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Available Nurses</h3>
        <div className="space-y-4">
          {allAvailableNurses.map((nurse) => (
            <div
              key={nurse.id}
              onClick={() => handleNurseSelect(nurse.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${bookingData.nurseId === nurse.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={nurse.image}
                  alt={nurse.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{nurse.name}</h4>
                  <p className="text-sm text-gray-600">{nurse.specialty}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {nurse.rating}
                    </span>
                    <span className="text-sm text-gray-500">{nurse.experience}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">₹{nurse.price}</p>
                  <p className="text-sm text-green-600">{nurse.availability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingData.nurseId && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setBookingStep(3)}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Continue to Confirmation
        </motion.button>
      )}
    </motion.div>
  );

  const renderStep3 = () => {
    const selectedService = serviceTypes.find((s) => s.id === bookingData.serviceType);
    const selectedNurse = allAvailableNurses.find((n) => n.id === bookingData.nurseId);

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Confirm Booking</h2>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Booking Summary</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nurse:</span>
              <span className="font-medium">{selectedNurse?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rate:</span>
              <span className="font-medium">₹{selectedNurse?.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Urgency:</span>
              <span
                className={`font-medium capitalize ${bookingData.urgency === "emergency"
                  ? "text-red-600"
                  : bookingData.urgency === "urgent"
                    ? "text-amber-600"
                    : "text-green-600"
                  }`}
              >
                {bookingData.urgency}
              </span>
            </div>
            <hr />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-blue-600">₹{selectedNurse?.price || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Additional Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Location
              </label>
              <input
                type="text"
                value={bookingData.location}
                onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                placeholder="Enter your address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                value={bookingData.specialRequirements}
                onChange={(e) => setBookingData({ ...bookingData, specialRequirements: e.target.value })}
                placeholder="Any special requirements or medical conditions..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setBookingStep(2)}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleBookingConfirm}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Healthcare Service</h1>
        <p className="text-gray-600">Professional nurses available 24/7 with 15-minute response</p>
      </div>

      {renderStepIndicator()}

      <div className="bg-gray-50 rounded-2xl p-8">
        {bookingStep === 1 && renderStep1()}
        {bookingStep === 2 && renderStep2()}
        {bookingStep === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default BookingService;
