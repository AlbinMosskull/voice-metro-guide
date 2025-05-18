
import React from 'react';
import { Action, TicketAction, RouteAction } from '../services/actionService';
import TicketDisplay from './TicketDisplay';
import RouteDisplay from './RouteDisplay';

interface ResponseDisplayProps {
  routeAction: RouteAction | null;
  ticketAction: TicketAction | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ ticketAction, routeAction }) => {
  // if (!action) return null;
  // if ('action' in action && action.action === 'none') return null;

  return (
    <div className="w-full max-w-2xl space-y-6">
      {routeAction && <RouteDisplay action={routeAction} />}
      {ticketAction && <TicketDisplay action={ticketAction} />}
    </div>
  );
};

export default ResponseDisplay;
