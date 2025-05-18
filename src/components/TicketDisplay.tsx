
import React from 'react';
import { TicketAction } from '../services/actionService';
import { Ticket } from 'lucide-react';

interface TicketDisplayProps {
  action: TicketAction;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({ action }) => {
  return (
    <div className="relative animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-metro-blue/5 rounded-xl blur-md transform scale-105 -z-10"></div>
      <div className="bg-white/90 p-6 rounded-xl backdrop-blur-sm shadow-sm border border-metro-blue/10">
        <div className="flex items-center gap-2 mb-3">
          <Ticket className="w-5 h-5 text-metro-blue" />
          <p className="text-sm font-medium text-metro-blue">Ticket Information</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ticket Type:</span>
            <span className="font-medium text-gray-800">{action.ticket_type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Traveler Type:</span>
            <span className="font-medium text-gray-800">{action.traveler_type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-gray-800">{action.price} SEK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
