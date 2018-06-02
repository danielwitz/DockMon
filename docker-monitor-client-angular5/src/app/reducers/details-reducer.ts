import {CONTAINER_ACTIONS, ViewContainerDetailsAction} from './actions';
import {Details} from '../interfaces/details/details';

export type Action = ViewContainerDetailsAction;

export class DetailsReducer {
  static reducer(state: Details, action: Action): Details {
    switch (action.type) {
      case CONTAINER_ACTIONS.viewDetails:
        return DetailsReducer.updateDetails(action);
      default:
        return state;
    }
  }

  private static updateDetails(action: Action): Details {
    return action.payload;
  }
}
