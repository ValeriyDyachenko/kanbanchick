import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export const drop = (
  event: CdkDragDrop<string[]>,
  onInsideDropCb: (event: CdkDragDrop<string[]>) => void,
  onOutsideDropCb?: (event: CdkDragDrop<string[]>) => void,
) => {
  if (event.previousContainer === event.container) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    onInsideDropCb(event);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    onOutsideDropCb?.(event);
  }
};
