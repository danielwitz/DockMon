import {SelectedContainer} from '../interfaces/container/selected-container';
import {CONTAINER_ACTIONS, SelectContainerAction} from './actions';

export type Action = SelectContainerAction;

export class ContainersReducer {
  static reducer(state: SelectedContainer, action: Action): SelectedContainer {
    switch (action.type) {
      case CONTAINER_ACTIONS.selectContainer:
        return ContainersReducer.updateSelectedContainer(action);
      default:
        return state;
    }
  }

  private static updateSelectedContainer(action: Action): SelectedContainer {
    return action.payload;
  }
}
