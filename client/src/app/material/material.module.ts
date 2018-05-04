import {NgModule} from "@angular/core";

import {
  MatButtonModule,
  MatRippleModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule
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
  MatSelectModule
];

@NgModule({
  imports: materialModules,
  declarations: [],
  providers: [],
  exports: materialModules
})
export class MaterialModule {}
