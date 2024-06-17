import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { GoogleComponent } from './google/google.component';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [GoogleComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    LeafletModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR API KEY',
    }),
  ],
})
export class MapsModule {}
