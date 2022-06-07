import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LsHttpService } from './ls-http.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [LsHttpService],
})
export class ServicesModule {}
