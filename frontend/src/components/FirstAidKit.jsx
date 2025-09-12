import React, { useState } from 'react';
import { Search, AlertTriangle, Heart, Phone, Clock, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from "axios";   // ✅ added

const FirstAidKit = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState(null);

  // ✅ Emergency call function
  const handleEmergency = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/emergency/call", {
        userId: "12345",        // later replace with actual logged-in user id
        location: "Hyderabad",  // later replace with live location if needed
        time: new Date()
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to contact emergency team!");
    }
  };

  const emergencyConditions = [
    {
      id: '1',
      title: 'Cold and Cough',
      symptoms: ['High cold and cough', 'Illeness', 'Headach'],
      severity: 'High',
      color: 'orange',
      steps: [
        'wash your hands often',
        'avoid touching your face, cover your coughs and sneezes into a tissue or your elbow',
        'avoid close contact with others, especially those who are sick',
        'To find relief, drink plenty of fluids, get rest, and use a humidifier to ease congestion',
        'Stay home: from work or school if you have a fever or a bad cough to avoid infecting others. '
      ],
      video: 'bleeding-control'
    },
    {
      id: '2',
      title: 'Fever',
      symptoms: ['High fever', 'Low fever but weakness'],
      severity: 'High',
      color: 'orange',
      steps: [
        'get plenty of rest',
        'stay hydrated with water and clear broths',
        'take over-the-counter fever reducers like acetaminophen or ibuprofen as directed',
        'Dress in light, loose clothing and keep the room cool',
        'Do not give aspirin to children'
      ],
      video: 'Fever percautions'
    },
    {
      id: '3',
      title: 'Bleeding',
      symptoms: ['Heavy bleeding', 'Deep cuts', 'Severe wounds'],
      severity: 'High',
      color: 'orange',
      steps: [
        'Apply direct pressure to wound with clean cloth',
        'Elevate injured area above heart level if possible',
        'Apply pressure bandage over the cloth',
        'Do not remove cloth - add more layers if needed',
        'Seek medical attention for severe bleeding'
      ],
      video: 'bleeding-control'
    },
    {
      id: '4',
      title: 'Burns',
      symptoms: ['Red skin', 'Blisters', 'Pain', 'Swelling'],
      severity: 'Medium',
      color: 'yellow',
      steps: [
        'Cool the burn with cold running water for 10-20 minutes',
        'Remove jewelry/clothing from burned area before swelling',
        'Cover with sterile gauze bandage',
        'Take over-the-counter pain medication if needed',
        'Seek medical attention for severe burns'
      ],
      video: 'burn-treatment'
    },
    {
      id: '5',
      title: 'Allergic Reaction',
      symptoms: ['Hives', 'Swelling', 'Difficulty breathing', 'Nausea'],
      severity: 'High',
      color: 'orange',
      steps: [
        'Remove or avoid the allergen if known',
        'Give antihistamine if available',
        'Use epinephrine auto-injector if prescribed',
        'Monitor breathing and circulation',
        'Call emergency services for severe reactions'
      ],
      video: 'allergic-reaction'
    },
    {
      id: '6',
      title: 'Fainting',
      symptoms: ['Dizziness', 'Pale skin', 'Weakness', 'Loss of consciousness'],
      severity: 'Medium',
      color: 'yellow',
      steps: [
        'Check for responsiveness and breathing',
        'Elevate legs 8-12 inches if breathing normally',
        'Loosen tight clothing',
        'Check for injuries from falling',
        'Monitor vital signs until recovery'
      ],
      video: 'fainting-response'
    }
  ];

  const filteredConditions = emergencyConditions.filter(condition =>
    condition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condition.symptoms.some(symptom =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderConditionCard = (condition, index) => (
    <motion.div
      key={condition.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setSelectedCondition(condition)}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{condition.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${condition.color === 'red' ? 'bg-red-100 text-red-800' :
          condition.color === 'orange' ? 'bg-orange-100 text-orange-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
          {condition.severity}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Common Symptoms:</p>
        <div className="flex flex-wrap gap-2">
          {condition.symptoms.slice(0, 3).map((symptom, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {symptom}
            </span>
          ))}
          {condition.symptoms.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{condition.symptoms.length - 3} more
            </span>
          )}
        </div>
      </div>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        View Instructions
      </button>
    </motion.div>
  );

  if (selectedCondition) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCondition(null)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to First Aid Kit
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedCondition.color === 'red' ? 'bg-red-100' :
              selectedCondition.color === 'orange' ? 'bg-orange-100' :
                'bg-yellow-100'
              }`}>
              <AlertTriangle className={`w-6 h-6 ${selectedCondition.color === 'red' ? 'text-red-600' :
                selectedCondition.color === 'orange' ? 'text-orange-600' :
                  'text-yellow-600'
                }`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedCondition.title}</h1>
              <p className={`font-medium ${selectedCondition.color === 'red' ? 'text-red-600' :
                selectedCondition.color === 'orange' ? 'text-orange-600' :
                  'text-yellow-600'
                }`}>
                {selectedCondition.severity} Priority
              </p>
            </div>
          </div>

          {selectedCondition.severity === 'Critical' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Emergency Action Required</span>
              </div>
              <p className="text-red-700">Call 911 immediately before following these steps.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Symptoms to Watch For:</h3>
              <ul className="space-y-2">
                {selectedCondition.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Video className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Video Guide Available</span>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Watch Step-by-Step Video
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Instructions:</h3>
            <div className="space-y-3">
              {selectedCondition.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This information is for emergency guidance only.
              Always seek professional medical help for serious conditions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">First Aid Kit</h1>
        <p className="text-gray-600">Emergency response guides and medical assistance</p>
      </div>

      {/* Emergency Call Button */}
      <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Emergency Situation?</h2>
            <p className="text-red-100">Get immediate help from our emergency response team</p>
          </div>
          <button
            className="flex items-center space-x-2 px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            onClick={handleEmergency}   // ✅ wired to backend
          >
            <Phone className="w-5 h-5" />
            <span>Call Emergency</span>
          </button>
        </div>
      </div>
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conditions, symptoms, or treatments..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConditions.map((condition, index) =>
          renderConditionCard(condition, index)
        )}
      </div>

      {filteredConditions.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500">No conditions found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstAidKit;