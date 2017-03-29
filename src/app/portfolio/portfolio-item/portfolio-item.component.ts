import {
  Component, OnInit, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter
} from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {PortfolioComponent} from "../portfolio.component";
import {Observable, Observer, Subject} from "rxjs";
import {isBoolean} from "util";
//import { routerTransition } from './router.animations';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: 'portfolio-item.component.html',
  styleUrls: ['portfolio-item.component.scss']
})

export class PortfolioItemComponent implements OnInit {

  @ViewChild('carousel') carousel:CarouselComponent;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() public title:String;
  @Input() public logoSrc:String;
  @Input() public logoAlt:String;
  @Input() public carouselItemsData:Object[];

  private height;
  private top;
  private open = false;
  private _ready = false;
  private shadowOpacity = PortfolioComponent.isMobileView()? 0 : 1;

  public readySubject:Subject<any> = new Subject<any>();

  constructor(private elementRef:ElementRef) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {}

  ngOnInit() {}

  ngAfterViewInit(){
    this._ready = true;
  }

  ngAfterViewChecked(){}

  onSwipeleft() { this.carousel.onRightArrowClick(); }

  onSwiperight() { this.carousel.onLeftArrowClick(); }

  getHeight():number {
    return this.elementRef.nativeElement.clientHeight;
  }

  getTop():number{
    return this.elementRef.nativeElement.offsetTop;
  }

  getElementRef(){
    return this.elementRef;
  }

  isOpen() {
    return this.elementRef.nativeElement.style.height === '100vh';
    //return this.elementRef.nativeElement.style.position === 'fixed';
  }

  public isReady(){
    return this._ready && this.carousel.isReady();
  }

  toggleArrows(){
    this.carousel.toggleArrows();
  }

  setHasShadow(value:boolean){
    this.shadowOpacity = value? 1 : 0;
  }

  private isVisible():boolean {

    // Find if fold is bigger then distance from card bottom to top
    let cHeight = this.height = this.elementRef.nativeElement.clientHeight;
    let cOffsetTop = this.elementRef.nativeElement.offsetTop;
    let cDistance = cHeight * 0.7 + cOffsetTop;

    // Get the scroll distance
    let wPageYOffset = window.pageYOffset;
    let wOuterHeight = window.innerHeight;
    let wDistance = wPageYOffset + wOuterHeight;

    return wDistance >= cDistance;
  }

}
