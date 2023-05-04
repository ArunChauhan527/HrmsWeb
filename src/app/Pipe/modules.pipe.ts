import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../component/side-bar/MenuList';
import { menuList } from 'src/app/component/side-bar/MenuList';
@Pipe({
  name: 'modules'
})
export class ModulesPipe implements PipeTransform {

  transform(value: string, ...args: MenuItem[]): string[] {
     let res  = value.split(',');
     let menu = menuList;
     let result: string[] = [];
      menu.filter(mod=> !res.some(lis=> lis === mod.sno+'')).map(mod=> result.push(mod.name));
     return result;
  }

}
