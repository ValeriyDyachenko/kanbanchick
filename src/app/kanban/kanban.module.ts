import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBoardButtonComponent } from '~/kanban/components/add-board-button/add-board-button.component';
import { AddColumnButtonComponent } from '~/kanban/components/add-column-button/add-column-button.component';
import { AddItemButtonComponent } from '~/kanban/components/add-item-button/add-item-button.component';
import { BoardComponent } from '~/kanban/components/board/board.component';
import { ColumnComponent } from '~/kanban/components/column/column.component';
import { ItemComponent } from '~/kanban/components/item/item.component';
import { KanbanComponent } from '~/kanban/components/kanban/kanban.component';
import { RemoveButtonComponent } from '~/kanban/components/remove-button/remove-button.component';
import { KanbanRoutingModule } from '~/kanban/kanban-routing.module';
import { KanbanPageComponent } from '~/kanban/pages/kanban-page.component';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  declarations: [
    KanbanPageComponent,
    KanbanComponent,
    BoardComponent,
    ColumnComponent,
    ItemComponent,
    AddItemButtonComponent,
    AddColumnButtonComponent,
    AddBoardButtonComponent,
    RemoveButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    KanbanRoutingModule,
  ],
  exports: [],
})
export class KanbanModule {}
