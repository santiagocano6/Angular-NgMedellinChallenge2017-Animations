import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('facestate', [
      state('round-out', style({ borderRadius: '50%' })),
      state('rotate', style({ backgroundColor: '#cfd8dc', transform: 'rotateX(360deg)' })),
      transition('simple => round-out', animate('0.5s ease-in')),
      transition('simple => rotate', animate('2s ease-in')),
      transition('simple => hinge', [
        animate('200ms ease-in', style({ transform: 'rotate(0)', transformOrigin: 'top left' })),
        animate(200, style({ transform: 'rotate(80deg)', transformOrigin: 'top left' })),
        animate(200, style({ transform: 'rotate(60deg)', transformOrigin: 'top left' })),
        animate(200, style({ transform: 'rotate(80deg)', transformOrigin: 'top left' })),
        animate(200, style({ transform: 'rotate(60deg)', transformOrigin: 'top left' })),
        animate(200, style({ opacity: '0' }))
      ]),
      transition('simple => crazy-time', [animate(2000, style({ transform: 'rotate(720deg) scaleX(0.5) scaleY(2)' }))]),
      transition('simple => crazy-time', animate('3s'))
    ]),
    trigger('outstate', [
      state('gone', style({ opacity: '0' })),
      transition('* => gone', animate('0.5s'))
    ])
  ]
})

export class AppComponent implements OnInit {
  faceState: string;
  outRoundOutButton: string;
  outRotateButton: string;
  outHingeButton: string;
  outCrazyTimeButton: string;
  outByeButton: string;

  isBye: boolean = false;

  ngOnInit() {
    this.faceState = 'simple';
    this.outRoundOutButton = 'simple';
    this.outRotateButton = 'simple';
    this.outHingeButton = 'simple';
    this.outCrazyTimeButton = 'simple';
    this.outByeButton = 'simple';
  }

  changeFaceState(state: string): void {
    if (this.isBye) {
      return;
    }

    if (state === 'gone') {
      this.isBye = true;
    }

    this.faceState = state;
  }

  elementGone(animationEvent: AnimationEvent, siguiente: string) {
    if (animationEvent.toState === 'gone') {
      switch (siguiente) {
        case 'outRoundOutButton': this.outRoundOutButton = 'gone'; break;
        case 'outRotateButton': this.outRotateButton = 'gone'; break;
        case 'outHingeButton': this.outHingeButton = 'gone'; break;
        case 'outCrazyTimeButton': this.outCrazyTimeButton = 'gone'; break;
        case 'outByeButton': this.outByeButton = 'gone'; break;
      }
    }
  }
}
