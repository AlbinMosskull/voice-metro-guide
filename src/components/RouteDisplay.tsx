
import React from 'react';
import { RouteAction } from '../services/actionService';
import { Route } from 'lucide-react';

interface RouteDisplayProps {
  action: RouteAction;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ action }) => {
  return (
    <div className="relative animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-metro-red/5 rounded-xl blur-md transform scale-105 -z-10"></div>
      <div className="bg-white/90 p-6 rounded-xl backdrop-blur-sm shadow-sm border border-metro-red/10">
        <div className="flex items-center gap-2 mb-3">
          <Route className="w-5 h-5 text-metro-red" />
          <p className="text-sm font-medium text-metro-red">Route Information</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-600">Route steps:</p>
            <ul className="space-y-2">
              {action.legs.map((leg, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-metro-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{index + 1}</span>
                  <span className="text-gray-800">{leg}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-gray-600">Total Duration:</span>
            <span className="font-medium text-gray-800">{action.total_duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDisplay;
