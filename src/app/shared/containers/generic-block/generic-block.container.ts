import {
  Inject,
  Component,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Subscription } from 'rxjs';

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
export class GenericBlockContainerComponent implements OnDestroy, AfterViewInit {
  @Input() block: Block;
  @Output() blockDidChange: EventEmitter<Block>;
  @ViewChild(AddComponentDirective) adComponent: AddComponentDirective;

  protected blockDidChangeSubscription: Subscription;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils) {
    this.blockDidChange = new EventEmitter();
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    if (this.blockDidChangeSubscription) {
      this.blockDidChangeSubscription.unsubscribe();
    }
  }

  protected loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BlockComponent>(this.getComponent(this.block));
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.block = this.block;
    this.blockDidChangeSubscription = componentRef.instance.blockDidChange.subscribe(block => this.blockDidChange.emit(block));
    componentRef.changeDetectorRef.detectChanges();
  }

  protected getComponent(block: Block): any {
    return this.blockUtils.getComponentForBlock(block);
  }
}
