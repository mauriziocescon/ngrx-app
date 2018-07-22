import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';

import { AddComponentDirective } from '../../../../../../shared/shared.module';

import { BlockUtilsIntegrationService } from '../../../../../services';

import { Block, BlockComponent } from '../../../../../models';

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
              protected blockUtils: BlockUtilsIntegrationService) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  protected loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BlockComponent>(this.getComponent(this.block));
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.blockId = this.block.id;
    componentRef.changeDetectorRef.detectChanges();
  }

  protected getComponent(block: Block): any {
    return this.blockUtils.getComponentForBlock(block);
  }
}
