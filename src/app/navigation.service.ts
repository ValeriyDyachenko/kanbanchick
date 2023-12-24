import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { BOARD_PATH, ITEM_PATH } from './app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private isBoardsRouteSubject = new BehaviorSubject<boolean>(false);
  private isItemDetailsRouteSubject = new BehaviorSubject<boolean>(false);
  private currentItemDetailsIdSubject = new BehaviorSubject<null | string>(
    null,
  );

  isBoardsRoute$ = this.isBoardsRouteSubject.asObservable();
  isItemDetailsRoute$ = this.isItemDetailsRouteSubject.asObservable();
  currentItemDetailsId$ = this.currentItemDetailsIdSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const currentRoute = this.activatedRoute.snapshot.firstChild;
          const isBoardsRoute = Boolean(
            currentRoute?.routeConfig?.path === BOARD_PATH,
          );
          const isItemDetailsRoute = Boolean(
            currentRoute?.url?.some((segment) => segment.path === ITEM_PATH),
          );
          const currentItemDetailsId =
            (isItemDetailsRoute && currentRoute?.paramMap.get('id')) || null;
          return { isBoardsRoute, isItemDetailsRoute, currentItemDetailsId };
        }),
      )
      .subscribe(
        ({ isBoardsRoute, isItemDetailsRoute, currentItemDetailsId }) => {
          this.isBoardsRouteSubject.next(isBoardsRoute);
          this.isItemDetailsRouteSubject.next(isItemDetailsRoute);
          this.currentItemDetailsIdSubject.next(currentItemDetailsId);
        },
      );
  }

  toPreviousPage() {
    this.location.back();
  }

  getIsHeaderBackButtonVisible() {
    return this.isItemDetailsRoute$;
  }

  getIsHeaderAddBoardButtonVisible() {
    return this.isBoardsRoute$;
  }
}
