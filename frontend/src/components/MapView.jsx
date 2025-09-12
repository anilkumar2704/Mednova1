import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Navigation, Filter, RefreshCw, Phone, Star, Clock, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MapView = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = userLocation;

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Simulate nearby nurses data
    setNurses([
      {
        id: '1',
        name: 'Sri Anvitha',
        specialty: 'General Care',
        rating: 4.8,
        experience: '5 years',
        availability: 'Available',
        location: { lat: 40.7148, lng: -74.0080 },
        estimatedTime: '5 min',
        price: 500,
        type: 'general',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8E04i4f3RG9W9408PPhuTYafgQOHWStcnA&s',
        phone: '6382396188',
        distance: '0.8 km'
      },
      {
        id: '2',
        name: 'Heshmitha',
        specialty: 'ICU Specialist',
        rating: 4.9,
        experience: '8 years',
        availability: 'Available',
        location: { lat: 40.7108, lng: -74.0040 },
        estimatedTime: '8 min',
        price: 250,
        type: 'specialist',
        image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc.jpg',
        phone: '9063483689',
        distance: '1.2 km'
      },
      {
        id: '3',
        name: 'Harshini',
        specialty: 'Pediatric Care',
        rating: 4.7,
        experience: '6 years',
        availability: 'Available',
        location: { lat: 40.7158, lng: -74.0020 },
        estimatedTime: '12 min',
        price: 450,
        type: 'pediatric',
        image: 'https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg',
        phone: '8008353069',
        distance: '1.5 km'
      },
      {
        id: '4',
        name: 'Dheeraj',
        specialty: 'Emergency Care',
        rating: 4.9,
        experience: '10 years',
        availability: 'Available',
        location: { lat: 40.7098, lng: -74.0100 },
        estimatedTime: '6 min',
        price: 350,
        type: 'emergency',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOwKoG6F9Wbuv7Kuh6b2hoRDIvsFjbYW1Ig&s',
        phone: '8008353069',
        distance: '0.9 km'
      },
      {
        id: '5',
        name: 'Shidhu',
        specialty: 'Wound Care',
        rating: 4.6,
        experience: '7 years',
        availability: 'Busy',
        location: { lat: 40.7118, lng: -74.0060 },
        estimatedTime: '15 min',
        price: 400,
        type: 'specialist',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXWbRqxogEyj7DRg86MWdAe8EZudKVKv8RA&s',
        phone: '9962836684',
        distance: '1.0 km'
      }
    ]);
  }, []);

  const filteredNurses = nurses.filter(nurse =>
    filterType === 'all' || nurse.type === filterType
  );

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleBookNurse = (nurse) => {
    navigate('/booking', { state: { selectedNurse: nurse } });
  };

  const handleCallNurse = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Nearby Nurses</h1>
        <p className="text-gray-600">Real-time location tracking of available healthcare professionals</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Nurses ({nurses.length})</option>
              <option value="general">General Care</option>
              <option value="specialist">Specialists</option>
              <option value="pediatric">Pediatric</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Nurse List - Left Sidebar */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 sticky top-0 bg-gray-50 py-2">
            Available Nurses ({filteredNurses.length})
          </h2>

          {filteredNurses.map((nurse, index) => (
            <motion.div
              key={nurse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer ${selectedNurse?.id === nurse.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              onClick={() => setSelectedNurse(nurse)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={nurse.image}
                  alt={nurse.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{nurse.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{nurse.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="flex items-center text-xs">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {nurse.rating}
                    </span>
                    <span className="text-xs text-gray-500">{nurse.distance}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${nurse.availability === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {nurse.availability}
                    </span>
                    <span className="text-xs text-blue-600 font-medium">₹{nurse.price}</span>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCallNurse(nurse.phone);
                      }}
                      className="flex-1 py-1 px-2 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      Call
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNurse(nurse);
                      }}
                      className="flex-1 py-1 px-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Live Nurse Locations</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Your Location</span>
                <div className="w-3 h-3 bg-red-600 rounded-full ml-4"></div>
                <span>Available Nurses</span>
              </div>
            </div>

            <LoadScript googleMapsApiKey="AIzaSyB0ww_eYpPmgUGKBZhXI8IKD9TiKCvtEfg">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ],
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true
                }}
              >
                {/* User Location Marker */}
                {/* User Marker */}
                <Marker
                  position={userLocation}
                  icon={{
                    url: "https://media.istockphoto.com/id/1768217932/vector/multiple-destinations-gps-tracking-map-track-navigation-pins-on-street-maps-navigate-mapping.jpg?s=612x612&w=0&k=20&c=6O3Hgw29yP5KoqWduJ3EYSWgKr72ftE1fO7UVQX8ME4=", // ✅ your uploaded image file
                    scaledSize: new window.google.maps.Size(40, 40) // adjust size
                  }}
                />

                {/* Nurse Markers */}
                {filteredNurses.map((nurse) => (
                  <Marker
                    key={nurse.id}
                    position={nurse.location}
                    onClick={() => setSelectedNurse(nurse)}
                    icon={{
                      url: "https://media.istockphoto.com/id/1768217932/vector/multiple-destinations-gps-tracking-map-track-navigation-pins-on-street-maps-navigate-mapping.jpg?s=612x612&w=0&k=20&c=6O3Hgw29yP5KoqWduJ3EYSWgKr72ftE1fO7UVQX8ME4=", // nurse image
                      scaledSize: new window.google.maps.Size(30, 30)
                    }}
                  />
                ))}



                {selectedNurse && (
                  <InfoWindow
                    position={selectedNurse.location}
                    onCloseClick={() => setSelectedNurse(null)}
                  >
                    <div className="p-3 max-w-xs">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={selectedNurse.image}
                          alt={selectedNurse.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{selectedNurse.name}</h3>
                          <p className="text-sm text-gray-600">{selectedNurse.specialty}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            {selectedNurse.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Distance:</span>
                          <span>{selectedNurse.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">ETA:</span>
                          <span className="text-green-600">{selectedNurse.estimatedTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <span className="font-medium">₹{selectedNurse.price}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleCallNurse(selectedNurse.phone)}
                          className="flex-1 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Call
                        </button>
                        <button
                          onClick={() => handleBookNurse(selectedNurse)}
                          className="flex-1 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>

      {/* Selected Nurse Details */}
      {selectedNurse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Selected Nurse Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedNurse.image}
                alt={selectedNurse.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{selectedNurse.name}</h4>
                <p className="text-gray-600">{selectedNurse.specialty}</p>
                <p className="text-sm text-gray-500">{selectedNurse.experience} experience</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{selectedNurse.rating}</span>
                  <span className="text-sm text-gray-500">• {selectedNurse.distance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedNurse.availability === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {selectedNurse.availability}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Arrival:</span>
                <span className="font-medium text-green-600">{selectedNurse.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rate:</span>
                <span className="font-bold text-blue-600">₹{selectedNurse.price}</span>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleCallNurse(selectedNurse.phone)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button
                  onClick={() => handleBookNurse(selectedNurse)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MapView;