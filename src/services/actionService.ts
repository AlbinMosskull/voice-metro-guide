
/**
 * Service to poll for pending actions from the Python backend
 */

export interface TicketAction {
  type: 'ticket';
  ticket_type: string;
  traveler_type: string;
  price: number;
}

export interface RouteAction {
  type: 'route_info';
  legs: string[];
  total_duration: string;
}

interface NoneAction {
  action: 'none';
}

export type Action = TicketAction | RouteAction | NoneAction;

/**
 * Polls the Python backend for any pending actions
 * @returns A promise that resolves with the action response
 */
export const getPendingAction = async (): Promise<Action> => {
  try {
    // Send a request to the Python backend to check for pending actions
    const response = await fetch('http://localhost:5000/api/get_action', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error polling for actions:', error);
    throw error;
  }
};
