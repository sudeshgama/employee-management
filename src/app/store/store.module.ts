import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authFeature } from '../auth/store/reducer/auth.reducer';

// Function to sync state with localStorage
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      authFeature.name,
    ], // Sync only the 'auth' feature state
    rehydrate: true, // Rehydrate the state from localStorage on application load
    storageKeySerializer: (key) => `employee_${key}`, // Optional: Custom storage key
  })(reducer);
}

// MetaReducers array
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        [authFeature.name]: authFeature.reducer
      },

      { metaReducers } // Add metaReducers here
    ),
  ],
})
export class AppStoreModule { }