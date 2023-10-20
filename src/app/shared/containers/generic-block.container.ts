import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  Input,
  inject,
  ComponentRef,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';

import { AddComponentDirective } from '../directives';

import { Block, BlockComponent } from '../models';

import { BLOCK_UTILS_TOKEN } from '../tokens';

@Component({
  selector: 'app-generic-block-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template appAddComponent></ng-template>`,
})
export class GenericBlockContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: Block;
  @ViewChild(AddComponentDirective, { static: true }) adComponent: AddComponentDirective;

  private blockUtils = inject(BLOCK_UTILS_TOKEN);
  private componentRef: ComponentRef<BlockComponent>;

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['block'] && this.componentRef) {
      this.updateInstance();
    }
  }

  ngOnDestroy(): void {
    this.componentRef = undefined;
  }

  private loadComponent(): void {
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<BlockComponent>(this.getComponent(this.block));

    this.componentRef.setInput('blockId', this.block.id);
  }

  private updateInstance(): void {
    // set input
    this.componentRef.setInput('blockId', this.block.id);
  }

  private getComponent(block: Block): any {
    return this.blockUtils.getComponentForBlock(block);
  }
}
