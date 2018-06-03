import {CONTAINER_ACTIONS, TagsAction} from './actions';

export type TagAction = TagsAction;

export class TagsReducer {
  static reducer(state: string[], action: TagAction): string[] {
    switch (action.type) {
      case CONTAINER_ACTIONS.addTag:
        return TagsReducer.addTag(state, action);
      case CONTAINER_ACTIONS.updateTags:
        return TagsReducer.updateTags(action);
      default:
        return state;
    }
  }

  private static addTag(state: string[], action: TagAction): string[] {
    state.push(action.payload[0]);

    return state;
  }

  private static updateTags(action: TagAction): string[] {
    return action.payload;
  }
}
