import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from "util";

@Pipe({
  name: 'seperator'
})
export class SeperatorPipe implements PipeTransform {

    transform(value: any): any {
        if(!isNullOrUndefined(value)) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }

}
