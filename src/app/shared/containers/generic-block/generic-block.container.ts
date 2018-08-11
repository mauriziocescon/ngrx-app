import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewChild,
  Input, Inject,
} from '@angular/core';

import { AddComponentDirective } from '../../directives';

import { Block, BlockComponent } from '../../models';

import { BLOCK_UTILS_TOKEN, IBlockUtils } from '../../tokens';

@Component({
  selector: 'ct-generic-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template add-component></ng-template>
  `,
})
export class GenericBlockContainerComponent implements AfterViewInit {
  @Input() block: Block;
  @ViewChild(AddComponentDirective) adComponent: AddComponentDirective;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  protected loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BlockComponent>(this.getComponent(this.block));
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.block = this.block;
    componentRef.changeDetectorRef.detectChanges();
  }

  protected getComponent(block: Block): any {
    return this.blockUtils.getComponentForBlock(block);
  }
}
