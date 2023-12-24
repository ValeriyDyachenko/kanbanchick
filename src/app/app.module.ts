import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBoardButtonComponent } from './add-board-button/add-board-button.component';
import { AddColumnButtonComponent } from './add-column-button/add-column-button.component';
import { AddItemButtonComponent } from './add-item-button/add-item-button.component';
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { KanbanComponent } from './kanban/kanban.component';
import { RemoveButtonComponent } from './remove-button/remove-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColumnComponent,
    KanbanComponent,
    AddItemButtonComponent,
    AddColumnButtonComponent,
    AddBoardButtonComponent,
    ItemDetailsComponent,
    HeaderComponent,
    RemoveButtonComponent,
    ItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
