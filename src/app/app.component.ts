import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
IonApp,
IonMenu,
IonMenuToggle,
IonList,
IonLabel,
IonRouterOutlet,} from '@ionic/angular/standalone';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [ IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonApp,
    IonMenu,
    IonMenuToggle,
    IonList,
    IonLabel,
    IonRouterOutlet,
    RouterLink],
})
export class AppComponent {
  constructor() {}
}
