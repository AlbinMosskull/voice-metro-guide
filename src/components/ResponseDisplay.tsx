
import React from 'react';
import { Action } from '../services/actionService';
import TicketDisplay from './TicketDisplay';
import RouteDisplay from './RouteDisplay';

interface ResponseDisplayProps {
  action: Action | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ action }) => {
  if (!action || action.action === 'none') return null;

  return (
    <div className="w-full max-w-2xl space-y-6">
      {action.type === 'ticket' && (
        <TicketDisplay action={action} />
      )}
      
      {action.type === 'route_info' && (
        <RouteDisplay action={action} />
      )}
    </div>
  );
};

export default ResponseDisplay;
