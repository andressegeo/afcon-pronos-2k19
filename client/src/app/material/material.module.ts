import {NgModule} from "@angular/core";

import {
  MatButtonModule,
  MatRippleModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatInputModule
} from "@angular/material";

import {
  FlexLayoutModule
} from "@angular/flex-layout";

let materialModules = [
  MatButtonModule,
  MatRippleModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatIconModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatInputModule
];

@NgModule({
  imports: materialModules,
  declarations: [],
  providers: [],
  exports: materialModules
})
export class MaterialModule {}
